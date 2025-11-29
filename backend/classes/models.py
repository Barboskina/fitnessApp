"""Модели приложения классов тренировок."""
from django.db import models
from django.core.validators import MinValueValidator


class WorkoutClass(models.Model):
    """Модель класса тренировки."""

    DIFFICULTY_LEVELS = [
        ('beginner', 'Начинающий'),
        ('intermediate', 'Средний'),
        ('advanced', 'Продвинутый'),
    ]

    DEFAULT_DURATION = 60
    DEFAULT_PRICE = 0.00

    name = models.CharField(
        max_length=255,
        verbose_name='Название'
    )
    description = models.TextField(
        verbose_name='Описание'
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name='Стоимость',
        default=DEFAULT_PRICE,
        validators=[MinValueValidator(0)]
    )
    timetable_description = models.TextField(
        verbose_name='Еженедельное расписание'
    )
    duration_minutes = models.PositiveIntegerField(
        verbose_name='Длительность (минут)',
        default=DEFAULT_DURATION,
        validators=[MinValueValidator(1)]
    )
    difficulty = models.CharField(
        max_length=50,
        verbose_name='Уровень сложности',
        choices=DIFFICULTY_LEVELS,
        default='beginner'
    )
    image = models.URLField(
        verbose_name='URL изображения',
        blank=True,
        null=True,
        max_length=500
    )
    is_active = models.BooleanField(
        verbose_name='Активна',
        default=True
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
        verbose_name = 'Тренировка'
        verbose_name_plural = 'Тренировки'

    def __str__(self):
        return self.name

    @property
    def duration_hours(self) -> float:
        """Возвращает длительность в часах."""
        return round(self.duration_minutes / 60, 1)

    def is_free(self) -> bool:
        """Проверяет, является ли тренировка бесплатной."""
        return self.price == 0
