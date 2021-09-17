from .serializers import GetFriendsSerializer
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.utils.decorators import decorator_from_middleware
from userservice.middlewares import auth
from .models import Relationship
from django.forms.models import model_to_dict


@api_view(['GET'])
@auth
def getallfriends(request, format=None):
    user_email = request.user["email"]

    relationShips = Relationship.objects.filter(
        from_user__email=user_email)

    response_serializer = GetFriendsSerializer(
        relationShips, many=True)
    return Response(response_serializer.data, status=status.HTTP_200_OK)
