from rest_framework import serializers
from .models import Trainer


class TrainerSerializer(serializers.ModelSerializer):
    experience_display = serializers.CharField(read_only=True)

    experience = serializers.FloatField(
        min_value=0,
        max_value=50,
        help_text="Опыт работы в годах"
    )
    name = serializers.CharField(
        min_length=2,
        max_length=255,
        trim_whitespace=True
    )

    class Meta:
        model = Trainer
        fields = [
            'id',
            'name',
            'specialty',
            'experience',
            'experience_display',
            'image',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
