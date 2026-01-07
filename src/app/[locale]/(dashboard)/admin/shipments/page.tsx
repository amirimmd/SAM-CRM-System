// Admin shipments: control panel.
import type { Locale } from "@/lib/i18n/config";
import { Card } from "@/ui/components/Card";
import { DashboardShell } from "@/ui/layout/DashboardShell";
import { DataTable } from "@/ui/tables/DataTable";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function AdminShipmentsPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <DashboardShell
      locale={locale}
      title="Shipment management"
      subtitle="Status control and operational updates."
      variant="admin"
    >
      <Card className="p-0 glass-panel">
        <div className="border-b border-[rgba(255,255,255,0.06)] px-6 py-4">
          <h2 className="text-sm font-semibold text-white">Shipments</h2>
        </div>
        <DataTable>
          <thead className="bg-[rgba(255,255,255,0.02)] text-xs uppercase tracking-[0.2em] text-[var(--navy-200)]">
            <tr>
              <th className="px-6 py-3 text-left">Reference</th>
              <th className="px-6 py-3 text-left">Route</th>
              <th className="px-6 py-3 text-left">Owner</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-[var(--navy-50)]">
            {[
              ["SAM-2043", "Shenzhen → Dubai", "M. Noor", "In transit"],
              ["SAM-1982", "Ningbo → Hamburg", "L. Chen", "Customs"],
              ["SAM-1901", "Guangzhou → Lagos", "R. Liu", "Booked"],
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
    </DashboardShell>
  );
}
