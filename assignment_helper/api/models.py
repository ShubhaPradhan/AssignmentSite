from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, name=name)

        user.is_superuser = False
        user.is_staff = False

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, name, password):
        user = self.create_user(email, name, password)

        user.is_superuser = True
        user.is_staff = True

        user.save()

        return user

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        return self.name
    
    def get_short_name(self):
     return self.name
     
    def __str__(self):
        return self.email

class Assignment(models.Model):
    # BOTH CHOICES WILL EVENTUALLY COME FROM ADMIN
    # SUBJECTS
    Statistics = 'statistics'
    Numerical_Method = 'NM'
    subject_choices = [
        (Statistics,'statistics'),
        (Numerical_Method,'numerical method'), 
    ]
    # ASSIGNMENT TYPE
    Assignment = 'assignment'
    Lab = 'lab'
    assignment_choices = [
        (Assignment,'assignment'),
        (Lab,'lab'), 
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=20)
    subject = models.CharField(max_length=20, choices=subject_choices, default=Statistics)
    assignment_type = models.CharField(max_length=20, choices=assignment_choices, default=Assignment)
    assignment_file = models.FileField()
    description = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

