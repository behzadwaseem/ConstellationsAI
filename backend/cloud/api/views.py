import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from ..models import Image, Object_Detection
from .serializers import ImageSerializer, ObjectDetectionSerializer
from .object_detector.detection import Detect_Objects

class ImageViewSet(ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

# class ObjectDetectionViewSet(ModelViewSet):
#     print("Image Recieved")
#     queryset = Object_Detection.objects.all()
#     serializer_class = ObjectDetectionSerializer
#     image_url = serializer_class.validated_data['image_url']
#     response = requests.get(image_url)
#     print(f"RESPONSE: {response}")

#     def post(self, request):
#         print("request made")
#         image_url = request.data.get('image_url')

#         if not image_url:
#             return Response({"error": "No image URL provided"}, status=status.HTTP_400_BAD_REQUEST)
#         else:
#             print(f"Image: {image_url}")
#             return Response({"status": "GOOD!"}, status=status.HTTP_200_OK)

from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import ObjectDetectionSerializer
import requests

class ObjectDetectionViewSet(viewsets.ModelViewSet):
    queryset = Object_Detection.objects.all()
    serializer_class = ObjectDetectionSerializer

    def create(self, request, *args, **kwargs):
        print("Request received")

        # Create a serializer instance with the request data
        serializer = self.get_serializer(data=request.data)

        # Check if the data is valid
        if serializer.is_valid():
            # Get the validated image URL
            image_url = serializer.validated_data.get('image_url')
            objects = Detect_Objects(image_url)
            print(f"Image URL: {image_url}")
            print(f"OBJECTS: {objects}")
            print(f"REQUESTS: ", requests)

            try:
                # Fetch the image from the URL
                response = requests.get(image_url)
                if response.status_code == 200:
                    print("Image fetched successfully")
                    
                    return Response({"status": "Object detection completed"}, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "Unable to fetch image from URL"}, status=status.HTTP_400_BAD_REQUEST)

            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # If the serializer is not valid, return the errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

