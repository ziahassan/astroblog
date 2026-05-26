// Scans public/presentations/ and creates stub .md files in src/content/teaching/
// for any folder that doesn't already have one.
// Run with: node scripts/sync-presentations.mjs [--dry-run]

import fs from 'fs';
import path from 'path';

const PRESENTATIONS_DIR = './public/presentations';
const TEACHING_DIR = './src/content/teaching';
const DRY_RUN = process.argv.includes('--dry-run');

if (DRY_RUN) console.log('[dry-run] No files will be written.\n');

const folders = fs.readdirSync(PRESENTATIONS_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

let created = 0, skipped = 0;

for (const folder of folders) {
  const mdPath = path.join(TEACHING_DIR, `${folder}.md`);

  // Skip if .md already exists
  if (fs.existsSync(mdPath)) {
    console.log(`skip (exists): ${folder}`);
    skipped++;
    continue;
  }

  // Detect what's inside the folder
  const contents = fs.readdirSync(path.join(PRESENTATIONS_DIR, folder));
  const hasHtml = contents.some(f => f === 'index.html' || f === 'index.htm');

  // Try to extract a title from the HTML
  let title = toTitleCase(folder);
  for (const htmlFile of ['index.html', 'index.htm']) {
    const htmlPath = path.join(PRESENTATIONS_DIR, folder, htmlFile);
    if (fs.existsSync(htmlPath)) {
      const html = fs.readFileSync(htmlPath, 'utf8');
      const match = html.match(/<title>([^<]+)<\/title>/i);
      if (match && match[1].trim()) {
        title = match[1].trim();
      }
      break;
    }
  }

  const today = new Date().toISOString().slice(0, 10);

  const md = `---
title: "${title}"
type: presentation
date: ${today}
event: ""
presentationPath: ${hasHtml ? folder : ''}
---
`;

  if (DRY_RUN) {
    console.log(`[would create] ${folder}.md → title: "${title}", hasHtml: ${hasHtml}`);
  } else {
    fs.writeFileSync(mdPath, md, 'utf8');
    console.log(`created: ${folder}.md → "${title}"`);
  }
  created++;
}

console.log(`\nDone. Created: ${created}, skipped: ${skipped}`);

function toTitleCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')  // split camelCase
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}
