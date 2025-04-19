from rest_framework import serializers
from .models import Expense, SplitRelationship
from accounts.models import User
from .models import ExpenseGroup


class SplitRelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = SplitRelationship
        fields = '__all__'

class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'full_name', 'email']

class ExpenseSerializer(serializers.ModelSerializer):
    split_among = SimpleUserSerializer(many=True, read_only=True)
    class Meta:
        model = Expense
        fields = ['id', 'amount', 'comments', 'group', 'split_among', 'created_at']

# friends details transactions
class ExpenseSummarySerializer(serializers.ModelSerializer):
    group_name = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()

    class Meta:
        model = Expense
        fields = ['id', 'amount', 'comments', 'group_name', 'type']

    def get_group_name(self, obj):
        return obj.group.name if obj.group else None

    def get_type(self, obj):
        return "group" if obj.group else "individual"
    

# groups and the members balance
class GroupMemberBalanceSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    full_name = serializers.CharField()
    email = serializers.EmailField()
    balance = serializers.DecimalField(max_digits=10, decimal_places=2)
    status = serializers.CharField()  # "owes" or "owed"
    

class GroupBalanceSerializer(serializers.Serializer):
    group_id = serializers.IntegerField()
    group_name = serializers.CharField()
    balances = GroupMemberBalanceSerializer(many=True)