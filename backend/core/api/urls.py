from rest_framework.routers import DefaultRouter
from cloud.api.urls import image_router, object_detection_router
from django.urls import path, include

router = DefaultRouter()

# Images:
router.registry.extend(image_router.registry)

# Object Detection
router.registry.extend(object_detection_router.registry)

urlpatterns = [
    path('', include(router.urls))
]