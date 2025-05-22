export function generateNoteGraph(notes) {
    const nodes = notes.map(note => ({
      id: note.slug,
      title: note.data.title ?? note.slug,
    }));
  
    const links = [];
  
    for (const sourceNote of notes) {
      const raw = sourceNote.body;
      for (const targetNote of notes) {
        if (
          sourceNote.slug !== targetNote.slug &&
          raw.includes(`[[${targetNote.slug}]]`)
        ) {
          links.push({
            source: sourceNote.slug,
            target: targetNote.slug,
          });
        }
      }
    }
  
    return { nodes, links };
  }