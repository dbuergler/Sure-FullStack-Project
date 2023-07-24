from django.db import models

"""
Created an Entry model to store the data and create the data in the database

"""

class Entry(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    comments = models.TextField()
    select = models.CharField(max_length=10)
    raceOption = models.CharField(max_length=50)
    

    def __str__(self):
        return self.name