from django.urls import path
from .views import *

app_name = 'frontend'

urlpatterns = [
    path('', index),
    path('assignment', index),
    path('upload-assignment', index),
    path('login', index),
    path('update-assignment/<int:id>', index),
]