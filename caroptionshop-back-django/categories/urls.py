from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import CategoryMultipleDeleteView, CategoryRecursiveView, CategoryViewSet

router = SimpleRouter()
router.register("", CategoryViewSet, basename="category")
urlpatterns = router.urls
urlpatterns += [path("multiple-delete", CategoryMultipleDeleteView.as_view())]
urlpatterns += [path("recursive", CategoryRecursiveView.as_view())]
