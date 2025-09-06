
from PIL import Image, UnidentifiedImageError
from django.core.exceptions import ValidationError
import os

def validate_icon_image_size(image):
    if image:
        ext = os.path.splitext(image.name)[1].lower()
        
        if ext == ".svg":
            # ✅ Skip Pillow validation for SVGs (can't check pixel size)
            return
        
        try:
            with Image.open(image) as img:
                if img.width > 300 or img.height > 300:
                    raise ValidationError(
                        f"Your image is too large. Maximum allowed size is 70x70. "
                        f"Uploaded size: {img.size}"
                    )
        except UnidentifiedImageError:
            raise ValidationError("Invalid image file. Please upload a valid JPG, PNG, GIF, or SVG.")


def valid_image_file_exstension(value):
    ext = os.path.splitext(value.name)[1].lower()
    valid_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg']
    
    if ext not in valid_extensions:
        raise ValidationError("Unsupported file extension. Allowed: .jpg, .jpeg, .png, .gif, .svg")
