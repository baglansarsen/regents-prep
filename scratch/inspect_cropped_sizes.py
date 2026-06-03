import os
from PIL import Image

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMAGES_DIR = os.path.join(PROJECT_ROOT, "output", "images")

anomalies = []
total_images = 0

if os.path.exists(IMAGES_DIR):
    for root, dirs, files in os.walk(IMAGES_DIR):
        for f in files:
            if f.endswith('.png'):
                total_images += 1
                img_path = os.path.join(root, f)
                try:
                    with Image.open(img_path) as img:
                        w, h = img.size
                        # Check for anomalies
                        # 1. Tiny images (less than 20px)
                        if w < 20 or h < 20:
                            anomalies.append((img_path, w, h, "tiny"))
                        # 2. Too tall or too wide
                        elif w > 1200 or h > 1600:
                            anomalies.append((img_path, w, h, "huge"))
                        # 3. Ratio anomalies
                        ratio = w / h
                        if ratio > 8 or ratio < 0.125:
                            anomalies.append((img_path, w, h, f"extreme_ratio ({ratio:.2f})"))
                except Exception as e:
                    anomalies.append((img_path, 0, 0, f"error: {e}"))

print(f"Total cropped images inspected: {total_images}")
print(f"Total anomalies found: {len(anomalies)}")
for path, w, h, reason in anomalies[:50]:
    rel_path = os.path.relpath(path, IMAGES_DIR)
    print(f"  {rel_path}: {w}x{h} ({reason})")
