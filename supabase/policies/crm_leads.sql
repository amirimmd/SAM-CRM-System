alter table public.crm_leads enable row level security;

create policy "Allow CRM lead inserts"
on public.crm_leads
for insert
to anon, authenticated
with check (true);
