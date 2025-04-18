from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import   FriendshipSerializer, ExpenseGroupCreateSerializer, FriendSerializer
from .models import User, Friendship, ExpenseGroup
from decimal import Decimal
from rest_framework import generics, permissions
from rest_framework.views import APIView
from django.db.models import Q


# friendship logic
class FriendshipCreateAPIView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    queryset = Friendship.objects.all()
    serializer_class = FriendshipSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        friendship = serializer.save()
        

        # Create reverse friendship if not exists
        reverse_exists = Friendship.objects.filter(
            user1=friendship.user2,
            user2=friendship.user1
        ).exists()

        if not reverse_exists:
            Friendship.objects.create(
                user1=friendship.user2,
                user2=friendship.user1,
                amount=Decimal('0.00')
            )

        return Response(
            FriendshipSerializer(friendship).data,
            status=status.HTTP_201_CREATED
        )

# retrieve friends
class FriendListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        # Get friendships where user is either user1 or user2
        friendships = Friendship.objects.filter(Q(user1=user) | Q(user2=user))

        # Collect all unique friend users
        friends = set()
        for f in friendships:
            if f.user1 == user:
                friends.add(f.user2)
            else:
                friends.add(f.user1)

        serializer = FriendSerializer(friends, many=True)
        return Response(serializer.data)
# retrieve friends balances
class FriendshipBalanceAPIView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FriendshipSerializer

    queryset = Friendship.objects.all()
    def get(self, request, *args, **kwargs):
        user = request.user
        friendships = Friendship.objects.filter(user1=user)

        total_balance = Decimal("0.00")
        balances = []

        for friendship in friendships:
            friend = friendship.user2
            amount = friendship.amount

            status = "owed" if amount > 0 else "owes" if amount < 0 else "settled"

            balances.append({
                "friend_id": friend.id,
                "friend_name": friend.full_name,
                "friend_email": friend.email,
                "amount": abs(amount),
                "status": status
            })

            total_balance += amount

        return Response({
            "total_balance": total_balance,
            "friend_balances": balances
        })
    

class ExpenseGroupCreateAPIView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    
    queryset = ExpenseGroup.objects.all()
    serializer_class = ExpenseGroupCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)