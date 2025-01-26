from products.models import Product
from rest_framework.serializers import ModelSerializer


class SearchSerializer(ModelSerializer):
    class Meta:
        model = Product
        exclude = ("id",)
