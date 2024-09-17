from rest_framework.serializers import ModelSerializer
from ..models import Image, Object_Detection

class ImageSerializer(ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'position', 'image_id', 'image_url')


class ObjectDetectionSerializer(ModelSerializer):
    class Meta:
        model = Object_Detection
        fields = ('image_url',)