from files.models import File
from rest_framework import serializers
from slides.models import Slides


class SlidesSerializer(serializers.ModelSerializer):
    image = serializers.SlugRelatedField(
        slug_field="uuid", allow_null=True, queryset=File.objects.all()
    )

    class Meta:
        model = Slides
        exclude = ["id"]
