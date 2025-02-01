from rest_framework.viewsets import ModelViewSet

from slider.models import Slider
from slider.serializers import SliderSerializer


class SliderViewset(ModelViewSet):
    queryset = Slider.objects.all().order_by("-order")
    serializer_class = SliderSerializer
    lookup_field = "uuid"
