# SAM Logistics & CRM Platform

Bilingual logistics and CRM platform built with Next.js App Router, Supabase, and a modular design system. The application supports SEO-first marketing pages, customer dashboards, admin CRM analytics, and future-ready architecture for expansion.

## Stack

- Next.js App Router (TypeScript)
- Tailwind CSS v4 (utility-first styling)
- Supabase (PostgreSQL, Auth, Storage, Realtime)
- Locale routing `/en` and `/fa` with RTL support

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_SITE_URL=https://samlogistics.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

`SUPABASE_SERVICE_ROLE_KEY` is optional but recommended for CRM event inserts without exposing write access publicly.

## Routing overview

- Public marketing: `src/app/[locale]/(public)`
- Customer dashboard: `src/app/[locale]/(dashboard)`
- Admin panel: `src/app/[locale]/(dashboard)/admin`
- Auth pages: `src/app/[locale]/(public)/auth`
- CRM event API: `src/app/api/crm/events`
- Lead capture API: `src/app/api/crm/leads`

Locale detection is handled in `middleware.ts` and supports `/en` and `/fa`.

## CRM tracking

Client-side page views are sent via `CrmTracker` to `/api/crm/events`, with UTM, referrer, session, and visitor IDs stored in Supabase when configured.

## Supabase migrations and policies

CRM events table and RLS policies live under:

- `supabase/migrations/20260106010000_create_crm_events.sql`
- `supabase/migrations/20260106011000_create_crm_leads.sql`
- `supabase/policies/crm_events.sql`
- `supabase/policies/crm_leads.sql`

Apply migrations using Supabase CLI or dashboard tools before enabling analytics.

## Scripts

- `npm run dev` - start the dev server
- `npm run build` - production build
- `npm run start` - start production server
- `npm run lint` - run linting
