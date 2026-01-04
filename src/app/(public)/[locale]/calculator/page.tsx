// Server component for the shipping cost calculator page. This component
// loads the localized dictionary, defines the page metadata for SEO/AEO,
// and renders the CalculatorForm client component with translation
// strings. All interactive logic is delegated to CalculatorForm to
// ensure proper separation of server and client concerns.

import type { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';
import CalculatorForm from './CalculatorForm';

interface PageParams {
  locale: Locale;
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  const t = dict.calculator;
  const siteName = dict.site.title;
  const title = `${t.title} | ${siteName}`;
  const description = t.description;
  const canonical = `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/${params.locale}/calculator`;
  const keywords = t.keywords;
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function CalculatorPage({ params }: { params: PageParams }) {
  const dict = await getDictionary(params.locale);
  const t = dict.calculator;
  return <CalculatorForm t={t} locale={params.locale} />;
}