from django.db import models
from django.core.validators import MinValueValidator


class Trainer(models.Model):
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
    image = models.TextField(
        verbose_name='URL изображения',
        max_length=500,
        default='',
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