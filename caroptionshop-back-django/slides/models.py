import uuid

from base.models import BaseModel
from django.db import models


class Slides(BaseModel):
    uuid = models.UUIDField(
        primary_key=False, default=uuid.uuid4, editable=False, unique=True
    )
    order = models.IntegerField(default=0)
    link = models.TextField(null=True, blank=True)
    image = models.ForeignKey(
        "files.File",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="slides",
    )
