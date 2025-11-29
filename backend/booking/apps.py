"""Конфигурация приложения для записи на тренировку."""
from django.apps import AppConfig


class BookingConfig(AppConfig):
    """Конфигурация приложения для управления записью на тренировку."""

    default_auto_field = 'django.db.models.BigAutoField'
    name = 'booking'
