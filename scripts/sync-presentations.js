#!/usr/bin/env node
// Scans public/presentations/ and creates stub .md files in src/content/teaching/
// for any folder that doesn't already have a teaching entry with that presentationPath.
// Run with: npm run sync-presentations

import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join, resolve } from 'path';

const root = resolve(import.meta.dirname, '..');
const presentationsDir = join(root, 'public/presentations');
const teachingDir = join(root, 'src/content/teaching');

// Collect all presentationPath values already declared in teaching entries
const existingPaths = new Set();
for (const file of readdirSync(teachingDir)) {
  if (!file.endsWith('.md')) continue;
  const content = readFileSync(join(teachingDir, file), 'utf8');
  const match = content.match(/presentationPath:\s*(.+)/);
  if (match) existingPaths.add(match[1].trim());
}

// Convert folder-name to Title Case (hyphens/underscores → spaces)
function toTitle(slug) {
  return slug.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

let created = 0;
for (const entry of readdirSync(presentationsDir)) {
  const fullPath = join(presentationsDir, entry);
  if (!statSync(fullPath).isDirectory()) continue;
  if (existingPaths.has(entry)) {
    console.log(`  skip  ${entry} (already has an entry)`);
    continue;
  }

  // Use the folder's mtime as the date
  const mtime = statSync(fullPath).mtime;
  const date = mtime.toISOString().split('T')[0];

  const title = toTitle(entry);
  const outFile = join(teachingDir, `${entry}.md`);

  const yaml = `---
title: "${title}"
type: presentation
date: ${date}
presentationPath: ${entry}
# event: "Course or conference name"
# description: "One-line summary"
# tags: []
---
`;

  writeFileSync(outFile, yaml);
  console.log(`  created  src/content/teaching/${entry}.md  →  "${title}"`);
  created++;
}

if (created === 0) {
  console.log('All presentation folders already have entries.');
} else {
  console.log(`\nDone. ${created} file(s) created — open them to fill in title and event.`);
}
