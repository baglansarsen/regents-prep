import fitz

doc = fitz.open("downloads/chemistry/january-2026/exam.pdf")
print(f"Total pages: {len(doc)}")
# Let's print pages 2 and 3
for i in [1, 2]:
    print(f"--- Page {i+1} ---")
    print(doc[i].get_text())
doc.close()
