import fitz
from test_parse import find_question_blocks

doc = fitz.open("downloads/chemistry/january-2026/exam.pdf")
full_text = ""
for page in doc:
    full_text += page.get_text() + "\n"
doc.close()

blocks = find_question_blocks(full_text, max_q=85)
for q_num in range(51, 56):
    if q_num in blocks:
        print(f"\n--- Q{q_num} Block ---")
        print(blocks[q_num])
