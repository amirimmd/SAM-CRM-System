import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Badge } from "@/ui/components/Badge";
import { Button } from "@/ui/components/Button";
import { Card } from "@/ui/components/Card";
import { Container } from "@/ui/layout/Container";
import { Section } from "@/ui/layout/Section";

type PageProps = {
  params: { locale: Locale };
};

export default async function HomePage({ params }: PageProps) {
  const dictionary = await getDictionary(params.locale);

  return (
    <div>
      <Section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--glow-200),_transparent_55%)]" />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <Badge>{dictionary.nav.services}</Badge>
              <h1 className="text-4xl font-semibold leading-tight text-[var(--ink-900)] md:text-5xl">
                {dictionary.home.title}
              </h1>
              <p className="text-lg text-[var(--ink-500)]">
                {dictionary.home.subtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button>{dictionary.common.ctaPrimary}</Button>
                <Button variant="secondary">
                  {dictionary.common.ctaSecondary}
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-[var(--ink-500)]">
                <div className="rounded-full bg-white px-4 py-2 text-[var(--ink-900)] shadow-sm">
                  2,400+
                </div>
                <span>{dictionary.home.statLabel}</span>
              </div>
            </div>
            <div className="grid gap-4">
              {dictionary.home.highlights.map((item) => (
                <Card key={item.title} className="space-y-2">
                  <h3 className="text-lg font-semibold text-[var(--ink-900)]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--ink-500)]">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="space-y-4 bg-[var(--ink-900)] text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-200)]">
              CRM intelligence
            </p>
            <h2 className="text-2xl font-semibold">
              Conversion-ready analytics for logistics teams.
            </h2>
            <p className="text-sm text-white/80">
              Capture every touchpoint, segment by region, and build workflows
              that keep customers informed.
            </p>
            <Button variant="secondary" className="border-white/30 text-white">
              {dictionary.common.learnMore}
            </Button>
          </Card>
          <div className="grid gap-4 sm:grid-cols-2">
            {dictionary.services.cards.map((card) => (
              <Card key={card.title} className="space-y-2">
                <h3 className="text-lg font-semibold text-[var(--ink-900)]">
                  {card.title}
                </h3>
                <p className="text-sm text-[var(--ink-500)]">{card.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
