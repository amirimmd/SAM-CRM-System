import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Badge } from "@/ui/components/Badge";
import { Card } from "@/ui/components/Card";
import { RequestForm } from "@/ui/components/RequestForm";
import { Container } from "@/ui/layout/Container";
import { Section } from "@/ui/layout/Section";

type PageProps = {
  params: { locale: Locale };
};

export default async function RequestPage({ params }: PageProps) {
  const dictionary = await getDictionary(params.locale);

  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <div className="space-y-3">
            <Badge>{dictionary.nav.request}</Badge>
            <h1 className="text-3xl font-semibold text-[var(--ink-900)]">
              {dictionary.request.title}
            </h1>
            <p className="text-[var(--ink-500)]">{dictionary.request.subtitle}</p>
          </div>
          <Card className="space-y-4">
            <RequestForm
              locale={params.locale}
              copy={{
                fields: dictionary.request.fields,
                submit: dictionary.request.submit,
                successMessage: dictionary.request.successMessage,
                errorMessage: dictionary.request.errorMessage,
              }}
            />
          </Card>
        </div>
        <Card className="space-y-4 bg-[var(--ink-900)] text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-200)]">
            Response SLA
          </p>
          <h2 className="text-2xl font-semibold">Dedicated logistics desk</h2>
          <p className="text-sm text-white/80">
            Every request is reviewed by a coordinator who prepares a lane plan,
            pricing, and document checklist in under 12 hours.
          </p>
          <div className="grid gap-3 text-sm text-white/70">
            <div className="flex items-center justify-between">
              <span>Air freight quotes</span>
              <span>6-12 hrs</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Sea freight quotes</span>
              <span>12-18 hrs</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Customs review</span>
              <span>24 hrs</span>
            </div>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
