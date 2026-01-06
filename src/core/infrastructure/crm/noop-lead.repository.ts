import type { LeadRepository } from "@/core/application/ports/lead.repository";
import type { Lead } from "@/core/domain/crm/lead";

export class NoopLeadRepository implements LeadRepository {
  async saveLead(_lead: Lead): Promise<void> {
    return;
  }
}
