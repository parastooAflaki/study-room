from .models import User
from rest_framework import serializers, viewsets
from rest_framework import permissions
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import SignUpSerializer, UserSerializer



@api_view(['POST'])
def sign_up(request, format=None):
    serializer = SignUpSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        responseSerializer = UserSerializer(data= serializer.data)
        if responseSerializer.is_valid():
            return Response(responseSerializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(responseSerializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)