// About page: brand story and pillars.
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Badge } from "@/ui/components/Badge";
import { Card } from "@/ui/components/Card";
import { Container } from "@/ui/layout/Container";
import { Section } from "@/ui/layout/Section";

type PageProps = {
  params: { locale: Locale };
};

export default async function AboutPage({ params }: PageProps) {
  const dictionary = await getDictionary(params.locale);

  return (
    <Section>
      <Container className="space-y-8 text-white">
        <div className="space-y-3">
          <Badge>{dictionary.nav.about}</Badge>
          <h1 className="text-3xl font-semibold">{dictionary.about.title}</h1>
          <p className="text-[var(--navy-100)]">{dictionary.about.subtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {dictionary.about.pillars.map((pillar) => (
            <Card key={pillar.title} className="glass-panel space-y-2">
              <p className="text-sm uppercase tracking-[0.12em] text-[var(--accent-400)]">
                {pillar.title}
              </p>
              <p className="text-sm text-[var(--navy-100)]">{pillar.description}</p>
            </Card>
          ))}
        </div>
        <Card className="glass-panel space-y-2">
          <p className="text-sm font-semibold text-[var(--navy-50)]">
            Operations footprint
          </p>
          <p className="text-sm text-[var(--navy-100)]">
            Guangzhou · Shenzhen · Shanghai · Dubai · Hamburg · Lagos
          </p>
        </Card>
      </Container>
    </Section>
  );
}
