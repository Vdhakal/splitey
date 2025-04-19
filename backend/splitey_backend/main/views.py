from rest_framework import generics, permissions, status
from .models import Expense, SplitRelationship, ExpenseGroup
from .serializers import ExpenseSerializer, SplitRelationshipSerializer, ExpenseSummarySerializer, GroupBalanceSerializer
from rest_framework.response import Response
from decimal import Decimal
from accounts.models import User, Friendship
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from collections import defaultdict


class ExpenseCreateAPIView(generics.CreateAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = request.user
        data = request.data.copy()
        split_among = data.get('split_among', [])
        group_id = data.get('group', None)

        if split_among and group_id:
            return Response({"error": "Provide either split_among or group, not both."}, status=400)

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        expense = serializer.save(added_by=user)

        participants = []

        if split_among:
            participants = [int(uid) for uid in split_among]

        elif group_id:
            try:
                group = ExpenseGroup.objects.get(id=group_id)
                members = group.members.all() 
                participants = [member.id for member in members]
            except ExpenseGroup.DoesNotExist:
                return Response({"error": "Group not found."}, status=404)

        if participants:
            participant_count = len(participants) + 1  # including creator

            if participant_count == 0:
                return Response({"error": "Cannot split with no participants."}, status=400)

            split_amount = Decimal(expense.amount) / Decimal(participant_count)

            for uid in participants:
                SplitRelationship.objects.create(
                    expense=expense,
                    owes_id=uid,
                    owed=user,
                    amount=split_amount
                )

                owes_user = User.objects.get(id=uid)

                # Update Friendship amount
                friendship = Friendship.objects.filter(user1=user, user2=owes_user).first()
                if friendship:
                    friendship.amount += split_amount
                    friendship.save()
                else:
                    reverse_friendship = Friendship.objects.filter(user1=owes_user, user2=user).first()
                    if reverse_friendship:
                        reverse_friendship.amount -= split_amount
                        reverse_friendship.save()
                    else:
                        Friendship.objects.create(user1=user, user2=owes_user, amount=split_amount)

        return Response(self.get_serializer(expense).data, status=status.HTTP_201_CREATED)


class ExpenseDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

class SplitRelationshipListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = SplitRelationship.objects.all()
    serializer_class = SplitRelationshipSerializer

class SplitRelationshipDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = SplitRelationship.objects.all()
    serializer_class = SplitRelationshipSerializer


# friends details transactions
class FriendTransactionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, friend_id):
        user = request.user
        friend = get_object_or_404(User, id=friend_id)

        # Individual expenses
        individual_expenses = Expense.objects.filter(
            added_by=user,
            split_among=friend
        )

        # Group-based expenses (where friend is in group and expense has group)
        group_expenses = Expense.objects.filter(
            added_by=user,
            group__members=friend
        )

        print(group_expenses)
        combined = (individual_expenses | group_expenses).distinct()

        serializer = ExpenseSummarySerializer(combined, many=True)
        return Response(serializer.data)
    

# user's groups and the members balance
class GroupBalancesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        groups = ExpenseGroup.objects.filter(members=user)
        results = []

        for group in groups:
            group_expenses = Expense.objects.filter(group=group)
            balances = defaultdict(Decimal)

            for expense in group_expenses:
                splits = SplitRelationship.objects.filter(expense=expense)

                for split in splits:
                    if split.owed == user and split.owes != user:
                        # someone owes the user
                        balances[split.owes] += split.amount
                    elif split.owes == user and split.owed != user:
                        # user owes someone
                        balances[split.owed] -= split.amount

            members_data = []
            for other_user, amount in balances.items():
                status = "owed" if amount > 0 else "owes" if amount < 0 else "settled"
                members_data.append({
                    "user_id": other_user.id,
                    "full_name": other_user.full_name,
                    "email": other_user.email,
                    "balance": abs(amount),
                    "status": status
                })

            results.append({
                "group_id": group.id,
                "group_name": group.name,
                "balances": members_data
            })

        return Response(GroupBalanceSerializer(results, many=True).data)