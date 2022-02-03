from rest_framework import serializers
from .models import *

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ('id', 'title', 'subject', 'assignment_type', 'assignment_file', 'description', 'created_at')
