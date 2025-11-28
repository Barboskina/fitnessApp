from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from django.utils import timezone
from .models import Schedule
from .serializers import ScheduleSerializer


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

            return response

        except Exception as e:
            error_response = JsonResponse(
                {'error': 'Внутренняя ошибка сервера'},
                status=500,
                json_dumps_params={'ensure_ascii': False}
            )
            return error_response

    def options(self, request, *args, **kwargs):
        """Обработка preflight OPTIONS запросов"""
        response = JsonResponse({})
        return response
