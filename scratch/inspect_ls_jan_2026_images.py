import fitz

pdf_path = "downloads/life-science/january-2026/exam.pdf"
doc = fitz.open(pdf_path)
page = doc[1] # Page 2 (0-indexed 1)
print(f"Page 2 size: {page.rect}")

images = page.get_images(full=True)
print(f"Total images on Page 2: {len(images)}")
for idx, img in enumerate(images):
    xref = img[0]
    rects = page.get_image_rects(xref)
    print(f"Image {idx} (xref={xref}): rects={rects}")
doc.close()
