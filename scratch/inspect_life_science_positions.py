import fitz
import re

doc = fitz.open("downloads/life-science/june-2025/exam.pdf")
print("=== Page 21 blocks ===")
for b in doc[21].get_text("blocks"):
    print(b)
print("=== Page 22 blocks ===")
for b in doc[22].get_text("blocks"):
    print(b)
doc.close()
