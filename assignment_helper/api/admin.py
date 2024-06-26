from dataclasses import fields
from django.contrib import admin

from .models import *
# Register your models here.

class UserAdmin(admin.ModelAdmin):
    fields = ['email', 'full_name','password', 'is_staff', 'is_superuser']
    list_display = ('email', 'full_name')

admin.site.register(User, UserAdmin)

class AssignmentAdmin(admin.ModelAdmin):
    fields = ['user','title', 'subject', 'assignment_type', 'assignment_file', 'description']
    list_display = ('user', 'title', 'subject', 'assignment_type', 'assignment_file')

admin.site.register(Assignment, AssignmentAdmin)

