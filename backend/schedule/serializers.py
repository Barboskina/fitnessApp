"""Сериализаторы для приложения расписания."""
from rest_framework import serializers
from django.utils import timezone
from trainers.models import Trainer
from classes.models import WorkoutClass
from .models import Schedule


class TrainerSerializer(serializers.ModelSerializer):
    """Сериализатор для модели тренера."""

    class Meta:
        model = Trainer
        fields = ['id', 'name', ]


class WorkoutClassSerializer(serializers.ModelSerializer):
    """Сериализатор для модели класса тренировки."""

    class Meta:
        model = WorkoutClass
        fields = ['id', 'name', 'description', 'duration_minutes', 'difficulty', 'price']


class ScheduleSerializer(serializers.ModelSerializer):
    """Сериализатор для модели расписания."""

    # Базовые поля для отображения
    trainer_name = serializers.CharField(source='trainer.name', read_only=True)
    workout_name = serializers.CharField(source='workout_class.name', read_only=True)

    # Детальная информация о тренере и тренировке
    trainer_details = TrainerSerializer(source='trainer', read_only=True)
    workout_details = WorkoutClassSerializer(source='workout_class', read_only=True)

    class Meta:
        model = Schedule
        fields = [
            'id',
            'trainer',
            'workout_class',
            'trainer_name',
            'workout_name',
            'trainer_details',
            'workout_details',
            'datetime',
            'created_at',
            'available_slots',
        ]
        read_only_fields = ['id', 'created_at']

    def validate_datetime(self, value):
        """Проверка что дата не в прошлом."""
        if value < timezone.now():
            raise serializers.ValidationError("Дата тренировки не может быть в прошлом.")
        return value

    def validate(self, attrs):
        """Общая валидация данных расписания."""
        # Проверка что тренер не занят в это время
        trainer = attrs.get('trainer')
        datetime = attrs.get('datetime')

        if trainer and datetime:
            conflicting_schedules = Schedule.objects.filter(
                trainer=trainer,
                datetime=datetime,
            )

            # При обновлении исключаем текущий объект
            if self.instance:
                conflicting_schedules = conflicting_schedules.exclude(pk=self.instance.pk)

            if conflicting_schedules.exists():
                raise serializers.ValidationError({
                    "datetime": "Тренер уже занят в это время."
                })

        return attrs
