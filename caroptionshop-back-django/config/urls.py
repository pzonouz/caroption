from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from parameters.views import ParametersGroupsViewset, ParametersViewset
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("api/v1/parameters/groups", ParametersGroupsViewset)
router.register("api/v1/parameters", ParametersViewset)
urlpatterns = [
    path("admin", admin.site.urls),
    path("api/v1/categories/", include("categories.urls")),
    path("api/v1/products/", include("products.urls")),
    path("api/v1/files/", include("files.urls")),
    path("api/v1/specifications/", include("specifications.urls")),
    path("api/v1/search", include("search.urls")),
    path("api/v1/slides/", include("slides.urls")),
]
urlpatterns += router.urls
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
