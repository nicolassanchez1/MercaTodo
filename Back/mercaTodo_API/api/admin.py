from django.contrib import admin
from .models import Products, Categories, Provider

# Register your models here.

admin.site.register(Products)
admin.site.register(Categories)
admin.site.register(Provider)
