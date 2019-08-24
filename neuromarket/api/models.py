from django.db import models


class Movie(models.Model):
    title = models.CharField(max_length=32)
    desc = models.CharField(max_length=256)
    year = models.IntegerField()

    # Create your models here.
    def __str__(self):
        return self.title
