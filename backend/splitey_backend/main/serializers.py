from rest_framework import serializers
from .models import Expense, SplitRelationship

class SplitRelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = SplitRelationship
        fields = '__all__'


class ExpenseSerializer(serializers.ModelSerializer):
    splits = SplitRelationshipSerializer(many=True, read_only=True)
    split_among = serializers.PrimaryKeyRelatedField(many=True, queryset=Expense.split_among.field.related_model.objects.all())

    class Meta:
        model = Expense
        fields = '__all__'
