create table if not exists public.crm_events (
  id uuid primary key,
  type text not null,
  session_id text,
  visitor_id text,
  path text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  user_agent text,
  country text,
  region text,
  city text,
  ip text,
  created_at timestamptz not null default now()
);

create index if not exists crm_events_created_at_idx on public.crm_events (created_at desc);
create index if not exists crm_events_session_id_idx on public.crm_events (session_id);
create index if not exists crm_events_visitor_id_idx on public.crm_events (visitor_id);
create index if not exists crm_events_country_idx on public.crm_events (country);
