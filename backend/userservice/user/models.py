from django.db import models
from django.contrib.auth.hashers import make_password

# Create your models here.
class User(models.Model):
        email = models.EmailField(unique=True)
        password = models.CharField(max_length=255)
        user_name = models.CharField(max_length= 255, unique=True)
        first_name = models.CharField(max_length= 255)
        last_name = models.CharField(max_length=255)
        created_at = models.DateTimeField(auto_now_add=True)
        updated_at = models.DateTimeField(auto_now=True)
        
        def save(self, *args, **kargs):
                self.password =  make_password(self.password)
                super(User, self).save(*args, kargs)

