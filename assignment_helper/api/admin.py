from django.contrib import admin

from .models import *
# Register your models here.

class AssignmentAdmin(admin.ModelAdmin):
    fields = ['title', 'subject', 'assignment_type', 'assignment_file', 'description']

admin.site.register(Assignment, AssignmentAdmin)
