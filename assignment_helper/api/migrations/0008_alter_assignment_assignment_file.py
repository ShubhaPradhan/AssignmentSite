# Generated by Django 4.0.3 on 2022-03-08 14:45

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_assignment_assignment_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assignment',
            name='assignment_file',
            field=models.ImageField(default='', upload_to=api.models.upload_to, verbose_name='Image'),
        ),
    ]