// Shipments page: timelines per shipment.
import type { Locale } from "@/lib/i18n/config";
import { Card } from "@/ui/components/Card";
import { Timeline } from "@/ui/components/Timeline";
import { StatusPill } from "@/ui/components/StatusPill";
import { DashboardShell } from "@/ui/layout/DashboardShell";

type PageProps = {
  params: { locale: Locale };
};

export default function ShipmentsPage({ params }: PageProps) {
  return (
    <DashboardShell
      locale={params.locale}
      title="Shipment tracking"
      subtitle="Timeline-based visibility for every active load."
    >
      <Card className="space-y-6">
        {[
          {
            id: "SAM-2043",
            route: "Shenzhen → Dubai",
            status: "In transit",
            milestones: [
              "Booked",
              "Departed",
              "In transit",
              "Arriving soon",
            ],
          },
          {
            id: "SAM-1982",
            route: "Ningbo → Hamburg",
            status: "Customs review",
            milestones: ["Booked", "Departed", "Arrived", "Customs"],
          },
        ].map((shipment) => (
          <div
            key={shipment.id}
            className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">{shipment.id}</p>
                <p className="text-xs text-[var(--navy-200)]">{shipment.route}</p>
              </div>
              <StatusPill label={shipment.status} tone="info" />
            </div>
            <div className="mt-4">
              <Timeline
                items={shipment.milestones.map((m) => ({
                  title: m,
                  description: "Milestone locked",
                }))}
              />
            </div>
          </div>
        ))}
      </Card>
    </DashboardShell>
  );
}
