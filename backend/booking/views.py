"""API views для приложения записи на тренировку."""
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from .models import Booking
from .serializers import BookingSerializer


@method_decorator(csrf_exempt, name='dispatch')
class BookingCreateAPIView(View):
    """API для создания записи на тренировку"""

    def post(self, request):
        """Обработка POST запроса для создания записи на тренировку."""
        try:
            data = json.loads(request.body)
            serializer = BookingSerializer(data=data)

            if serializer.is_valid():
                booking = serializer.save()

                response_data = {
                    'success': True,
                    'message': 'Запись на тренировку успешно создана',
                    'booking_id': booking.id,
                }

                response = JsonResponse(
                    response_data,
                    status=201,
                    json_dumps_params={'ensure_ascii': False}
                )

            else:
                response = JsonResponse({
                    'success': False,
                    'message': 'Ошибка валидации данных',
                    'errors': serializer.errors
                }, status=400, json_dumps_params={'ensure_ascii': False})

            return response

        except json.JSONDecodeError:
            error_response = JsonResponse({
                'success': False,
                'message': 'Неверный формат JSON'
            }, status=400, json_dumps_params={'ensure_ascii': False})
            return error_response

        except Exception as e:
            error_response = JsonResponse({
                'success': False,
                'message': f'Внутренняя ошибка сервера: {str(e)}'
            }, status=500, json_dumps_params={'ensure_ascii': False})
            return error_response

    def options(self, request, *args, **kwargs):
        """Обработка preflight OPTIONS запросов."""
        response = JsonResponse({})
        return response


@method_decorator(csrf_exempt, name='dispatch')
class ScheduleBookingsAPIView(View):
    """API для получения количества всех записей на конкретное расписание"""

    def get(self, request, schedule_id):
        """Обработка GET запроса для получения записи на тренировку по id тренировки."""
        try:
            bookings = Booking.objects.filter(
                schedule_id=schedule_id,
                is_active=True
            ).select_related('schedule')

            response_data = {
                'success': True,
                'schedule_id': int(schedule_id),
                'total_bookings': len(bookings),
            }

            response = JsonResponse(
                response_data,
                json_dumps_params={'ensure_ascii': False}
            )

            return response

        except Exception as e:
            error_response = JsonResponse({
                'success': False,
                'message': f'Внутренняя ошибка сервера: {str(e)}'
            }, status=500, json_dumps_params={'ensure_ascii': False})
            return error_response

    def options(self, request, *args, **kwargs):
        """Обработка preflight OPTIONS запросов."""
        response = JsonResponse({})
        return response
