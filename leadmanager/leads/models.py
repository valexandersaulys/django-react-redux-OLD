from django.db import models
from django.contrib.auth.models import User


class Lead(models.Model):
    # *** to secure our model so only appropriate users can see
    owner = models.ForeignKey(User,
                              related_name='leads',
                              on_delete=models.CASCADE,  # what happens we delete a user
                              null=True)  # we can have null values
    
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    message = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
