from django.db import models

# Create your models here.
from django.db import models
from accounts.models import User,ExpenseGroup, Friendship

class Expense(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    comments = models.TextField(null=True, blank=True)
    
    added_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='expenses_added'
    )
    
    group = models.ForeignKey(
        ExpenseGroup,  # Assuming you have a Group model
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='expenses'
    )
    
    split_among = models.ManyToManyField(
        User,
        through='SplitRelationship',
        through_fields=('expense', 'owes'),
        related_name='expenses_shared'
    )
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return f"Expense #{self.id} - {self.amount} by {self.added_by}"

class SplitRelationship(models.Model):
    expense = models.ForeignKey(Expense, on_delete=models.CASCADE, related_name='splits')
    owes = models.ForeignKey(User, related_name='split_owes', on_delete=models.CASCADE)
    owed = models.ForeignKey(User, related_name='split_owed', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
