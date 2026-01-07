// Tracking page: mock shipment timeline with depth cards.
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Badge } from "@/ui/components/Badge";
import { Card } from "@/ui/components/Card";
import { StatusPill } from "@/ui/components/StatusPill";
import { Timeline } from "@/ui/components/Timeline";
import { Container } from "@/ui/layout/Container";
import { Section } from "@/ui/layout/Section";

type PageProps = {
  params: { locale: Locale };
};

export default async function TrackingPage({ params }: PageProps) {
  const dictionary = await getDictionary(params.locale);

  return (
    <Section>
      <Container className="space-y-8 text-white">
        <div className="space-y-3">
          <Badge>{dictionary.nav.tracking}</Badge>
          <h1 className="text-3xl font-semibold">{dictionary.tracking.title}</h1>
          <p className="text-[var(--navy-100)]">{dictionary.tracking.subtitle}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
          <Card className="glass-panel space-y-3">
            {dictionary.tracking.shipments.map((shipment) => (
              <div
                key={shipment.id}
                className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{shipment.id}</p>
                    <p className="text-xs text-[var(--navy-200)]">{shipment.route}</p>
                  </div>
                  <StatusPill label={shipment.status} tone="info" />
                </div>
                <div className="mt-3 h-2 rounded-full bg-[rgba(255,255,255,0.06)]">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#1ec7ad,#5e4bff)]"
                    style={{ width: `${shipment.progress}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-[var(--navy-200)]">ETA {shipment.eta}</p>
              </div>
            ))}
          </Card>
          <Card className="glass-panel">
            <h2 className="text-lg font-semibold">Live timeline</h2>
            <Timeline
              items={[
                { title: "Container loaded · Shenzhen", description: "All documents verified", timestamp: "Today 09:20" },
                { title: "Vessel departed", description: "On-schedule departure", timestamp: "Today 11:05" },
                { title: "Customs pre-clearance", description: "Awaiting destination arrival", timestamp: "In 18h" },
                { title: "Last mile scheduling", description: "Carrier assignment in progress" },
              ]}
            />
          </Card>
        </div>
      </Container>
    </Section>
  );
}
