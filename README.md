# Videography Studio Website

Premium editorial videography studio website with a custom admin CMS.

## Tech Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS 4** with CSS variable design tokens
- **Prisma** + **Supabase** (PostgreSQL, Auth, Storage)
- **Framer Motion** for scroll animations
- **Tiptap** for rich text editing in admin
- **Resend** for inquiry email notifications

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env.local` and fill in:

- `DATABASE_URL` — Supabase PostgreSQL connection string
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` — for admin file uploads
- `RESEND_API_KEY` / `RESEND_FROM_EMAIL` — for contact form emails
- `NEXT_PUBLIC_SITE_URL` — e.g. `http://localhost:3000`

### 3. Set up Supabase

1. Create a Supabase project
2. Enable Email auth (for admin login)
3. Create Storage buckets: `films`, `photos`, `thumbnails` (public read, authenticated write)
4. Create an admin user in Supabase Auth dashboard

### 4. Database

```bash
npx prisma db push
npm run db:seed
```

### 5. Run locally

```bash
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

## Without Database

The public site works with mock data when no database is connected. Admin and contact form require a configured database.

## Project Structure

- `src/app/(site)/` — Public pages (home, films, photography, journal, about, contact)
- `src/app/admin/` — Protected admin CMS
- `src/components/editorial/` — Public UI components
- `src/components/admin/` — Admin forms and tools
- `src/actions/` — Server Actions for CRUD
- `src/data/mock/` — Fallback placeholder content
- `prisma/schema.prisma` — Database schema

## Deployment

1. Deploy to **Vercel** with env vars configured
2. Run `npx prisma migrate deploy` against production Supabase
3. Run seed with real client content before launch

## Customization

Update design tokens in `src/app/globals.css`. Brand colors, fonts, and content can also be changed from **Admin → Site Settings** once connected to the database.
