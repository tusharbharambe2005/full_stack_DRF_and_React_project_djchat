from django.db import models
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.dispatch import receiver


def Channel_icon_uplpad_path(instance, filename):
    return f"Channel/{instance.id}/Channel_icon/{filename}"

def Channel_banner_upload_path(instance, filename):
    return f"Channel/{instance.id}/Channel_banner/{filename}"

def category_icon_upload_path(instance, filename):
    return f"category/{instance.id}/category_icon/{filename}"

class Category(models.Model):
    name = models.CharField(max_length=100)
    Server = models.TextField(null=True, blank=True)
    icon = models.FileField(upload_to=category_icon_upload_path, null=True, blank=True)
    
    # thye are used the updateing the file privios are deleted and new are replace that
    def save(self, *args, **kwargs):
        if self.id :
            existing = get_object_or_404(Category,id = self.id)
            if existing.icon != self.icon:
                existing.icon.delete(save = False)
        super(Category,self).save(*args, **kwargs)
    def __str__(self):
        return self.name
    
    # this are used to category are delete then the file also delete
    @receiver(models.signals.pre_delete, sender = 'Server.Category')
    def category_delete_files(sender, instance, **kwargs):
        for field in instance._meta.fields:
            if field.name == "icon":
                file = getattr(instance, field.name)
                if file:
                    file.delete(save=False)
    
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
    banner = models.ImageField(upload_to=Channel_banner_upload_path,null=True, blank=True)
    icon = models.ImageField(upload_to=Channel_icon_uplpad_path,null=True,blank=True)
    
    
    def save(self,*args, **kwargs):
        if self.id:
            existing = get_object_or_404(Channel, id = self.id) 
            if existing.icon != self.icon:
                existing.icon.delete(save=False)
        super(Channel,self).save(*args, **kwargs)
    
    @receiver(models.signals.pre_delete, sender = 'Server.Channel')
    def Channel_delete_files(sender, instance, *args, **kwargs):
        for field in instance._meta.fields:
            if field.name =="icon" or field.name == 'banner':
                file = getattr(instance, field.name)
                if file:
                    file.delete(save=False)
    def __str__(self):
        return self.name