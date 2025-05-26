// process-readwise.js - Put this in your project root
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const readingDir = './src/content/reading/';
const tempDir = './readwise-temp/'; // Put raw exports here first

// Clean filename for URL-safe slugs
function cleanFilename(filename) {
  return filename
    .toLowerCase()
    .replace(/[#—""'']/g, '') // Remove special chars
    .replace(/[^\w\s-]/g, '') // Keep only letters, numbers, spaces, hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
    .replace(/\.md\.md$/, '.md') // Fix double extensions
    .replace(/-\d+\.md$/, '.md'); // Remove duplicate numbers like -2.md
}

// Fix YAML frontmatter issues
function fixFrontmatter(content) {
  const parts = content.split('---');
  if (parts.length < 3) return content;
  
  let frontmatter = parts[1];
  const body = parts.slice(2).join('---');
  
  try {
    // Parse the existing frontmatter
    const data = yaml.load(frontmatter);
    
    // Clean up the data
    const cleanData = {
      title: data.title || data.Title || 'Untitled',
      author: data.author && data.author !== 'null' ? data.author : null,
      source: data.source || 'readwise',
      tags: [], // Always start with empty tags for manual tagging
      readDate: data.readDate || data.publishDate || null,
    };
    
    // Remove null values
    Object.keys(cleanData).forEach(key => {
      if (cleanData[key] === null || cleanData[key] === 'null') {
        delete cleanData[key];
      }
    });
    
    // Generate clean YAML
    const newFrontmatter = yaml.dump(cleanData, {
      quotingType: '"',
      forceQuotes: true
    });
    
    return `---\n${newFrontmatter}---${body}`;
    
  } catch (error) {
    console.error('Could not parse frontmatter, using fallback');
    
    // Fallback: create minimal valid frontmatter
    const title = content.match(/title:\s*(.+)/)?.[1]?.replace(/['"]/g, '') || 'Untitled';
    const fallbackFrontmatter = yaml.dump({
      title: title,
      source: 'readwise',
      tags: []
    }, { quotingType: '"', forceQuotes: true });
    
    return `---\n${fallbackFrontmatter}---${body}`;
  }
}

// Process all files from temp directory
function processReadwiseExports() {
  if (!fs.existsSync(tempDir)) {
    console.log(`Create ${tempDir} and put your Readwise exports there first.`);
    return;
  }
  
  if (!fs.existsSync(readingDir)) {
    fs.mkdirSync(readingDir, { recursive: true });
  }
  
  const files = fs.readdirSync(tempDir);
  let processed = 0;
  let skipped = 0;
  
  files.forEach(file => {
    if (!file.endsWith('.md')) {
      console.log(`Skipping non-markdown file: ${file}`);
      skipped++;
      return;
    }
    
    try {
      const filePath = path.join(tempDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Clean filename
      const cleanName = cleanFilename(file);
      const outputPath = path.join(readingDir, cleanName);
      
      // Skip if already exists (avoid duplicates)
      if (fs.existsSync(outputPath)) {
        console.log(`Skipping duplicate: ${cleanName}`);
        skipped++;
        return;
      }
      
      // Fix content
      const fixedContent = fixFrontmatter(content);
      
      // Write to reading directory
      fs.writeFileSync(outputPath, fixedContent);
      console.log(`✅ Processed: ${file} → ${cleanName}`);
      processed++;
      
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
      skipped++;
    }
  });
  
  console.log(`\nDone! Processed: ${processed}, Skipped: ${skipped}`);
  console.log('You can now delete the files in readwise-temp/ and restart your dev server.');
}

// Run the processor
processReadwiseExports();