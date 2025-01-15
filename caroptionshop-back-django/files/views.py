from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import File
from .serializers import FileSerializer


class FileViewset(ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    lookup_field = "uuid"

    def create(self, request, *args, **kwargs):
        request.data["title"] = request.data["file"].name
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )
