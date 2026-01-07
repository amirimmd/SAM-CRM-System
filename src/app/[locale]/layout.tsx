import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { SUPPORTED_LOCALES } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

type LayoutProps = {
  children: React.ReactNode;
  params: { locale: Locale };
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
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

export default function LocaleLayout({ children, params }: LayoutProps) {
  return (
    <div data-locale={params.locale} className="min-h-screen bg-[var(--navy-1000)]">
      {children}
    </div>
  );
}
