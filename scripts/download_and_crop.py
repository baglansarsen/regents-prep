#!/usr/bin/env python3
"""
Download NYS Regents exam PDFs from nysedregents.org, render each page,
find question images, crop and save to public/images/exams/.
"""

import os, re, sys, json, urllib.request, shutil, time
import fitz  # PyMuPDF
from PIL import Image
import io

EXAM_DIR   = "/Users/baglansarsen/regents-prep/mobile/src/content/regents-exams"
PUBLIC_DIR = "/Users/baglansarsen/regents-prep/public/images/exams"
PDF_CACHE  = "/Users/baglansarsen/regents-prep/scripts/pdf_cache"
BASE       = "https://www.nysedregents.org"

os.makedirs(PDF_CACHE, exist_ok=True)

# ─── URL map for every exam we need ──────────────────────────────────────────
# Format: (subject_folder, image_folder) → pdf_path
PDF_URLS = {
    # ── ALGEBRA 1 ──
    "algebra-1/august-2019":   "/algebraone/819/algone82019-exam.pdf",
    "algebra-1/august-2022":   "/algebraone/822/algone82022-exam.pdf",
    "algebra-1/august-2023":   "/algebraone/823/algone82023-exam.pdf",
    "algebra-1/august-2024":   "/algebraone/824/algone82024-exam.pdf",
    "algebra-1/august-2025":   "/algebraone/825/algone-82025-exam.pdf",
    "algebra-1/january-2020":  "/algebraone/120/algone12020-exam.pdf",
    "algebra-1/january-2023":  "/algebraone/123/algone12023-exam.pdf",
    "algebra-1/january-2024":  "/algebraone/124/algone12024-exam.pdf",
    "algebra-1/january-2025":  "/algebraone/125/algone-12025-exam.pdf",
    "algebra-1/january-2026":  "/algebraone/126/algone-12026-exam.pdf",
    "algebra-1/june-2019":     "/algebraone/619/algone62019-exam.pdf",
    "algebra-1/june-2021":     "/algebraone/621/algone-v202-exam.pdf",
    "algebra-1/june-2022":     "/algebraone/622/algone62022-exam.pdf",
    "algebra-1/june-2023":     "/algebraone/623/algone62023-exam.pdf",
    "algebra-1/june-2024":     "/algebraone/624/algone62024-exam.pdf",
    "algebra-1/june-2025":     "/algebraone/625/algone-62025-exam.pdf",
    # ── ALGEBRA 2 ──
    "algebra-2/august-2019":   "/algebratwo/819/algtwo82019-exam.pdf",
    "algebra-2/august-2022":   "/algebratwo/822/algtwo82022-exam.pdf",
    "algebra-2/august-2023":   "/algebratwo/823/algtwo82023-exam.pdf",
    "algebra-2/august-2024":   "/algebratwo/824/algtwo82024-exam.pdf",
    "algebra-2/august-2025":   "/algebratwo/825/algtwo-82025-exam.pdf",
    "algebra-2/january-2020":  "/algebratwo/120/algtwo12020-exam.pdf",
    "algebra-2/january-2023":  "/algebratwo/123/algtwo12023-exam.pdf",
    "algebra-2/january-2024":  "/algebratwo/124/algtwo12024-exam.pdf",
    "algebra-2/january-2025":  "/algebratwo/125/algtwo-12025-exam.pdf",
    "algebra-2/january-2026":  "/algebratwo/126/algtwo-12026-exam.pdf",
    "algebra-2/june-2019":     "/algebratwo/619/algtwo62019-exam.pdf",
    "algebra-2/june-2022":     "/algebratwo/622/algtwo62022-exam.pdf",
    "algebra-2/june-2023":     "/algebratwo/623/algtwo62023-exam.pdf",
    "algebra-2/june-2024":     "/algebratwo/624/algtwo62024-exam.pdf",
    "algebra-2/june-2025":     "/algebratwo/625/algtwo-62025-exam.pdf",
    # ── GEOMETRY ──
    "geometry/august-2019":    "/geometryre/819/geom82019-exam.pdf",
    "geometry/august-2022":    "/geometryre/822/geom82022-exam.pdf",
    "geometry/august-2023":    "/geometryre/823/geom82023-exam.pdf",
    "geometry/august-2024":    "/geometryre/824/geom-82024-exam.pdf",
    "geometry/august-2025":    "/geometryre/825/geom-82025-exam.pdf",
    "geometry/january-2020":   "/geometryre/120/geom12020-exam.pdf",
    "geometry/january-2023":   "/geometryre/123/geom12023-exam.pdf",
    "geometry/january-2024":   "/geometryre/124/geom12024-exam.pdf",
    "geometry/january-2025":   "/geometryre/125/geom-12025-exam.pdf",
    "geometry/january-2026":   "/geometryre/126/geom-12026-exam.pdf",
    "geometry/june-2019":      "/geometryre/619/geom62019-exam.pdf",
    "geometry/june-2022":      "/geometryre/622/geom62022-exam.pdf",
    "geometry/june-2023":      "/geometryre/623/geom62023-exam.pdf",
    "geometry/june-2024":      "/geometryre/624/geom62024-exam.pdf",
    "geometry/june-2025":      "/geometryre/625/geom-62025-exam.pdf",
    # ── CHEMISTRY ──
    "chemistry/august-2016":   "/chemistry/816/chem82016-exam.pdf",
    "chemistry/august-2017":   "/chemistry/817/chem82017-exam.pdf",
    "chemistry/august-2018":   "/chemistry/818/chem82018-exam.pdf",
    "chemistry/august-2019":   "/chemistry/819/chem82019-exam.pdf",
    "chemistry/august-2022":   "/chemistry/822/chem82022-exam.pdf",
    "chemistry/august-2023":   "/chemistry/823/chem82023-exam.pdf",
    "chemistry/august-2024":   "/chemistry/824/chem82024-exam.pdf",
    "chemistry/august-2025":   "/chemistry/825/chem-82025-exam.pdf",
    "chemistry/january-2017":  "/chemistry/117/chem12017-exam.pdf",
    "chemistry/january-2018":  "/chemistry/118/chem12018-exam.pdf",
    "chemistry/january-2020":  "/chemistry/120/chem12020-exam.pdf",
    "chemistry/january-2023":  "/chemistry/123/chem12023-exam.pdf",
    "chemistry/january-2024":  "/chemistry/124/chem12024-exam.pdf",
    "chemistry/january-2025":  "/chemistry/125/chem-12025-exam.pdf",
    "chemistry/january-2026":  "/chemistry/126/chem-12026-exam.pdf",
    "chemistry/june-2016":     "/chemistry/616/chem62016-exam.pdf",
    "chemistry/june-2017":     "/chemistry/617/chem62017-examp.pdf",
    "chemistry/june-2018":     "/chemistry/618/chem62018-exam.pdf",
    "chemistry/june-2019":     "/chemistry/619/chem62019-exam.pdf",
    "chemistry/june-2022":     "/chemistry/622/chem62022-exam.pdf",
    "chemistry/june-2023":     "/chemistry/623/chem62023-exam.pdf",
    "chemistry/june-2024":     "/chemistry/624/chem62024-exam.pdf",
    "chemistry/june-2025":     "/chemistry/625/chem-62025-exam.pdf",
    # ── EARTH SCIENCE ──
    "earth-science/august-2018":  "/earthscience/818/esci82018-examw.pdf",
    "earth-science/august-2019":  "/earthscience/819/esci82019-examw.pdf",
    "earth-science/august-2021":  "/earthscience/821/esci82021-examw.pdf",
    "earth-science/august-2022":  "/earthscience/822/esci82022-exam.pdf",
    "earth-science/august-2023":  "/earthscience/823/esci82023-exam.pdf",
    "earth-science/august-2024":  "/earthscience/824/esci82024-examw.pdf",
    "earth-science/august-2025":  "/earthscience/825/esci-82025-exam.pdf",
    "earth-science/january-2020": "/earthscience/120/esci12020-examw.pdf",
    "earth-science/january-2023": "/earthscience/123/esci12023-exam.pdf",
    "earth-science/january-2024": "/earthscience/124/esci12024-examw.pdf",
    "earth-science/january-2025": "/earthscience/125/esci12025-exam.pdf",
    "earth-science/january-2026": "/earthscience/126/esci-12026-exam.pdf",
    "earth-science/june-2018":    "/earthscience/618/esci62018-examw.pdf",
    "earth-science/june-2019":    "/earthscience/619/esci62019-examw.pdf",
    "earth-science/june-2021":    "/earthscience/621/esci-v202-exam.pdf",
    "earth-science/june-2022":    "/earthscience/622/esci62022-exam.pdf",
    "earth-science/june-2023":    "/earthscience/623/esci62023-examw.pdf",
    "earth-science/june-2024":    "/earthscience/624/esci62024-examw.pdf",
    "earth-science/june-2025":    "/earthscience/625/esci62025-exam.pdf",
    # ── LIVING ENVIRONMENT ──
    "living-environment/august-2016":  "/livingenvironment/816/lenv82016-exam.pdf",
    "living-environment/august-2017":  "/livingenvironment/817/lenv82017-examw.pdf",
    "living-environment/august-2018":  "/livingenvironment/818/lenv82018-exampw.pdf",
    "living-environment/august-2019":  "/livingenvironment/819/lenv82019-examw.pdf",
    "living-environment/august-2021":  "/livingenvironment/821/lenv-v202-exam.pdf",
    "living-environment/august-2022":  "/livingenvironment/822/lenv82022-exam.pdf",
    "living-environment/august-2023":  "/livingenvironment/823/lenv82023-examw.pdf",
    "living-environment/august-2024":  "/livingenvironment/824/lenv-82024-examw.pdf",
    "living-environment/august-2025":  "/livingenvironment/825/lenv-82025-exam.pdf",
    "living-environment/january-2016": "/livingenvironment/116/lenv12016-examw.pdf",
    "living-environment/january-2017": "/livingenvironment/117/lenv12017-exam.pdf",
    "living-environment/january-2018": "/livingenvironment/118/lenv12018-examw.pdf",
    "living-environment/january-2020": "/livingenvironment/120/lenv12020-examw.pdf",
    "living-environment/january-2023": "/livingenvironment/123/lenv12023-exam.pdf",
    "living-environment/january-2024": "/livingenvironment/124/lenv-12024-examw.pdf",
    "living-environment/january-2025": "/livingenvironment/125/lenv-12025-exam.pdf",
    "living-environment/january-2026": "/livingenvironment/126/lenv-12026-exam.pdf",
    "living-environment/june-2016":    "/livingenvironment/616/lenv62016-examw.pdf",
    "living-environment/june-2017":    "/livingenvironment/617/lenv62017-exampcw.pdf",
    "living-environment/june-2018":    "/livingenvironment/618/lenv62018-examw.pdf",
    "living-environment/june-2019":    "/livingenvironment/619/lenv62019-examw.pdf",
    "living-environment/june-2021":    "/livingenvironment/621/lenv-v202-exam.pdf",
    "living-environment/june-2022":    "/livingenvironment/622/lenv62022-exam.pdf",
    "living-environment/june-2023":    "/livingenvironment/623/lenv62023-examw.pdf",
    "living-environment/june-2024":    "/livingenvironment/624/lenv-62024-examw.pdf",
    "living-environment/june-2025":    "/livingenvironment/625/lenv-62025-exam.pdf",
    # ── PHYSICS ──
    "physics/june-2016": "/physics/616/phys62016-exam.pdf",
    "physics/june-2017": "/physics/617/phys62017-exam.pdf",
    "physics/june-2018": "/physics/618/phys62018-exam.pdf",
    "physics/june-2019": "/physics/619/phys62019-exam.pdf",
    "physics/june-2022": "/physics/622/phys62022-exam.pdf",
    "physics/june-2023": "/physics/623/phys62023-exam.pdf",
    "physics/june-2024": "/physics/624/phys62024-exam.pdf",
    "physics/june-2025": "/physics/625/phys62025-exam.pdf",
}

# Image folder name map: exam-key → image folder name
IMG_FOLDER_MAP = {
    "algebra-1/august-2019":   "alg1-august-2019",
    "algebra-1/august-2022":   "alg1-august-2022",
    "algebra-1/august-2023":   "alg1-august-2023",
    "algebra-1/august-2024":   "alg1-august-2024",
    "algebra-1/august-2025":   "alg1-august-2025",
    "algebra-1/january-2020":  "alg1-january-2020",
    "algebra-1/january-2023":  "alg1-january-2023",
    "algebra-1/january-2024":  "alg1-january-2024",
    "algebra-1/january-2025":  "alg1-january-2025",
    "algebra-1/january-2026":  "alg1-january-2026",
    "algebra-1/june-2019":     "alg1-june-2019",
    "algebra-1/june-2021":     "alg1-june-2021",
    "algebra-1/june-2022":     "alg1-june-2022",
    "algebra-1/june-2023":     "alg1-june-2023",
    "algebra-1/june-2024":     "alg1-june-2024",
    "algebra-1/june-2025":     "alg1-june-2025",
    "algebra-2/august-2019":   "alg2-august-2019",
    "algebra-2/august-2022":   "alg2-august-2022",
    "algebra-2/august-2023":   "alg2-august-2023",
    "algebra-2/august-2024":   "alg2-august-2024",
    "algebra-2/august-2025":   "alg2-august-2025",
    "algebra-2/january-2020":  "alg2-january-2020",
    "algebra-2/january-2023":  "alg2-january-2023",
    "algebra-2/january-2024":  "alg2-january-2024",
    "algebra-2/january-2025":  "alg2-january-2025",
    "algebra-2/january-2026":  "alg2-january-2026",
    "algebra-2/june-2019":     "alg2-june-2019",
    "algebra-2/june-2022":     "alg2-june-2022",
    "algebra-2/june-2023":     "alg2-june-2023",
    "algebra-2/june-2024":     "alg2-june-2024",
    "algebra-2/june-2025":     "alg2-june-2025",
    "geometry/august-2019":    "geo-august-2019",
    "geometry/august-2022":    "geo-august-2022",
    "geometry/august-2023":    "geo-august-2023",
    "geometry/august-2024":    "geo-august-2024",
    "geometry/august-2025":    "geo-august-2025",
    "geometry/january-2020":   "geo-january-2020",
    "geometry/january-2023":   "geo-january-2023",
    "geometry/january-2024":   "geo-january-2024",
    "geometry/january-2025":   "geo-january-2025",
    "geometry/january-2026":   "geo-january-2026",
    "geometry/june-2019":      "geo-june-2019",
    "geometry/june-2022":      "geo-june-2022",
    "geometry/june-2023":      "geo-june-2023",
    "geometry/june-2024":      "geo-june-2024",
    "geometry/june-2025":      "geo-june-2025",
    "chemistry/august-2016":   "chem-august-2016",
    "chemistry/august-2017":   "chem-august-2017",
    "chemistry/august-2018":   "chem-august-2018",
    "chemistry/august-2019":   "chem-august-2019",
    "chemistry/august-2022":   "chem-august-2022",
    "chemistry/august-2023":   "chem-august-2023",
    "chemistry/august-2024":   "chem-august-2024",
    "chemistry/august-2025":   "chem-august-2025",
    "chemistry/january-2017":  "chem-january-2017",
    "chemistry/january-2018":  "chem-january-2018",
    "chemistry/january-2020":  "chem-january-2020",
    "chemistry/january-2023":  "chem-january-2023",
    "chemistry/january-2024":  "chem-january-2024",
    "chemistry/january-2025":  "chem-january-2025",
    "chemistry/january-2026":  "chem-january-2026",
    "chemistry/june-2016":     "chem-june-2016",
    "chemistry/june-2017":     "chem-june-2017",
    "chemistry/june-2018":     "chem-june-2018",
    "chemistry/june-2019":     "chem-june-2019",
    "chemistry/june-2022":     "chem-june-2022",
    "chemistry/june-2023":     "chem-june-2023",
    "chemistry/june-2024":     "chem-june-2024",
    "chemistry/june-2025":     "chem-june-2025",
    "earth-science/august-2018":  "es-august-2018",
    "earth-science/august-2019":  "es-august-2019",
    "earth-science/august-2021":  "es-august-2021",
    "earth-science/august-2022":  "es-august-2022",
    "earth-science/august-2023":  "es-august-2023",
    "earth-science/august-2024":  "es-august-2024",
    "earth-science/august-2025":  "es-august-2025",
    "earth-science/january-2020": "es-january-2020",
    "earth-science/january-2023": "es-january-2023",
    "earth-science/january-2024": "es-january-2024",
    "earth-science/january-2025": "es-january-2025",
    "earth-science/january-2026": "es-january-2026",
    "earth-science/june-2018":    "es-june-2018",
    "earth-science/june-2019":    "es-june-2019",
    "earth-science/june-2021":    "es-june-2021",
    "earth-science/june-2022":    "es-june-2022",
    "earth-science/june-2023":    "es-june-2023",
    "earth-science/june-2024":    "es-june-2024",
    "earth-science/june-2025":    "es-june-2025",
    "living-environment/august-2016":  "le-august-2016",
    "living-environment/august-2017":  "le-august-2017",
    "living-environment/august-2018":  "le-august-2018",
    "living-environment/august-2019":  "le-august-2019",
    "living-environment/august-2021":  "le-august-2021",
    "living-environment/august-2022":  "le-august-2022",
    "living-environment/august-2023":  "le-august-2023",
    "living-environment/august-2024":  "le-august-2024",
    "living-environment/august-2025":  "le-august-2025",
    "living-environment/january-2016": "le-january-2016",
    "living-environment/january-2017": "le-january-2017",
    "living-environment/january-2018": "le-january-2018",
    "living-environment/january-2020": "le-january-2020",
    "living-environment/january-2023": "le-january-2023",
    "living-environment/january-2024": "le-january-2024",
    "living-environment/january-2025": "le-january-2025",
    "living-environment/january-2026": "le-january-2026",
    "living-environment/june-2016":    "le-june-2016",
    "living-environment/june-2017":    "le-june-2017",
    "living-environment/june-2018":    "le-june-2018",
    "living-environment/june-2019":    "le-june-2019",
    "living-environment/june-2021":    "le-june-2021",
    "living-environment/june-2022":    "le-june-2022",
    "living-environment/june-2023":    "le-june-2023",
    "living-environment/june-2024":    "le-june-2024",
    "living-environment/june-2025":    "le-june-2025",
    "physics/june-2016": "phys-june-2016",
    "physics/june-2017": "phys-june-2017",
    "physics/june-2018": "phys-june-2018",
    "physics/june-2019": "phys-june-2019",
    "physics/june-2022": "phys-june-2022",
    "physics/june-2023": "phys-june-2023",
    "physics/june-2024": "phys-june-2024",
    "physics/june-2025": "phys-june-2025",
}

# ─── Helpers ──────────────────────────────────────────────────────────────────

def download_pdf(url, dest):
    """Download PDF with caching."""
    if os.path.exists(dest):
        return True
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    print(f"  Downloading {url} ...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=30) as r, open(dest, 'wb') as f:
            shutil.copyfileobj(r, f)
        size = os.path.getsize(dest)
        if size < 5000:          # suspiciously small → probably 404 HTML
            os.remove(dest)
            return False
        return True
    except Exception as e:
        print(f"  DOWNLOAD FAILED: {e}")
        return False

PLACEHOLDER_SIZE_BYTES = 25_000   # files smaller than this are matplotlib placeholders

def is_placeholder(path):
    try:
        return os.path.getsize(path) < PLACEHOLDER_SIZE_BYTES
    except:
        return True

def parse_needed_images(exam_key, force=True):
    """Return dict {qnum: disk_path} for all questions with image refs.
    With force=True, returns ALL (overwriting placeholder images from generator).
    """
    subject, exam_name = exam_key.split("/", 1)
    js_path = os.path.join(EXAM_DIR, subject, exam_name + ".js")
    if not os.path.exists(js_path):
        return {}
    with open(js_path) as f:
        content = f.read()
    needed = {}
    for m in re.finditer(r'number:\s*(\d+)[^}]*?image:\s*\'(/images/exams/[^\']+)\'', content, re.DOTALL):
        qnum = int(m.group(1))
        img_path = m.group(2)
        disk_path = PUBLIC_DIR + img_path.replace('/images/exams', '')
        # force=True → replace placeholders only (not good real images)
        if not os.path.exists(disk_path) or (force and is_placeholder(disk_path)):
            needed[qnum] = disk_path
    return needed

# ─── PDF → question image extraction ─────────────────────────────────────────

RENDER_DPI = 180   # render at high DPI for quality

def render_pages(pdf_path):
    """Render all pages of a PDF as PIL Images at RENDER_DPI."""
    doc = fitz.open(pdf_path)
    pages = []
    mat = fitz.Matrix(RENDER_DPI / 72, RENDER_DPI / 72)
    for page in doc:
        pix = page.get_pixmap(matrix=mat, colorspace=fitz.csRGB)
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        pages.append(img)
    doc.close()
    return pages

def find_question_regions(pages, qnum, subject):
    """
    Locate the image region for question qnum across all pages.
    Strategy: find "qnum" as a large standalone number on the page (question marker),
    then crop the block below it that contains a graph/diagram.
    Returns a PIL Image crop or None.
    """
    import pytesseract  # optional — fall back to region heuristics if unavailable

    # For each page, try to find the question number and extract the image below it
    for page_idx, img in enumerate(pages):
        result = extract_question_image(img, qnum, subject, page_idx)
        if result is not None:
            return result
    return None

def extract_question_image(page_img, qnum, subject, page_idx):
    """
    Use PyMuPDF text extraction to find question number positions,
    then crop the image region between this question and the next.
    """
    return None  # placeholder — see PDF-based approach below

def extract_from_pdf(pdf_path, qnum, subject):
    """
    Use PyMuPDF's text search to find where question qnum appears on the page,
    then extract the image/diagram associated with it.
    Returns PIL Image or None.
    """
    doc = fitz.open(pdf_path)
    mat = fitz.Matrix(RENDER_DPI / 72, RENDER_DPI / 72)

    # Search patterns for question numbers
    # Questions are formatted like " 1 " or "\n1 " or "1." in exams
    patterns = [f" {qnum} ", f"\n{qnum} ", f"({qnum})", f"{qnum}."]

    for page_num in range(len(doc)):
        page = doc[page_num]
        text_dict = page.get_text("dict")
        page_h = page.rect.height
        page_w = page.rect.width

        q_block_y = None
        next_q_y = page_h

        for block in text_dict.get("blocks", []):
            if block.get("type") != 0:
                continue
            for line in block.get("lines", []):
                if not line.get("spans"):
                    continue
                line_text  = " ".join(s.get("text","") for s in line["spans"]).strip()
                first_span = line["spans"][0]
                font_size  = first_span.get("size", 0)
                bbox       = first_span.get("bbox", [0,0,0,0])
                x_pos      = bbox[0]
                y_pos      = bbox[1]

                if font_size < 9:
                    continue

                in_left  = x_pos < 70
                in_right = page_w * 0.42 < x_pos < page_w * 0.60

                if not (in_left or in_right):
                    continue

                is_q = False; is_next_q = False

                # Pattern A: standalone number
                if re.match(r'^\d{1,2}$', line_text) and in_left:
                    if line_text == str(qnum):     is_q      = True
                    elif line_text == str(qnum+1): is_next_q = True
                # Pattern B/C: number at start of line
                elif re.match(rf'^{qnum}[\s\t.]+\S', line_text):     is_q      = True
                elif re.match(rf'^{qnum+1}[\s\t.]+\S', line_text):   is_next_q = True

                if is_q:
                    q_block_y = y_pos
                if is_next_q and q_block_y is not None and y_pos > q_block_y:
                    next_q_y = min(next_q_y, y_pos)

        if q_block_y is None:
            continue

        # Found the question on this page — now extract the image region
        # The diagram is typically between q_block_y and next_q_y,
        # occupying the right portion or center of the page

        # Render the page
        pix = page.get_pixmap(matrix=mat, colorspace=fitz.csRGB)
        full_img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

        scale = RENDER_DPI / 72.0
        y1_px = int(q_block_y * scale)
        y2_px = int(min(next_q_y * scale, pix.height))
        x1_px = 0
        x2_px = pix.width

        # Crop the question strip
        strip = full_img.crop((x1_px, y1_px, x2_px, y2_px))

        # Find the image/graph within this strip by looking for non-white rows
        strip_arr = strip.convert("L")  # grayscale
        import numpy as np
        arr = np.array(strip_arr)

        # Find rows with substantial non-white content (< 240)
        non_white_cols = np.mean(arr < 230, axis=1)
        image_rows = np.where(non_white_cols > 0.05)[0]

        if len(image_rows) < 5:
            # No significant content — maybe the image is on next page
            continue

        # Crop to just the image portion
        row_min = image_rows[0]
        row_max = image_rows[-1]

        # Add some padding
        pad = 10
        row_min = max(0, row_min - pad)
        row_max = min(strip.height, row_max + pad)

        crop = strip.crop((0, row_min, strip.width, row_max))

        # Skip if crop is too small or too tall (probably just text)
        if crop.height < 40 or crop.height > strip.height * 0.9:
            if crop.height > 100:  # use it anyway if reasonably sized
                pass
            else:
                continue

        # Resize to standard dimensions
        target_w = 1044
        ratio = target_w / crop.width
        target_h = max(100, int(crop.height * ratio))
        crop = crop.resize((target_w, target_h), Image.LANCZOS)

        doc.close()
        return crop

    doc.close()
    return None

def extract_all_images_from_exam(pdf_path, needed_questions, subject):
    """
    Extract images for all needed question numbers from a single PDF.
    Returns dict {qnum: PIL_Image}.
    """
    doc = fitz.open(pdf_path)
    mat = fitz.Matrix(RENDER_DPI / 72, RENDER_DPI / 72)
    results = {}

    # Build a map of all question positions across all pages
    # {qnum: (page_num, y_coord)}
    q_positions = {}

    for page_num in range(len(doc)):
        page = doc[page_num]
        page_w = page.rect.width
        text_dict = page.get_text("dict")

        for block in text_dict.get("blocks", []):
            if block.get("type") != 0:
                continue
            for line in block.get("lines", []):
                if not line.get("spans"):
                    continue
                # Work at LINE level — combines all spans for multi-column layouts
                line_text = " ".join(s.get("text","") for s in line["spans"]).strip()
                first_span = line["spans"][0]
                font_size  = first_span.get("size", 0)
                bbox       = first_span.get("bbox", [0,0,0,0])
                x_pos      = bbox[0]
                y_pos      = bbox[1]

                if font_size < 9:
                    continue

                # Accept left column (x<70) OR right column (≈page_w/2)
                # This handles two-column layouts in physics/chemistry
                in_left  = x_pos < 70
                in_right = page_w * 0.42 < x_pos < page_w * 0.60

                if not (in_left or in_right):
                    continue

                # Pattern A: standalone number at tight left margin only
                if re.match(r'^\d{1,2}$', line_text) and in_left:
                    q_num = int(line_text)
                    if q_num not in q_positions:
                        q_positions[q_num] = (page_num, y_pos)
                    continue

                # Pattern B/C: number starts the line (space, tab, or period after)
                m = re.match(r'^(\d{1,2})[\s\t.]+\S', line_text)
                if m:
                    q_num = int(m.group(1))
                    if q_num not in q_positions:
                        q_positions[q_num] = (page_num, y_pos)

    # For each needed question, extract image
    for qnum in sorted(needed_questions):
        if qnum not in q_positions:
            print(f"    Q{qnum}: not found in PDF text")
            continue

        page_num, q_y = q_positions[qnum]
        page = doc[page_num]
        page_h = page.rect.height

        # Find where this question ends (next question start)
        next_q_y = page_h
        for other_q, (other_page, other_y) in q_positions.items():
            if other_page == page_num and other_y > q_y and other_q > qnum:
                next_q_y = min(next_q_y, other_y)

        # Render page
        pix = page.get_pixmap(matrix=mat, colorspace=fitz.csRGB)
        full_img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

        scale = RENDER_DPI / 72.0
        y1_px = int(q_y * scale)
        y2_px = int(min(next_q_y * scale, pix.height))

        strip = full_img.crop((0, y1_px, pix.width, y2_px))

        # Find image content within the strip
        import numpy as np
        arr = np.array(strip.convert("L"))
        non_white = np.mean(arr < 230, axis=1)
        image_rows = np.where(non_white > 0.03)[0]

        if len(image_rows) < 10:
            print(f"    Q{qnum}: no image content found in strip")
            continue

        row_min = max(0, image_rows[0] - 5)
        row_max = min(strip.height, image_rows[-1] + 5)
        crop = strip.crop((0, row_min, strip.width, row_max))

        if crop.height < 30:
            print(f"    Q{qnum}: crop too small ({crop.height}px)")
            continue

        # Standardise width
        target_w = 1044
        ratio = target_w / crop.width
        target_h = max(80, int(crop.height * ratio))
        crop = crop.resize((target_w, target_h), Image.LANCZOS)

        results[qnum] = crop
        print(f"    Q{qnum}: extracted ({crop.width}×{crop.height})")

    doc.close()
    return results

# ─── Main ─────────────────────────────────────────────────────────────────────

RETRY_ONLY = [
    "algebra-1/january-2024", "algebra-1/june-2021",
    "living-environment/august-2017", "living-environment/august-2018",
    "living-environment/august-2019", "living-environment/august-2021",
    "living-environment/august-2023",
    "living-environment/january-2016", "living-environment/january-2018",
    "living-environment/january-2020",
    "living-environment/june-2016", "living-environment/june-2017",
    "living-environment/june-2018", "living-environment/june-2019",
    "living-environment/june-2021", "living-environment/june-2023",
]

def main():
    import numpy as np  # ensure available

    total_needed = 0
    total_saved  = 0
    failed_exams = []

    # Only process exams that still have placeholder images
    all_items = sorted(PDF_URLS.items())
    items = []
    for k, v in all_items:
        needed = parse_needed_images(k)
        if needed:
            items.append((k, v))
    print(f"Exams with remaining placeholders: {len(items)}")
    for exam_key, pdf_path_suffix in items:
        needed = parse_needed_images(exam_key)
        if not needed:
            continue

        total_needed += len(needed)
        img_folder = IMG_FOLDER_MAP.get(exam_key, exam_key.replace("/", "-").replace(" ", "-"))
        print(f"\n{'─'*60}")
        print(f"Exam: {exam_key}  ({len(needed)} images needed)")
        print(f"Folder: {img_folder}")

        # Download PDF
        pdf_url = BASE + pdf_path_suffix
        pdf_cache_path = os.path.join(PDF_CACHE, img_folder + ".pdf")
        if not download_pdf(pdf_url, pdf_cache_path):
            # Try alternate URL without 'w' suffix
            alt = pdf_url.replace('-examw.pdf', '-exam.pdf').replace('examw.pdf', 'exam.pdf')
            if alt != pdf_url:
                if not download_pdf(alt, pdf_cache_path):
                    print(f"  SKIP — could not download PDF")
                    failed_exams.append(exam_key)
                    continue
            else:
                print(f"  SKIP — could not download PDF")
                failed_exams.append(exam_key)
                continue

        # Extract images from PDF
        subject = exam_key.split("/")[0]
        try:
            extracted = extract_all_images_from_exam(pdf_cache_path, list(needed.keys()), subject)
        except Exception as e:
            print(f"  ERROR extracting: {e}")
            failed_exams.append(exam_key)
            continue

        # Save extracted images
        for qnum, disk_path in needed.items():
            if qnum in extracted:
                os.makedirs(os.path.dirname(disk_path), exist_ok=True)
                extracted[qnum].save(disk_path, "PNG")
                total_saved += 1
            else:
                print(f"    Q{qnum}: no extract — keeping generated placeholder")

        time.sleep(0.3)  # be polite to server

    print(f"\n{'='*60}")
    print(f"Total images needed:  {total_needed}")
    print(f"Successfully saved:   {total_saved}")
    print(f"Failed exams:         {len(failed_exams)}")
    if failed_exams:
        print("  " + "\n  ".join(failed_exams))

if __name__ == "__main__":
    main()
