import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/lib/config/site';
import { DEFAULT_LOCALE, isSupportedLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';
import '@/app/globals.css';

// 1. تعریف تایپ جدید برای params (به صورت Promise)
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 2. اضافه کردن await
  const { locale } = await params;
  
  if (!isSupportedLocale(locale)) {
    return {};
  }

  const dict = await getDictionary(locale);
  const localizedBrand = siteConfig.branding.name[locale] ?? siteConfig.branding.name[DEFAULT_LOCALE];
  const title = dict?.site?.title ?? siteConfig.seo.title[locale] ?? siteConfig.seo.title[DEFAULT_LOCALE];
  const description = dict?.site?.description ?? siteConfig.seo.description[locale] ?? siteConfig.seo.description[DEFAULT_LOCALE];

  return {
    title: {
      default: title,
      template: `%s | ${localizedBrand}`,
    },
    description,
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  // 3. اضافه کردن await در کامپوننت اصلی
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className="h-full">
      <body className={`h-full font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
