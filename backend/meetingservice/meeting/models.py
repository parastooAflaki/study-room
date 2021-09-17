from django.db import models

# Create your models here.


class Meeting(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    host_email = models.CharField(max_length=255)
    date = models.DateTimeField()
    link = models.CharField (max_length=500)


class Attendance(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    state = models.CharField(
        max_length=255, choices=Invitation_status.choices())
    user_email = models.CharField(max_length=255)
    meeting = models.ForeignKey(Meeting, on_delete=models.CASCADE)


class Invitation_status(Enum):
    pending = "pending"
    accepted = "accepted"
    declined = "declined"

    @classmethod
    def choices(cls):
        print(tuple((i.name, i.value) for i in cls))
        return tuple((i.name, i.value) for i in cls)
