import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Badge } from "@/ui/components/Badge";
import { Card } from "@/ui/components/Card";
import { Container } from "@/ui/layout/Container";
import { Section } from "@/ui/layout/Section";

type PageProps = {
  params: { locale: Locale };
};

export default async function BrandsPage({ params }: PageProps) {
  const dictionary = await getDictionary(params.locale);

  return (
    <Section>
      <Container className="space-y-8">
        <div className="space-y-3">
          <Badge>{dictionary.nav.brands}</Badge>
          <h1 className="text-3xl font-semibold text-[var(--ink-900)]">
            {dictionary.brands.title}
          </h1>
          <p className="text-[var(--ink-500)]">{dictionary.brands.subtitle}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dictionary.brands.items.map((brand) => (
            <Card
              key={brand}
              className="flex items-center justify-between text-sm font-semibold text-[var(--ink-800)]"
            >
              {brand}
              <span className="rounded-full bg-[var(--mist-100)] px-3 py-1 text-xs text-[var(--ink-500)]">
                Partner
              </span>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
