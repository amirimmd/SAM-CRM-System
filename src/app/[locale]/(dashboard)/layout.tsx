import type { Locale } from "@/lib/i18n/config";

type LayoutProps = {
  children: React.ReactNode;
  params: { locale: Locale };
};

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--navy-1000)] text-white">
      <div className="light-sheen" />
      {children}
    </div>
  );
}
