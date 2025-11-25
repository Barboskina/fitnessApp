from django.contrib import admin
from .models import Booking


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'full_name',
        'phone_number',
        'email',
        'get_workout_name',
        'get_trainer_name',
        'get_datetime',
        'created_at'
    )
    list_filter = ('schedule__datetime', 'schedule__workout_class', 'schedule__trainer')
    search_fields = (
        'full_name',
        'email',
        'phone_number',
        'schedule__workout_class__name',
        'schedule__trainer__name'
    )
    list_per_page = 25
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')
    date_hierarchy = 'created_at'

    def get_workout_name(self, obj):
        return obj.schedule.workout_class.name

    get_workout_name.short_description = 'Тренировка'
    get_workout_name.admin_order_field = 'schedule__workout_class__name'

    def get_trainer_name(self, obj):
        return obj.schedule.trainer.name

    get_trainer_name.short_description = 'Тренер'
    get_trainer_name.admin_order_field = 'schedule__trainer__name'

    def get_datetime(self, obj):
        return obj.schedule.datetime

    get_datetime.short_description = 'Дата и время'
    get_datetime.admin_order_field = 'schedule__datetime'

    list_select_related = ('schedule', 'schedule__workout_class', 'schedule__trainer')

    def get_queryset(self, request):
        return super().get_queryset(request).select_related(
            'schedule',
            'schedule__workout_class',
            'schedule__trainer'
        )
