from django.contrib.auth.models import User, Group
from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated
from intsureview_be.apps.api.serializers import UserSerializer, GroupSerializer, EntrySerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Entry
from .serializers import *
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    
    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated]
    




class EntryView(generics.ListCreateAPIView):

    """
    API endpoint that allows entries to be viewed or edited.
    """
    serializer_class = EntrySerializer
    queryset = Entry.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes=[SessionAuthentication]


class setCSRFCookie(APIView):
    permission_classes = []
    authentication_classes = []
    @ensure_csrf_cookie
    def get(self, request):
        return Response("CSRF Cookie set.")





