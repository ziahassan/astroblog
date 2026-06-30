#!/usr/bin/env node
// Syncs Obsidian Zettelkasten → src/content/notes/
// Usage: node scripts/sync-vault.mjs
// Notes with `private: true` in frontmatter are excluded.

import { readdir, readFile, copyFile, rm, access, stat } from 'fs/promises';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const VAULT = '/Volumes/MacMiniExternal/notes2024/Zettelkasten';
const DEST = join(fileURLToPath(import.meta.url), '../../src/content/notes');

async function isPrivate(filePath) {
  try {
    const text = await readFile(filePath, 'utf8');
    if (!text.startsWith('---')) return false;
    const end = text.indexOf('---', 3);
    if (end === -1) return false;
    const frontmatter = text.slice(3, end);
    return /^private:\s*["']?true["']?\s*$/m.test(frontmatter);
  } catch {
    return false;
  }
}

async function findMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    // Use stat() so symlinks are followed (isFile/isDirectory on dirent doesn't follow symlinks)
    const s = await stat(full).catch(err => { console.warn(`  Warning: could not stat ${full}: ${err.message}`); return null; });
    if (!s) continue;
    if (s.isDirectory()) {
      files.push(...await findMarkdownFiles(full));
    } else if (s.isFile() && extname(entry.name) === '.md' && !entry.name.startsWith('_') && !entry.name.includes('#')) {
      files.push(full);
    }
  }
  return files;
}

// Check vault is accessible
try {
  await access(VAULT);
} catch {
  console.error(`Error: Vault not found at ${VAULT}`);
  console.error('Make sure your external drive is connected.');
  process.exit(1);
}

// Clear existing notes
const existing = await readdir(DEST);
for (const f of existing) {
  if (f.endsWith('.md') || f.endsWith('.mdx')) {
    await rm(join(DEST, f));
  }
}

const allFiles = await findMarkdownFiles(VAULT);

let copied = 0, skippedPrivate = 0, skippedError = 0;
const seen = new Map(); // filename → source path

for (const file of allFiles) {
  const name = basename(file);

  if (await isPrivate(file)) {
    skippedPrivate++;
    continue;
  }

  if (seen.has(name)) {
    console.warn(`  Conflict: "${name}"\n    kept:    ${seen.get(name)}\n    dropped: ${file}`);
  } else {
    seen.set(name, file);
    try {
      await copyFile(file, join(DEST, name));
      copied++;
    } catch (err) {
      console.warn(`  Error copying "${name}": ${err.message}`);
      skippedError++;
    }
  }
}

if (skippedError > 0) {
  console.error(`\n⚠️  ${skippedError} file(s) failed to copy — try re-running the sync.`);
}

console.log(`\nDone.`);
console.log(`  Copied:            ${copied}`);
console.log(`  Skipped (private): ${skippedPrivate}`);
console.log(`\nNext steps:`);
console.log(`  git add src/content/notes`);
console.log(`  git commit -m "sync: update notes from vault"`);
console.log(`  git push`);
