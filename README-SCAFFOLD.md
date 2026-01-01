# Scaffold Notes

- UI calls ONLY /api (BFF)
- Vendors (Supabase/Vercel) are isolated in infrastructure adapters
- Later migration to self-hosted is done by swapping adapters

Start points:
- CRM endpoint: src/app/api/crm/events/route.ts
- Locale middleware: src/middleware.ts
