from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import ProductMultipleDeleteView, ProductViewSet

router = SimpleRouter()
router.register("", ProductViewSet)
urlpatterns = router.urls
urlpatterns += [path("multiple-delete", ProductMultipleDeleteView.as_view())]
