from django.db import models
from django.contrib.auth.models import User


class Delivery(models.Model):
    name = models.CharField(max_length=200)
    latitude = models.CharField(max_length=200)
    longitude = models.CharField(max_length=200)
    detail = models.TextField()
    # image = models.CharField(max)