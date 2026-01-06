import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Badge } from "@/ui/components/Badge";
import { Card } from "@/ui/components/Card";
import { Container } from "@/ui/layout/Container";
import { Section } from "@/ui/layout/Section";

type PageProps = {
  params: { locale: Locale };
};

export default async function ServicesPage({ params }: PageProps) {
  const dictionary = await getDictionary(params.locale);

  return (
    <Section>
      <Container className="space-y-10">
        <div className="space-y-3">
          <Badge>{dictionary.nav.services}</Badge>
          <h1 className="text-3xl font-semibold text-[var(--ink-900)]">
            {dictionary.services.title}
          </h1>
          <p className="text-[var(--ink-500)]">{dictionary.services.subtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {dictionary.services.cards.map((card) => (
            <Card key={card.title} className="space-y-3">
              <h2 className="text-lg font-semibold text-[var(--ink-900)]">
                {card.title}
              </h2>
              <p className="text-sm text-[var(--ink-500)]">{card.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
