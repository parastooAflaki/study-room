from user.models import User
from django.db import models
from enum import Enum


class RelationshipStatus(Enum):
    friend = "friend"
    friend_pending = "friend_pending"
    blocked = "blocked"

    @classmethod
    def choices(cls):
        print(tuple((i.name, i.value) for i in cls))
        return tuple((i.name, i.value) for i in cls)


class Relationship(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(
        max_length=255, choices=RelationshipStatus.choices())

    from_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='%(class)s_relations_from')
    to_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='%(class)s_relations_to')
