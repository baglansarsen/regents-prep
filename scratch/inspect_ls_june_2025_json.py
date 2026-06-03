import json
import os

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
json_path = os.path.join(PROJECT_ROOT, "output", "data", "life-science", "june-2025.json")

with open(json_path) as f:
    data = json.load(f)

for q in data["questions"]:
    if q["number"] <= 5:
        print(f"Question {q['number']}:")
        print("  Type:", q["type"])
        print("  Image:", q["image"])
        print("  Context text starts with:", repr(q["context"][:100]) if q["context"] else "None")
        print("-" * 50)
