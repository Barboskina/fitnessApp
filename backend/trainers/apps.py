"""Конфигурация приложения тренеров."""
from django.apps import AppConfig


class TrainersConfig(AppConfig):
    """Конфигурация приложения для управления тренерами."""

    default_auto_field = 'django.db.models.BigAutoField'
    name = 'trainers'
