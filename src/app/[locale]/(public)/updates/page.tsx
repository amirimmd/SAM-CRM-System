import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Badge } from "@/ui/components/Badge";
import { Card } from "@/ui/components/Card";
import { Container } from "@/ui/layout/Container";
import { Section } from "@/ui/layout/Section";

type PageProps = {
  params: { locale: Locale };
};

export default async function UpdatesPage({ params }: PageProps) {
  const dictionary = await getDictionary(params.locale);

  return (
    <Section>
      <Container className="space-y-8">
        <div className="space-y-3">
          <Badge>{dictionary.nav.updates}</Badge>
          <h1 className="text-3xl font-semibold text-[var(--ink-900)]">
            {dictionary.updates.title}
          </h1>
          <p className="text-[var(--ink-500)]">{dictionary.updates.subtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {dictionary.updates.items.map((item) => (
            <Card key={item.title} className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-500)]">
                {item.date}
              </p>
              <h2 className="text-lg font-semibold text-[var(--ink-900)]">
                {item.title}
              </h2>
              <p className="text-sm text-[var(--ink-500)]">{item.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
