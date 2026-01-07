// Customer dashboard: KPIs, shipments table, and sparkline.
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Card } from "@/ui/components/Card";
import { Stat } from "@/ui/components/Stat";
import { Sparkline } from "@/ui/charts/Sparkline";
import { DashboardShell } from "@/ui/layout/DashboardShell";
import { DataTable } from "@/ui/tables/DataTable";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function DashboardPage({ params }: PageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <DashboardShell
      locale={locale}
      title={dictionary.dashboard.title}
      subtitle={dictionary.dashboard.subtitle}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {dictionary.dashboard.cards.map((card, index) => (
          <Stat
            key={card.title}
            label={card.title}
            value={card.value}
            helper={card.description}
            accent={index === 0 ? "accent" : index === 1 ? "warning" : "success"}
          />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-0 glass-panel">
          <div className="border-b border-[rgba(255,255,255,0.06)] px-6 py-4">
            <h2 className="text-sm font-semibold text-white">Active shipments</h2>
          </div>
          <DataTable>
            <thead className="bg-[rgba(255,255,255,0.02)] text-xs uppercase tracking-[0.2em] text-[var(--navy-200)]">
              <tr>
                <th className="px-6 py-3 text-left">Reference</th>
                <th className="px-6 py-3 text-left">Route</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">ETA</th>
              </tr>
            </thead>
            <tbody className="text-sm text-[var(--navy-50)]">
              {[
                ["SAM-2043", "Shenzhen → Dubai", "In transit", "Aug 19"],
                ["SAM-1982", "Ningbo → Hamburg", "Customs", "Aug 22"],
                ["SAM-1901", "Guangzhou → Lagos", "Booked", "Aug 27"],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-[rgba(255,255,255,0.06)]">
                  {row.map((cell) => (
                    <td key={cell} className="px-6 py-3">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </DataTable>
        </Card>
        <Card className="glass-panel space-y-3">
          <p className="text-sm font-semibold text-white">Engagement</p>
          <p className="text-xs text-[var(--navy-200)]">Sessions & message rate</p>
          <Sparkline points={[12, 18, 16, 22, 20, 26, 30]} />
          <div className="grid grid-cols-2 gap-3">
            <Stat label="Messages" value="142" helper="Last 7d" />
            <Stat label="Uploads" value="54" helper="Documents processed" accent="warning" />
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}
