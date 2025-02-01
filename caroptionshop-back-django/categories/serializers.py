from files.models import File
from parameters.serializers import ParametersGroupsSerializer
from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField

from .models import Category


class CategoryRecursiveSerializer(serializers.ModelSerializer):
    image = serializers.SlugRelatedField(
        slug_field="uuid", allow_null=True, queryset=File.objects.all()
    )
    parent = serializers.SlugRelatedField(
        slug_field="title", allow_null=True, queryset=Category.objects.all()
    )
    children = RecursiveField(many=True, read_only=True, allow_null=True)

    class Meta:
        model = Category
        exclude = [
            "id",
        ]


class CategorySerializer(serializers.ModelSerializer):
    parameter_groups = ParametersGroupsSerializer(
        many=True, allow_null=True, required=False
    )
    image = serializers.SlugRelatedField(
        slug_field="uuid", allow_null=True, queryset=File.objects.all()
    )
    parent = serializers.SlugRelatedField(
        slug_field="title", allow_null=True, queryset=Category.objects.all()
    )

    class Meta:
        model = Category
        fields = [
            "uuid",
            "title",
            "description",
            "order",
            "image",
            "parent",
            "status",
            "parameter_groups",
            "created_at",
            "updated_at",
        ]
