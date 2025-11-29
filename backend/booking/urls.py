"""URL-маршруты для приложения бронирования."""
from django.urls import path
from .views import BookingCreateAPIView, ScheduleBookingsAPIView

urlpatterns = [
    path('create/', BookingCreateAPIView.as_view(), name='booking-create'),
    path(
        'schedule/<int:schedule_id>/',
        ScheduleBookingsAPIView.as_view(),
        name='schedule-bookings'
    ),
]
