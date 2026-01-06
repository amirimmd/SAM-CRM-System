import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Card } from "@/ui/components/Card";
import { DashboardShell } from "@/ui/layout/DashboardShell";
import { DataTable } from "@/ui/tables/DataTable";

type PageProps = {
  params: { locale: Locale };
};

export default async function AdminPage({ params }: PageProps) {
  const dictionary = await getDictionary(params.locale);

  return (
    <DashboardShell
      locale={params.locale}
      title={dictionary.admin.title}
      subtitle={dictionary.admin.subtitle}
      variant="admin"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {dictionary.admin.cards.map((card) => (
          <Card key={card.title} className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-500)]">
              {card.title}
            </p>
            <p className="text-3xl font-semibold text-[var(--ink-900)]">{card.value}</p>
            <p className="text-sm text-[var(--ink-500)]">{card.description}</p>
          </Card>
        ))}
      </div>
      <Card className="p-0">
        <div className="border-b border-[var(--ink-200)] px-6 py-4">
          <h2 className="text-sm font-semibold text-[var(--ink-900)]">
            Recent activity
          </h2>
        </div>
        <DataTable>
          <thead className="bg-[var(--mist-100)] text-xs uppercase tracking-[0.2em] text-[var(--ink-500)]">
            <tr>
              <th className="px-6 py-3 text-left">Lead</th>
              <th className="px-6 py-3 text-left">Region</th>
              <th className="px-6 py-3 text-left">Stage</th>
              <th className="px-6 py-3 text-left">Owner</th>
            </tr>
          </thead>
          <tbody className="text-sm text-[var(--ink-700)]">
            {[
              ["Hanzo Trade", "UAE", "Qualified", "A. Chen"],
              ["Mira Home", "Germany", "Proposal", "L. Zhang"],
              ["NovaTech", "Nigeria", "Inbound", "R. Liu"],
            ].map((row) => (
              <tr key={row[0]} className="border-t border-[var(--ink-200)]">
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
    </DashboardShell>
  );
}
