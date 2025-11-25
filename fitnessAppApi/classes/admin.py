from django.contrib import admin
from .models import WorkoutClass


@admin.register(WorkoutClass)
class WorkoutClassAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'price',
        'is_active',
        'created_at'
    )
    list_filter = ('difficulty', 'is_active', 'created_at')
    search_fields = ('name', 'description', 'timetable_description')
    list_per_page = 25
    ordering = ('name',)
    readonly_fields = ('created_at', 'updated_at')
    date_hierarchy = 'created_at'
