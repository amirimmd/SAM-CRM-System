import type { Metadata } from "next";
import { Sora, Vazirmatn } from "next/font/google";
import type { Locale } from "@/lib/i18n/config";
import { SUPPORTED_LOCALES, getLocaleDir } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import "../globals.css";

const sora = Sora({
  variable: "--font-sans-en",
  subsets: ["latin"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-sans-fa",
  subsets: ["arabic"],
});

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
  const direction = getLocaleDir(params.locale);

  return (
    <html
      lang={params.locale}
      dir={direction}
      data-locale={params.locale}
      className={`${sora.variable} ${vazirmatn.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
