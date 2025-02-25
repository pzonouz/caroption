from rest_framework.routers import SimpleRouter

from .views import SlidesViewset

router = SimpleRouter()
router.register("", SlidesViewset, basename="slides")
urlpatterns = router.urls
