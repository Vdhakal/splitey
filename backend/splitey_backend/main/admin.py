from django.contrib import admin

# Register your models here.
from .models import *

@admin.register(SplitRelationship)
class SplitRelationshipAdmin(admin.ModelAdmin):
    list_display = ('expense', 'owes', 'owed', 'amount')
    actions = ['force_delete']

    def force_delete(self, request, queryset):
        for obj in queryset:
            try:
                obj.delete()
                self.message_user(request, f"✅ Deleted: {obj}")
            except Exception as e:
                self.message_user(request, f"❌ Error deleting {obj}: {e}", level='error')

    force_delete.short_description = "Force delete selected split relationships"

admin.site.register(ExpenseGroup)
admin.site.register(Expense)

