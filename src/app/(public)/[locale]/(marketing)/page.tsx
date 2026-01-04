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
      {/*
        Hero section: we wrap the content in a relative container and place
        a dark abstract background image behind it.  An additional
        semi-transparent overlay darkens the image to improve text
        readability.  The title and tagline are rendered on top with
        generous spacing.  The call‑to‑action button uses a deep red hue
        consistent with the overall colour scheme.
      */}
      <header className="relative flex flex-col items-center text-center py-20 px-4 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/dark-bg.png"
            alt=""
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        {/* Foreground content */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-red-500 mb-4">
            {home.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-6">
            {home.tagline}
          </p>
          <p className="mb-8 text-gray-400">
            {home.description}
          </p>
          <Link
            href={`/${params.locale}/calculator`}
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium px-8 py-4 rounded-md shadow-lg transition"
          >
            {home.cta}
          </Link>
        </div>
      </header>

      {/* Features section */}
      <section className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {home.features.map((feature: { title: string; desc: string }, idx: number) => (
          <div
            key={idx}
            className="rounded-xl border border-red-800 bg-zinc-900/80 p-6 shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold text-red-400 mb-2">
              {feature.title}
            </h2>
            <p className="text-gray-300">
              {feature.desc}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}