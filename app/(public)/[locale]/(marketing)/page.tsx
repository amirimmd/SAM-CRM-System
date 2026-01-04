import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';

/**
 * Generate dynamic metadata for the home page.
 * This ensures proper SEO and AEO tags are included for each locale.
 */
export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = await getDictionary(params.locale);
  const home = dict.home;
  return {
    title: home.title,
    description: home.description,
    keywords: home.keywords,
    alternates: {
      canonical: `/${params.locale}`,
    },
    openGraph: {
      title: home.title,
      description: home.description,
      locale: params.locale,
      type: 'website',
      siteName: dict.site.title,
    },
    twitter: {
      card: 'summary_large_image',
      title: home.title,
      description: home.description,
    },
  };
}

/**
 * Home page for the marketing site.
 * Displays a localized hero section and feature highlights.
 */
export default async function MarketingHomePage({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = await getDictionary(params.locale);
  const { home } = dict;
  return (
    <main>
      {/* Hero section */}
      <header className="flex flex-col items-center text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{home.title}</h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
          {home.tagline}
        </p>
        <p className="max-w-3xl text-gray-700 dark:text-gray-400 mb-8">
          {home.description}
        </p>
        <Link
          href={`/${params.locale}/calculator`}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-md transition"
        >
          {home.cta}
        </Link>
      </header>

      {/* Features section */}
      <section className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {home.features.map((feature: { title: string; desc: string }, idx: number) => (
          <div
            key={idx}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-6 hover:shadow-md transition"
          >
            <h2 className="text-2xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}