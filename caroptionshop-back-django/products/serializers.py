from categories.models import Category
from files.models import File
from products.models import Product
from rest_framework import serializers
from specifications.serializers import SpecificationSerializer


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(
        slug_field="uuid",
        queryset=Category.objects.all(),
        allow_null=True,
        required=False,
    )
    image = serializers.SlugRelatedField(
        slug_field="title",
        queryset=File.objects.all(),
    )
    images = serializers.SlugRelatedField(
        many=True,
        slug_field="uuid",
        queryset=File.objects.all(),
        allow_null=True,
        required=False,
    )
    specifications = SpecificationSerializer(many=True, required=False, allow_null=True)

    class Meta:
        model = Product
        exclude = [
            "id",
        ]
