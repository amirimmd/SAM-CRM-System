import type { CrmEvent } from "@/core/domain/crm/event";

export interface CrmRepository {
  saveEvent(event: CrmEvent): Promise<void>;
}
