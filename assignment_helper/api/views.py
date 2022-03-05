from django.http import JsonResponse
from .models import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from .serializers import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.parsers import MultiPartParser, FormParser
# Create your views here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, User):
        token = super().get_token(User)

        # Add custom claims
        token['email'] = User.email
        token['full_name'] = User.full_name
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        '/api/users',
        '/api/create-assignments',
    ]

    return Response(routes)

class CreateUserView(APIView):

    serializer_class = UserSerializer

    def post(self, request, format=None):
        user = request.data
        queryset = User.objects.filter(email=user['email'])
        if queryset.exists():
            return Response({ "Bad Request": "Email is already used."},status=status.HTTP_409_CONFLICT)
        serializer = self.serializer_class(data = user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data

        return Response(user_data, status=status.HTTP_201_CREATED)

class CreateAssignmentView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = AssignmentSerializer

    def post(self, request, format=None):
        
        assignment = request.data
        serializer = self.serializer_class(data = assignment)
        if serializer.is_valid():
            print(serializer.validated_data)
            serializer.save()
            assignment_data = serializer.data
            return Response(assignment_data, status=status.HTTP_201_CREATED)

        print(serializer.errors)
        
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    
