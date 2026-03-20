# Site Notes

## Design System

### Color Roles
- **Normal text** (body copy, "Hey, I'm", bio text): `var(--text)` = `#6e756e` — muted, recedes
- **Emphasis text** ("Peter", headings that should pop): `#90b890` — subtle green tint, stands out
- **Header link text** (home, about, writing + X/LinkedIn icons): `#b0a0a0` — subtle warm/red tint, underlined. Underline color `#2a2224` (very subtle). Hover: `#d0b8b8` with underline `#504045`. Icons match this color.
- **Secondary text** (dates, labels, dimmed elements): `var(--text-secondary)` = `#485048`
- **Background**: `#0e0e10`
- **Borders**: `#1a1e1a`
- All colors have a subtle green tint — not obviously green, just slightly shifted from neutral gray

### Typography
- Font: IBM Plex Mono (monospace) — this IS the terminal aesthetic, kept subtle
- Body: 14px, font-weight 300
- h1 (name): 1.6rem, font-weight 500
- Nav links: 0.8rem, underlined (underline always visible, brightens on hover)

### Layout
- Content max-width: 720px, centered
- Nav: fixed top, full viewport width, frosted glass blur background
- Left: home / about / writing links (underlined). Right: X and LinkedIn SVG icons
- About section has top padding to clear fixed nav

### Boot Sequence
- Plays on every page load to `/` (no hash)
- Skips if URL has a hash OR if referrer is the site itself (internal navigation)
- Types out line by line:
  1. Observing
  2. Generating World Model
  3. Identifying Anomalies
  4. Recalibrating…
  5. Recalibrating…
- ~3.2 seconds total, then fades into site

### Key Decisions
- Terminal aesthetic comes from monospace font + dark palette, NOT from literal terminal prompts or decorations
- No scanlines, no noise overlay, no glitch effects — subtle and clean
- Inspired by: seancai.com, michaeldempsey.me, jaslavie.com, jackoregankenny.com, 0ak.hu
- Social icons (X, LinkedIn) are small SVGs, same brightness as nav links
- Fade-in animations on scroll (IntersectionObserver)

### Structure
- `index.html` — main page (about + writing sections)
- `style.css` — all styles (cache-busted via `?v=N` query param)
- `posts/template.html` — copy for each new writing post
- `notes.md` — this file (not deployed, local reference)

### Deployment
- Repo: peter-devlin/peter-devlin.github.io
- Live: https://peter-devlin.github.io
- Push from local, GitHub Pages auto-deploys
- CDN caches aggressively — bump `?v=N` on style.css link when changing CSS

## Quotes to maybe use later
- "Close this world. Open the next." — Serial Experiments Lain
