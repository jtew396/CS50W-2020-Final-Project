from django.db import models

class Spot(models.Model):
    lat = models.FloatField()
    lng = models.FloatField()
    created_at = models.DateTimeField(auto_now=True)