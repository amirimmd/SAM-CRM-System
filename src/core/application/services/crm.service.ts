import type { CrmRepository } from "@/core/application/ports/crm.repository";
import type { GeoAdapter } from "@/core/application/ports/geo.adapter";
import type { CrmEvent } from "@/core/domain/crm/event";

type TrackEventPayload = Partial<Pick<CrmEvent, "type" | "path" | "referrer" | "utm">>;

function buildId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
}

export class CrmService {
  constructor(
    private readonly geoAdapter: GeoAdapter,
    private readonly repository: CrmRepository
  ) {}

  async trackEvent(request: Request, payload: TrackEventPayload) {
    const geo = await this.geoAdapter.resolve(request);
    const event: CrmEvent = {
      id: buildId(),
      type: payload.type ?? "page_view",
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
