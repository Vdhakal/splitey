from django.urls import path
from .views import  FriendshipCreateAPIView, FriendshipBalanceAPIView, ExpenseGroupCreateAPIView, FriendListView

urlpatterns = [
        path('friendships/', FriendshipCreateAPIView.as_view(), name='friendship-create'),
        path('friendships/balances/', FriendshipBalanceAPIView.as_view(), name='friendship-balances'),
        path('expense-groups/', ExpenseGroupCreateAPIView.as_view(), name='expense-group-create'),
        path('friends/', FriendListView.as_view(), name='friend-list'),



]
