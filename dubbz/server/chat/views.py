from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .chat_service import ChatService
from .models import Chat, SecretToken
from .seralizers import ChatSerializer

class ChatApiView(APIView):
  def get(self, request, *args, **kargs):
    chats = Chat.objects.all()
    serializer = ChatSerializer(chats, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  
  def post(self, request, *args, **kargs):
    chat_service = ChatService
    data = {
            'message': request.data.get('message'),
            'ip_address': chat_service.get_client_ip(request),
        }
    serializer = ChatSerializer(data=data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request, *args, **kargs):
    token = request.data.get('token')
    if token == None:
      return Response({"res": "You are not allowed to delete"}, status=status.HTTP_400_BAD_REQUEST)
    else:
      is_token_exist = SecretToken.objects.filter(token=token)
      if is_token_exist:
        Chat.objects.all().delete()
        return Response({"res": "Object deleted!"},status=status.HTTP_200_OK)
      else:
        return Response({"res": "Invalid Token"},status=status.HTTP_400_BAD_REQUEST)

class DeleteChatById(APIView):
  def delete(self, request, chat_id, *args, **kargs):
    token = request.data.get('token')
    try:
      if token == None:
        return Response({"res": "You are not allowed to delete"}, status=status.HTTP_400_BAD_REQUEST)
      else:
        is_token_exist = SecretToken.objects.filter(token=token)
        if is_token_exist:
          chat = Chat.objects.get(id=chat_id)
        else:
          return Response({"res": "Invalid Token"},status=status.HTTP_400_BAD_REQUEST)
    except Chat.DoesNotExist:
      return Response(
            {"res": "Object with chat id {} does not exists".format(chat_id)}, 
            status=status.HTTP_400_BAD_REQUEST
        )
        
    chat.delete()
    return Response({"res": "Object deleted!"},status=status.HTTP_200_OK)