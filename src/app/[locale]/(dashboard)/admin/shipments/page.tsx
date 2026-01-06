import type { Locale } from "@/lib/i18n/config";
import { Card } from "@/ui/components/Card";
import { DashboardShell } from "@/ui/layout/DashboardShell";
import { DataTable } from "@/ui/tables/DataTable";

type PageProps = {
  params: { locale: Locale };
};

export default function AdminShipmentsPage({ params }: PageProps) {
  return (
    <DashboardShell
      locale={params.locale}
      title="Shipment management"
      subtitle="Status control and operational updates."
      variant="admin"
    >
      <Card className="p-0">
        <div className="border-b border-[var(--ink-200)] px-6 py-4">
          <h2 className="text-sm font-semibold text-[var(--ink-900)]">
            Shipments
          </h2>
        </div>
        <DataTable>
          <thead className="bg-[var(--mist-100)] text-xs uppercase tracking-[0.2em] text-[var(--ink-500)]">
            <tr>
              <th className="px-6 py-3 text-left">Reference</th>
              <th className="px-6 py-3 text-left">Route</th>
              <th className="px-6 py-3 text-left">Owner</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-[var(--ink-700)]">
            {[
              ["SAM-2043", "Shenzhen → Dubai", "M. Noor", "In transit"],
              ["SAM-1982", "Ningbo → Hamburg", "L. Chen", "Customs"],
              ["SAM-1901", "Guangzhou → Lagos", "R. Liu", "Booked"],
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
