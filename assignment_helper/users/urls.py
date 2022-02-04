from atexit import register
from unicodedata import name
from django.urls import path
from .views import *

urlpatterns = [
    path('create', UserRegisterView.as_view(), name="register"),
    path('login', UserLoginView.as_view(), name="login"),
]