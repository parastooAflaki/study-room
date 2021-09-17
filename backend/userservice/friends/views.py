from user.models import User
from .serializers import GetFriendsSerializer
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.utils.decorators import decorator_from_middleware
from userservice.middlewares import auth
from .models import Relationship, RelationshipStatus
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


@api_view(['POST'])
@auth
def addfriend(request, format=None):
    user_email = request.user["email"]
    to_email = request.data["to"]
    relationship = Relationship()
    try:
        relationship.from_user = User.objects.get(email=user_email)
        relationship.to_user = User.objects.get(email=to_email)
    except:
        return Response("User not found", status=status.HTTP_404_NOT_FOUND)
    relationship.status = RelationshipStatus.friend_pending.name
    print(relationship.status)
    if Relationship.objects.filter(from_user=relationship.from_user, to_user=relationship.to_user, status=RelationshipStatus.friend_pending.name).exists():
        return Response("Invite already sent.", status=status.HTTP_400_BAD_REQUEST)
    if Relationship.objects.filter(from_user=relationship.from_user, to_user=relationship.to_user, status=RelationshipStatus.friend.name).exists():
        return Response("User is already your friend", status=status.HTTP_400_BAD_REQUEST)

    relationship.save()
    return Response("Request sent successfully", status=status.HTTP_200_OK)


@api_view(['POST'])
@auth
def acceptfriend(request, format=None):
    user_email = request.user["email"]
    from_email = request.data["from"]
    from_user = None
    to_user = None
    try:
        from_user = User.objects.get(email=from_email)
        to_user = User.objects.get(email=user_email)
        relationship = Relationship.objects.get(
            from_user=from_user, to_user=to_user, status=RelationshipStatus.friend_pending.name)
    except:
        return Response("Invite not found", status=status.HTTP_404_NOT_FOUND)
    relationship.status = RelationshipStatus.friend.name
    relationship.save()
    return Response("Request accepted successfully", status=status.HTTP_200_OK)
