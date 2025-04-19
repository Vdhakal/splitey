from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(SplitRelationship)
admin.site.register(Expense)