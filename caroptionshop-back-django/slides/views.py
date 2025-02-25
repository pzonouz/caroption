from rest_framework.viewsets import ModelViewSet
from slides.models import Slides
from slides.serializers import SlidesSerializer


class SlidesViewset(ModelViewSet):
    queryset = Slides.objects.all().order_by("-order")
    serializer_class = SlidesSerializer
    lookup_field = "uuid"
