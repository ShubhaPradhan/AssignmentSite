# Generated by Django 3.2.3 on 2022-02-03 11:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assignment',
            name='assignment_type',
            field=models.CharField(choices=[('assignment', 'assignment'), ('lab', 'lab')], default='assignment', max_length=20),
        ),
    ]
