import uuid

from django.db import models

from base.models import BaseModel


class Slider(BaseModel):
    uuid = models.UUIDField(
        primary_key=False, default=uuid.uuid4, editable=False, unique=True
    )
    order = models.IntegerField(default=0)

    image = models.ForeignKey(
        "files.File",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="slides",
    )
