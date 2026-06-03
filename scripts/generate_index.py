import os
import json

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(PROJECT_ROOT, "output", "data")

index = {}

if os.path.exists(DATA_DIR):
    for subject in sorted(os.listdir(DATA_DIR)):
        subj_dir = os.path.join(DATA_DIR, subject)
        if os.path.isdir(subj_dir):
            sessions = []
            for f in sorted(os.listdir(subj_dir)):
                if f.endswith(".json") and f != "index.json":
                    sessions.append(f[:-5]) # remove .json
            if sessions:
                index[subject] = sessions

os.makedirs(DATA_DIR, exist_ok=True)
with open(os.path.join(DATA_DIR, "index.json"), "w") as f:
    json.dump(index, f, indent=2)

print("Generated output/data/index.json successfully.")
