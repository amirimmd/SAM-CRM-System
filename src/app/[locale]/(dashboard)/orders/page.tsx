// Orders page: history table with status pills.
import type { Locale } from "@/lib/i18n/config";
import { Card } from "@/ui/components/Card";
import { StatusPill } from "@/ui/components/StatusPill";
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
      <Card className="p-0 glass-panel">
        <div className="border-b border-[rgba(255,255,255,0.06)] px-6 py-4">
          <h2 className="text-sm font-semibold text-white">Orders</h2>
        </div>
        <DataTable>
          <thead className="bg-[rgba(255,255,255,0.02)] text-xs uppercase tracking-[0.2em] text-[var(--navy-200)]">
            <tr>
              <th className="px-6 py-3 text-left">Order</th>
              <th className="px-6 py-3 text-left">Mode</th>
              <th className="px-6 py-3 text-left">Value</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-[var(--navy-50)]">
            {[
              ["ORD-1021", "Sea freight", "$42,000", "Settled"],
              ["ORD-0994", "Air freight", "$18,500", "Invoiced"],
              ["ORD-0967", "Rail freight", "$12,300", "Paid"],
            ].map((row) => (
              <tr key={row[0]} className="border-t border-[rgba(255,255,255,0.06)]">
                <td className="px-6 py-3">{row[0]}</td>
                <td className="px-6 py-3">{row[1]}</td>
                <td className="px-6 py-3">{row[2]}</td>
                <td className="px-6 py-3">
                  <StatusPill
                    label={row[3]}
                    tone={row[3] === "Settled" || row[3] === "Paid" ? "success" : "warning"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </Card>
    </DashboardShell>
  );
}
