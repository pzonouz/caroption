import uuid

from django.db import models
from django.db.models.fields.related import ForeignKey

from base.models import BaseModel


class Category(BaseModel):
    uuid = models.UUIDField(
        primary_key=False, default=uuid.uuid4, editable=False, unique=True
    )
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    status = models.BooleanField(default=True)
    image = models.ForeignKey(
        "files.File",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="categories",
    )
    parent = ForeignKey(
        "self",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="children",
    )

    class Meta:
        unique_together = [
            ["title", "parent"],
        ]
        verbose_name_plural = "categories"
