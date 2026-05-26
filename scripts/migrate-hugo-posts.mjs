// Converts Hugo TOML frontmatter (+++) to Astro YAML (---) for blog posts.
// Run with: node scripts/migrate-hugo-posts.mjs [--dry-run]

import fs from 'fs';
import path from 'path';

const BLOG_DIR = './src/content/blog';
const DRY_RUN = process.argv.includes('--dry-run');

if (DRY_RUN) console.log('[dry-run] No files will be modified.\n');

const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
let converted = 0, skipped = 0, errors = 0;

for (const file of files) {
  const filePath = path.join(BLOG_DIR, file);
  const raw = fs.readFileSync(filePath, 'utf8');

  // Already YAML — skip
  if (raw.startsWith('---')) {
    skipped++;
    continue;
  }

  // Extract first +++ block only
  const tomlMatch = raw.match(/^\+\+\+([\s\S]*?)\+\+\+/);
  if (!tomlMatch) {
    console.warn(`  no frontmatter: ${file}`);
    errors++;
    continue;
  }

  const toml = tomlMatch[1];

  // Parse TOML fields
  const title = toml.match(/^title\s*=\s*"([^"]*)"/m)?.[1] ?? '';
  const dateRaw = toml.match(/^date\s*=\s*(.+)/m)?.[1]?.trim() ?? '';
  const draftRaw = toml.match(/^draft\s*=\s*(\w+)/m)?.[1] ?? '';

  // Normalize date: could be 2002-01-12, 2002-01-12T00:00:00Z, or just 2002
  let publishDate = dateRaw.replace(/T.*$/, '').replace(/"/g, '');
  if (/^\d{4}$/.test(publishDate)) publishDate = `${publishDate}-01-01`;

  // Build YAML frontmatter
  let yaml = `---\ntitle: "${title.replace(/"/g, '\\"')}"\npublishDate: ${publishDate}\n`;
  if (draftRaw === 'true') yaml += `draft: true\n`;
  yaml += `---\n`;

  // Body: everything after the first +++ block, stripping any stray +++ blocks
  let body = raw.slice(tomlMatch[0].length);
  body = body.replace(/^\+\+\+[\s\S]*?\+\+\+\n?/gm, '').trimStart();

  const result = yaml + '\n' + body;

  if (DRY_RUN) {
    console.log(`[would convert] ${file}`);
    console.log(`  publishDate: ${publishDate}, draft: ${draftRaw || 'false'}`);
  } else {
    fs.writeFileSync(filePath, result, 'utf8');
    converted++;
  }
}

console.log(`\nDone. Converted: ${converted}, already YAML: ${skipped}, errors: ${errors}`);
