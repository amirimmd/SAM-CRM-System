import type { Locale } from "@/lib/i18n/config";
import { Card } from "@/ui/components/Card";
import { DashboardShell } from "@/ui/layout/DashboardShell";
import { DataTable } from "@/ui/tables/DataTable";

type PageProps = {
  params: { locale: Locale };
};

export default function OrdersPage({ params }: PageProps) {
  return (
    <DashboardShell
      locale={params.locale}
      title="Order history"
      subtitle="Confirmed bookings with invoices and documentation."
    >
      <Card className="p-0">
        <div className="border-b border-[var(--ink-200)] px-6 py-4">
          <h2 className="text-sm font-semibold text-[var(--ink-900)]">Orders</h2>
        </div>
        <DataTable>
          <thead className="bg-[var(--mist-100)] text-xs uppercase tracking-[0.2em] text-[var(--ink-500)]">
            <tr>
              <th className="px-6 py-3 text-left">Order</th>
              <th className="px-6 py-3 text-left">Mode</th>
              <th className="px-6 py-3 text-left">Value</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-[var(--ink-700)]">
            {[
              ["ORD-1021", "Sea freight", "$42,000", "Settled"],
              ["ORD-0994", "Air freight", "$18,500", "Invoiced"],
              ["ORD-0967", "Rail freight", "$12,300", "Paid"],
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
