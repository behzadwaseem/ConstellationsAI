from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ImageViewSet, ObjectDetectionViewSet

image_router = DefaultRouter()
image_router.register(r'images', ImageViewSet)

object_detection_router = DefaultRouter()
object_detection_router.register(r'object_detection', ObjectDetectionViewSet, basename="ObjectDetection")