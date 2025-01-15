from django.contrib.postgres.fields import ArrayField
from django.db.models.deletion import models

from base.models import BaseModel
from categories.models import Category


class ParameterGroup(BaseModel):
    title = models.CharField(max_length=255, unique=True)
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="parameter_groups",
    )


class Parameter(BaseModel):
    class ParameterType(models.TextChoices):
        TEXTFILED = "TF", ("TEXTFIELD")
        BOOLFIELD = "BF", ("BOOLFIELD")
        SELECTONE = "SO", ("SELECTONE")
        SELECTMORE = "SM", ("SELECTMORE")

    group = models.ForeignKey(
        ParameterGroup,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="parameters",
    )
    title = models.CharField(max_length=255)
    parameter_type = models.CharField(choices=ParameterType.choices)
    text = models.TextField(null=True, blank=True)
    boolean = models.BooleanField(null=True, blank=True)
    value = models.CharField(max_length=255, null=True, blank=True)
    values = models.CharField(max_length=255, null=True, blank=True)
