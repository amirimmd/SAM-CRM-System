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
      {/* هدر سایت در صفحه لاگین نمایش داده می‌شود */}
      <Header locale={locale} />
      
      {/* محتوای صفحه لاگین */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* در اینجا هیچ فوتری قرار نمی‌دهیم تا صفحه لاگین تمیز باشد */}
    </div>
  );
}
