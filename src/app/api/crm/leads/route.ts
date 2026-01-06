import { NextResponse } from "next/server";
import { LeadService } from "@/core/application/services/lead.service";
import { createLeadRepository } from "@/core/infrastructure/crm/lead-repository";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const service = new LeadService(createLeadRepository());
  const result = await service.capture(req, body);
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
