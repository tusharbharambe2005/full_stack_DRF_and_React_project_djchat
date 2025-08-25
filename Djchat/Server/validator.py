from PIL import Image
from django.core.exceptions import ValidationError
import os
def validate_icon_image_size(image):
    if(image):
        with Image.open(image) as img:
            if img.width>70 or img.hight>70:
                raise ValidationError(
                    f"the your image size is maximum plesse upload the image size in 70X70 your imgae size is {img.size}"
                )
                
                
def valid_image_file_exstension(value):
    ext = os.path.splitext(value.name)[1]
    valid_extenstion = ['.jpg','.jpeg','.png','.gif']
    
    if not ext.lower() in valid_extenstion:
        raise ValidationError("unsupportaed file extenstion")