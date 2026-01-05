import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const { locale } = params;
  const dict = await getDictionary(locale);
  const { home, site } = dict;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.title,
    inLanguage: locale,
    url: siteConfig.seo.baseUrl,
    description: home.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.seo.baseUrl}/${locale}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return {
    title: home.title,
    description: home.description,
    keywords: home.keywords,
    alternates: {
      canonical: `/${locale}`,
    },
    openGraph: {
      title: home.title,
      description: home.description,
      url: `/${locale}`,
      locale,
      siteName: site.title,
      type: 'website',
      images: [
        {
          url: siteConfig.seo.image,
          alt: home.title,
        },
      ],
    },
    other: {
      'application/ld+json': JSON.stringify(schema),
    },
  };
}

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  const { home } = dict;

  return (
    <main>
      <header className="flex flex-col items-center text-center py-16 px-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">{siteConfig.branding.name[params.locale]}</p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{home.title}</h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">{home.tagline}</p>
        <p className="max-w-3xl text-gray-700 dark:text-gray-400 mb-8">{home.description}</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={`/${params.locale}/calculator`}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-md transition"
          >
            {home.cta}
          </Link>
          <Link
            href={`/${params.locale}/contact`}
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium px-8 py-4 rounded-md transition"
          >
            {home.features?.[0]?.title ?? home.cta}
          </Link>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {home.features.map((feature: { title: string; desc: string }, idx: number) => (
          <div
            key={feature.title + idx}
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
