// Home page: immersive hero with layered depth, logistics highlights, and CTA funnels.
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary"; // اصلاح مسیر ایمپورت (با توجه به فایل‌های آپلود شده)
import { Badge } from "@/ui/components/Badge";
import { Card } from "@/ui/components/Card";
import { Icon } from "@/ui/components/Icon";
import { LinkButton } from "@/ui/components/LinkButton"; // اگر این کامپوننت وجود ندارد، به Button تغییر دهید
import { Orb } from "@/ui/components/Orb";
import { Sparkline } from "@/ui/charts/Sparkline";
import { Stat } from "@/ui/components/Stat";
import { Container } from "@/ui/layout/Container"; // اگر وجود ندارد، div معمولی استفاده کنید
import { Section } from "@/ui/layout/Section";     // اگر وجود ندارد، div معمولی استفاده کنید

// 1. تغییر تایپ PageProps مطابق استاندارد Next.js 16
type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function HomePage({ params }: PageProps) {
  // 2. اضافه کردن await برای دریافت پارامترها
  const { locale } = await params;
  
  // دریافت دیکشنری ترجمه
  const dictionary = await getDictionary(locale);

  return (
    <div className="relative overflow-hidden bg-[var(--navy-1000)] text-white">
      <div className="absolute inset-0">
        <Orb size={480} blur={80} className="absolute -left-10 -top-24 opacity-80" />
        <Orb size={380} blur={70} className="absolute right-0 top-10 opacity-70" />
        <div className="light-sheen" />
      </div>

      <div className="relative pt-12"> {/* اگر Section ندارید، این div جایگزین است */}
        <div className="container mx-auto px-4 grid gap-12 lg:grid-cols-[1.05fr_0.95fr]"> {/* اگر Container ندارید */}
          <div className="space-y-6">
            <Badge>{dictionary.nav?.services ?? 'Services'}</Badge>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              {dictionary.home?.title ?? 'Logistics CRM'}
            </h1>
            <p className="text-lg text-[var(--navy-100)]">{dictionary.home?.subtitle ?? 'Manage your shipments globally.'}</p>
            <div className="flex flex-wrap gap-3">
              {/* دکمه‌ها - اگر LinkButton دارید از آن استفاده کنید، وگرنه از a یا Link استفاده کنید */}
              <a href={`/${locale}/request`} className="px-6 py-2 bg-blue-600 rounded-lg text-white">
                {dictionary.common?.ctaPrimary ?? 'Get Started'}
              </a>
              <a href={`/${locale}/tracking`} className="px-6 py-2 border border-white/20 rounded-lg text-white">
                {dictionary.common?.ctaSecondary ?? 'Track Shipment'}
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <Stat label="Command center" value="24/7" helper="Ops coverage" />
              <Stat label="On-time arrivals" value="97%" helper="Trailing 90d" accent="success" />
              <Stat label="SLA" value="2h" helper="Enterprise response" accent="warning" />
            </div>
          </div>

          <div className="relative">
            <div className="glass-panel relative overflow-hidden rounded-3xl p-6 bg-white/5 border border-white/10 backdrop-blur-md">
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
                  {dictionary.home?.highlights?.map((item: any) => (
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
        </div>
      </div>

      <div className="relative py-12">
        <div className="container mx-auto px-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="glass-panel space-y-4 bg-[rgba(255,255,255,0.04)] text-white p-6 border border-white/10 rounded-2xl">
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
            <a
              className="inline-block mt-4 px-6 py-2 border border-white/30 rounded-lg text-white hover:bg-white/10 transition"
              href={`/${locale}/services`}
            >
              {dictionary.common?.learnMore ?? 'Learn More'}
            </a>
          </Card>
          <div className="grid gap-4 sm:grid-cols-2">
            {dictionary.services?.cards?.map((card: any) => (
              <Card key={card.title} className="glass-panel space-y-2 text-white p-6 border border-white/10 rounded-2xl bg-white/5">
                <div className="flex items-center gap-2 text-[var(--accent-400)]">
                  <Icon name="plane" />
                  <p className="text-xs uppercase tracking-[0.12em]">Lane</p>
                </div>
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="text-sm text-[var(--navy-100)]">{card.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
