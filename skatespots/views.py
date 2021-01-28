from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import SpotSerializer
from .models import Spot

class SpotList(APIView):
    
    def get(self, request, format=None):
        spots = Spot.objects.all()
        serializer = SpotSerializer(spots, many=True)
        return Response(serializer.data)
