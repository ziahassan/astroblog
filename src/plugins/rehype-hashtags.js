import { visit } from 'unist-util-visit';

const SKIP_TAGS = new Set(['code', 'pre', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'script', 'style']);

export default function rehypeHashtags() {
  return (tree) => {
    const replacements = [];

    visit(tree, 'text', (node, index, parent) => {
      if (!parent || SKIP_TAGS.has(parent.tagName)) return;
      if (!/#[a-zA-Z]/.test(node.value)) return;
      replacements.push({ node, index, parent });
    });

    // Reverse so splice indices stay valid
    for (const { node, index, parent } of replacements.reverse()) {
      const text = node.value;
      const regex = /#([a-zA-Z][a-zA-Z0-9_-]*)/g;
      const nodes = [];
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          nodes.push({ type: 'text', value: text.slice(lastIndex, match.index) });
        }
        nodes.push({
          type: 'element',
          tagName: 'a',
          properties: { href: `/tags/${match[1]}`, className: ['hashtag-link'] },
          children: [{ type: 'text', value: match[0] }],
        });
        lastIndex = regex.lastIndex;
      }

      if (lastIndex < text.length) {
        nodes.push({ type: 'text', value: text.slice(lastIndex) });
      }

      parent.children.splice(index, 1, ...nodes);
    }
  };
}
