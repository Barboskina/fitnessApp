from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import json
from .models import Booking
from .serializers import BookingSerializer


def add_cors_headers(response):
    """Добавляет CORS заголовки к response"""
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, POST"
    response["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With"
    return response

@method_decorator(csrf_exempt, name='dispatch')
class BookingCreateAPIView(View):
    """API для создания записи на тренировку"""
    def post(self, request):
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

            return add_cors_headers(response)

        except json.JSONDecodeError:
            error_response = JsonResponse({
                'success': False,
                'message': 'Неверный формат JSON'
            }, status=400, json_dumps_params={'ensure_ascii': False})
            return add_cors_headers(error_response)

        except Exception as e:
            error_response = JsonResponse({
                'success': False,
                'message': f'Внутренняя ошибка сервера: {str(e)}'
            }, status=500, json_dumps_params={'ensure_ascii': False})
            return add_cors_headers(error_response)

    def options(self, request, *args, **kwargs):
        """Обработка preflight OPTIONS запросов"""
        response = JsonResponse({})
        return add_cors_headers(response)

@method_decorator(csrf_exempt, name='dispatch')
class ScheduleBookingsAPIView(View):
    """API для получения всех записей на конкретное расписание"""

    def get(self, request, schedule_id):
        try:
            bookings = Booking.objects.filter(
                schedule_id=schedule_id,
                is_active=True
            ).select_related('schedule', 'schedule__workout_class', 'schedule__trainer')

            bookings_data = []
            for booking in bookings:
                bookings_data.append({
                    'id': booking.id,
                    'full_name': booking.full_name,
                    'email': booking.email,
                    'phone_number': booking.phone_number,
                    'created_at': booking.created_at.isoformat(),
                    'workout_name': booking.schedule.workout_class.name,
                    'trainer_name': booking.schedule.trainer.name,
                    'datetime': booking.schedule.datetime.isoformat()
                })

            response_data = {
                'success': True,
                'schedule_id': int(schedule_id),
                'total_bookings': len(bookings_data),
                'bookings': bookings_data
            }

            response = JsonResponse(
                response_data,
                json_dumps_params={'ensure_ascii': False}
            )

            return add_cors_headers(response)

        except Exception as e:
            error_response = JsonResponse({
                'success': False,
                'message': f'Внутренняя ошибка сервера: {str(e)}'
            }, status=500, json_dumps_params={'ensure_ascii': False})
            return add_cors_headers(error_response)

    def options(self, request, *args, **kwargs):
        """Обработка preflight OPTIONS запросов"""
        response = JsonResponse({})
        return add_cors_headers(response)
