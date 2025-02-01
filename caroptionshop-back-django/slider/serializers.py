from rest_framework import serializers

from slider.models import Slider


class SliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slider
        exclude = ["id"]
