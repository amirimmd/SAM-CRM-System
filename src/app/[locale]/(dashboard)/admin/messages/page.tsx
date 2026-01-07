// Admin messaging center.
import type { Locale } from "@/lib/i18n/config";
import { Card } from "@/ui/components/Card";
import { DashboardShell } from "@/ui/layout/DashboardShell";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function AdminMessagesPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <DashboardShell
      locale={locale}
      title="Messaging center"
      subtitle="Manage support conversations and response queues."
      variant="admin"
    >
      <Card className="glass-panel space-y-4">
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
            className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-4"
          >
            <div className="flex items-center justify-between text-sm font-semibold text-white">
              <span>{item.customer}</span>
              <span className="text-xs text-[var(--navy-200)]">{item.status}</span>
            </div>
            <p className="mt-2 text-sm text-[var(--navy-100)]">{item.summary}</p>
          </div>
        ))}
      </Card>
    </DashboardShell>
  );
}
