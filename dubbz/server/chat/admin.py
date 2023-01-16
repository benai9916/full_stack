from django.contrib import admin
from .models import Chat, SecretToken

models = [Chat, SecretToken]
admin.site.register(models)
