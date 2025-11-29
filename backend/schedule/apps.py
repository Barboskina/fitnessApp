"""Конфигурация приложения расписания."""
from django.apps import AppConfig


class ScheduleConfig(AppConfig):
    """Конфигурация приложения для управления расписанием тренировок."""

    default_auto_field = 'django.db.models.BigAutoField'
    name = 'schedule'
