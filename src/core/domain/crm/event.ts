export type CrmEvent = {
  id: string;
  type: string;
  path?: string;
  referrer?: string;
  utm?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
  };
  userAgent?: string;
  createdAt: string;
  geo?: {
    country?: string;
    region?: string;
    city?: string;
    ip?: string;
  };
};
