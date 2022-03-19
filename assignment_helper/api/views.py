from django.http import JsonResponse
from .models import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from .serializers import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.parsers import FileUploadParser, MultiPartParser
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

@api_view(['GET', 'POST', 'PUT'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        '/api/users',
        '/api/create-assignments',
        '/api/assignments',
        '/api/update-assignments/<int:pk>',
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
    parser_classes = (MultiPartParser, FileUploadParser)
    
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer

    def post(self, request, format=None):
        user = User.objects.get(id=request.data['user'])
        username = request.data['username']
        title = request.data['title']
        subject = request.data['subject']
        assignment_type = request.data['assignment_type']
        assignment_file = request.data['assignment_file']
        description = request.data['description']

        assignment = Assignment(user=user, username=username, title=title, subject=subject, assignment_type=assignment_type, assignment_file=assignment_file, description=description)
        serializer = self.serializer_class(assignment)
        print(serializer.data)
        assignment.save()     
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class AssignmentsView(APIView):
    
    serializer_class = AssignmentSerializer

    def get(self, request, format=None):
        queryset = Assignment.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

class UpdateAssignmentView(APIView):

    serializer_class = AssignmentSerializer

    def put(self, request, pk, format=None):
        assignment = Assignment.objects.get(pk=pk)
        if assignment.user.id != int(request.data['user']):
            print(request.data)
            return Response({ "Bad Request": "User is not the same."},status=status.HTTP_409_CONFLICT)

        serializer = self.serializer_class(assignment, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

           
