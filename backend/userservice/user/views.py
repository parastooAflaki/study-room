from django.http.response import HttpResponse
from django.urls.conf import path
from .models import EmailToken, User
from rest_framework import serializers, viewsets
from rest_framework import permissions
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ProfileSerializer, SignUpSerializer, UserSerializer, LogInSerializer, RequestResetPasswordSerilizer, ResponseRequestResetPasswordSerilizer, ResetPasswordSerilizer, ResponseResetPasswordSerilizer
from .serializers import FindedUsersSerializer
import jwt
from datetime import timedelta, datetime
import uuid
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.http import HttpResponseRedirect
from django.conf import settings
from django.core import serializers
from userservice.middlewares import auth


@api_view(['POST'])
def sign_up(request, format=None):
    serializer = SignUpSerializer(data=request.data)
    if serializer.is_valid():

        serializer.save()
        email_token_string = serializer.data["user_name"] + \
            "@" + uuid.uuid4().hex
        email_token = EmailToken()
        email_token.token = email_token_string
        email_token.user_email = serializer.data["email"]
        email_token.save()
        current_site = get_current_site(request)
        mail_subject = 'Activate your blog account.'
        message = render_to_string('acc_active_email.html', {
            'user': serializer.data,
            'domain': current_site.domain,
            'token': email_token_string,
        })
        to_email = serializer.data["email"]
        email = EmailMessage(
            mail_subject, message, to=[to_email]
        )

        email.send()
        responseSerializer = UserSerializer(data=serializer.data)
        if responseSerializer.is_valid():
            return Response(responseSerializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(responseSerializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def log_in(request, format=None):
    serializer = LogInSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.data.get("email", None)
        EndDate = datetime.now() + timedelta(days=10)
        encoded_jwt = jwt.encode(
            {"email": email, "exp": EndDate}, settings.JWT_SECRET, algorithm="HS256")
        return Response(encoded_jwt, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def validate(request, token, format=None):
    try:
        email_token = EmailToken.objects.get(token=token)
    except:
        return HttpResponseRedirect(f'{settings.FRONT_URL}validation/invalid')

    time_between_insertion = datetime.now() - email_token.created_at.replace(tzinfo=None)
    if time_between_insertion.seconds / 60 > 15:
        return HttpResponseRedirect(f'{settings.FRONT_URL}validation/expired')
    else:
        user = User.objects.get(user_name=email_token.token.split("@")[0])
        user.is_validated = True
        user.save()
        return HttpResponseRedirect(f'{settings.FRONT_URL}validation/success')


@api_view(['GET'])
def resend_validation(request, email, format=None):
    user = None
    try:
        user = User.objects.get(email=email)
    except:
        return Response("Email is not registered.", status=status.HTTP_404_NOT_FOUND)

    if(user.is_validated):
        return Response("User already validated", status=status.HTTP_400_BAD_REQUEST)

    email_token = EmailToken.objects.get(user_email=email)

    time_between_insertion = datetime.now() - email_token.created_at.replace(tzinfo=None)
    if time_between_insertion.seconds / 60 < 3:
        return Response("Email sent recently, try again in " + str(int(4 - time_between_insertion.seconds / 60)) + "m", status=status.HTTP_400_BAD_REQUEST)
    else:
        email_token.created_at = datetime.now()
        email_token_string = user.user_name + "@" + uuid.uuid4().hex
        email_token.token = email_token_string
        email_token.save()
        current_site = get_current_site(request)
        mail_subject = 'Activate your blog account.'
        message = render_to_string('acc_active_email.html', {
            'user': user,
            'domain': current_site.domain,
            'token': email_token_string,
        })
        to_email = user.email
        email_package = EmailMessage(
            mail_subject, message, to=[to_email]
        )
        email_package.send()
        return Response("Validation mail sent", status=status.HTTP_200_OK)


@api_view(['POST'])
def requestresetpassword(request):
    # user name in request
    serializer = RequestResetPasswordSerilizer(data=request.data)
    if serializer.is_valid():
        email_token_string = serializer.data['user_name'] + \
            "@" + uuid.uuid4().hex
        email_token = EmailToken()
        email_token.token = email_token_string

        email_token.user_email = serializer.data["email"]
        email_token.save()

        current_site = get_current_site(request)

        mail_subject = 'Reset your passowrd!'

        message = render_to_string('pass_reset_email.html', {
            'user': serializer.data,
            'domain': current_site.domain,
            'token': email_token_string,
        })

        to_email = serializer.data["email"]
        email = EmailMessage(
            mail_subject, message, to=[to_email]
        )

        email.send()

        responseSerializer = ResponseRequestResetPasswordSerilizer(
            data=serializer.data)
        if responseSerializer.is_valid():
            return Response(responseSerializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(responseSerializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def resetpassword(request, token, format=None):

    serializer = ResetPasswordSerilizer(data=request.data)
    # try :
    email_token = EmailToken.objects.get(token=token)
    # except:
    #     return HttpResponseRedirect(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if serializer.is_valid():
        user_email = email_token.user_email
        user_token = email_token.token
        time_between_insertion = datetime.now() - email_token.created_at.replace(tzinfo=None)
        # email_token.delete()

        if time_between_insertion.seconds / 60 > 15:
            return HttpResponseRedirect(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            user = User.objects.get(user_name=user_token.split("@")[0])
            user.password = serializer.data["new_password"]
            user.save()
            responseSerializer = ResponseResetPasswordSerilizer(
                data=serializer.data)
            if responseSerializer.is_valid():
                return HttpResponseRedirect(responseSerializer.data, status=status.HTTP_200_OK)
            else:
                return HttpResponseRedirect(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return HttpResponseRedirect(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def search_users(request, format=None):
    page_number = request.GET.get('page', 1)
    limit_num = request.GET.get('limit', 10)
    searched_term = request.GET.get('search', '')
    searched_term = searched_term + "%"
    skip_val = (int(page_number) - 1) * int(limit_num)

    print("-------------------------------------------------")
    print("page_number ", page_number)
    print("limit_num ", limit_num)
    print(searched_term)
    num_pages = User.objects.raw(
        'SELECT COUNT(*) AS total , id AS id FROM user_user WHERE user_name LIKE %s', [searched_term])
    found_users = User.objects.raw(
        "SELECT * FROM user_user WHERE user_name LIKE %s ORDER BY id DESC LIMIT %s OFFSET %s ", [searched_term, limit_num, skip_val])

    response_serializer = FindedUsersSerializer(
        data=list(found_users), many=True)
    if response_serializer.is_valid():
        return HttpResponse(response_serializer.data, status=status.HTTP_200_OK)
    else:
        return HttpResponse(response_serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@auth
def profile(request, format=None):
    user_email = request.user["email"]
    user = User.objects.get(email=user_email)
    response_serializer = ProfileSerializer(user)
    return Response(response_serializer.data, status=status.HTTP_200_OK)
