import fitz

doc = fitz.open("downloads/chemistry/january-2026/exam.pdf")
page = doc[7]
print(f"=== Page 7 ===")
print(f"Page size: {page.rect.width}x{page.rect.height}")
print(f"Images count: {len(page.get_images())}")
print(f"Drawings count: {len(page.get_drawings())}")

# Let's inspect the text around page 7
print("\n=== Text on Page 7 ===")
print(page.get_text()[:500])

# Let's see some drawings
drawings = page.get_drawings()
for i, d in enumerate(drawings[:10]):
    print(f"Drawing {i}: rect={d['rect']}, type={d['type']}")
    
doc.close()
