from django.shortcuts import render
from rest_framework import generics
from .serializers import *
from .models import *
# Create your views here.
class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomRegisterSerializer

class UserLoginView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


