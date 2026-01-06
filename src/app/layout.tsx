import type { Metadata } from "next";
import { Sora, Vazirmatn } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  getLocaleDir,
  isSupportedLocale,
} from "@/lib/i18n/config";

const sora = Sora({
  variable: "--font-sans-en",
  subsets: ["latin"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-sans-fa",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: {
    default: "SAM Logistics & CRM",
    template: "%s | SAM Logistics & CRM",
  },
  description:
    "Bilingual logistics platform with CRM, tracking, and enterprise-grade operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieLocale = cookies().get(LOCALE_COOKIE_NAME)?.value ?? DEFAULT_LOCALE;
  const locale = isSupportedLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;
  const direction = getLocaleDir(locale);

  return (
    <html
      lang={locale}
      dir={direction}
      data-locale={locale}
      className={`${sora.variable} ${vazirmatn.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
