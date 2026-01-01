import { NextResponse } from 'next/server';
import { CrmService } from '@/core/application/services/crm.service';
import { VercelHeadersGeoAdapter } from '@/core/infrastructure/geo/vercel-headers.adapter';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const service = new CrmService(new VercelHeadersGeoAdapter());
  const result = await service.trackEvent(req, body);
  return NextResponse.json(result);
}
