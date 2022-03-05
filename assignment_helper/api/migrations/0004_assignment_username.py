# Generated by Django 4.0.2 on 2022-03-05 14:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_assignment_subject'),
    ]

    operations = [
        migrations.AddField(
            model_name='assignment',
            name='username',
            field=models.CharField(default=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL), max_length=255),
        ),
    ]