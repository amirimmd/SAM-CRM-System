// Services page: detailed logistics offerings with depth cards.
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Badge } from "@/ui/components/Badge";
import { Card } from "@/ui/components/Card";
import { Icon } from "@/ui/components/Icon";
import { LinkButton } from "@/ui/components/LinkButton";
import { Container } from "@/ui/layout/Container";
import { Section } from "@/ui/layout/Section";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <Section>
      <Container className="space-y-10 text-white">
        <div className="space-y-3">
          <Badge>{dictionary.nav.services}</Badge>
          <h1 className="text-3xl font-semibold">{dictionary.services.title}</h1>
          <p className="text-[var(--navy-100)]">{dictionary.services.subtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {dictionary.services.cards.map((card) => (
            <Card key={card.title} className="glass-panel space-y-3">
              <div className="flex items-center gap-2 text-[var(--accent-400)]">
                <Icon name="ship" />
                <span className="text-xs uppercase tracking-[0.12em]">Service</span>
              </div>
              <h2 className="text-lg font-semibold">{card.title}</h2>
              <p className="text-sm text-[var(--navy-100)]">{card.description}</p>
              <div className="stroke-dash" />
              <LinkButton variant="ghost" href={`/${locale}/pricing`}>
                {dictionary.common.learnMore}
              </LinkButton>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
