import type { Locale } from "@/lib/i18n/config";
import { Card } from "@/ui/components/Card";
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
            milestones: ["Booked", "Departed", "In transit", "Arriving soon"],
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
            className="rounded-2xl border border-[var(--ink-200)] bg-white p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[var(--ink-900)]">
                  {shipment.id}
                </p>
                <p className="text-xs text-[var(--ink-500)]">{shipment.route}</p>
              </div>
              <span className="rounded-full bg-[var(--accent-200)] px-3 py-1 text-xs font-semibold text-[var(--ink-900)]">
                {shipment.status}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-[var(--ink-600)]">
              {shipment.milestones.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--ink-200)] bg-[var(--mist-100)] px-3 py-1"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </Card>
    </DashboardShell>
  );
}
