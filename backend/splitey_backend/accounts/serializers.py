from rest_framework import serializers
from .models import User, Friendship, ExpenseGroup
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

    
# friendship serializer
class FriendshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friendship
        fields = ['id', 'user1', 'user2']


# retrieve friends balances
class FriendBalanceSerializer(serializers.Serializer):
    friend_id = serializers.IntegerField()
    friend_name = serializers.CharField()
    friend_email = serializers.EmailField()
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    status = serializers.CharField()  # 'owes' or 'owed'


# expense group serializer
class ExpenseGroupCreateSerializer(serializers.ModelSerializer):
    members = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)

    class Meta:
        model = ExpenseGroup
        fields = ['id', 'name', 'members', 'created_date']

    def create(self, validated_data):
        members = validated_data.pop('members')
        group = ExpenseGroup.objects.create(**validated_data)
        group.members.set(members)
        return group
    
# friend serializer
class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'full_name', 'email']