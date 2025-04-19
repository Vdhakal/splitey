from rest_framework import serializers
from .models import Expense, SplitRelationship
from accounts.models import User
from .models import ExpenseGroup


class SplitRelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = SplitRelationship
        fields = '__all__'


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ['id', 'amount', 'comments', 'group']