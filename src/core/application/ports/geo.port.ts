export type GeoData = {
  country?: string;
  region?: string;
  city?: string;
  ip?: string;
};

export interface GeoPort {
  resolve(req: Request): Promise<GeoData>;
}
