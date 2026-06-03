import fitz
import re

def extract_question_and_choices(q_block):
    choice_matches = list(re.finditer(r'\(([1-4])\)', q_block))
    if len(choice_matches) < 4:
        return q_block.strip(), [], "written"
        
    choice_matches.sort(key=lambda m: m.start())
    q_text = q_block[:choice_matches[0].start()].strip()
    
    choices = [None] * 4
    for i, match in enumerate(choice_matches):
        choice_num = int(match.group(1)) - 1
        start_idx = match.end()
        end_idx = choice_matches[i+1].start() if i + 1 < len(choice_matches) else len(q_block)
        
        choice_text = q_block[start_idx:end_idx].strip()
        choice_text = re.sub(r'\s+', ' ', choice_text)
        choices[choice_num] = choice_text
        
    q_text = re.sub(r'\s+', ' ', q_text)
    q_text = re.sub(r'^\s*\d+\s+', '', q_text)
    return q_text, choices, "multiple-choice"

def find_question_blocks(text, max_q=85):
    q_positions = {}
    current_search_idx = 0
    
    for q_num in range(1, max_q + 1):
        pattern = re.compile(rf'(?:\n|^)\s*({q_num})\s+([A-Z]|["\'`\(]|[a-z]{{2,}})')
        match = pattern.search(text, current_search_idx)
        if match:
            q_positions[q_num] = match.start()
            current_search_idx = match.end()
        else:
            pattern_loose = re.compile(rf'(?:\n|^)\s*({q_num})\s+')
            match_loose = pattern_loose.search(text, current_search_idx)
            if match_loose:
                q_positions[q_num] = match_loose.start()
                current_search_idx = match_loose.end()
                
    sorted_qs = sorted(q_positions.keys())
    blocks = {}
    for i, q_num in enumerate(sorted_qs):
        start = q_positions[q_num]
        end = q_positions[sorted_qs[i+1]] if i + 1 < len(sorted_qs) else len(text)
        blocks[q_num] = text[start:end].strip()
        
    return blocks

# Let's run it
doc = fitz.open("downloads/chemistry/january-2026/exam.pdf")
full_text = ""
for page in doc:
    full_text += page.get_text() + "\n"
doc.close()

print(f"Total characters in exam text: {len(full_text)}")
blocks = find_question_blocks(full_text, max_q=85)
print(f"Parsed {len(blocks)} question blocks.")

# Let's inspect the first 3
for q_num in range(1, 4):
    if q_num in blocks:
        print(f"\n--- Q{q_num} Block ---")
        print(blocks[q_num][:300])
        q_text, choices, q_type = extract_question_and_choices(blocks[q_num])
        print(f"Type: {q_type}")
        print(f"Text: {q_text}")
        print(f"Choices: {choices}")
