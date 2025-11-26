from django.db import models


class Booking(models.Model):
    """Модель для записи на тренировку"""
    id = models.AutoField(primary_key=True, verbose_name='ID записи')
    full_name = models.CharField(
        max_length=255,
        verbose_name='ФИО участника',
    )
    phone_number = models.CharField(
        max_length=20,
        verbose_name='Номер телефона участника',
    )
    email = models.EmailField(
        verbose_name='Почта участника'
    )
    schedule = models.ForeignKey(
        'schedule.Schedule',
        on_delete=models.CASCADE,
        verbose_name='Расписание',
        related_name='bookings'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата создания записи'
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Дата обновления записи'
    )
    is_active = models.BooleanField(
        verbose_name='Активна',
        default=True
    )

    class Meta:
        verbose_name = 'Запись на тренировку'
        verbose_name_plural = 'Записи на тренировки'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.full_name} - {self.schedule}"

    @property
    def participant_info(self):
        """Краткая информация об участнике"""
        return f"{self.full_name} ({self.phone_number})"