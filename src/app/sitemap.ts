import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.saminto.com';
  
  // لیست تمام صفحات عمومی سایت
  const routes = [
    '',
    '/about',
    '/contact',
    '/products',
    '/tracking',
    '/calculator',
  ];

  // لیست زبان‌های سایت
  const locales = ['fa', 'en'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // ایجاد لینک برای هر مسیر در هر زبان
  routes.forEach((route) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly', // صفحه اصلی روزانه، بقیه هفتگی
        priority: route === '' ? 1 : 0.8, // اولویت صفحه اصلی بالاتر است
      });
    });
  });

  return sitemapEntries;
}
