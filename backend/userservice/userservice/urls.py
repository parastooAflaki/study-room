"""userservice URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from  user import views

urlpatterns = [
    path('users/signup', views.sign_up),
    path('users/login' , views.log_in),
    path('users/validate/<str:token>' , views.validate, name='validateuser'),
    #path('users/searchusers/?<int:page>/?<int:limit>/?<str:searched_term>', views.search_users),
    path('users/searchusers' , views.search_users),
    path('users/requestresetpassword', views.requestresetpassword , name = 'request reset_password'),
    path('users/resetpassword/<str:token>', views.resetpassword , name = 'resetpassword'),
    path('users/revalidate/<str:email>' , views.resend_validation, name='revalidateuser'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
  
]
