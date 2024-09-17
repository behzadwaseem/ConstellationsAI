from django.db import models

# Create your models here.

class Image(models.Model):
    # make all of these required
    position = models.IntegerField()
    image_id = models.CharField(max_length=200)
    image_url = models.URLField(max_length=200)

    def __str__(self):
        return f"Image #{self.position}, ID: {self.image_id} URL: {self.image_url}"
    

class Object_Detection(models.Model):
    image_url = image_url = models.URLField(max_length=200)
