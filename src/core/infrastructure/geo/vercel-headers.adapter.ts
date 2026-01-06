import type { GeoAdapter, GeoData } from "@/core/application/ports/geo.adapter";

export class VercelHeadersGeoAdapter implements GeoAdapter {
  async resolve(request: Request): Promise<GeoData> {
    const headers = request.headers;
    return {
      country: headers.get("x-vercel-ip-country") ?? undefined,
      region: headers.get("x-vercel-ip-country-region") ?? undefined,
      city: headers.get("x-vercel-ip-city") ?? undefined,
      ip: headers.get("x-forwarded-for") ?? undefined,
    };
  }
}
