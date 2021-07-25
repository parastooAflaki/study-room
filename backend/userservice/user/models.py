from django.db import models

# Create your models here.
class User(models.Model):
        email = models.EmailField()
        password = models.CharField(max_length=255)
        user_name = models.CharField(max_length= 255)
        first_name = models.CharField(max_length= 255)
        last_name = models.CharField(max_length=255)
        
