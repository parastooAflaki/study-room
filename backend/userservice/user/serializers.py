from django.db.models import fields
from .models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'user_name', 'first_name', 'last_name', 'created_at', 'updated_at']
        

class SignUpSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'user_name', 'password', 'first_name', 'last_name']
        
    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError('Password too short')
        return value


   

