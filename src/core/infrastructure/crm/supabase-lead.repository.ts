import type { LeadRepository } from "@/core/application/ports/lead.repository";
import type { Lead } from "@/core/domain/crm/lead";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export class SupabaseLeadRepository implements LeadRepository {
  async saveLead(lead: Lead): Promise<void> {
    const client = getSupabaseServerClient();
    if (!client) {
      return;
    }

    await client.from("crm_leads").insert({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      company: lead.company,
      cargo: lead.cargo,
      message: lead.message,
      locale: lead.locale,
      source: lead.source,
      path: lead.path,
      referrer: lead.referrer,
      user_agent: lead.userAgent,
      created_at: lead.createdAt,
    });
  }
}
