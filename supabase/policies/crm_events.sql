alter table public.crm_events enable row level security;

create policy "Allow CRM event inserts"
on public.crm_events
for insert
to anon, authenticated
with check (true);
