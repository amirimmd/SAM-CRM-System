// Home page: immersive hero, stats, services, and trust signals.
import { DEFAULT_LOCALE, isSupportedLocale, type Locale } from "@/lib/i18n/config";
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
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isSupportedLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dictionary = await getDictionary(locale);
  const highlights = dictionary.home?.highlights ?? [];

  return (
    <div className="relative overflow-hidden bg-[var(--navy-1000)] text-white">
      <div className="absolute inset-0">
        <Orb size={520} blur={90} className="absolute -left-20 -top-24 opacity-80" />
        <Orb size={380} blur={70} className="absolute right-0 top-16 opacity-70" />
        <div className="light-sheen" />
      </div>

      <Section className="relative pt-12">
        <Container className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <Badge>{dictionary.nav?.services ?? "Services"}</Badge>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              {dictionary.home?.title ?? "Global logistics, built for enterprise."}
            </h1>
            <p className="text-lg text-[var(--navy-100)]">
              {dictionary.home?.subtitle ??
                "Premium freight operations, CRM visibility, and intelligent tracking."}
            </p>
            <div className="flex flex-wrap gap-3">
              <LinkButton href={`/${locale}/request`}>
                {dictionary.common?.ctaPrimary ?? "Start a shipment"}
              </LinkButton>
              <LinkButton variant="secondary" href={`/${locale}/tracking`}>
                {dictionary.common?.ctaSecondary ?? "Track shipment"}
              </LinkButton>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <Stat label="Command center" value="24/7" helper="Ops coverage" />
              <Stat label="On-time arrivals" value="97%" helper="Trailing 90d" accent="success" />
              <Stat label="SLA" value="2h" helper="Enterprise response" accent="warning" />
            </div>
          </div>

          <div className="relative">
            <Card className="relative overflow-hidden rounded-3xl p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(62,223,199,0.18),transparent_45%)]" />
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
                  {highlights.length > 0
                    ? highlights.map((item) => (
                        <div
                          key={item.title}
                          className="flex items-start justify-between rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-4 transition hover:-translate-y-1"
                        >
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-white">{item.title}</p>
                            <p className="text-xs text-[var(--navy-200)]">
                              {item.description}
                            </p>
                          </div>
                          <span className="sparkle" />
                        </div>
                      ))
                    : null}
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
            </Card>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-6 md:grid-cols-3">
          {[
            { label: "Active lanes", value: "48", helper: "Asia, MENA, EU" },
            { label: "Documents processed", value: "6.2K", helper: "Last 30 days" },
            { label: "Avg. dwell time", value: "1.8d", helper: "Origin ports" },
          ].map((item) => (
            <Card key={item.label} className="text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--navy-200)]">
                {item.label}
              </p>
              <p className="mt-2 text-3xl font-semibold">{item.value}</p>
              <p className="mt-1 text-sm text-[var(--navy-100)]">{item.helper}</p>
            </Card>
          ))}
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="space-y-4">
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
            <LinkButton variant="secondary" href={`/${locale}/services`}>
              {dictionary.common?.learnMore ?? "Learn more"}
            </LinkButton>
          </Card>
          <div className="grid gap-4 sm:grid-cols-2">
            {dictionary.services?.cards?.map((card) => (
              <Card
                key={card.title}
                className="space-y-2 transition hover:-translate-y-1"
              >
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

      <Section>
        <Container className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-200)]">
                Trusted by
              </p>
              <h2 className="text-2xl font-semibold">Global supply chain teams</h2>
            </div>
            <Badge>Enterprise references available</Badge>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["Hanzo Trade", "Mira Home", "NovaTech", "Atlas Supply"].map((brand) => (
              <div
                key={brand}
                className="flex items-center justify-center rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-6 py-8 text-sm font-semibold text-[var(--navy-100)]"
              >
                {brand}
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
