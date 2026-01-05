import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { siteConfig } from '@/lib/config/site';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';
import '@/app/globals.css';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const locale = params.locale;
  const dict = await getDictionary(locale);
  const localizedBrand = siteConfig.branding.name[locale] ?? siteConfig.branding.name[DEFAULT_LOCALE];
  const title = dict?.site?.title ?? siteConfig.seo.title[locale] ?? siteConfig.seo.title[DEFAULT_LOCALE];
  const description = siteConfig.seo.description[locale] ?? siteConfig.seo.description[DEFAULT_LOCALE];
  const keywords = siteConfig.seo.keywords[locale] ?? siteConfig.seo.keywords[DEFAULT_LOCALE];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: title,
    url: siteConfig.seo.baseUrl,
    inLanguage: locale,
    brand: {
      '@type': 'Brand',
      name: localizedBrand,
    },
  };

  return {
    metadataBase: new URL(siteConfig.seo.baseUrl),
    title: {
      default: title,
      template: `%s | ${localizedBrand}`,
    },
    description,
    keywords,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(SUPPORTED_LOCALES.map((code) => [code, `/${code}`])),
    },
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      locale,
      type: 'website',
      siteName: localizedBrand,
      images: [
        {
          url: siteConfig.seo.image,
          alt: title,
        },
      ],
    },
    other: {
      'application/ld+json': JSON.stringify(schema),
    },
  };
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: Locale };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const locale = params.locale;
  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
