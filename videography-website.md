# Cursor Build Prompt — [Client Name] Videography Studio Website

> **How to use this:** Paste this entire document into Cursor as your first prompt (or break it into the phases at the bottom and feed them one at a time — recommended for a project this size). Fill in the `[[ ]]` placeholders with your client's actual brand details before you start. Everything else is ready to go.

---

## 0. Project Brief (give Cursor this context first)

Build a premium, editorial-style videography studio website — visually inspired by high-end wedding portfolio sites (large full-bleed imagery, generous whitespace, serif+sans type pairing, minimal chrome, storytelling-driven layout). The site must be **fully dynamic**: the client manages all content (projects, films, images, text, testimonials) through a custom admin panel — no code edits required to update the site.

**Do not copy any code, images, or text from any existing live website.** Recreate the *style* and *structure* only — the visual language described below, with 100% original components, copy placeholders, and assets.

---

## 1. Tech Stack

- **Framework:** Next.js 14+ (App Router, TypeScript, Server Components where possible)
- **Styling:** Tailwind CSS + CSS variables for design tokens (so re-theming is a one-file change)
- **Database:** PostgreSQL via **Supabase**
- **ORM:** Prisma
- **Auth (admin only):** Supabase Auth (email/password, single admin role to start — extensible to multiple editors later)
- **Media storage:** Supabase Storage (buckets: `films`, `photos`, `thumbnails`)
- **Image handling:** `next/image` with Supabase Storage as the image loader; auto-generate blur placeholders
- **Video:** Store video files/embeds via Supabase Storage or embed Vimeo/YouTube (client preference — default to Vimeo embed for bandwidth reasons, mention this as a choice for the client)
- **Rich text:** Tiptap or similar for the admin panel's editorial/blog content editor
- **Deployment:** Vercel (frontend) + Supabase (DB/storage/auth)
- **Animations:** Framer Motion for scroll-reveal, page transitions, and hover states

---

## 2. Design System (defaults — swap once client provides brand assets)

```css
:root {
  /* Colors — placeholder editorial palette, replace with client's exact brand colors */
  --color-background: #FAF9F6;      /* warm off-white/ivory */
  --color-surface: #FFFFFF;
  --color-text-primary: #1A1A1A;    /* near-black */
  --color-text-secondary: #6B6B6B;  /* muted gray for captions/meta */
  --color-accent: #C9A87C;          /* soft gold/brass — swap for client's accent */
  --color-border: #E5E3DE;

  /* Typography — placeholder pairing, replace with client's exact fonts once known */
  --font-display: "Canela", "Playfair Display", serif;   /* headlines, project titles */
  --font-body: "Neue Montreal", "Inter", sans-serif;      /* body copy, nav, UI */

  /* Spacing scale (editorial sites use generous, consistent spacing) */
  --space-section: clamp(4rem, 10vw, 8rem);
  --space-content: clamp(1.5rem, 4vw, 3rem);
}
```

**Typography rules:**
- Display/serif font for: hero headlines, project/wedding names, section titles — large size (48–96px on desktop), often uppercase or wide letter-spacing for eyebrow labels
- Sans font for: navigation, body paragraphs, captions, buttons — smaller, tighter line-height
- Generous line-height on body text (1.6–1.8) for that "editorial magazine" readability

**Layout rules:**
- Full-bleed/edge-to-edge hero images and gallery images (no container padding on hero)
- Max content width ~1400–1600px for text-heavy sections, with wide margins
- Grid-based photo galleries: mix of full-width, 2-column, and asymmetric layouts (not a rigid uniform grid — editorial sites vary image sizes for visual rhythm)
- Minimal, often transparent/overlay navigation on the homepage hero that becomes solid on scroll
- Lots of negative space between sections

**Motion:**
- Fade-up + slight scale on scroll-reveal for images and text blocks (Framer Motion `whileInView`)
- Smooth cross-fade transitions between pages
- Subtle image zoom-on-hover (scale 1.0 → 1.05) on gallery thumbnails and cards
- Cursor-following custom cursor on hero (optional nice-to-have, flag as Phase 4)

---

## 3. Site Map / Pages

| Page | Route | Purpose |
|---|---|---|
| Home | `/` | Hero (video or image), studio intro, featured projects (3–5), brief about teaser, CTA to contact |
| Films (portfolio) | `/films` | Grid/feed of all video projects, filterable by category (wedding, engagement, editorial, etc.) |
| Single Film/Project | `/films/[slug]` | Full story page: embedded film, photo stills, couple/client names, date, location, vendor credits, narrative copy |
| Photography | `/photography` | Photo-only portfolio feed (if the studio also shoots stills) |
| Single Photo Story | `/photography/[slug]` | Individual shoot gallery + story |
| Journal / Editorial | `/journal` | Blog-style feed — behind-the-scenes, tips, real stories |
| Single Journal Post | `/journal/[slug]` | Rich-text article with embedded images |
| About | `/about` | Studio story, team, philosophy |
| Contact | `/contact` | Inquiry form → stored in DB + email notification |
| Admin Dashboard | `/admin` | Protected, see Section 5 |

---

## 4. Prisma Schema

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Admin {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  createdAt DateTime @default(now())
}

model Project {
  id            String   @id @default(cuid())
  slug          String   @unique
  title         String                 // e.g. "Reva & Zach"
  type          ProjectType            // FILM or PHOTOGRAPHY
  category      String                 // e.g. "Wedding", "Engagement", "Editorial"
  location      String?
  eventDate     DateTime?
  summary       String                 // short teaser for grid/cards
  storyContent  String   @db.Text      // rich text/markdown for full story
  coverImage    String                 // Supabase storage URL
  videoUrl      String?                // Vimeo/YouTube embed URL or Supabase storage URL
  featured      Boolean  @default(false) // show on homepage
  published     Boolean  @default(false)
  vendorCredits Json?                  // { "planner": "...", "venue": "...", "florist": "..." }
  order         Int      @default(0)   // manual drag-to-reorder on homepage/feed
  images        ProjectImage[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

enum ProjectType {
  FILM
  PHOTOGRAPHY
}

model ProjectImage {
  id        String   @id @default(cuid())
  projectId String
  project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  url       String
  alt       String?
  order     Int      @default(0)
  layoutHint String? // "full" | "half" | "third" — lets admin control gallery rhythm
}

model JournalPost {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  excerpt     String
  content     String   @db.Text
  coverImage  String
  published   Boolean  @default(false)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model SiteSettings {
  id              String @id @default("singleton")
  studioName      String
  tagline         String?
  heroMediaUrl    String?          // homepage hero video/image
  heroMediaType   String?          // "video" | "image"
  aboutContent    String? @db.Text
  contactEmail    String?
  contactPhone    String?
  instagramUrl    String?
  logoUrl         String?
  faviconUrl      String?
  primaryColor    String?          // lets client tweak accent color from admin
  updatedAt       DateTime @updatedAt
}

model Inquiry {
  id          String   @id @default(cuid())
  name        String
  email       String
  phone       String?
  eventDate   DateTime?
  eventType   String?
  message     String   @db.Text
  status      InquiryStatus @default(NEW)
  createdAt   DateTime @default(now())
}

enum InquiryStatus {
  NEW
  RESPONDED
  ARCHIVED
}
```

---

## 5. Admin Panel Requirements

**Route:** `/admin`, protected by Supabase Auth middleware — redirect to `/admin/login` if unauthenticated.

**Sections:**

1. **Dashboard** — quick stats: total projects, new inquiries count, recent activity
2. **Projects manager**
   - List view with drag-to-reorder (updates `order` field)
   - Create/edit form: title, slug (auto-generated from title, editable), type, category, location, date, summary, rich-text story editor, cover image upload, video URL/embed, featured toggle, published toggle, vendor credits (repeatable key-value fields)
   - Gallery image manager: drag-drop multi-upload to Supabase Storage, reorder, set alt text, delete
3. **Journal manager** — same CRUD pattern as projects but simpler (rich text editor for blog posts)
4. **Site settings** — single form to edit: studio name, tagline, hero media, about text, contact info, social links, logo/favicon upload, primary accent color picker
5. **Inquiries inbox** — table of contact form submissions, mark as responded/archived, click to view full message
6. **Media library** (optional Phase 4) — central view of all uploaded assets across Supabase Storage buckets

**Non-negotiables:**
- All image uploads go through a single reusable `<ImageUploader>` component that handles Supabase Storage upload + returns the public URL
- Auto-save or clear "unsaved changes" warning on forms
- Slugs must be validated unique before save
- Rich text editor output stored as markdown or sanitized HTML (pick one, be consistent)

---

## 6. SEO & Performance

- Dynamic `generateMetadata()` per project/journal page using title, summary, and cover image (OG tags)
- `next-sitemap` for auto-generated sitemap.xml
- Lazy-load below-the-fold images, priority-load hero
- Optimize all images through `next/image` — never raw `<img>` tags for content images
- Lighthouse target: 90+ performance, 100 accessibility

---

## 7. Build Order (feed to Cursor in phases)

**Phase 1 — Foundation**
Set up Next.js + TypeScript + Tailwind + Prisma + Supabase connection. Implement design tokens (Section 2) as CSS variables and Tailwind config extensions. Build the layout shell: header/nav, footer, page transition wrapper.

**Phase 2 — Public site, static structure first**
Build all public pages (Section 3) with dummy/placeholder content pulled from a local JSON mock — get the visual design, animations, and responsive layout fully right before wiring up the database.

**Phase 3 — Database + dynamic wiring**
Implement Prisma schema, run migrations against Supabase, replace mock JSON with real DB queries (Server Components fetching directly via Prisma). Build the contact form → Inquiry model pipeline with email notification (Resend or Supabase Edge Function).

**Phase 4 — Admin panel**
Supabase Auth login flow, protected `/admin` routes, build out each admin section from Section 5 in order: Site Settings first (so you're not editing empty content), then Projects, then Journal, then Inquiries inbox.

**Phase 5 — Polish**
Framer Motion scroll animations, image optimization pass, SEO metadata, accessibility audit (keyboard nav, alt text enforcement, contrast check), mobile responsiveness pass on every page.

---

## 8. Content Placeholders to Fill Before Launch

- [ ] Client's actual logo (SVG preferred)
- [ ] Exact brand colors (hex codes)
- [ ] Exact brand fonts (with license — check if fonts are licensed for web use, or pick free Google Fonts alternatives that match)
- [ ] Studio name, tagline, about copy
- [ ] At least 3–5 real projects with images/video to seed the portfolio (empty portfolios look bad at launch)
- [ ] Contact email/phone, social links
- [ ] Domain name + hosting/DNS details

---

### Notes for you (not for Cursor)
- Once your client sends real screenshots or a Figma/brand file, swap the placeholder hex codes and font names in Section 2 — that's the only step needed to fully retheme.
- If they want the video embeds hosted directly (not Vimeo/YouTube), factor in Supabase Storage bandwidth costs — worth flagging to the client early since video files are large.
- I can generate the actual starter code (not just the prompt) directly here if you'd rather skip Cursor for the initial scaffold — happy to do either.
