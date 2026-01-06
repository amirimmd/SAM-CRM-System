create table if not exists public.crm_leads (
  id uuid primary key,
  name text not null,
  email text not null,
  company text,
  cargo text,
  message text,
  locale text,
  source text,
  path text,
  referrer text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists crm_leads_created_at_idx on public.crm_leads (created_at desc);
create index if not exists crm_leads_email_idx on public.crm_leads (email);
