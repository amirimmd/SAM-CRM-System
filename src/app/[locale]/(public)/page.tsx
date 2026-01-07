// Home page: immersive hero with layered depth, logistics highlights, and CTA funnels.
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Badge } from "@/ui/components/Badge";
import { Card } from "@/ui/components/Card";
import { Icon } from "@/ui/components/Icon";
import { LinkButton } from "@/ui/components/LinkButton";
import { Orb } from "@/ui/components/Orb";
import { Sparkline } from "@/ui/charts/Sparkline";
import { Stat } from "@/ui/components/Stat";
import { Container } from "@/ui/layout/Container";
import { Section } from "@/ui/layout/Section";

type PageProps = {
  params: { locale: Locale };
};

export default async function HomePage({ params }: PageProps) {
  const dictionary = await getDictionary(params.locale);

  return (
    <div className="relative overflow-hidden bg-[var(--navy-1000)] text-white">
      <div className="absolute inset-0">
        <Orb size={480} blur={80} className="absolute -left-10 -top-24 opacity-80" />
        <Orb size={380} blur={70} className="absolute right-0 top-10 opacity-70" />
        <div className="light-sheen" />
      </div>

      <Section className="relative pt-12">
        <Container className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <Badge>{dictionary.nav.services}</Badge>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              {dictionary.home.title}
            </h1>
            <p className="text-lg text-[var(--navy-100)]">{dictionary.home.subtitle}</p>
            <div className="flex flex-wrap gap-3">
              <LinkButton href={`/${params.locale}/request`}>
                {dictionary.common.ctaPrimary}
              </LinkButton>
              <LinkButton variant="secondary" href={`/${params.locale}/tracking`}>
                {dictionary.common.ctaSecondary}
              </LinkButton>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <Stat label="Command center" value="24/7" helper="Ops coverage" />
              <Stat label="On-time arrivals" value="97%" helper="Trailing 90d" accent="success" />
              <Stat label="SLA" value="2h" helper="Enterprise response" accent="warning" />
            </div>
          </div>

          <div className="relative">
            <div className="glass-panel relative overflow-hidden rounded-3xl p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(62,223,199,0.14),transparent_40%)]" />
              <div className="relative flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="rounded-2xl bg-[rgba(62,223,199,0.15)] p-3 text-[var(--accent-400)]">
                      <Icon name="radar" />
                    </span>
                    <div>
                      <p className="text-sm text-[var(--navy-200)]">Live routes</p>
                      <p className="text-lg font-semibold text-white">Global radar</p>
                    </div>
                  </div>
                  <Badge>Edge</Badge>
                </div>
                <div className="grid gap-3 text-sm text-[var(--navy-100)]">
                  {dictionary.home.highlights.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start justify-between rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-4"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="text-xs text-[var(--navy-200)]">{item.description}</p>
                      </div>
                      <span className="sparkle" />
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">Velocity</p>
                    <span className="rounded-full bg-[rgba(62,223,199,0.12)] px-3 py-1 text-xs font-semibold text-[var(--accent-400)]">
                      +18% MoM
                    </span>
                  </div>
                  <Sparkline points={[12, 16, 14, 18, 22, 21, 25]} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="relative">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="glass-panel space-y-4 bg-[rgba(255,255,255,0.04)] text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-200)]">
              CRM intelligence
            </p>
            <h2 className="text-2xl font-semibold">
              Conversion-ready analytics for logistics teams.
            </h2>
            <p className="text-sm text-[var(--navy-100)]">
              Capture every touchpoint, segment by region, and build workflows
              that keep customers informed.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Stat label="Leads" value="124" helper="7d volume" />
              <Stat label="Win rate" value="38%" helper="Qualified" accent="success" />
            </div>
            <LinkButton
              variant="secondary"
              className="border-white/30 text-white"
              href={`/${params.locale}/services`}
            >
              {dictionary.common.learnMore}
            </LinkButton>
          </Card>
          <div className="grid gap-4 sm:grid-cols-2">
            {dictionary.services.cards.map((card) => (
              <Card key={card.title} className="glass-panel space-y-2 text-white">
                <div className="flex items-center gap-2 text-[var(--accent-400)]">
                  <Icon name="plane" />
                  <p className="text-xs uppercase tracking-[0.12em]">Lane</p>
                </div>
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="text-sm text-[var(--navy-100)]">{card.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
