import fitz
import os
import re

import sys
sys.path.append(os.path.abspath("scripts"))
from regents_parser import get_question_positions_blocks, find_question_blocks

pdf_path = "downloads/life-science/january-2026/exam.pdf"
doc = fitz.open(pdf_path)

# Extract full text
full_text = ""
page_start_indices = []
for page_idx, page in enumerate(doc):
    page_start_indices.append(len(full_text))
    full_text += page.get_text() + "\n"
    
def get_page_index(char_idx):
    for idx, start in enumerate(page_start_indices):
        if idx + 1 < len(page_start_indices):
            if start <= char_idx < page_start_indices[idx + 1]:
                return idx
        else:
            if start <= char_idx:
                return idx
    return 0

# Find all contexts
contexts = []
context_pattern = re.compile(
    r'(Base your answers? to questions?\s+(\d+)(?:\s*(?:through|and|to|–|-|,)\s*(\d+))?\s+on\s+)',
    re.IGNORECASE
)

matches = list(context_pattern.finditer(full_text))
print(f"Total context matches found in full_text: {len(matches)}")
for idx, match in enumerate(matches):
    q_start = int(match.group(2))
    q_end = int(match.group(3)) if match.group(3) else q_start
    print(f"Match {idx}: q_start={q_start}, q_end={q_end}, text={repr(match.group(0))}")

doc.close()
