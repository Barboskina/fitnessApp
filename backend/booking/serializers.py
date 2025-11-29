from rest_framework import serializers
from .models import Booking


class BookingSerializer(serializers.ModelSerializer):
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
        """Проверка доступности мест в расписании"""
        if value.available_slots <= 0:
            raise serializers.ValidationError("На это время нет свободных мест")

        return value

    def validate(self, data):
        """Дополнительная валидация"""
        email = data.get('email')
        full_name = data.get('full_name')
        schedule = data.get('schedule')

        if Booking.objects.filter(email=email, full_name=full_name, schedule=schedule, is_active=True).exists():
            raise serializers.ValidationError({
                "error": "Вы уже записаны на эту тренировку"
            })

        return data

    def create(self, validated_data):
        booking = Booking.objects.create(**validated_data)

        return booking