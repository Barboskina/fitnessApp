"""Представления API для приложения тренеров"""
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Trainer


@require_http_methods(["GET", "OPTIONS"])
def trainer_list(request):
    """Возвращает JSON-список всех тренеров"""
    if request.method == "OPTIONS":
        return JsonResponse({})

    trainers = Trainer.objects.values(
        'id', 'name', 'specialty', 'experience', 'image'
    )

    data = list(trainers)

    response = JsonResponse(
        data,
        safe=False,
        json_dumps_params={'ensure_ascii': False}
    )

    return response
