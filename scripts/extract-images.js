const fs = require('fs');
const path = require('path');

const htmlPath = '/Users/thomas/Downloads/Biospectrum 회원가입 및 설정 로직 가이드-20260126142358.html';
const outputDir = '/Users/thomas/Desktop/Claude project/biospectrum-dashboard/public/images/guides/registration';

// HTML 파일 읽기
const html = fs.readFileSync(htmlPath, 'utf8');

// base64 이미지 패턴 찾기
const imgRegex = /src="data:image\/(png|jpeg|jpg|gif);base64,([^"]+)"/g;

let match;
let index = 1;

while ((match = imgRegex.exec(html)) !== null) {
  const ext = match[1];
  const base64Data = match[2];

  // base64를 버퍼로 변환
  const buffer = Buffer.from(base64Data, 'base64');

  // 파일로 저장
  const filename = `step-${String(index).padStart(2, '0')}.${ext}`;
  const filepath = path.join(outputDir, filename);

  fs.writeFileSync(filepath, buffer);
  console.log(`Saved: ${filename} (${Math.round(buffer.length / 1024)}KB)`);

  index++;
}

console.log(`\nTotal images extracted: ${index - 1}`);
