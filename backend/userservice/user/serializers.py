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
    user_name = serializers.CharField(max_length= 255)
    first_name = serializers.CharField(max_length= 255)
    last_name = serializers.CharField(max_length=255)
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()
        

class SignUpSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'user_name', 'password', 'first_name', 'last_name' , 'updated_at' , 'created_at']
        
    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError('Password too short')
        return value


class LogInSerializer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField()
    user_name = serializers.CharField()

    def authenticate(self , data):
        email = data.get("email" , None)
        password = data.get("password" , None)
        try:
            user = User.objects.get(email= email)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                'User with given email does not exists'
            )
        retrieved_password = user.password
        pwd_valid = check_password(password, retrieved_password)
        if pwd_valid :
            return user
        raise serializers.ValidationError(
            'Wrong password!'
        )

    def validate(self , data):
            print(data.keys())
            user = self.authenticate( data)
            return user