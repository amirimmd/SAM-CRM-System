import type { Locale } from "@/lib/i18n/config";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function DashboardLayout({ children, params }: LayoutProps) {
  await params;
  return (
    <div className="min-h-screen bg-[var(--navy-1000)] text-white">
      <div className="light-sheen" />
      {children}
    </div>
  );
}
