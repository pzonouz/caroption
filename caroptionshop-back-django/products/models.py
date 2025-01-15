from uuid import uuid4

from base.models import BaseModel
from django.core.validators import MaxValueValidator
from rest_framework.serializers import models


class Product(BaseModel):
    # code = models.PositiveIntegerField(
    #     primary_key=False, default=uuid4().int % 10000000, editable=False, unique=True
    # )
    title = models.CharField(max_length=255, unique=True)
    subtitle = models.CharField(max_length=255, unique=True, null=True, blank=True)
    category = models.ForeignKey(
        "categories.Category",
        on_delete=models.PROTECT,
        related_name="products",
        to_field="uuid",
    )
    image = models.ForeignKey(
        "files.File",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="products",
    )
    images = models.ManyToManyField("files.File", blank=True)
    weight = models.PositiveIntegerField()
    status = models.BooleanField(default=True)
    quantity = models.PositiveIntegerField()
    price = models.PositiveIntegerField()
    price2 = models.PositiveIntegerField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    cons = models.TextField(null=True, blank=True)
    pros = models.TextField(null=True, blank=True)
    discount = models.PositiveIntegerField(
        null=True, blank=True, validators=[MaxValueValidator(100)]
    )
    review = models.TextField(null=True, blank=True)
