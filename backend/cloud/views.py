from django.shortcuts import render
import json

def store_images(request):
    """
    Recieves id and url of images uploaded to cloudinary from the frontend.
    Stores this information in the db.
    """

    if request.method == "POST":
        body = request.body.decode('utf-8')
        data = json.loads(body)
        