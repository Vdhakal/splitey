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
        fields = ['id', 'amount', 'comments', 'group', 'split_among']