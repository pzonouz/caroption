from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import FileViewset

router = SimpleRouter()
router.register("", FileViewset)
urlpatterns = router.urls
