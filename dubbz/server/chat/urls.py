from django.urls import path
from .views import ChatApiView, DeleteChatById

urlpatterns = [
    path('chat', ChatApiView.as_view()),
    path('chat/<int:chat_id>', DeleteChatById.as_view()),
]