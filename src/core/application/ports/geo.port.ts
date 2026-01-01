export interface GeoPort {
  resolve(req: Request): Promise<{ country?: string; city?: string }>;
}
