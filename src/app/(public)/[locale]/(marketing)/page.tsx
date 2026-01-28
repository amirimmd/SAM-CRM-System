import { getDictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';
import Link from 'next/link';

export default async function MarketingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRtl = locale === 'fa';

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
        <div className="container px-4 md:px-6 mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-4">
            ✨ The Future of Logistics
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl">
            Logistics Management <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Reimagined.
            </span>
          </h1>
          
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            Experience the fastest enterprise CRM built for modern logistics. 
            Real-time tracking, AI-powered insights, and seamless automation.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link 
              href={`/${locale}/auth/register`}
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Get Started
            </Link>
            <Link 
              href={`/${locale}/contact`}
              className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid (Bento Style) */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-zinc-900/50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-12">
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
              Engineered for Scale
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Our platform handles millions of shipments with sub-second latency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="group relative overflow-hidden rounded-xl border bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4 text-blue-600">
                🌍
              </div>
              <h3 className="font-bold text-xl mb-2">Global Tracking</h3>
              <p className="text-muted-foreground text-sm">Real-time GPS precision for every shipment across borders.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="group relative overflow-hidden rounded-xl border bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4 text-green-600">
                ⚡
              </div>
              <h3 className="font-bold text-xl mb-2">Instant Quotes</h3>
              <p className="text-muted-foreground text-sm">AI algorithms calculate shipping costs in milliseconds.</p>
            </div>

            {/* Feature 3 */}
            <div className="group relative overflow-hidden rounded-xl border bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4 text-purple-600">
                📊
              </div>
              <h3 className="font-bold text-xl mb-2">Deep Analytics</h3>
              <p className="text-muted-foreground text-sm">Visual insights into your supply chain efficiency.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
