import type { GeoData, GeoPort } from "@/core/application/ports/geo.port";

export class VercelHeadersGeoAdapter implements GeoPort {
  async resolve(request: Request): Promise<GeoData> {
    const headers = request.headers;
    const forwardedFor = headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0]?.trim() : undefined;
    return {
      country: headers.get("x-vercel-ip-country") ?? undefined,
      region: headers.get("x-vercel-ip-country-region") ?? undefined,
      city: headers.get("x-vercel-ip-city") ?? undefined,
      ip,
    };
  }
}
