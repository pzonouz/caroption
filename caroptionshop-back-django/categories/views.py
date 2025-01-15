from django.template.response import HttpResponse
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from .models import Category
from .serializers import CategoryRecursiveSerializer, CategorySerializer


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.filter()
    serializer_class = CategorySerializer
    lookup_field = "uuid"


class CategoryRecursiveView(ListAPIView):
    queryset = Category.objects.filter(parent__isnull=True)
    serializer_class = CategoryRecursiveSerializer
    lookup_field = "uuid"


class CategoryMultipleDeleteView(APIView):

    def post(self, request, *args, **kwargs):
        ids = request.data
        qs = Category.objects.filter(uuid__in=ids)
        qs.delete()
        response = HttpResponse()
        return response
