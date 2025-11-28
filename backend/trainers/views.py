from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Trainer


def add_cors_headers(response):
    """Добавляет CORS заголовки к response"""
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response


@require_http_methods(["GET", "OPTIONS"])
def trainer_list(request):
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
