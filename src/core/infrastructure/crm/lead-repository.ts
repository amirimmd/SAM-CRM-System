import type { LeadRepository } from "@/core/application/ports/lead.repository";
import { NoopLeadRepository } from "@/core/infrastructure/crm/noop-lead.repository";
import { SupabaseLeadRepository } from "@/core/infrastructure/crm/supabase-lead.repository";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export function createLeadRepository(): LeadRepository {
  const client = getSupabaseServerClient();
  if (client) {
    return new SupabaseLeadRepository();
  }
  return new NoopLeadRepository();
}
