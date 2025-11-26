# schedule/admin.py (минимальная версия)
from django.contrib import admin
from .models import Schedule


@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = (
        'trainer',
        'workout_class',
        'datetime',
    )
    list_filter = ('datetime', 'trainer', 'workout_class')
    search_fields = ('trainer__name', 'workout_class__name')
    ordering = ('-datetime',)
    date_hierarchy = 'datetime'

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('trainer', 'workout_class')