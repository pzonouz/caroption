from categories.models import Category
from rest_framework import serializers
from specifications.serializers import SpecificationSerializer

from .models import Parameter, ParameterGroup


class ParametersSerializer(serializers.ModelSerializer):
    group = serializers.SlugRelatedField(
        slug_field="uuid",
        required=False,
        allow_null=True,
        queryset=ParameterGroup.objects.all(),
    )
    specifications = SpecificationSerializer(many=True, allow_null=True, required=False)

    class Meta:
        model = Parameter
        fields = (
            "uuid",
            "group",
            "title",
            "parameter_type",
            "values",
            "specifications",
        )


class ParametersGroupsSerializer(serializers.ModelSerializer):
    parameters = ParametersSerializer(many=True, allow_null=True, required=False)
    category = serializers.SlugRelatedField(
        slug_field="uuid",
        required=False,
        allow_null=True,
        queryset=Category.objects.all(),
    )

    class Meta:
        model = ParameterGroup
        fields = ("uuid", "title", "category", "parameters", "created_at", "updated_at")
