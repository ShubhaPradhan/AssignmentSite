from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.contrib.auth.hashers import make_password

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, full_name, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, full_name=full_name)

        user.is_superuser = False
        user.is_staff = False

        user.set_password(password)
        user.save(using=self._db)
        user.save()

        return user

    def create_superuser(self, email, full_name, password):
        user = self.create_user(email, full_name, password)

        user.is_superuser = True
        user.is_staff = True

        user.save()

        return user

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    full_name = models.CharField(max_length=255)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    def get_full_name(self):
        return self.full_name
    
    def get_short_name(self):
     return self.full_name
     
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

