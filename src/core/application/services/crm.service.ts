import type { CrmRepository } from "@/core/application/ports/crm.repository";
import type { GeoPort } from "@/core/application/ports/geo.port";
import type { CrmEvent } from "@/core/domain/crm/event";
import { createId } from "@/core/application/utils/id";

type TrackEventPayload = Partial<
  Pick<CrmEvent, "type" | "path" | "referrer" | "utm" | "sessionId" | "visitorId">
>;

export class CrmService {
  constructor(
    private readonly geoAdapter: GeoPort,
    private readonly repository: CrmRepository
  ) {}

  async trackEvent(request: Request, payload: TrackEventPayload) {
    const geo = await this.geoAdapter.resolve(request);
    const event: CrmEvent = {
      id: createId(),
      type: payload.type ?? "page_view",
      sessionId: payload.sessionId,
      visitorId: payload.visitorId,
      path: payload.path,
      referrer: payload.referrer,
      utm: payload.utm,
      userAgent: request.headers.get("user-agent") ?? undefined,
      createdAt: new Date().toISOString(),
      geo,
    };

    await this.repository.saveEvent(event);

    return { ok: true, id: event.id };
  }
}
