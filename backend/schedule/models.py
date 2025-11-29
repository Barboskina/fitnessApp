"""Модели приложения расписания."""
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

from trainers.models import Trainer
from classes.models import WorkoutClass


class Schedule(models.Model):
    """Модель расписания тренировок."""

    trainer = models.ForeignKey(
        Trainer,
        on_delete=models.CASCADE,
        verbose_name='Тренер',
        related_name='schedules'
    )
    workout_class = models.ForeignKey(
        WorkoutClass,
        on_delete=models.CASCADE,
        verbose_name='Тренировка',
        related_name='schedules'
    )
    datetime = models.DateTimeField(verbose_name='Дата и время тренировки')
    available_slots = models.IntegerField(
        verbose_name='Количество доступных мест',
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        default=10
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
        verbose_name = 'Расписание'
        verbose_name_plural = 'Расписание'
        ordering = ['datetime']

    def __str__(self):
        return f"{self.workout_class.name} - {self.trainer.name} - {self.datetime}"
