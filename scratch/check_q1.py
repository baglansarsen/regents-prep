import fitz
import re

doc = fitz.open('downloads/algebra-2/january-2018/exam.pdf')
page = doc[1]
blocks = page.get_text('blocks')

old_pattern = re.compile(r'^(\d+)(?:\s*(?:through|and|to|–|-|,)\s*(\d+))?\s+([A-Z]|["\'`\(\u201c\u201d]|[a-z]{2,})')
new_pattern = re.compile(r'^(\d+)(?:\s*(?:through|and|to|–|-|,)\s*(\d+))?\s+([A-Z]|["\'`\(\u201c\u201d\u2018\u2019])')

for b in blocks:
    text = b[4].strip()
    if '1 The operator' in text:
        print("Text:")
        print(repr(text))
        print("Old match:", bool(old_pattern.match(text)))
        print("New match:", bool(new_pattern.match(text)))
