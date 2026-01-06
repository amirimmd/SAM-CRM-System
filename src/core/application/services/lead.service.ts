import type { LeadRepository } from "@/core/application/ports/lead.repository";
import type { Lead } from "@/core/domain/crm/lead";
import { createId } from "@/core/application/utils/id";

type CaptureLeadPayload = Partial<
  Pick<Lead, "name" | "email" | "company" | "cargo" | "message" | "locale" | "source" | "path" | "referrer">
>;

export class LeadService {
  constructor(private readonly repository: LeadRepository) {}

  async capture(request: Request, payload: CaptureLeadPayload) {
    const name = typeof payload.name === "string" ? payload.name.trim() : "";
    const email = typeof payload.email === "string" ? payload.email.trim() : "";

    if (!name || !email) {
      return { ok: false, error: "missing_fields" };
    }

    const lead: Lead = {
      id: createId(),
      name,
      email,
      company: typeof payload.company === "string" ? payload.company.trim() : undefined,
      cargo: typeof payload.cargo === "string" ? payload.cargo.trim() : undefined,
      message: typeof payload.message === "string" ? payload.message.trim() : undefined,
      locale: typeof payload.locale === "string" ? payload.locale : undefined,
      source: typeof payload.source === "string" ? payload.source : "request_form",
      path: typeof payload.path === "string" ? payload.path : undefined,
      referrer: typeof payload.referrer === "string" ? payload.referrer : undefined,
      userAgent: request.headers.get("user-agent") ?? undefined,
      createdAt: new Date().toISOString(),
    };

    await this.repository.saveLead(lead);

    return { ok: true, id: lead.id };
  }
}
