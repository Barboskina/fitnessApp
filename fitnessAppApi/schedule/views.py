from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Q
from .models import Schedule
from .serializers import ScheduleSerializer
from classes.models import WorkoutClass
from trainers.models import Trainer


def add_cors_headers(response):
    """Утилита для добавления CORS заголовков"""
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS, POST, PUT, DELETE"
    response["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With"
    return response


@method_decorator(csrf_exempt, name='dispatch')
class ScheduleByWorkoutAPIView(APIView):
    """
    API для получения расписания по ID тренировки
    """

    def get(self, request, workout_id):
        try:
            schedules = Schedule.objects.filter(
                workout_class_id=workout_id,
                datetime__gt=timezone.now(),
            ).select_related('trainer', 'workout_class')


            schedules = schedules.order_by('datetime')

            serializer = ScheduleSerializer(schedules, many=True)

            response = JsonResponse({
                'count': schedules.count(),
                'results': serializer.data
            }, safe=False, json_dumps_params={'ensure_ascii': False})

            return add_cors_headers(response)

        except Exception as e:
            error_response = JsonResponse(
                {'error': 'Внутренняя ошибка сервера'},
                status=500,
                json_dumps_params = {'ensure_ascii': False}
            )
            return add_cors_headers(error_response)

    def options(self, request, *args, **kwargs):
        """Обработка preflight OPTIONS запросов"""
        response = JsonResponse({})
        return add_cors_headers(response)