from base.models import BaseModel
from django.db import models
from parameters.models import Parameter
from products.models import Product


class Specification(BaseModel):
    parameter = models.ForeignKey(
        Parameter, on_delete=models.CASCADE, related_name="specifications"
    )
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="specifications"
    )
    value = models.TextField(default="")

    class Meta:
        unique_together = ("parameter", "product")
