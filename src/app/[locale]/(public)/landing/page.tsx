// SEO landing template with focused CTA and bullet proof points.
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Badge } from "@/ui/components/Badge";
import { Card } from "@/ui/components/Card";
import { LinkButton } from "@/ui/components/LinkButton";
import { Container } from "@/ui/layout/Container";
import { Section } from "@/ui/layout/Section";

type PageProps = {
  params: { locale: Locale };
};

export default async function LandingPage({ params }: PageProps) {
  const dictionary = await getDictionary(params.locale);

  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] text-white">
        <div className="space-y-4">
          <Badge>{dictionary.nav.landing}</Badge>
          <h1 className="text-3xl font-semibold">{dictionary.landing.title}</h1>
          <p className="text-lg text-[var(--navy-100)]">{dictionary.landing.subtitle}</p>
          <div className="space-y-2 text-sm text-[var(--navy-100)]">
            {dictionary.landing.bullets.map((bullet) => (
              <div key={bullet} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-400)]" />
                {bullet}
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <LinkButton href={`/${params.locale}/request`}>
              {dictionary.landing.ctaPrimary}
            </LinkButton>
            <LinkButton variant="secondary" href={`/${params.locale}/tracking`}>
              {dictionary.landing.ctaSecondary}
            </LinkButton>
          </div>
        </div>
        <Card className="glass-panel space-y-4">
          <p className="text-sm font-semibold">Landing template</p>
          <p className="text-sm text-[var(--navy-100)]">
            Use this layout as a blueprint for SEO-driven campaigns targeting lane, commodity,
            or region-specific keywords. Swap bullets, add testimonials, and publish in minutes.
          </p>
        </Card>
      </Container>
    </Section>
  );
}
