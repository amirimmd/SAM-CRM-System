// Admin analytics: traffic funnel, geo, behavior charts.
import type { Locale } from "@/lib/i18n/config";
import { Card } from "@/ui/components/Card";
import { DashboardShell } from "@/ui/layout/DashboardShell";
import { BarChart } from "@/ui/charts/BarChart";
import { GeoHeat } from "@/ui/charts/GeoHeat";
import { Sparkline } from "@/ui/charts/Sparkline";
import { Stat } from "@/ui/components/Stat";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function AdminAnalyticsPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <DashboardShell
      locale={locale}
      title="Analytics workspace"
      subtitle="Country and city reports, traffic funnel, and behavioral signals."
      variant="admin"
    >
      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Sessions" value="12.4K" helper="30d" />
        <Stat label="Returning" value="38%" helper="Behavior" accent="warning" />
        <Stat label="Lead rate" value="4.2%" helper="Funnel" accent="success" />
        <Stat label="Avg time" value="3m 12s" helper="Engagement" accent="accent" />
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="glass-panel space-y-4">
          <p className="text-sm font-semibold text-white">Traffic funnel</p>
          <BarChart
            data={[
              { label: "Sessions", value: 12400 },
              { label: "Engaged", value: 8200 },
              { label: "Leads", value: 520 },
              { label: "Won", value: 210 },
            ]}
            max={12400}
          />
          <p className="text-xs text-[var(--navy-200)]">
            CRM events capture UTM, referrer, and session IDs for funnel clarity.
          </p>
        </Card>
        <Card className="glass-panel space-y-4">
          <p className="text-sm font-semibold text-white">Behavior</p>
          <Sparkline points={[14, 18, 16, 23, 22, 28, 26]} />
          <div className="grid grid-cols-2 gap-3">
            <Stat label="Top source" value="Direct" helper="38%" />
            <Stat label="Top device" value="Desktop" helper="62%" accent="warning" />
          </div>
        </Card>
      </div>
      <Card className="glass-panel">
        <p className="text-sm font-semibold text-white">Geo performance</p>
        <GeoHeat
          regions={[
            { name: "UAE · Dubai", value: 3200 },
            { name: "Germany · Hamburg", value: 2400 },
            { name: "Nigeria · Lagos", value: 1800 },
            { name: "Turkey · Istanbul", value: 1500 },
          ]}
        />
      </Card>
    </DashboardShell>
  );
}
