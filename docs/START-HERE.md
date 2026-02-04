# START HERE — Project Context for Future Sessions

## Quick Onboarding
Any new Claude session should run these two queries first:

```sql
-- Get current project status and notes
SELECT topic, note FROM session_notes WHERE status = 'active' ORDER BY topic, created_at;

-- Get full asset inventory
SELECT category, client_name, asset_type, date_original, key_quote, notes 
FROM project_assets ORDER BY category, date_original;
```

## Key Resources
- **Supabase project**: hhqbugfxtblrmzxnxfes
- **GitHub repo**: Brianleewestfall/brianleewestfall.com
- **Storage base URL**: https://hhqbugfxtblrmzxnxfes.supabase.co/storage/v1/object/public/website-assets/
- **Design system**: Navy #111214, Gold #C49A3C, Blue #3498DB

## Database Tables
- `project_assets` — Master registry of all uploaded files with metadata and key quotes
- `session_notes` — Cross-conversation continuity notes (check status='active')

## Important Files in This Repo
- `docs/forensic-facts-vs-speculation.md` — CRITICAL: separates verified facts from Sonnet speculation
- `docs/START-HERE.md` — This file

## Active Workstreams
1. **Forensic visualization page** — waiting on Brian's Y/N answers (see forensic-facts-vs-speculation.md)
2. **About page timeline** — 1987→wireless→2004→pools→2016→3D viz→2026→forensic+AI
3. **SEO fixes** — index.html and forensic-visualization.html need updates
4. **Asset integration** — 45 archived assets ready to embed in website sections
5. **Demo video** — Brian creating hypothetical forensic scenario from Szablowski condo model
