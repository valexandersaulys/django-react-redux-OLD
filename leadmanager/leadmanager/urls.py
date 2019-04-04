from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('frontend.urls')),   # you'd probably specify prefix as good practice
    path('', include('leads.urls')),
    path('', include('accounts.urls')),
]
