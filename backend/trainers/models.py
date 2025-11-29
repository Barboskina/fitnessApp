"""Модели приложения тренеров."""
from django.db import models
from django.core.validators import MinValueValidator


class Trainer(models.Model):
    """Модель тренера фитнес-клуба."""

    name = models.CharField(
        max_length=255,
        verbose_name='Имя тренера'
    )
    specialty = models.TextField(
        verbose_name='Специализация'
    )
    experience = models.FloatField(
        verbose_name='Опыт работы (лет)',
        validators=[MinValueValidator(0)],
    )
    image = models.ImageField(
        verbose_name='Изображение тренера',
        upload_to='trainers/',
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата создания'
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Дата обновления'
    )

    class Meta:
        verbose_name = 'Тренер'
        verbose_name_plural = 'Тренеры'

    def __str__(self):
        return f"{self.name} - {self.specialty}"
