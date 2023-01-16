from django.db import models
from django.utils.timezone import now

class Chat(models.Model):
  message = models.TextField(null=False, blank=False)
  ip_address = models.GenericIPAddressField()
  created_at = models.DateTimeField(default=now, blank=False, null=False)

  def __str__(self) -> str:
    return self.message

class SecretToken(models.Model):
  token = models.CharField(max_length=40)
  