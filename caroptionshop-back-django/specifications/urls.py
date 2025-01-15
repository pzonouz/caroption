from rest_framework.routers import SimpleRouter

from .views import SpecificationViewSet

router = SimpleRouter()
router.register("", SpecificationViewSet)
urlpatterns = router.urls
