import type { GeoPort } from '../ports/geo.port';

export class CrmService {
  constructor(private geo: GeoPort) {}

  async trackEvent(req: Request, payload: any) {
    const geo = await this.geo.resolve(req);
    // TODO: persist event in repository
    return { ok: true, geo, received: payload };
  }
}
