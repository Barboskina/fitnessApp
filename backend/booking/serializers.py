"""Сериализаторы для приложения бронирования."""
from rest_framework import serializers
from .models import Booking


class BookingSerializer(serializers.ModelSerializer):
    """Сериализатор для модели бронирования."""

    class Meta:
        model = Booking
        fields = [
            'id',
            'full_name',
            'phone_number',
            'email',
            'schedule',
            'created_at',
            'is_active'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_schedule(self, value):
        """Проверка доступности мест в расписании."""
        if value.available_slots <= 0:
            raise serializers.ValidationError(
                "На это время нет свободных мест"
            )

        return value

    def validate(self, attrs):
        """Дополнительная валидация данных бронирования."""
        email = attrs.get('email')
        full_name = attrs.get('full_name')
        schedule = attrs.get('schedule')

        # Проверка существующей активной записи
        existing_booking = Booking.objects.filter(
            email=email,
            full_name=full_name,
            schedule=schedule,
            is_active=True
        ).exists()

        if existing_booking:
            raise serializers.ValidationError({
                "error": "Вы уже записаны на эту тренировку"
            })

        return attrs

    def create(self, validated_data):
        """Создание новой брони тренировки."""
        booking = Booking.objects.create(**validated_data)
        return booking
