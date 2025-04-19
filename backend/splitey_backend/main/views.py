from rest_framework import generics
from .models import Expense, SplitRelationship
from .serializers import ExpenseSerializer, SplitRelationshipSerializer

class ExpenseListCreateView(generics.ListCreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

class ExpenseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

class SplitRelationshipListCreateView(generics.ListCreateAPIView):
    queryset = SplitRelationship.objects.all()
    serializer_class = SplitRelationshipSerializer

class SplitRelationshipDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SplitRelationship.objects.all()
    serializer_class = SplitRelationshipSerializer
