import type { Locale } from "@/lib/i18n/config";
import { Card } from "@/ui/components/Card";
import { DashboardShell } from "@/ui/layout/DashboardShell";

type PageProps = {
  params: { locale: Locale };
};

export default function SettingsPage({ params }: PageProps) {
  return (
    <DashboardShell
      locale={params.locale}
      title="Profile & settings"
      subtitle="Manage access, notifications, and profile details."
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card className="space-y-3">
          <p className="text-sm font-semibold text-[var(--ink-900)]">
            Account information
          </p>
          <p className="text-sm text-[var(--ink-500)]">Mostafa Trading LLC</p>
          <p className="text-sm text-[var(--ink-500)]">admin@samlogistics.com</p>
        </Card>
        <Card className="space-y-3">
          <p className="text-sm font-semibold text-[var(--ink-900)]">Alerts</p>
          <p className="text-sm text-[var(--ink-500)]">
            Shipment updates · Enabled
          </p>
          <p className="text-sm text-[var(--ink-500)]">
            Document reminders · Enabled
          </p>
        </Card>
      </div>
    </DashboardShell>
  );
}
