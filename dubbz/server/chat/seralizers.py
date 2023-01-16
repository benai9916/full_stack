from rest_framework import serializers
from .models import Chat

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ("id", "ip_address", "message", "created_at")
        extra_kwargs = {"ip_address": {"write_only": True}}