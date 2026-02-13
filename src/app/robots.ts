import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.saminto.com';

  return {
    rules: {
      userAgent: '*',
      allow: [
        '/', 
        '/fa', 
        '/en',
        '/fa/about', '/en/about',
        '/fa/contact', '/en/contact',
        '/fa/products', '/en/products',
        '/fa/tracking', '/en/tracking',
        '/fa/calculator', '/en/calculator',
      ],
      disallow: [
        '/api/',      // بستن دسترسی به API ها
        '/*/admin/',  // بستن پنل ادمین در همه زبان‌ها
        '/*/staff/',  // بستن پنل کارشناسان
        '/*/partner/',// بستن پنل شرکا
        '/_next/',    // فایل‌های داخلی نکست
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
