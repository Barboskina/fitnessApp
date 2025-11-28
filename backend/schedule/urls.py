from django.urls import path
from .views import ScheduleByWorkoutAPIView

urlpatterns = [
    path('<int:workout_id>/', ScheduleByWorkoutAPIView.as_view(), name='schedule-by-workout'),
]
