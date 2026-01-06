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
      <Container className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-6">
          <Badge>{dictionary.nav.contact}</Badge>
          <h1 className="text-3xl font-semibold text-[var(--ink-900)]">
            {dictionary.contact.title}
          </h1>
          <p className="text-[var(--ink-500)]">{dictionary.contact.subtitle}</p>
          <div className="space-y-3">
            {dictionary.contact.channels.map((channel) => (
              <Card key={channel.label} className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--ink-800)]">
                  {channel.label}
                </span>
                <span className="text-sm text-[var(--ink-500)]">{channel.value}</span>
              </Card>
            ))}
          </div>
        </div>
        <Card className="space-y-4 bg-[var(--mist-100)]">
          <h2 className="text-xl font-semibold text-[var(--ink-900)]">
            Service availability
          </h2>
          <div className="space-y-3 text-sm text-[var(--ink-600)]">
            <p>Live coordination window: 08:00 - 22:00 GMT+8</p>
            <p>Emergency response: 24/7 escalation for in-transit cargo</p>
            <p>Regional desks: Guangzhou · Shenzhen · Shanghai</p>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
