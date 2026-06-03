import fitz
import sys

def print_pdf_text(path):
    print(f"\n=== Text of {path} ===")
    try:
        doc = fitz.open(path)
        for i, page in enumerate(doc):
            print(f"--- Page {i+1} ---")
            print(page.get_text())
        doc.close()
    except Exception as e:
        print(f"Error reading {path}: {e}")

print_pdf_text("downloads/chemistry/january-2026/scoring_key.pdf")
