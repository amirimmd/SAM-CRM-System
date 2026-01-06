import type { CrmRepository } from "@/core/application/ports/crm.repository";
import type { CrmEvent } from "@/core/domain/crm/event";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export class SupabaseCrmRepository implements CrmRepository {
  async saveEvent(event: CrmEvent): Promise<void> {
    const client = getSupabaseServerClient();
    if (!client) {
      return;
    }

    await client.from("crm_events").insert({
      id: event.id,
      type: event.type,
      path: event.path,
      referrer: event.referrer,
      utm_source: event.utm?.utm_source,
      utm_medium: event.utm?.utm_medium,
      utm_campaign: event.utm?.utm_campaign,
      utm_content: event.utm?.utm_content,
      user_agent: event.userAgent,
      created_at: event.createdAt,
      country: event.geo?.country,
      region: event.geo?.region,
      city: event.geo?.city,
      ip: event.geo?.ip,
    });
  }
}
