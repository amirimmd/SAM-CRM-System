import type { GeoPort } from '../../application/ports/geo.port';

export class VercelHeadersGeoAdapter implements GeoPort {
  async resolve(req: Request) {
    const country = req.headers.get('x-vercel-ip-country') ?? undefined;
    const city = req.headers.get('x-vercel-ip-city') ?? undefined;
    return { country, city };
  }
}
