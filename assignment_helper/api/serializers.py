import email
from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(max_length=68, min_length=8, write_only=True)
    class Meta:
        model = User
        fields = ['email', 'password','full_name']

    def validate(self, attrs):
        email = attrs.get('email', '')

        return attrs

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ['user', 'title', 'subject', 'assignment_type', 'assignment_file', 'description', 'created_at']

    def create(self, validated_data):
        return Assignment.objects.create(**validated_data)