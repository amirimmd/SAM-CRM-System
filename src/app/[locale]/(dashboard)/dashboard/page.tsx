import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Card } from "@/ui/components/Card";
import { DashboardShell } from "@/ui/layout/DashboardShell";
import { DataTable } from "@/ui/tables/DataTable";

type PageProps = {
  params: { locale: Locale };
};

export default async function DashboardPage({ params }: PageProps) {
  const dictionary = await getDictionary(params.locale);

  return (
    <DashboardShell
      locale={params.locale}
      title={dictionary.dashboard.title}
      subtitle={dictionary.dashboard.subtitle}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {dictionary.dashboard.cards.map((card) => (
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
            Active shipments
          </h2>
        </div>
        <DataTable>
          <thead className="bg-[var(--mist-100)] text-xs uppercase tracking-[0.2em] text-[var(--ink-500)]">
            <tr>
              <th className="px-6 py-3 text-left">Reference</th>
              <th className="px-6 py-3 text-left">Route</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">ETA</th>
            </tr>
          </thead>
          <tbody className="text-sm text-[var(--ink-700)]">
            {[
              ["SAM-2043", "Shenzhen → Dubai", "In transit", "Aug 19"],
              ["SAM-1982", "Ningbo → Hamburg", "Customs", "Aug 22"],
              ["SAM-1901", "Guangzhou → Lagos", "Booked", "Aug 27"],
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
