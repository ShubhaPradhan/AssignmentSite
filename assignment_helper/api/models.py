from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.CharField(max_length=100)

    def __str__(self):
        return self.username
        
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

    title = models.CharField(max_length=20)
    subject = models.CharField(max_length=20, choices=subject_choices, default=Statistics)
    assignment_type = models.CharField(max_length=20, choices=assignment_choices, default=Assignment)
    assignment_file = models.FileField()
    description = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

