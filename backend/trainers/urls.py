from django.urls import path
from . import views

urlpatterns = [
    path('', views.trainer_list, name='trainers-list'),
]
