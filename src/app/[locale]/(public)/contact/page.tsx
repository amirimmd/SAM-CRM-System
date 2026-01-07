// Contact page: channels + operations block.
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Badge } from "@/ui/components/Badge";
import { Card } from "@/ui/components/Card";
import { Container } from "@/ui/layout/Container";
import { Section } from "@/ui/layout/Section";

type PageProps = {
  params: { locale: Locale };
};

export default async function ContactPage({ params }: PageProps) {
  const dictionary = await getDictionary(params.locale);

  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] text-white">
        <div className="space-y-6">
          <Badge>{dictionary.nav.contact}</Badge>
          <h1 className="text-3xl font-semibold">{dictionary.contact.title}</h1>
          <p className="text-[var(--navy-100)]">{dictionary.contact.subtitle}</p>
          <div className="space-y-3">
            {dictionary.contact.channels.map((channel) => (
              <Card key={channel.label} className="glass-panel flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--navy-50)]">
                  {channel.label}
                </span>
                <span className="text-sm text-[var(--navy-100)]">{channel.value}</span>
              </Card>
            ))}
          </div>
        </div>
        <Card className="glass-panel space-y-4">
          <h2 className="text-xl font-semibold">Service availability</h2>
          <div className="space-y-3 text-sm text-[var(--navy-100)]">
            <p>Live coordination window: 08:00 - 22:00 GMT+8</p>
            <p>Emergency response: 24/7 escalation for in-transit cargo</p>
            <p>Regional desks: Guangzhou · Shenzhen · Shanghai</p>
          </div>
          <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[radial-gradient(circle_at_20%_20%,rgba(62,223,199,0.2),rgba(12,18,32,0.8))] p-4 text-sm text-[var(--navy-100)]">
            <p className="text-sm font-semibold text-white">Uptime</p>
            <p>99.95% platform availability · Realtime tracking</p>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
