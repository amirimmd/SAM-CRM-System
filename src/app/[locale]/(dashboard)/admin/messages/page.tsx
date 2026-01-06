import type { Locale } from "@/lib/i18n/config";
import { Card } from "@/ui/components/Card";
import { DashboardShell } from "@/ui/layout/DashboardShell";

type PageProps = {
  params: { locale: Locale };
};

export default function AdminMessagesPage({ params }: PageProps) {
  return (
    <DashboardShell
      locale={params.locale}
      title="Messaging center"
      subtitle="Manage support conversations and response queues."
      variant="admin"
    >
      <Card className="space-y-4">
        {[
          {
            customer: "Mira Home",
            status: "Waiting on agent",
            summary: "Customs documentation clarification needed.",
          },
          {
            customer: "Hanzo Trade",
            status: "Responded",
            summary: "Updated ETA and container booking.",
          },
        ].map((item) => (
          <div
            key={item.customer}
            className="rounded-2xl border border-[var(--ink-200)] bg-white p-4"
          >
            <div className="flex items-center justify-between text-sm font-semibold text-[var(--ink-900)]">
              <span>{item.customer}</span>
              <span className="text-xs text-[var(--ink-500)]">{item.status}</span>
            </div>
            <p className="mt-2 text-sm text-[var(--ink-600)]">{item.summary}</p>
          </div>
        ))}
      </Card>
    </DashboardShell>
  );
}
