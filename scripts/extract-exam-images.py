#!/usr/bin/env python3
"""
Download Regents exam PDFs from NYSED and extract diagram/graph images.
Uses spatial positioning: finds each question number in the PDF text,
then renders a page crop of the diagram that follows that question.

Usage:
  python3 scripts/extract-exam-images.py              # all exams
  python3 scripts/extract-exam-images.py le-june-2024 # one exam
  python3 scripts/extract-exam-images.py --verify-only
"""

import fitz  # PyMuPDF
import urllib.request
import os, sys, re, shutil

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_ROOT  = os.path.join(REPO_ROOT, 'public', 'images', 'exams')
PDF_CACHE = '/tmp/regents-pdfs'

BASE_ES = 'https://www.nysedregents.org/earthscience/'
BASE_LE = 'https://www.nysedregents.org/livingenvironment/'

EXAMS = {
    'es-june-2025':   [BASE_ES + '625/esci62025-exam.pdf'],
    'es-august-2024': [BASE_ES + '824/esci82024-examw.pdf'],
    'es-june-2024':   [BASE_ES + '624/esci62024-examw.pdf'],
    'es-august-2023': [BASE_ES + '823/esci82023-exam.pdf'],
    'es-june-2023':   [BASE_ES + '623/esci62023-examw.pdf'],
    'es-august-2022': [BASE_ES + '822/esci82022-exam.pdf'],
    'es-june-2022':   [BASE_ES + '622/esci62022-exam.pdf'],
    'es-august-2021': [BASE_ES + '621/esci-v202-exam.pdf'],
    'es-june-2021':   [BASE_ES + '621/esci-v202-exam.pdf'],
    'es-august-2019': [BASE_ES + '819/esci82019-examw.pdf'],
    'es-june-2019':   [BASE_ES + '619/esci62019-examw.pdf'],
    'le-june-2025':   [BASE_LE + '625/lenv-62025-exam.pdf'],
    'le-august-2024': [BASE_LE + '824/lenv-82024-examw.pdf'],
    'le-june-2024':   [BASE_LE + '624/lenv-62024-examw.pdf'],
    'le-august-2023': [BASE_LE + '823/lenv82023-examw.pdf'],
    'le-june-2023':   [BASE_LE + '623/lenv62023-examw.pdf'],
    'le-august-2022': [BASE_LE + '822/lenv82022-exam.pdf'],
    'le-june-2022':   [BASE_LE + '622/lenv62022-exam.pdf'],
    'le-august-2021': [BASE_LE + '621/lenv-v202-exam.pdf'],
    'le-june-2021':   [BASE_LE + '621/lenv-v202-exam.pdf'],
    'le-august-2019': [BASE_LE + '819/lenv82019-examw.pdf'],
    'le-june-2019':   [BASE_LE + '619/lenv62019-examw.pdf'],
}

PNG_SIG = bytes([137, 80, 78, 71, 13, 10, 26, 10])
SCALE   = 2.0   # render at 2× for sharpness


def verify_png(path):
    if not os.path.exists(path):
        return False
    if os.path.getsize(path) < 500:
        return False
    with open(path, 'rb') as f:
        return f.read(8) == PNG_SIG


def download_pdf(urls, dest):
    for url in urls:
        print(f'  Trying {url} ...')
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (compatible; regents-prep/1.0)'
        })
        try:
            with urllib.request.urlopen(req, timeout=60) as resp, open(dest, 'wb') as out:
                shutil.copyfileobj(resp, out)
            size = os.path.getsize(dest)
            if size < 10_000:
                os.remove(dest)
                continue
            print(f'  ✓ {size:,} bytes')
            return True
        except Exception as e:
            print(f'  ERR: {e}')
            if os.path.exists(dest):
                os.remove(dest)
    return False


def build_question_page_map(doc, question_numbers):
    """
    Returns {q_num: (page_idx, y_top, y_bottom)} where y_top is the y-coord
    of 'N.' on that page and y_bottom is the y-coord of the NEXT question
    (or end of page).  Uses PyMuPDF text search.
    """
    q_locations = {}  # q_num -> (page_idx, y_top)

    # Search each page for question number patterns like "9 " at left margin
    for page_idx in range(len(doc)):
        page  = doc[page_idx]
        words = page.get_text('words')   # [(x0,y0,x1,y1,word,block,line,word_idx), ...]

        for entry in words:
            x0, y0, x1, y1, word = entry[:5]
            # Question numbers appear as standalone digits near left margin (<120pt)
            if x0 > 120:
                continue
            clean = word.strip().rstrip('.')
            if not clean.isdigit():
                continue
            n = int(clean)
            if n in question_numbers and n not in q_locations:
                q_locations[n] = (page_idx, y0)

    if not q_locations:
        return {}

    # For each found question, find where the next question starts (same or next page)
    result = {}
    sorted_q = sorted(q_locations.keys())
    page_heights = [doc[i].rect.height for i in range(len(doc))]

    for i, q_num in enumerate(sorted_q):
        page_idx, y_top = q_locations[q_num]
        # y_bottom = top of next question on same page, or bottom of page
        if i + 1 < len(sorted_q):
            next_q = sorted_q[i + 1]
            next_page, next_y = q_locations[next_q]
            if next_page == page_idx:
                y_bottom = next_y
            else:
                y_bottom = page_heights[page_idx]
        else:
            y_bottom = page_heights[page_idx]
        result[q_num] = (page_idx, y_top, y_bottom)

    return result


def extract_crop(doc, page_idx, y_top, y_bottom, margin=6):
    """
    Render a horizontal strip of a PDF page between y_top and y_bottom.
    Returns PNG bytes or None if the strip is nearly blank.
    """
    page = doc[page_idx]
    pw   = page.rect.width
    # Add small margin above question number so we don't cut off the top
    clip = fitz.Rect(0, max(0, y_top - margin), pw, min(page.rect.height, y_bottom))

    mat  = fitz.Matrix(SCALE, SCALE)
    pix  = page.get_pixmap(matrix=mat, clip=clip, colorspace=fitz.csRGB)

    # If the strip is almost completely white, it's probably blank
    samples = pix.samples
    non_white = sum(1 for b in samples if b < 240)
    if non_white < len(samples) * 0.02:
        return None

    return pix.tobytes('png')


def find_visuals_in_strip(page, y_top, y_bottom):
    """Return list of visual element rects (images + drawings) within the y strip."""
    rects = []
    for img in page.get_images(full=True):
        xref = img[0]
        for r in page.get_image_rects(xref):
            if r.y0 >= y_top - 5 and r.y1 <= y_bottom + 20:
                rects.append(r)
    for path in page.get_drawings():
        r = path['rect']
        if r.y0 >= y_top - 5 and r.y1 <= y_bottom + 10 and r.width > 40 and r.height > 20:
            rects.append(r)
    return rects


def render_rects_or_strip(page, rects, y_top, y_bottom):
    """Render the union of rects, or fall back to the full strip."""
    pw = page.rect.width
    if rects:
        x0 = min(r.x0 for r in rects) - 4
        y0 = min(r.y0 for r in rects) - 4
        x1 = max(r.x1 for r in rects) + 4
        y1 = max(r.y1 for r in rects) + 4
        clip = fitz.Rect(max(0, x0), max(0, y0), min(pw, x1), min(page.rect.height, y1))
    else:
        clip = fitz.Rect(0, max(0, y_top - 6), pw, min(page.rect.height, y_bottom))
    mat = fitz.Matrix(SCALE, SCALE)
    pix = page.get_pixmap(matrix=mat, clip=clip, colorspace=fitz.csRGB)
    samples = pix.samples
    non_white = sum(1 for b in samples if b < 240)
    if non_white < len(samples) * 0.02:
        return None
    return pix.tobytes('png')


def find_diagram_in_strip(doc, page_idx, y_top, y_bottom):
    """
    Crop the diagram for a question. Checks for visual elements (images/drawings)
    within the strip. Returns None if strip is invalid, blank, or contains only text.
    """
    if y_bottom <= y_top + 10:
        return None
    page  = doc[page_idx]
    rects = find_visuals_in_strip(page, y_top, y_bottom)
    if not rects:
        # No visual elements found — signal caller to try above/elsewhere
        return None
    return render_rects_or_strip(page, rects, y_top, y_bottom)


def extract_images_for_questions(pdf_path, question_numbers):
    """
    Main extraction: find each question on its page, crop the diagram region.
    Returns {q_num: png_bytes}.
    """
    doc = fitz.open(pdf_path)
    location_map = build_question_page_map(doc, question_numbers)

    if not location_map:
        print('  WARNING: could not locate question numbers in PDF text')
        doc.close()
        return {}

    # Build prev_q_bottom map for stimulus-above layouts
    sorted_locs = sorted(location_map.items(), key=lambda x: (x[1][0], x[1][1]))
    prev_bottom = {}  # q_num -> y_bottom of prev question on same page (or 0)
    for i, (q_num, (page_idx, y_top, y_bottom)) in enumerate(sorted_locs):
        if i == 0:
            prev_bottom[q_num] = 0
        else:
            prev_q, (prev_page, _, prev_y_bot) = sorted_locs[i - 1]
            prev_bottom[q_num] = prev_y_bot if prev_page == page_idx else 0

    results = {}
    for q_num in sorted(question_numbers):
        if q_num not in location_map:
            print(f'  Q{q_num}: not found in PDF text')
            continue
        page_idx, y_top, y_bottom = location_map[q_num]
        strip_height = y_bottom - y_top
        print(f'  Q{q_num}: page {page_idx+1}, y={y_top:.0f}–{y_bottom:.0f} (h={strip_height:.0f}pt)')

        page = doc[page_idx]

        # 1st try: visual elements in strip below question number
        rects = find_visuals_in_strip(page, y_top, y_bottom)
        png   = render_rects_or_strip(page, rects, y_top, y_bottom) if rects else None

        # 2nd try: visual elements ABOVE question number (stimulus before question group)
        if not png:
            above_top = prev_bottom.get(q_num, 0)
            print(f'  Q{q_num}: nothing below — trying above y={above_top:.0f}–{y_top:.0f}')
            rects = find_visuals_in_strip(page, above_top, y_top)
            png   = render_rects_or_strip(page, rects, above_top, y_top) if rects else None

        # 3rd try: prev page (stimulus may be on the page before this question)
        if not png and page_idx > 0:
            print(f'  Q{q_num}: nothing on page {page_idx+1} — trying prev page')
            prev_page = doc[page_idx - 1]
            ph = prev_page.rect.height
            rects = find_visuals_in_strip(prev_page, 0, ph)
            if rects:
                png = render_rects_or_strip(prev_page, rects, 0, ph)

        if png:
            results[q_num] = png
        else:
            print(f'  Q{q_num}: no diagram found on page — skipping')

    doc.close()
    return results


def read_image_question_numbers(exam_id):
    subject      = 'earth-science' if exam_id.startswith('es-') else 'living-environment'
    session_year = exam_id[3:]
    js_path = os.path.join(REPO_ROOT, 'shared', 'content', 'regents-exams', subject, f'{session_year}.js')
    if not os.path.exists(js_path):
        return []
    content = open(js_path).read()
    return [int(n) for n in re.findall(r"image:\s*'/images/exams/[^/]+/q(\d+)\.png'", content)]


VISUAL_RE = re.compile(
    r'(A (graph|chart|diagram|table|map|data table|bar graph|line graph|photograph|cross section|block diagram|contour map|seismogram|station model)|'
    r'The (graph|chart|diagram|table|map)|'
    r'Based on the (graph|chart|diagram|table|data)|'
    r'Which (graph|chart|diagram))',
    re.IGNORECASE
)


def detect_image_candidates(exam_id):
    subject      = 'earth-science' if exam_id.startswith('es-') else 'living-environment'
    session_year = exam_id[3:]
    js_path = os.path.join(REPO_ROOT, 'shared', 'content', 'regents-exams', subject, f'{session_year}.js')
    if not os.path.exists(js_path):
        return []
    content = open(js_path).read()
    needs = []
    for block in re.split(r'\{\s*\n\s*number:', content)[1:]:
        num_m = re.match(r'\s*(\d+)', block)
        if not num_m or 'image:' in block:
            continue
        q_num = int(num_m.group(1))
        text_m = re.search(r"text:\s*'([^']+)'", block) or re.search(r'text:\s*`([^`]+)`', block)
        if text_m and VISUAL_RE.search(text_m.group(1)):
            needs.append(q_num)
    return needs


def add_image_fields_to_js(exam_id, q_nums):
    subject      = 'earth-science' if exam_id.startswith('es-') else 'living-environment'
    session_year = exam_id[3:]
    js_path = os.path.join(REPO_ROOT, 'shared', 'content', 'regents-exams', subject, f'{session_year}.js')
    content = open(js_path).read()
    changed = False
    for q_num in sorted(q_nums):
        img_path = f'/images/exams/{exam_id}/q{q_num}.png'
        pattern  = re.compile(r'(number:\s*' + str(q_num) + r'\b.*?correct:\s*\d+)', re.DOTALL)
        def replacer(m):
            return m.group(1) + f",\n      image: '{img_path}'"
        new_content = pattern.sub(replacer, content, count=1)
        if new_content != content:
            content  = new_content
            changed  = True
            print(f'  Added image: field → q{q_num}')
    if changed:
        open(js_path, 'w').write(content)


def process_exam(exam_id, force=False):
    print(f'\n=== {exam_id} ===')
    os.makedirs(PDF_CACHE, exist_ok=True)
    out_dir = os.path.join(OUT_ROOT, exam_id)
    os.makedirs(out_dir, exist_ok=True)

    existing_q   = read_image_question_numbers(exam_id)
    candidate_q  = detect_image_candidates(exam_id)
    all_needed   = sorted(set(existing_q + candidate_q))

    if not all_needed:
        print('  No image questions — skipping')
        return

    # Re-extract all if forced, otherwise only missing
    if force:
        missing = all_needed
    else:
        missing = [n for n in all_needed if not verify_png(os.path.join(out_dir, f'q{n}.png'))]

    if not missing:
        print(f'  All {len(all_needed)} images already present and valid ✓')
        return

    print(f'  Need images for: {all_needed}')
    print(f'  Will extract: {missing}')

    pdf_path = os.path.join(PDF_CACHE, f'{exam_id}.pdf')
    if not os.path.exists(pdf_path):
        if not download_pdf(EXAMS[exam_id], pdf_path):
            print(f'  Cannot download PDF — skipping')
            return

    extracted = extract_images_for_questions(pdf_path, missing)

    saved, new_q = 0, []
    for q_num, png_bytes in extracted.items():
        dest = os.path.join(out_dir, f'q{q_num}.png')
        with open(dest, 'wb') as f:
            f.write(png_bytes)
        if verify_png(dest):
            kb = len(png_bytes) // 1024
            print(f'  ✓ q{q_num}.png  ({kb} KB)')
            saved += 1
            if q_num in candidate_q:
                new_q.append(q_num)
        else:
            print(f'  ✗ q{q_num}.png FAILED — removing')
            os.remove(dest)

    if new_q:
        add_image_fields_to_js(exam_id, new_q)

    print(f'  Saved {saved}/{len(missing)} images')


def verify_all():
    print('Verifying all existing exam images...\n')
    bad = ok = 0
    for exam_dir in sorted(os.listdir(OUT_ROOT)):
        dir_path = os.path.join(OUT_ROOT, exam_dir)
        if not os.path.isdir(dir_path):
            continue
        for fname in sorted(os.listdir(dir_path)):
            if not fname.endswith('.png'):
                continue
            fp = os.path.join(dir_path, fname)
            if verify_png(fp):
                ok += 1
            else:
                print(f'  BAD: {exam_dir}/{fname}  ({os.path.getsize(fp)} bytes)')
                bad += 1
    print(f'\n{"✓" if bad == 0 else "✗"} {ok} valid, {bad} bad')
    return bad == 0


if __name__ == '__main__':
    args  = sys.argv[1:]
    force = '--force' in args

    if '--verify-only' in args:
        sys.exit(0 if verify_all() else 1)

    targets = [a for a in args if not a.startswith('--')]
    if targets:
        for exam_id in targets:
            if exam_id not in EXAMS:
                print(f'Unknown: {exam_id}\nAvailable: {", ".join(sorted(EXAMS))}')
                sys.exit(1)
            process_exam(exam_id, force=force)
    else:
        for exam_id in sorted(EXAMS):
            process_exam(exam_id, force=force)

    print('\nDone. Run: node scripts/verify-images.cjs')
