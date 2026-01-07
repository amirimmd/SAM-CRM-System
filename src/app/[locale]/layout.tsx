import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { SUPPORTED_LOCALES } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const awaitedParams = await params;
  const dictionary = await getDictionary(awaitedParams.locale);
  return {
    title: {
      default: "SAM Logistics & CRM",
      template: "%s | SAM Logistics & CRM",
    },
    description: dictionary.home.subtitle,
    alternates: {
      languages: {
        en: "/en",
        fa: "/fa",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const awaitedParams = await params;
  return (
    <div data-locale={awaitedParams.locale} className="min-h-screen bg-[var(--navy-1000)]">
      {children}
    </div>
  );
}
