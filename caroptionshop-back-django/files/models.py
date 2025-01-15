from uuid import uuid4

from django.db import models

from base.models import BaseModel


class File(BaseModel):

    def get_image_name(self, filename):
        return "{}.{}".format(uuid4().hex, filename.split(".")[1])

    title = models.CharField(max_length=255, blank=True, null=True, unique=True)
    file = models.FileField(upload_to=get_image_name)
