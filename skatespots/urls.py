from django.urls import path
from .views import SpotList, SpotDetail

urlpatterns = [
    path('spots/', SpotList.as_view()),
    path('spot/<int:pk>/', SpotDetail.as_view())
]
