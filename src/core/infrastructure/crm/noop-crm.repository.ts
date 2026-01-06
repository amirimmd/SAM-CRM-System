import type { CrmRepository } from "@/core/application/ports/crm.repository";
import type { CrmEvent } from "@/core/domain/crm/event";

export class NoopCrmRepository implements CrmRepository {
  async saveEvent(_event: CrmEvent): Promise<void> {
    return;
  }
}
