import type { Lead } from "@/core/domain/crm/lead";

export interface LeadRepository {
  saveLead(lead: Lead): Promise<void>;
}
