from django.urls import path
from .views import (
    ExpenseCreateAPIView,
    ExpenseDetailView,
    SplitRelationshipListCreateView,
    SplitRelationshipDetailView,
    FriendTransactionView,
    GroupBalancesView
)

urlpatterns = [
    path('expenses/', ExpenseCreateAPIView.as_view(), name='expense-list-create'),
    path('expenses/<int:pk>/', ExpenseDetailView.as_view(), name='expense-detail'),
    
    path('splits/', SplitRelationshipListCreateView.as_view(), name='split-list-create'),
    path('splits/<int:pk>/', SplitRelationshipDetailView.as_view(), name='split-detail'),
    path('friends/<int:friend_id>/transactions/', FriendTransactionView.as_view(), name='friend-transactions'),
    path('groups/balances/', GroupBalancesView.as_view(), name='group-balances'),


]
