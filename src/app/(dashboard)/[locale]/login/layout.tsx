import type { Metadata } from "next";
import { Header } from "@/ui/layout/header";

export const metadata: Metadata = {
  title: "ورود به سامانه | SAM Logistics",
  description: "Secure Portal Login",
};

export default async function LoginLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* نمایش هدر در صفحه لاگین */}
      <Header locale={locale} />
      
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
