import os
import shutil
import re

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_IMAGES_DIR = os.path.join(PROJECT_ROOT, "output", "images")
PUBLIC_IMAGES_DIR = os.path.join(PROJECT_ROOT, "public", "images", "exams")

PREFIX_MAP = {
    "algebra-1": "alg1",
    "algebra-2": "alg2",
    "chemistry": "chem",
    "earth-science": "es",
    "geometry": "geo",
    "living-environment": "le",
    "physics": "phys",
    "life-science": "ls",
    "english": "ela",
    "us-history": "ush",
    "global-history": "gh"
}

MONTH_MAP = {
    "life-science": {
        "june": "jun",
        "august": "aug",
        "january": "jan"
    }
}

def sync():
    if not os.path.exists(OUTPUT_IMAGES_DIR):
        print("No output images directory found.")
        return
        
    print(f"Syncing images from {OUTPUT_IMAGES_DIR} to {PUBLIC_IMAGES_DIR}...")
    
    # Clean public/images/exams first
    if os.path.exists(PUBLIC_IMAGES_DIR):
        shutil.rmtree(PUBLIC_IMAGES_DIR)
    os.makedirs(PUBLIC_IMAGES_DIR, exist_ok=True)
    
    synced_count = 0
    folder_count = 0
    
    for subject in sorted(os.listdir(OUTPUT_IMAGES_DIR)):
        subj_dir = os.path.join(OUTPUT_IMAGES_DIR, subject)
        if not os.path.isdir(subj_dir):
            continue
            
        prefix = PREFIX_MAP.get(subject)
        if not prefix:
            print(f"Warning: No prefix mapping for subject: {subject}")
            continue
            
        for session in sorted(os.listdir(subj_dir)):
            sess_dir = os.path.join(subj_dir, session)
            if not os.path.isdir(sess_dir):
                continue
                
            # Parse month and year from session (e.g. june-2025)
            match = re.match(r'^([a-z]+)-(\d{4})$', session, re.IGNORECASE)
            if not match:
                print(f"Warning: Invalid session folder name: {session}")
                continue
                
            month, year = match.groups()
            month_lower = month.lower()
            
            # Map month if needed (e.g. life-science uses abbreviated months)
            if subject in MONTH_MAP and month_lower in MONTH_MAP[subject]:
                month_mapped = MONTH_MAP[subject][month_lower]
            else:
                month_mapped = month_lower
                
            dest_folder_name = f"{prefix}-{month_mapped}-{year}"
            dest_dir = os.path.join(PUBLIC_IMAGES_DIR, dest_folder_name)
            os.makedirs(dest_dir, exist_ok=True)
            
            # Copy all files from sess_dir to dest_dir
            for f in os.listdir(sess_dir):
                src_file = os.path.join(sess_dir, f)
                if os.path.isfile(src_file):
                    dest_file = os.path.join(dest_dir, f)
                    shutil.copy2(src_file, dest_file)
                    synced_count += 1
            folder_count += 1
            
    print(f"Successfully synced {synced_count} images across {folder_count} folders.")

if __name__ == "__main__":
    sync()
