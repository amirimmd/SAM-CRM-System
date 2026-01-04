// This layout component wraps all public pages. It dynamically sets
// the language and text direction based on the current locale and
// applies a basic global styling. The layout also defines a root
// metadata object for SEO and AEO purposes, including sensible
// defaults for robots and viewport. Individual pages can override
// metadata via their own `generateMetadata` functions.

import type { ReactNode } from 'react';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from '@/lib/i18n/config';
import '@/app/globals.css';

export const metadata = {
  // Provide default robots policy and viewport settings. These values
  // enhance SEO by ensuring search engines index and follow links, and
  // define responsive scaling behaviour. Pages may override these
  // fields in their own metadata definitions.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    minimumScale: 1,
  },
};

interface PublicLocaleLayoutProps {
  children: ReactNode;
  params: { locale: Locale };
}

export default function PublicLocaleLayout({ children, params }: PublicLocaleLayoutProps) {
  const locale = params.locale;
  // Determine the direction of text based on locale. Persian (fa) is RTL.
  const dir = locale === 'fa' ? 'rtl' : 'ltr';
  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      {/* Setting a global class on the body for base styling. */}
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}