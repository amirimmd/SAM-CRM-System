// Settings page: account and alerts overview.
import type { Locale } from "@/lib/i18n/config";
import { Card } from "@/ui/components/Card";
import { DashboardShell } from "@/ui/layout/DashboardShell";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function SettingsPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <DashboardShell
      locale={locale}
      title="Profile & settings"
      subtitle="Manage access, notifications, and profile details."
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card className="glass-panel space-y-3">
          <p className="text-sm font-semibold text-white">
            Account information
          </p>
          <p className="text-sm text-[var(--navy-100)]">Mostafa Trading LLC</p>
          <p className="text-sm text-[var(--navy-100)]">admin@samlogistics.com</p>
        </Card>
        <Card className="glass-panel space-y-3">
          <p className="text-sm font-semibold text-white">Alerts</p>
          <p className="text-sm text-[var(--navy-100)]">
            Shipment updates · Enabled
          </p>
          <p className="text-sm text-[var(--navy-100)]">
            Document reminders · Enabled
          </p>
        </Card>
      </div>
    </DashboardShell>
  );
}
