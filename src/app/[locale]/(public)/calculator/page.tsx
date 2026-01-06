import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Badge } from "@/ui/components/Badge";
import { Card } from "@/ui/components/Card";
import { Input } from "@/ui/forms/Input";
import { Container } from "@/ui/layout/Container";
import { Section } from "@/ui/layout/Section";

type PageProps = {
  params: { locale: Locale };
};

export default async function CalculatorPage({ params }: PageProps) {
  const dictionary = await getDictionary(params.locale);

  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="space-y-3">
            <Badge>{dictionary.nav.calculator}</Badge>
            <h1 className="text-3xl font-semibold text-[var(--ink-900)]">
              {dictionary.calculator.title}
            </h1>
            <p className="text-[var(--ink-500)]">{dictionary.calculator.subtitle}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { id: "weight", label: dictionary.calculator.fields.weight, type: "number" },
              { id: "volume", label: dictionary.calculator.fields.volume, type: "number" },
              { id: "origin", label: dictionary.calculator.fields.origin, type: "text" },
              {
                id: "destination",
                label: dictionary.calculator.fields.destination,
                type: "text",
              },
              { id: "insurance", label: dictionary.calculator.fields.insurance, type: "text" },
            ].map((field) => (
              <label key={field.id} className="space-y-2 text-sm font-semibold">
                <span className="text-[var(--ink-700)]">{field.label}</span>
                <Input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  inputMode={field.type === "number" ? "decimal" : undefined}
                  placeholder={field.label}
                />
              </label>
            ))}
          </div>
        </div>
        <Card className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-500)]">
            {dictionary.calculator.estimateLabel}
          </p>
          <p className="text-3xl font-semibold text-[var(--ink-900)]">
            USD 1,200 - 1,800
          </p>
          <p className="text-sm text-[var(--ink-500)]">
            Estimates update when shipment data is confirmed by our logistics team.
          </p>
        </Card>
      </Container>
    </Section>
  );
}
