// Shipment detail view: timeline and metadata for a single shipment.
import type { Locale } from "@/lib/i18n/config";
import { Card } from "@/ui/components/Card";
import { StatusPill } from "@/ui/components/StatusPill";
import { Timeline } from "@/ui/components/Timeline";
import { DashboardShell } from "@/ui/layout/DashboardShell";

type PageProps = {
  params: { locale: Locale; id: string };
};

export default function ShipmentDetailPage({ params }: PageProps) {
  const shipmentId = params.id.toUpperCase();

  return (
    <DashboardShell
      locale={params.locale}
      title={`Shipment ${shipmentId}`}
      subtitle="Detail view with milestone history and documents."
    >
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="glass-panel space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Shenzhen → Dubai</p>
              <p className="text-xs text-[var(--navy-200)]">Container 40HQ</p>
            </div>
            <StatusPill label="In transit" tone="info" />
          </div>
          <Timeline
            items={[
              { title: "Booked", description: "Slot secured", timestamp: "Aug 03" },
              { title: "Loaded", description: "Full container loaded", timestamp: "Aug 05" },
              { title: "Departed", description: "Vessel departed Shenzhen", timestamp: "Aug 06" },
              { title: "In transit", description: "On schedule", timestamp: "Aug 10" },
              { title: "ETA Dubai", description: "Aug 19" },
            ]}
          />
        </Card>
        <Card className="glass-panel space-y-3">
          <p className="text-sm font-semibold text-white">Documents</p>
          <p className="text-sm text-[var(--navy-100)]">Invoice.pdf · PackingList.xlsx</p>
          <p className="text-sm text-[var(--navy-100)]">InsurancePolicy.pdf</p>
        </Card>
      </div>
    </DashboardShell>
  );
}
