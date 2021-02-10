from django.http import Http404
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import SpotSerializer
from .models import Spot

class SpotList(APIView):

    def get(self, request, format=None):
        spots = Spot.objects.all()
        serializer = SpotSerializer(spots, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = SpotSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SpotDetail(APIView):

    def get_object(self, pk):
        try:
            return Spot.objects.get(pk=pk)
        except Spot.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        spot = self.get_object(pk)
        serializer = SpotSerializer(spot)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        spot = self.get_object(pk)
        serializer = SpotSerializer(spot, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        spot = self.get_object(pk)
        spot.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
