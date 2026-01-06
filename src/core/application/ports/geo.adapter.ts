export type GeoData = {
  country?: string;
  region?: string;
  city?: string;
  ip?: string;
};

export interface GeoAdapter {
  resolve(request: Request): Promise<GeoData>;
}
