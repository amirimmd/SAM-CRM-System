import type { Metadata } from "next";
import "../../globals.css";
import { cn } from "@/lib/utils";
import { Vazirmatn } from "next/font/google";
import { Header } from "@/ui/layout/header"; // ایمپورت هدر

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "ورود به سامانه | SAM Logistics",
  description: "Secure Portal Login",
};

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isRtl = locale === 'fa';

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className={cn("min-h-screen bg-black font-vazirmatn", vazirmatn.variable)}>
      {/* اضافه کردن هدر به بالای صفحات احراز هویت */}
      <Header locale={locale} />
      
      {/* محتوای صفحه (مثل فرم لاگین) */}
      <main>
        {children}
      </main>
      
      {/* هیچ فوتری در اینجا قرار نگرفته است */}
    </div>
  );
}
