import fs from 'fs';
import path from 'path';

const REPO_ROOT = process.cwd();
const OUT_FILE = path.join(REPO_ROOT, 'public', 'visual_questions_raw.json');

const subjects = ['earth-science', 'living-environment'];
const results = [];

for (const subject of subjects) {
  const dir = path.join(REPO_ROOT, 'src', 'data', 'regents-exams', subject);
  if (!fs.existsSync(dir)) continue;

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.js') && f !== 'index.js' && !f.includes('june-2021') && !f.includes('august-2021'));
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Parse using regular expression as ESM files cannot always be loaded dynamically without complex setups
    const qBlocks = content.split(/\{\s*\n\s*number:/g).slice(1);
    
    for (const block of qBlocks) {
      if (!block.includes('image:')) continue;
      
      const numMatch = block.match(/^\s*(\d+)/);
      if (!numMatch) continue;
      const number = parseInt(numMatch[1], 10);
      
      const textMatch = block.match(/text:\s*'([^']+)'/) || block.match(/text:\s*`([^`]+)`/);
      const text = textMatch ? textMatch[1].trim() : '';
      
      const choicesMatch = block.match(/choices:\s*\[([\s\S]*?)\]/);
      const choices = [];
      if (choicesMatch) {
        const choiceItems = choicesMatch[1].split(/',\s*\n\s*'/g);
        for (let item of choiceItems) {
          item = item.replace(/^'|'$/g, '').trim();
          if (item) choices.append ? choices.push(item) : choices.push(item);
        }
      }
      
      const correctMatch = block.match(/correct:\s*(\d+)/);
      const correct = correctMatch ? parseInt(correctMatch[1], 10) : 0;
      
      const imageMatch = block.match(/image:\s*'([^']+)'/);
      const image = imageMatch ? imageMatch[1].trim() : '';
      
      if (text && choices.length && image) {
        results.push({
          subject,
          exam_id: file.replace('.js', ''),
          number,
          text,
          choices,
          correct,
          image
        });
      }
    }
  }
}

fs.writeFileSync(OUT_FILE, JSON.stringify(results, null, 2));
console.log(`Extracted ${results.length} visual questions to ${OUT_FILE}`);
