from django.urls import path
from .views import *

urlpatterns = [
    path('assignments', AssignmentView.as_view(), name="assignments"),
]