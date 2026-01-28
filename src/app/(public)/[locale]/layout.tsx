import { Header } from '@/ui/layout/header';
import type { Locale } from '@/lib/i18n/config';
import { generateOrganizationSchema } from '@/lib/seo/schema';

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  
  // AEO: Generate structured data for AI engines
  const jsonLd = generateOrganizationSchema();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Inject JSON-LD for Search Engines & AI */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Header locale={locale} />
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="border-t py-6 md:py-0 bg-muted/20">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-8 mx-auto">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2026 SAM Logistics System. Built for speed.
          </p>
        </div>
      </footer>
    </div>
  );
}
