from django.contrib import admin
from .models import Trainer
from django.utils.safestring import mark_safe


@admin.register(Trainer)
class TrainerAdmin(admin.ModelAdmin):
    list_display = ('name', 'specialty')
    list_filter = ('specialty', 'name')
    search_fields = ('name', 'specialty')
    list_per_page = 25
    ordering = ('name',)
    readonly_fields = ('created_at', 'updated_at', 'image_preview')
    date_hierarchy = 'created_at'

    def image_preview(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" style="max-height: 200px; max-width: 200px;" />')
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
