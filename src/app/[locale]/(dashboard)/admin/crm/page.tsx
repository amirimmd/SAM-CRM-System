import type { Locale } from "@/lib/i18n/config";
import { Card } from "@/ui/components/Card";
import { DashboardShell } from "@/ui/layout/DashboardShell";

type PageProps = {
  params: { locale: Locale };
};

export default function AdminCrmPage({ params }: PageProps) {
  return (
    <DashboardShell
      locale={params.locale}
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
          <Card key={metric.label} className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-500)]">
              {metric.label}
            </p>
            <p className="text-3xl font-semibold text-[var(--ink-900)]">
              {metric.value}
            </p>
          </Card>
        ))}
      </div>
      <Card className="space-y-3">
        <p className="text-sm font-semibold text-[var(--ink-900)]">
          Top regions
        </p>
        <div className="grid gap-2 text-sm text-[var(--ink-600)]">
          <p>UAE · 22%</p>
          <p>Germany · 18%</p>
          <p>Nigeria · 14%</p>
          <p>Turkey · 12%</p>
        </div>
      </Card>
    </DashboardShell>
  );
}
