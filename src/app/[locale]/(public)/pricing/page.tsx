// Pricing page: tiered plans with CTA and gradient depth.
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Badge } from "@/ui/components/Badge";
import { Card } from "@/ui/components/Card";
import { Icon } from "@/ui/components/Icon";
import { LinkButton } from "@/ui/components/LinkButton";
import { Container } from "@/ui/layout/Container";
import { Section } from "@/ui/layout/Section";

type PageProps = {
  params: { locale: Locale };
};

export default async function PricingPage({ params }: PageProps) {
  const dictionary = await getDictionary(params.locale);

  return (
    <Section>
      <Container className="space-y-10 text-white">
        <div className="space-y-3">
          <Badge>{dictionary.nav.pricing}</Badge>
          <h1 className="text-3xl font-semibold">{dictionary.pricing.title}</h1>
          <p className="text-[var(--navy-100)]">{dictionary.pricing.subtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {dictionary.pricing.tiers.map((tier, index) => (
            <Card
              key={tier.name}
              className="glass-panel space-y-4"
              style={{
                background:
                  index === 1
                    ? "linear-gradient(135deg, rgba(30,199,173,0.12), rgba(94,75,255,0.12))"
                    : undefined,
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--navy-200)]">{tier.name}</p>
                  <p className="text-2xl font-semibold">{tier.price}</p>
                </div>
                <Icon name="shield" className="text-[var(--accent-400)]" />
              </div>
              <ul className="space-y-2 text-sm text-[var(--navy-100)]">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-400)]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <LinkButton href={`/${params.locale}/request`}>{tier.cta}</LinkButton>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
