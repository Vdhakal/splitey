from django.urls import path
from .views import (
    ExpenseCreateAPIView,
    ExpenseDetailView,
    SplitRelationshipListCreateView,
    SplitRelationshipDetailView,
)

urlpatterns = [
    path('expenses/', ExpenseCreateAPIView.as_view(), name='expense-list-create'),
    path('expenses/<int:pk>/', ExpenseDetailView.as_view(), name='expense-detail'),
    
    path('splits/', SplitRelationshipListCreateView.as_view(), name='split-list-create'),
    path('splits/<int:pk>/', SplitRelationshipDetailView.as_view(), name='split-detail'),
]
