import type { CrmRepository } from "@/core/application/ports/crm.repository";
import { NoopCrmRepository } from "@/core/infrastructure/crm/noop-crm.repository";
import { SupabaseCrmRepository } from "@/core/infrastructure/crm/supabase-crm.repository";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export function createCrmRepository(): CrmRepository {
  const client = getSupabaseServerClient();
  if (client) {
    return new SupabaseCrmRepository();
  }
  return new NoopCrmRepository();
}
