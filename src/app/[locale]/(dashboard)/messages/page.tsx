// Messages page: secure conversations.
import type { Locale } from "@/lib/i18n/config";
import { Card } from "@/ui/components/Card";
import { Badge } from "@/ui/components/Badge";
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
        <Card className="glass-panel space-y-4">
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
              className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4"
            >
              <div className="flex items-center justify-between text-xs text-[var(--navy-200)]">
                <span>{item.name}</span>
                <span>{item.time}</span>
              </div>
              <p className="mt-2 text-sm text-white">{item.message}</p>
            </div>
          ))}
        </Card>
        <Card className="glass-panel space-y-3">
          <p className="text-sm font-semibold text-white">Start a new message</p>
          <p className="text-sm text-[var(--navy-100)]">
            Use the internal chat to keep shipment updates in one place.
          </p>
          <div className="flex gap-2">
            <Badge>Secure</Badge>
            <Badge>Realtime</Badge>
          </div>
          <button className="rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] px-4 py-2 text-sm font-semibold text-white">
            Open chat
          </button>
        </Card>
      </div>
    </DashboardShell>
  );
}
