from parameters.models import Parameter
from products.models import Product
from rest_framework import serializers

from .models import Specification


class SpecificationSerializer(serializers.ModelSerializer):
    parameter = serializers.SlugRelatedField(
        slug_field="uuid", queryset=Parameter.objects.all()
    )
    product = serializers.SlugRelatedField(
        slug_field="uuid", queryset=Product.objects.all()
    )

    class Meta:
        model = Specification
        fields = ("uuid", "parameter", "product", "value", "created_at", "updated_at")
