// Admin CRM analytics: metrics and region list.
import type { Locale } from "@/lib/i18n/config";
import { Card } from "@/ui/components/Card";
import { DashboardShell } from "@/ui/layout/DashboardShell";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function AdminCrmPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <DashboardShell
      locale={locale}
      title="CRM analytics"
      subtitle="Behavior insights, traffic, and conversion signals."
      variant="admin"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Sessions", value: "12.4K" },
          { label: "Returning", value: "38%" },
          { label: "Lead conversions", value: "4.2%" },
        ].map((metric) => (
          <Card key={metric.label} className="glass-panel space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--navy-200)]">
              {metric.label}
            </p>
            <p className="text-3xl font-semibold text-white">{metric.value}</p>
          </Card>
        ))}
      </div>
      <Card className="glass-panel space-y-3">
        <p className="text-sm font-semibold text-white">Top regions</p>
        <div className="grid gap-2 text-sm text-[var(--navy-100)]">
          <p>UAE · 22%</p>
          <p>Germany · 18%</p>
          <p>Nigeria · 14%</p>
          <p>Turkey · 12%</p>
        </div>
      </Card>
    </DashboardShell>
  );
}
