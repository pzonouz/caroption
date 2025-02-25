from django.http import HttpResponse
from products.models import Product
from products.serializers import ProductSerializer
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "uuid"


class ProductMultipleDeleteView(APIView):

    def post(self, request, *args, **kwargs):
        ids = request.data
        print(list(Product.objects.all()))
        qs = Product.objects.filter(uuid__in=ids)
        print(ids)
        print(qs)
        qs.delete()
        response = HttpResponse()
        return response
