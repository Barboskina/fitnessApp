"""Конфигурация приложения для брони тренировок."""
from django.apps import AppConfig


class BookingConfig(AppConfig):
    """Конфигурация приложения для управления бронями тренировок."""

    default_auto_field = 'django.db.models.BigAutoField'
    name = 'booking'
