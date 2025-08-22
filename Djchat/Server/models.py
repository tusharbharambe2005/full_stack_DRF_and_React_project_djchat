from django.db import models
from django.conf import settings


class Category(models.Model):
    name = models.CharField(max_length=100)
    Server = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.name
    
class Server(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="server_owner")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="server_category")
    descriptions = models.CharField(max_length=250, null=True,blank=True)
    member = models.ManyToManyField(settings.AUTH_USER_MODEL)
    def __str__(self):
        return f"{self.name}-id={self.id}"
    
class Channel(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name="channel_owner")
    topic = models.CharField(max_length=150, blank=True, null=True)
    server = models.ForeignKey(Server,on_delete=models.CASCADE,related_name="channel_server")

    def __str__(self):
        return self.name