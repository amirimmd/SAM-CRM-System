import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config/site';
import { SUPPORTED_LOCALES } from '@/lib/i18n/config';

const ROUTES = ['', '/calculator'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return SUPPORTED_LOCALES.flatMap((locale) =>
    ROUTES.map<MetadataRoute.Sitemap[number]>((route) => {
      const url = `${siteConfig.seo.baseUrl}/${locale}${route}`;
      const languages = Object.fromEntries(
        SUPPORTED_LOCALES.map((code) => [code, `${siteConfig.seo.baseUrl}/${code}${route}`]),
      );

      return {
        url,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages,
        },
      };
    }),
  );
}
