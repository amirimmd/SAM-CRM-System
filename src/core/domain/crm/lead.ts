export type Lead = {
  id: string;
  name: string;
  email: string;
  company?: string;
  cargo?: string;
  message?: string;
  locale?: string;
  source?: string;
  path?: string;
  referrer?: string;
  userAgent?: string;
  createdAt: string;
};
