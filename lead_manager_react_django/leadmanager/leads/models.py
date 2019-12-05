from django.db import models
from django.contrib.auth.models import User

class Topic(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500, blank=True)
    link = models.CharField(max_length=500, blank=True)
    owner = models.ForeignKey(User, related_name="topics", on_delete = models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Lead(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, blank=True)
    message = models.CharField(max_length=500, blank=True)
    table_id = models.IntegerField(default=0)
    topic = models.ForeignKey(Topic, related_name="leads", on_delete = models.CASCADE, null=True)
    owner = models.ForeignKey(User, related_name="leads", on_delete = models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)