from PIL import Image
import os

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
img_path = os.path.join(PROJECT_ROOT, "output", "images", "life-science", "june-2025", "context_1_5.png")

if os.path.exists(img_path):
    with Image.open(img_path) as im:
        print("Image dimensions:", im.size)
else:
    print("Image not found!")
