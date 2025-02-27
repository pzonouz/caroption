# Generated by Django 5.1.3 on 2025-02-08 13:56

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('categories', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ParameterGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=255, unique=True)),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='parameter_groups', to='categories.category')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Parameter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=255)),
                ('parameter_type', models.CharField(choices=[('TF', 'TEXTFIELD'), ('BF', 'BOOLFIELD'), ('SO', 'SELECTONE'), ('SM', 'SELECTMORE')])),
                ('text', models.TextField(blank=True, null=True)),
                ('boolean', models.BooleanField(blank=True, null=True)),
                ('value', models.CharField(blank=True, max_length=255, null=True)),
                ('values', models.CharField(blank=True, max_length=255, null=True)),
                ('group', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='parameters', to='parameters.parametergroup')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
