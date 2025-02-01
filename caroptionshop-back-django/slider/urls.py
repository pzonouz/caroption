from rest_framework.routers import SimpleRouter

from .views import SliderViewset

router = SimpleRouter()
router.register("", SliderViewset, basename="slider")
urlpatterns = router.urls
