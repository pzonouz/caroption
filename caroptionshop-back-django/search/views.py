from django.contrib.postgres.search import SearchQuery, SearchRank, SearchVector
from django.db.models import Q
from products.models import Product
from products.serializers import ProductSerializer
from rest_framework.decorators import api_view
from rest_framework.views import Response


@api_view(["GET"])
def FullTextSearch(request):
    query = request.GET.get("q")

    query = "|".join(query.split(" "))

    search_query = SearchQuery(query, search_type="raw", config="english")
    search_vector = SearchVector("title", weight="A", config="english") + SearchVector(
        "description", weight="B", config="english"
    )
    products = (
        Product.objects.filter(Q(title__icontains=query))
        .annotate(
            search=search_vector,
            rank=SearchRank(search_vector, search_query),
        )
        .order_by("-rank")
    )
    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)
