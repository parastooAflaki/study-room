from functools import wraps
from rest_framework.response import Response
from rest_framework import status
import jwt
from django.conf import settings


def auth(view_function):
    @wraps(view_function)
    def wrap(request, *args, **kwargs):
        try:
            authtoken = request.headers["Authorization"].replace("Bearer ", "")
            decoded = jwt.decode(authtoken, settings.JWT_SECRET)
            request.user = decoded

        except:
            return Response("Not authorized", status=status.HTTP_403_FORBIDDEN)
        return view_function(request, *args, **kwargs)
    return wrap
