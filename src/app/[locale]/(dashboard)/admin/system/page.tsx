// Admin system: security and audit overview.
import type { Locale } from "@/lib/i18n/config";
import { Card } from "@/ui/components/Card";
import { DashboardShell } from "@/ui/layout/DashboardShell";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function AdminSystemPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <DashboardShell
      locale={locale}
      title="System configuration"
      subtitle="Security, integrations, and compliance settings."
      variant="admin"
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card className="glass-panel space-y-2">
          <p className="text-sm font-semibold text-white">RLS status</p>
          <p className="text-sm text-[var(--navy-100)]">Enabled on all tables</p>
        </Card>
        <Card className="glass-panel space-y-2">
          <p className="text-sm font-semibold text-white">Audit logs</p>
          <p className="text-sm text-[var(--navy-100)]">Retention: 180 days</p>
        </Card>
      </div>
    </DashboardShell>
  );
}
