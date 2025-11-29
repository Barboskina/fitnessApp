"""Конфигурация приложения классов тренировок."""
from django.apps import AppConfig


class ClassesConfig(AppConfig):
    """Конфигурация приложения для управления классами тренировок."""

    default_auto_field = 'django.db.models.BigAutoField'
    name = 'classes'
