import os

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXAM_ROOT = os.path.join(PROJECT_ROOT, "shared", "content", "regents-exams")

def fix_commas():
    fixed_files = 0
    for root, dirs, files in os.walk(EXAM_ROOT):
        for f in files:
            if f.endswith('.js'):
                filepath = os.path.join(root, f)
                with open(filepath, 'r') as file:
                    content = file.read()
                
                if ',, image:' in content:
                    # Clean up double commas
                    new_content = content.replace(',, image:', ', image:')
                    with open(filepath, 'w') as file:
                        file.write(new_content)
                    print(f"Fixed double commas in: {os.path.relpath(filepath, EXAM_ROOT)}")
                    fixed_files += 1
                    
    print(f"Successfully cleaned up double commas in {fixed_files} files.")

if __name__ == "__main__":
    fix_commas()
