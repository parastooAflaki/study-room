from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import update_last_login
from rest_framework_jwt.settings import api_settings
from .models import User
from django.contrib.auth.hashers import check_password

JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER


class UserSerializer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField(max_length=255)
    user_name = serializers.CharField(max_length=255)
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()


class SignUpSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'user_name', 'password', 'first_name',
                  'last_name', 'updated_at', 'created_at']

    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError('Password too short')
        return value


class LogInSerializer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField()
    user_name = serializers.CharField()

    def authenticate(self, data):
        email = data.get("email", None)
        password = data.get("password", None)
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                {"email": 'User with given email does not exists'}
            )
        retrieved_password = user.password
        pwd_valid = check_password(password, retrieved_password)
        print(password)
        print(retrieved_password)
        print(pwd_valid)

        if pwd_valid:
            return user
        else:
            raise serializers.ValidationError(
                {"password": 'Wrong password!'}
            )

    def validate(self, data):
        print(data.keys())
        user = self.authenticate(data)
        return user


class RequestResetPasswordSerilizer(serializers.Serializer):
    user_name = serializers.CharField()
    email = serializers.EmailField()

    def authenticate(self, data):
        user_name = data.get("user_name", None)
        email = data.get("email", None)
        if email == None:
            try:
                user = User.objects.get(user_name=user_name)
                email = user.email
            except User.DoesNotExist:
                raise serializers.ValidationError(
                    {"user_name": 'User does not exist'}
                )
        elif user_name == None:
            try:
                user = User.objects.get(email=email)
                user_name = user.username
                return user
            except User.DoesNotExist:
                raise serializers.ValidationError(
                    {"email": 'User does not exist'}
                )
        else:
            user = User.objects.get(email=email)
            user_name = user.user_name
            return user

    def validate(self, data):
        print(data.keys())
        user = self.authenticate(data)
        return user


class ResponseRequestResetPasswordSerilizer(serializers.Serializer):
    user_name = serializers.CharField()
    email = serializers.EmailField()


class ResetPasswordSerilizer(serializers.Serializer):
    new_password = serializers.CharField(max_length=255)


class ResponseResetPasswordSerilizer(serializers.Serializer):
    new_password = serializers.CharField(max_length=255)

    def validate(self, data):
        print(data.keys())
        return data


class FindedUsersSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(max_length=255)

    class Meta:
        model = User
        fields = ['user_name']


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        exclude = ('password',)
