"""Сериализаторы для приложения классов тренировок."""
from rest_framework import serializers
from .models import WorkoutClass


class WorkoutClassSerializer(serializers.ModelSerializer):
    """Сериализатор для модели класса тренировки."""

    duration_hours = serializers.FloatField(read_only=True)
    is_free = serializers.BooleanField(read_only=True)
    difficulty_display = serializers.CharField(
        source='get_difficulty_display',
        read_only=True
    )

    price = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        min_value=0
    )
    duration_minutes = serializers.IntegerField(min_value=1)

    class Meta:
        model = WorkoutClass
        fields = [
            'id',
            'name',
            'description',
            'price',
            'timetable_description',
            'duration_minutes',
            'duration_hours',
            'difficulty',
            'difficulty_display',
            'is_active',
            'is_free',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
