"""Админ-панель для приложения тренеров."""
from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Trainer


@admin.register(Trainer)
class TrainerAdmin(admin.ModelAdmin):
    """Админ-интерфейс для управления тренерами."""

    list_display = ('name', 'specialty')
    list_filter = ('specialty', 'name')
    search_fields = ('name', 'specialty')
    list_per_page = 25
    ordering = ('name',)
    readonly_fields = ('created_at', 'updated_at', 'image_preview')
    date_hierarchy = 'created_at'

    def image_preview(self, obj):
        """Возвращает HTML для предпросмотра изображения тренера."""
        if obj.image:
            return mark_safe(
                f'<img src="{obj.image.url}" style="max-height: 200px; max-width: 200px;" />'
            )
        return "Нет изображения"

    image_preview.short_description = 'Предпросмотр изображения'

    fieldsets = (
        (None, {
            'fields': ('name', 'specialty', 'experience')
        }),
        ('Изображение', {
            'fields': ('image', 'image_preview')
        }),
    )
