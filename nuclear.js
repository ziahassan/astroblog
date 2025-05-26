// nuclear-cleanup.js - Preserves metadata but fixes YAML issues
import fs from 'fs';
import path from 'path';

const readingDir = './src/content/reading/';
const cleanDir = './src/content/reading-clean/';

// Ultra-aggressive filename cleaning
function ultraCleanFilename(filename) {
  return filename
    .toLowerCase()
    .replace(/\.md$/, '') // Remove .md extension temporarily
    .replace(/[^a-z0-9]/g, '-') // Replace ANY non-alphanumeric with dash
    .replace(/-+/g, '-') // Replace multiple dashes with single
    .replace(/^-|-$/g, '') // Remove leading/trailing dashes
    .substring(0, 50) // Limit length
    + '.md'; // Add back extension
}

// Extract and clean metadata from original frontmatter
function extractMetadata(originalContent) {
  const metadata = {
    title: 'Untitled',
    author: null,
    source: 'readwise',
    tags: [],
    readDate: null
  };
  
  // Try to extract existing frontmatter
  const frontmatterMatch = originalContent.match(/^---\s*\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    const frontmatterText = frontmatterMatch[1];
    
    // Extract fields with regex (more forgiving than YAML parsing)
    const patterns = {
      title: /(?:title|Title):\s*["\']?([^"'\n]+)["\']?/i,
      author: /author:\s*["\']?([^"'\n]+)["\']?/i,
      source: /source:\s*["\']?([^"'\n]+)["\']?/i,
      readDate: /(?:readDate|publishDate):\s*["\']?([^"'\n]+)["\']?/i,
    };
    
    Object.entries(patterns).forEach(([key, pattern]) => {
      const match = frontmatterText.match(pattern);
      if (match && match[1] && match[1].trim() !== 'null' && match[1].trim() !== '') {
        let value = match[1].trim();
        
        // Clean the value
        if (key === 'title' || key === 'author' || key === 'source') {
          value = value.replace(/[^\w\s-.,!?()]/g, '').trim();
        }
        
        if (value && value.length > 0) {
          metadata[key] = value;
        }
      }
    });
    
    // Try to extract tags
    const tagsMatch = frontmatterText.match(/tags:\s*\[(.*?)\]/s);
    if (tagsMatch && tagsMatch[1].trim()) {
      const tagString = tagsMatch[1].trim();
      if (tagString && tagString !== '') {
        const tags = tagString
          .split(',')
          .map(tag => tag.replace(/["\[\]]/g, '').trim())
          .filter(tag => tag && tag.length > 0);
        
        if (tags.length > 0) {
          metadata.tags = tags;
        }
      }
    }
  }
  
  // Fallback: try to extract title from content if still untitled
  if (metadata.title === 'Untitled') {
    const titlePatterns = [
      /^#\s+(.+)$/m, // Markdown h1
      /^(.{1,100})$/m // First line as fallback (limited length)
    ];
    
    for (const pattern of titlePatterns) {
      const match = originalContent.match(pattern);
      if (match && match[1] && match[1].trim().length > 0) {
        metadata.title = match[1].trim().replace(/[^\w\s-.,!?()]/g, '').substring(0, 100);
        break;
      }
    }
  }
  
  return metadata;
}

// Create clean, valid frontmatter
function createCleanFrontmatter(metadata) {
  const lines = [`---`];
  
  // Add title (always quoted for safety)
  lines.push(`title: "${metadata.title.replace(/"/g, '\\"')}"`);
  
  // Add author if exists
  if (metadata.author) {
    lines.push(`author: "${metadata.author.replace(/"/g, '\\"')}"`);
  }
  
  // Add source
  lines.push(`source: "${metadata.source}"`);
  
  // Add tags
  if (metadata.tags && metadata.tags.length > 0) {
    const tagList = metadata.tags.map(tag => `"${tag.replace(/"/g, '\\"')}"`).join(', ');
    lines.push(`tags: [${tagList}]`);
  } else {
    lines.push(`tags: []`);
  }
  
  // Add readDate if exists
  if (metadata.readDate) {
    lines.push(`readDate: "${metadata.readDate}"`);
  }
  
  lines.push(`---`);
  lines.push(``); // Empty line after frontmatter
  
  return lines.join('\n');
}

// Extract just the content (no frontmatter)
function extractContent(fileContent) {
  // Remove everything between first --- and second ---
  const parts = fileContent.split('---');
  if (parts.length >= 3) {
    return parts.slice(2).join('---').trim();
  }
  
  // If no frontmatter found, return the whole content
  return fileContent.trim();
}

// Process all files with nuclear approach
function nuclearCleanup() {
  if (!fs.existsSync(readingDir)) {
    console.log('Reading directory not found');
    return;
  }
  
  // Create clean directory
  if (!fs.existsSync(cleanDir)) {
    fs.mkdirSync(cleanDir, { recursive: true });
  }
  
  const files = fs.readdirSync(readingDir);
  let processed = 0;
  let errors = 0;
  
  console.log(`Found ${files.length} files to process...`);
  
  files.forEach((file, index) => {
    if (!file.endsWith('.md')) {
      console.log(`Skipping non-markdown: ${file}`);
      return;
    }
    
    try {
      console.log(`[${index + 1}/${files.length}] Processing: ${file}`);
      
      const filePath = path.join(readingDir, file);
      const originalContent = fs.readFileSync(filePath, 'utf8');
      
      // Create ultra-clean filename
      const cleanFilename = ultraCleanFilename(file);
      const outputPath = path.join(cleanDir, cleanFilename);
      
      // Skip if clean version already exists
      if (fs.existsSync(outputPath)) {
        console.log(`  → Skipping, already exists: ${cleanFilename}`);
        return;
      }
      
      // Extract metadata from original file
      const metadata = extractMetadata(originalContent);
      console.log(`  → Title: "${metadata.title}"`);
      if (metadata.author) console.log(`  → Author: "${metadata.author}"`);
      if (metadata.tags.length > 0) console.log(`  → Tags: [${metadata.tags.join(', ')}]`);
      
      // Create completely new file content
      const cleanFrontmatter = createCleanFrontmatter(metadata);
      const contentBody = extractContent(originalContent);
      const newContent = cleanFrontmatter + contentBody;
      
      // Write clean file
      fs.writeFileSync(outputPath, newContent);
      console.log(`  ✅ Created: ${cleanFilename}`);
      processed++;
      
    } catch (error) {
      console.error(`  ❌ Error processing ${file}:`, error.message);
      errors++;
    }
  });
  
  console.log(`\n🎯 Nuclear cleanup complete!`);
  console.log(`   Processed: ${processed}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Clean files in: ${cleanDir}`);
  console.log(`\nNext steps:`);
  console.log(`1. Check the clean files: ls ${cleanDir}`);
  console.log(`2. Check a few files: head ${cleanDir}/*.md`);
  console.log(`3. If they look good: rm -rf ${readingDir} && mv ${cleanDir} ${readingDir}`);
  console.log(`4. Restart your dev server`);
}

// Run the nuclear cleanup
nuclearCleanup();