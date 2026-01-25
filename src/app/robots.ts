import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config/site';
import { SUPPORTED_LOCALES } from '@/lib/i18n/config';

export default function robots(): MetadataRoute.Robots {
  const allowPaths = SUPPORTED_LOCALES.map((locale) => `/${locale}`);

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', ...allowPaths],
      },
    ],
    sitemap: `${siteConfig.seo.baseUrl}/sitemap.xml`,
    host: siteConfig.seo.baseUrl,
  };
}
