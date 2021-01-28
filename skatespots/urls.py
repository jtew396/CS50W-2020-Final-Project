from django.urls import path
from .views import SpotList

urlpatterns = [
    path('spots/', SpotList.as_view())
]