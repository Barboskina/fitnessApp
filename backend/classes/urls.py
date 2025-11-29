"""URL-маршруты для приложения классов тренировок."""
from django.urls import path
from . import views

urlpatterns = [
    path('', views.workout_class_list, name='workout-classes-list'),
]
