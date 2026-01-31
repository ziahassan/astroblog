export function generateNoteGraph(notes, connectedOnly = true) {
    // Build lookup maps for O(1) matching
    const slugToNote = new Map();
    const titleToSlug = new Map();

    for (const note of notes) {
      slugToNote.set(note.slug, note);
      if (note.data?.title) {
        titleToSlug.set(note.data.title, note.slug);
      }
    }

    const links = [];
    const wikiLinkRegex = /\[\[([^\]]+)\]\]/g;
    const connectedSlugs = new Set();

    for (const sourceNote of notes) {
      const raw = sourceNote.body || '';
      if (!raw) continue;

      // Extract all wiki-links from this note
      const matches = raw.matchAll(wikiLinkRegex);
      const seenTargets = new Set();

      for (const match of matches) {
        const linkText = match[1];

        // Check if it matches a slug or title
        let targetSlug = null;
        if (slugToNote.has(linkText)) {
          targetSlug = linkText;
        } else if (titleToSlug.has(linkText)) {
          targetSlug = titleToSlug.get(linkText);
        }

        // Add link if valid and not duplicate
        if (targetSlug && targetSlug !== sourceNote.slug && !seenTargets.has(targetSlug)) {
          seenTargets.add(targetSlug);
          links.push({
            source: sourceNote.slug,
            target: targetSlug,
          });
          connectedSlugs.add(sourceNote.slug);
          connectedSlugs.add(targetSlug);
        }
      }
    }

    // Only include connected nodes for performance
    const filteredNotes = connectedOnly
      ? notes.filter(note => connectedSlugs.has(note.slug))
      : notes;

    const nodes = filteredNotes.map(note => ({
      id: note.slug,
      title: note.data?.title ?? note.slug,
    }));

    return { nodes, links };
  }