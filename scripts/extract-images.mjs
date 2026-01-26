// Script to extract base64 PNG images from HTML file
import { readFileSync, writeFileSync } from 'fs';

const htmlPath = '/Users/thomas/Downloads/Biospectrum 회원가입 및 설정 로직 가이드-20260126142358.html';
const outputDir = '/Users/thomas/Desktop/Claude project/biospectrum-dashboard/public/images/guides/member-approval';

const html = readFileSync(htmlPath, 'utf8');

// Find all base64 PNG images
const regex = /data:image\/png;base64,([A-Za-z0-9+/=]+)/g;
let match;
let index = 1;

while ((match = regex.exec(html)) !== null) {
  const base64Data = match[1];
  const buffer = Buffer.from(base64Data, 'base64');
  const filename = `${outputDir}/step-${String(index).padStart(2, '0')}.png`;
  writeFileSync(filename, buffer);
  console.log(`Saved: step-${String(index).padStart(2, '0')}.png (${Math.round(buffer.length / 1024)}KB)`);
  index++;
}

console.log(`\nTotal images extracted: ${index - 1}`);
