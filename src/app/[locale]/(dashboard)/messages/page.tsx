import type { Locale } from "@/lib/i18n/config";
import { Card } from "@/ui/components/Card";
import { DashboardShell } from "@/ui/layout/DashboardShell";

type PageProps = {
  params: { locale: Locale };
};

export default function MessagesPage({ params }: PageProps) {
  return (
    <DashboardShell
      locale={params.locale}
      title="Support messages"
      subtitle="Secure conversations with your logistics coordinator."
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card className="space-y-4">
          {[
            {
              name: "Ops Coordinator",
              message: "Documents received. Customs review starts at 16:00.",
              time: "12 min ago",
            },
            {
              name: "Air Desk",
              message: "Priority slot confirmed for next-day departure.",
              time: "2 hours ago",
            },
          ].map((item) => (
            <div
              key={item.message}
              className="rounded-2xl border border-[var(--ink-200)] bg-white p-4"
            >
              <div className="flex items-center justify-between text-xs text-[var(--ink-500)]">
                <span>{item.name}</span>
                <span>{item.time}</span>
              </div>
              <p className="mt-2 text-sm text-[var(--ink-800)]">{item.message}</p>
            </div>
          ))}
        </Card>
        <Card className="space-y-3">
          <p className="text-sm font-semibold text-[var(--ink-900)]">
            Start a new message
          </p>
          <p className="text-sm text-[var(--ink-500)]">
            Use the internal chat to keep shipment updates in one place.
          </p>
          <button className="rounded-xl border border-[var(--ink-200)] bg-white px-4 py-2 text-sm font-semibold text-[var(--ink-700)]">
            Open chat
          </button>
        </Card>
      </div>
    </DashboardShell>
  );
}
