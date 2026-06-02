import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const regentsExamsDir = path.resolve(__dirname, '../shared/content/regents-exams');
const webDistDir = path.resolve(__dirname, '../web-dist');

console.log('Regents Exams Directory:', regentsExamsDir);
console.log('Web Dist Directory:', webDistDir);

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
    } else {
      if (file.endsWith('.js') && file !== 'index.js') {
        arrayOfFiles.push(path.join(dirPath, file));
      }
    }
  });

  return arrayOfFiles;
}

const files = getAllFiles(regentsExamsDir);
console.log(`Found ${files.length} exam files.`);

const missingImages = [];
let totalQuestionsWithImages = 0;

files.forEach((filePath) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Find all instances of: image: '...' or image: "..."
  const imageRegex = /image\s*:\s*['"]([^'"]+)['"]/g;
  let match;
  
  while ((match = imageRegex.exec(content)) !== null) {
    totalQuestionsWithImages++;
    const imagePath = match[1]; // e.g., '/images/exams/alg1-august-2022/q23.png'
    
    // Check if the image exists in web-dist
    const localPath = path.join(webDistDir, imagePath);
    if (!fs.existsSync(localPath)) {
      missingImages.push({
        examFile: path.relative(regentsExamsDir, filePath),
        imagePath,
        fullPath: localPath
      });
    }
  }
});

console.log(`Total questions with images: ${totalQuestionsWithImages}`);
console.log(`Total missing images: ${missingImages.length}`);

if (missingImages.length > 0) {
  console.log('\n--- Missing Images List ---');
  missingImages.forEach((img) => {
    console.log(`- Exam: ${img.examFile}`);
    console.log(`  Path: ${img.imagePath}`);
  });
} else {
  console.log('\nAll images exist! No missing images found.');
}
