from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/trainers/', include('trainers.urls')),
    path('api/classes/', include('classes.urls')),
    path('api/schedule/', include('schedule.urls')),
    path('api/bookings/', include('booking.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
