from rest_framework.viewsets import ModelViewSet
from specifications.models import Specification
from specifications.serializers import SpecificationSerializer


class SpecificationViewSet(ModelViewSet):
    queryset = Specification.objects.all()
    serializer_class = SpecificationSerializer
    lookup_field = "uuid"
