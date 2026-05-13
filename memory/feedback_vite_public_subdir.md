---
name: feedback_vite_public_subdir
description: Vite dev server doesn't auto-serve index.html for subdirectories in public/ — must use explicit /path/index.html
metadata:
  type: feedback
---

When linking to HTML files nested in `public/` subdirectories (e.g. iApresenter or Quarto exports), always use the explicit `/folder/index.html` path rather than `/folder/`.

**Why:** Astro 5 uses Vite under the hood. Vite's dev server does not resolve directory index files for subdirectories of `publicDir` — it 404s on `/folder/` but serves `/folder/index.html` correctly. The built/static output handles trailing-slash directory resolution fine, so this only affects dev mode.

**How to apply:** Any time we store standalone HTML exports (Quarto, iApresenter, etc.) in `public/` and link to them, use `index.html` explicitly in the href and iframe src.
