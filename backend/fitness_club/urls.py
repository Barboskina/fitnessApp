from django.contrib import admin
from django.urls import path
from booking.views import BookingCreateAPIView, ScheduleBookingsAPIView
from trainers.views import trainer_list
from classes.views import workout_class_list
from schedule.views import ScheduleByWorkoutAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/trainers/', trainer_list, name='trainers-list'),
    path('api/classes/', workout_class_list, name='classes-list'),
    path('api/workout/<int:workout_id>/', ScheduleByWorkoutAPIView.as_view(), name='schedule-by-workout'),
    path('api/bookings/create/', BookingCreateAPIView.as_view(), name='booking-create'),
    path('api/bookings/schedule/<int:schedule_id>/', ScheduleBookingsAPIView.as_view(), name='schedule-bookings'),
]
