from django.template.response import HttpResponse
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from .models import Parameter, ParameterGroup
from .serializers import ParametersGroupsSerializer, ParametersSerializer


class ParametersGroupsViewset(ModelViewSet):
    queryset = ParameterGroup.objects.all()
    serializer_class = ParametersGroupsSerializer
    lookup_field = "uuid"


class ParametersGroupsMultipleDeleteView(APIView):
    def post(self, request, *args, **kwargs):
        ids = request.data
        print(ids)
        qs = ParameterGroup.objects.filter(uuid__in=ids)
        qs.delete()
        response = HttpResponse()
        return response


class ParametersViewset(ModelViewSet):
    queryset = Parameter.objects.all()
    serializer_class = ParametersSerializer
    lookup_field = "uuid"
