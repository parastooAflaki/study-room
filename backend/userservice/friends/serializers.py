from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import update_last_login
from rest_framework_jwt.settings import api_settings
from .models import Relationship
from user.models import User
from django.contrib.auth.hashers import check_password


class UserSummarySerializer(serializers.ModelSerializer):

    email = serializers.CharField(max_length=255)

    class Meta:
        model = User
        fields = ['email']


class GetFriendsSerializer(serializers.ModelSerializer):
    from_user = UserSummarySerializer()
    to_user = UserSummarySerializer()
    status = serializers.CharField(max_length=255)

    class Meta:
        model = Relationship
        depth = 1
        fields = ['from_user', 'to_user', 'status']
