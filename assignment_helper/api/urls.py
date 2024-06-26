from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/', CreateUserView.as_view(), name='create_user'),
    path('create-assignments/', CreateAssignmentView.as_view(), name='create_assignment'),
    path('assignments/', AssignmentsView.as_view(), name='get_assignments'),
    path('assignment/<int:pk>', AssignmentView.as_view(), name='get_assignment'),
    path('update-assignment/<int:pk>/', UpdateAssignmentView.as_view(), name='update_assignment'),
    path('delete-assignment/<int:pk>/', DeleteAssignmentView.as_view(), name='delete_assignment'),
]