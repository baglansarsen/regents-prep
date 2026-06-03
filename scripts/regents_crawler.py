#!/usr/bin/env python3
"""
Scrape nysedregents.org to download all exam PDFs, scoring keys, and rating guides
for all 10 High School subjects (Algebra I, Algebra II, Geometry, Chemistry,
Earth Science, Living Environment, Physics, ELA, US History, Global History).
"""

import os
import re
import sys
import time
import urllib.request
import urllib.parse
import shutil
import argparse

BASE_URL = "https://www.nysedregents.org/"

SUBJECT_MAP = {
    "algebra-1": "algebraone/",
    "algebra-2": "algebratwo/",
    "geometry": "geometryre/",
    "chemistry": "Chemistry/",
    "earth-science": "EarthScience/",
    "living-environment": "LivingEnvironment/",
    "physics": "Physics/",
    "english": "hsela/",
    "us-history": "us-history-govt/home.html",
    "global-history": "ghg2/home.html",
    "life-science": "life_science_biology/home.html"
}

DOWNLOAD_ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "downloads")

def parse_session_from_url(url):
    """
    Decodes month and year from the URL path.
    Example: 825/chem-82025-exam.pdf -> august, 2025
    Example: 126/ushg-12026-exam.pdf -> january, 2026
    Example: 619/geom62019-exam.pdf -> june, 2019
    """
    parts = url.split('/')
    filename = parts[-1]
    
    # Try folder first (usually 3 digits, e.g. 825 or 126 or 619)
    for part in reversed(parts[:-1]):
        if part.isdigit() and len(part) == 3:
            m_digit = part[0]
            y_digits = part[1:]
            month = { '1': 'january', '6': 'june', '8': 'august' }.get(m_digit)
            if month:
                year = 1900 + int(y_digits) if int(y_digits) >= 90 else 2000 + int(y_digits)
                return month, year
                
    # Try digits in filename
    digits = re.findall(r'\d+', filename)
    for d in digits:
        if len(d) == 5: # e.g. 12026
            m_digit = d[0]
            y_digits = d[1:]
            month = { '1': 'january', '6': 'june', '8': 'august' }.get(m_digit)
            if month:
                return month, 2000 + int(y_digits[1:])  # e.g. 2026 from 2026
        elif len(d) == 3: # e.g. 819
            m_digit = d[0]
            y_digits = d[1:]
            month = { '1': 'january', '6': 'june', '8': 'august' }.get(m_digit)
            if month:
                year = 1900 + int(y_digits) if int(y_digits) >= 90 else 2000 + int(y_digits)
                return month, year
        elif len(d) == 4: # e.g. 2026 or 2019 directly
            # Look at adjacent characters or directory to guess month
            pass
            
    return None, None

def download_file(url, dest_path):
    """Download a file with user-agent headers and caching."""
    if os.path.exists(dest_path):
        # Already downloaded
        return True
    
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    
    try:
        print(f"    Downloading {url} ...")
        with urllib.request.urlopen(req, timeout=30) as response, open(dest_path, 'wb') as out_file:
            shutil.copyfileobj(response, out_file)
        
        # Verify size
        if os.path.getsize(dest_path) < 1000:
            print(f"    WARNING: File too small ({os.path.getsize(dest_path)} bytes). Might be empty/error.")
            os.remove(dest_path)
            return False
            
        return True
    except Exception as e:
        print(f"    ERROR downloading {url}: {e}")
        if os.path.exists(dest_path):
            os.remove(dest_path)
        return False

def scrape_subject(subject_name, subject_path, limit=None):
    """Scrape and download exams for a single subject."""
    url = urllib.parse.urljoin(BASE_URL, subject_path)
    print(f"\nScraping {subject_name} from {url} ...")
    
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            html = response.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Failed to fetch page for {subject_name}: {e}")
        return
        
    # Find all .pdf links
    pattern = re.compile(r'<a\s+[^>]*href=["\']([^"\']+\.pdf)["\'][^>]*>(.*?)</a>', re.IGNORECASE | re.DOTALL)
    pdf_links = pattern.findall(html)
    
    print(f"Found {len(pdf_links)} total PDF links on the page.")
    
    # Group links by session (month, year)
    sessions = {} # (month, year) -> list of {url, text}
    
    for href, text_raw in pdf_links:
        text = re.sub(r'<[^>]+>', '', text_raw).strip()
        full_pdf_url = urllib.parse.urljoin(url, href)
        
        month, year = parse_session_from_url(full_pdf_url)
        if not month or not year:
            continue
            
        session_key = (month, year)
        if session_key not in sessions:
            sessions[session_key] = []
        sessions[session_key].append({
            'url': full_pdf_url,
            'filename': href.split('/')[-1],
            'text': text
        })
        
    print(f"Identified {len(sessions)} distinct exam sessions.")
    
    # Process each session
    processed_count = 0
    for (month, year) in sorted(sessions.keys(), key=lambda x: (x[1], x[0]), reverse=True):
        if limit and processed_count >= limit:
            print(f"Reached limit of {limit} sessions for {subject_name}.")
            break
            
        files = sessions[(month, year)]
        session_name = f"{month}-{year}"
        print(f"  Session: {session_name} ({len(files)} files)")
        
        # Categorize files
        exam_files = []
        scoring_key_files = []
        rating_guide_files = []
        
        for file in files:
            fname = file['filename'].lower()
            text = file['text'].lower()
            
            # Exclude large type/Braille/translations
            if any(x in fname for x in ['-lt.pdf', 'lt-', '-lt-', 'large', 'braille', 'translation', 'spanish', 'chinese', 'korean', 'russian', 'creole']):
                continue
            if any(x in text for x in ['large', 'braille', 'translation', 'spanish', 'chinese', 'korean', 'russian', 'creole']):
                continue
                
            # Classify
            if 'sk.pdf' in fname or 'scoringkey' in fname or 'scoring-key' in fname or 'sk-' in fname or 'key' in text:
                scoring_key_files.append(file)
            elif 'rg' in fname or 'rating' in fname or 'ratingguide' in fname or 'rating-guide' in fname or 'guide' in text:
                rating_guide_files.append(file)
            elif 'exam' in fname or 'examw' in fname:
                # Exclude answer booklet
                if 'ansbk' not in fname and 'booklet' not in fname and 'answer booklet' not in text:
                    exam_files.append(file)
                    
        # Let's see what we matched
        if not exam_files:
            # Fallback search if 'exam' not in filename but standard layout
            for file in files:
                fname = file['filename'].lower()
                text = file['text'].lower()
                if any(x in fname for x in ['-lt.pdf', 'lt-', '-lt-', 'large', 'braille', 'translation', 'spanish', 'chinese', 'korean', 'russian', 'creole']):
                    continue
                if 'ansbk' not in fname and 'sk.pdf' not in fname and 'rg.pdf' not in fname and 'cc.pdf' not in fname:
                    if 'examination' in text or 'regular size version' in text:
                        exam_files.append(file)
                        
        if exam_files:
            exam_file = exam_files[0]
            dest_dir = os.path.join(DOWNLOAD_ROOT, subject_name, session_name)
            
            # Download exam
            download_file(exam_file['url'], os.path.join(dest_dir, "exam.pdf"))
            
            # Download scoring key (answer key)
            if scoring_key_files:
                download_file(scoring_key_files[0]['url'], os.path.join(dest_dir, "scoring_key.pdf"))
            else:
                print(f"    WARNING: No scoring key found for {session_name}")
                
            # Download rating guide
            if rating_guide_files:
                # ELA might have multiple parts
                for idx, rg_file in enumerate(rating_guide_files):
                    suffix = f"_{idx}" if len(rating_guide_files) > 1 else ""
                    download_file(rg_file['url'], os.path.join(dest_dir, f"rating_guide{suffix}.pdf"))
            
            processed_count += 1
            time.sleep(0.2) # Polite delay
        else:
            print(f"    No main exam PDF found for {session_name}.")

def main():
    parser = argparse.ArgumentParser(description="Download NYSED Regents PDFs")
    parser.add_argument("--subject", choices=list(SUBJECT_MAP.keys()) + ["all"], default="all",
                        help="Subject to download (default: all)")
    parser.add_argument("--limit", type=int, default=None,
                        help="Limit number of sessions to download per subject (for testing)")
    args = parser.parse_args()
    
    if args.subject == "all":
        for name, path in SUBJECT_MAP.items():
            scrape_subject(name, path, args.limit)
    else:
        scrape_subject(args.subject, SUBJECT_MAP[args.subject], args.limit)

if __name__ == "__main__":
    main()
