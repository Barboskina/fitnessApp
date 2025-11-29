"""Админ-панель для приложения расписания."""
from django.contrib import admin
from .models import Schedule


@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    """Админ-интерфейс для управления расписанием тренировок."""

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
