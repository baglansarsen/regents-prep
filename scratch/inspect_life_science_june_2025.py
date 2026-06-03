import fitz
import re

doc = fitz.open("downloads/life-science/june-2025/exam.pdf")
print("=== Page 7 ===")
for b in doc[7].get_text("blocks"):
    print(b)
print("=== Page 8 ===")
for b in doc[8].get_text("blocks"):
    print(b)
print("=== Page 9 ===")
for b in doc[9].get_text("blocks"):
    print(b)
doc.close()
