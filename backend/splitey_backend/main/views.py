from rest_framework import generics, permissions, status
from .models import Expense, SplitRelationship, ExpenseGroup
from .serializers import ExpenseSerializer, SplitRelationshipSerializer
from rest_framework.response import Response
from decimal import Decimal
from accounts.models import User, Friendship


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
