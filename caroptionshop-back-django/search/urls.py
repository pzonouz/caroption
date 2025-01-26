from django.urls import path
from search.views import FullTextSearch

urlpatterns = [path("/", FullTextSearch)]
