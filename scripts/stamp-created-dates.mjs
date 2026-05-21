// Reads file birthtimes from the Obsidian vault and writes them as
// `created:` frontmatter into the matching Astro notes.
// Run with: node scripts/stamp-created-dates.mjs [--dry-run]

import fs from 'fs';
import path from 'path';

const VAULT_DIR = '/Volumes/MacMiniExternal/notes2024/Zettelkasten/AtomicNotes';
const NOTES_DIR = './src/content/notes';
const DRY_RUN = process.argv.includes('--dry-run');

if (DRY_RUN) console.log('[dry-run] No files will be modified.\n');

const notes = fs.readdirSync(NOTES_DIR).filter(f => f.endsWith('.md'));

let stamped = 0, skipped = 0, noMatch = 0, corrupt = 0;

for (const filename of notes) {
  const vaultPath = path.join(VAULT_DIR, filename);
  const notePath = path.join(NOTES_DIR, filename);

  // Skip if no matching vault file
  if (!fs.existsSync(vaultPath)) {
    noMatch++;
    continue;
  }

  const birthtime = fs.statSync(vaultPath).birthtime;
  const year = birthtime.getFullYear();

  // Skip corrupt 1984 epoch dates
  if (year < 2000) {
    corrupt++;
    continue;
  }

  const createdStr = birthtime.toISOString().slice(0, 10); // YYYY-MM-DD

  const raw = fs.readFileSync(notePath, 'utf8');

  // If already has a non-corrupt created date, skip
  const existingCreated = raw.match(/^created:\s*(.+)$/m);
  if (existingCreated) {
    skipped++;
    continue;
  }

  let updated;
  if (raw.startsWith('---')) {
    // Insert created: after the opening ---
    updated = raw.replace(/^---\n/, `---\ncreated: ${createdStr}\n`);
  } else {
    // No frontmatter — prepend one
    updated = `---\ncreated: ${createdStr}\n---\n\n${raw}`;
  }

  if (DRY_RUN) {
    console.log(`[would stamp] ${filename} → ${createdStr}`);
  } else {
    fs.writeFileSync(notePath, updated, 'utf8');
    console.log(`stamped: ${filename} → ${createdStr}`);
  }
  stamped++;
}

console.log(`\nDone. Stamped: ${stamped}, already had date: ${skipped}, no vault match: ${noMatch}, corrupt dates: ${corrupt}`);
