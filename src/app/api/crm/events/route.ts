import { NextResponse } from 'next/server';
import { CrmService } from "@/core/application/services/crm.service";
import { createCrmRepository } from "@/core/infrastructure/crm/repository";
import { VercelHeadersGeoAdapter } from "@/core/infrastructure/geo/vercel-headers.adapter";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const service = new CrmService(new VercelHeadersGeoAdapter(), createCrmRepository());
  const result = await service.trackEvent(req, body);
  return NextResponse.json(result);
}
