# START HERE — Project Context

## Quick Onboarding

New Claude sessions: Run these queries first to get context:

```sql
-- Current project notes
SELECT topic, note FROM session_notes WHERE status = 'active' ORDER BY topic;

-- Asset inventory  
SELECT category, asset_type, notes FROM project_assets ORDER BY category;
```

## Resources

| Resource | Location |
|----------|----------|
| **Live Site** | https://brianleewestfall.github.io/brianleewestfall.com/ |
| **GitHub** | Brianleewestfall/brianleewestfall.com |
| **Supabase** | hhqbugfxtblrmzxnxfes |
| **Storage** | https://hhqbugfxtblrmzxnxfes.supabase.co/storage/v1/object/public/project-assets/ |

## Design System

- **Gold:** #C49A3C
- **Blue:** #3498DB  
- **Dark:** #111214, #1A1B1E
- **Fonts:** Playfair Display, DM Sans, Cormorant Garamond

## Pages

| Page | File | Status |
|------|------|--------|
| Homepage | index.html | ✅ Complete |
| About | about.html | ✅ Complete |
| Pool Safety | pool-safety.html | ✅ Complete |
| Forensic | forensic-visualization.html | ✅ Complete |

## Reference Docs

- `forensic-facts-vs-speculation.md` — Verified vs speculative content for forensic page
- `godaddy-site-archive-manifest.md` — Legacy site archive before migration
- `handoff-inspections-page.md` — Inspections page build specs

## Known Issues

⚠️ **CSS Animation Bug**: Pages use reveal animations that hide content (`opacity: 0`) until JavaScript triggers. If JS doesn't execute, content stays hidden. Fix: Set content visible by default, animate only when `.js-loaded` class present.

## Next Steps

- [ ] Push corrected HTML files with CSS fix
- [ ] Add permit plan thumbnails to images/plans/
- [ ] Point DNS to GitHub Pages
- [ ] Submit sitemap to Google Search Console
