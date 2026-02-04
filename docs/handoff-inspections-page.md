# HANDOFF: Build Inspections Page for BrianLeeWestfall.com

## Quick Start
1. Query Supabase: `SELECT * FROM session_notes WHERE status='active'`
2. Read GitHub: `docs/START-HERE.md` in `Brianleewestfall/brianleewestfall.com`
3. Check existing site pages in same repo for design patterns

## Design System
- **Navy:** #111214
- **Gold:** #C49A3C
- **Blue:** #3498DB
- **Font:** Ubuntu (headings), Lato (body) — matches current GoDaddy site
- **Dark background** sections: #161616 (current site uses this)
- **Light text on dark:** #F7F7F7

## Current GoDaddy Inspections Page Content (EXACT TEXT)

### Page Title / Meta
`Pool Damage Inspections & Insurance Reports | Brian Lee Westfall`

### Hero Section Heading
"Forensic Inspections & Damage Assessment"

### Body Copy
> With over 20 years of industry experience I provide expert pool inspections for two critical situations:
>
> **Insurance Claims (Fire, Flood, & Storm):**
> I act as a neutral expert to distinguish between normal age-related wear and actual insurable damage. My reports provide fair, market-accurate repair estimates that help resolve claims quickly and honestly.
>
> **Pre-Purchase Home Inspections:**
> Don't rely on a general home inspector for your pool. I perform specialized testing to catch expensive problems—like plumbing leaks or structural failure—before you buy. My goal is to ensure your dream home doesn't come with a nightmare pool.

### Images on Page
6 Pool Inspection Damage photos archived in Supabase Storage and local ZIP.
Current Adjusters Licence image also on page.
**TX All-Lines Insurance Adjuster License #2270028**

## Page Structure to Build

```
inspections.html
├── Shared nav header (same as index.html, about.html)
├── Hero section (dark bg #161616)
│   ├── Heading: "Forensic Inspections & Damage Assessment"
│   └── Subheading: "20+ Years of Pool Industry Experience"
├── Two-column services section
│   ├── Left: Insurance Claims (Fire, Flood, & Storm)
│   └── Right: Pre-Purchase Home Inspections
├── Photo gallery section (6 damage photos, 2x3 or 3x2 grid)
├── Credentials section (TX License image + number)
├── CTA: "Schedule an Inspection" → /contact
└── Shared footer
```

## SEO
- H1: "Pool Damage Inspections & Insurance Reports"
- Meta: Focus on pool damage inspections, insurance claims, pre-purchase, Fort Worth TX
- Add local business structured data

## Images to Upload to Supabase
Upload to `website-assets/inspections/` with WebP workflow (full + 800w + 400w):
- Pool_Inspection_Damage_1-6.jpg (391KB-885KB each)
- Current_Adjusters_Licence.jpg (404KB)

## Enhancement Opportunities
- Insurance Adjuster License = differentiator most inspectors lack
- 20+ years construction = knows HOW pools are built
- Forensic visualization capability = 3D damage reconstructions
- Bridge subtly to forensic-visualization.html services
- Dual RTX 4090 = professional documentation hardware

## Key References
- GitHub repo: `Brianleewestfall/brianleewestfall.com`
- Supabase: `hhqbugfxtblrmzxnxfes`
- Tables: `project_assets`, `session_notes`
- Storage: `website-assets` bucket (public)
- Docs: `START-HERE.md`, `forensic-facts-vs-speculation.md`, `godaddy-site-archive-manifest.md`
