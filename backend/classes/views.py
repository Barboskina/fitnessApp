"""API views для приложения классов тренировок."""
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import WorkoutClass


@require_http_methods(["GET", "OPTIONS"])
def workout_class_list(request):
    """Обработчик для получения списка активных классов тренировок."""
    if request.method == "OPTIONS":
        return JsonResponse({})

    workout_classes = WorkoutClass.objects.filter(is_active=True).only(
        'id', 'name', 'description', 'price', 'timetable_description',
        'duration_minutes', 'difficulty'
    )

    data = [
        {
            'id': wc.id,
            'name': wc.name,
            'description': wc.description,
            'price': float(wc.price),
            'timetable_description': wc.timetable_description,
            'duration_minutes': wc.duration_minutes,
            'difficulty': wc.difficulty,
        }
        for wc in workout_classes
    ]

    response = JsonResponse(
        data,
        safe=False,
        json_dumps_params={'ensure_ascii': False}
    )

    return response
