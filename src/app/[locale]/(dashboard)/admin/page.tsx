// Admin overview: KPIs, activity, geo heat, funnel.
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Card } from "@/ui/components/Card";
import { Stat } from "@/ui/components/Stat";
import { DashboardShell } from "@/ui/layout/DashboardShell";
import { DataTable } from "@/ui/tables/DataTable";
import { BarChart } from "@/ui/charts/BarChart";
import { GeoHeat } from "@/ui/charts/GeoHeat";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function AdminPage({ params }: PageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <DashboardShell
      locale={locale}
      title={dictionary.admin.title}
      subtitle={dictionary.admin.subtitle}
      variant="admin"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {dictionary.admin.cards.map((card, idx) => (
          <Stat
            key={card.title}
            label={card.title}
            value={card.value}
            helper={card.description}
            accent={idx === 2 ? "warning" : idx === 1 ? "accent" : "success"}
          />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-0 glass-panel">
          <div className="border-b border-[rgba(255,255,255,0.06)] px-6 py-4">
            <h2 className="text-sm font-semibold text-white">Recent activity</h2>
          </div>
          <DataTable>
            <thead className="bg-[rgba(255,255,255,0.02)] text-xs uppercase tracking-[0.2em] text-[var(--navy-200)]">
              <tr>
                <th className="px-6 py-3 text-left">Lead</th>
                <th className="px-6 py-3 text-left">Region</th>
                <th className="px-6 py-3 text-left">Stage</th>
                <th className="px-6 py-3 text-left">Owner</th>
              </tr>
            </thead>
            <tbody className="text-sm text-[var(--navy-50)]">
              {[
                ["Hanzo Trade", "UAE", "Qualified", "A. Chen"],
                ["Mira Home", "Germany", "Proposal", "L. Zhang"],
                ["NovaTech", "Nigeria", "Inbound", "R. Liu"],
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
        <Card className="glass-panel">
          <h3 className="text-sm font-semibold text-white">Pipeline funnel</h3>
          <BarChart
            data={[
              { label: "Inbound", value: 86 },
              { label: "Qualified", value: 54 },
              { label: "Proposal", value: 32 },
              { label: "Won", value: 18 },
            ]}
          />
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-white">Top regions</h3>
            <GeoHeat
              regions={[
                { name: "UAE", value: 32 },
                { name: "Germany", value: 26 },
                { name: "Nigeria", value: 18 },
                { name: "Turkey", value: 12 },
              ]}
            />
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}
