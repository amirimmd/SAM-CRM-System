import type { Metadata } from "next";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, isSupportedLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dictionary = await getDictionary(locale);
  return {
    title: {
      default: "SAM Logistics & CRM",
      template: "%s | SAM Logistics & CRM",
    },
    description:
      dictionary.home?.subtitle ??
      "Bilingual logistics platform with CRM, tracking, and enterprise-grade operations.",
    alternates: {
      languages: {
        en: "/en",
        fa: "/fa",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return (
    <div data-locale={locale} className="min-h-screen bg-[var(--navy-1000)]">
      {children}
    </div>
  );
}
