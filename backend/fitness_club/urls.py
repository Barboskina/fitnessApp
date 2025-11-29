"""Главный URL-конфигуратор проекта Fitness Club."""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.urls import re_path
from django.views.static import serve

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/trainers/', include('trainers.urls')),
    path('api/classes/', include('classes.urls')),
    path('api/schedule/', include('schedule.urls')),
    path('api/bookings/', include('booking.urls')),
]

if not settings.DEBUG:
    urlpatterns += [
        re_path(r'^media/(?P<path>.*\.(png|jpg|jpeg|gif|bmp|webp|svg))$', serve, {
            'document_root': settings.MEDIA_ROOT,
        }),
    ]
