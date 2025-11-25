from django.contrib import admin
from .models import Trainer


@admin.register(Trainer)
class TrainerAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'specialty',
        'created_at'
    )
    list_filter = ('created_at', 'experience')
    search_fields = ('name', 'specialty')
    list_per_page = 25
    ordering = ('name',)
    readonly_fields = ('created_at', 'updated_at')
    date_hierarchy = 'created_at'
