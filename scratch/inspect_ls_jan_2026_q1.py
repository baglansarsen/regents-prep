import fitz
import os
import re

pdf_path = "downloads/life-science/january-2026/exam.pdf"
doc = fitz.open(pdf_path)
print(f"Total pages: {len(doc)}")

# Find context text
full_text = ""
page_start_indices = []
for page_idx, page in enumerate(doc):
    page_start_indices.append(len(full_text))
    full_text += page.get_text() + "\n"

# Search for the context header "Base your answers to questions 1 through 5"
m = re.search(r'Base your answers to questions 1 through 5', full_text, re.IGNORECASE)
if m:
    char_idx = m.start()
    # Find page index
    for idx, start in enumerate(page_start_indices):
        if idx + 1 < len(page_start_indices):
            if start <= char_idx < page_start_indices[idx + 1]:
                p_idx = idx
                break
        else:
            p_idx = idx
    print(f"Context starts on Page {p_idx+1}")
    
    # Print blocks on this page
    print(f"--- Page {p_idx+1} Blocks ---")
    page = doc[p_idx]
    for b in page.get_text("blocks"):
        print(b)
        
    # Print drawings on this page
    print(f"--- Page {p_idx+1} Drawings ---")
    drawings = page.get_drawings()
    print(f"Total drawings: {len(drawings)}")
    for idx, d in enumerate(drawings[:10]):
         print(f"Drawing {idx}: rect={d['rect']}, type={d.get('type')}")
else:
    print("Context header not found.")
doc.close()
