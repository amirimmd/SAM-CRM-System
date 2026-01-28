import { Header } from '@/ui/layout/header';
import type { Locale } from '@/lib/i18n/config';
import { generateOrganizationSchema } from '@/lib/seo/schema';
import { cn } from '@/lib/utils';

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  
  // Direction & Font Logic
  const isRtl = locale === 'fa';
  const dir = isRtl ? 'rtl' : 'ltr';
  const fontClass = isRtl ? 'font-vazirmatn' : 'font-sans';

  const jsonLd = generateOrganizationSchema();

  return (
    <div 
      dir={dir} 
      className={cn("flex min-h-screen flex-col", fontClass)}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Header locale={locale} />
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="border-t py-12 md:py-16 bg-muted/20 mt-auto">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-6 md:px-8 mx-auto">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-start">
            © 2026 {isRtl ? 'سامانه لجستیک سم' : 'SAM Logistics System'}. 
            {isRtl ? ' تمامی حقوق محفوظ است.' : ' All rights reserved.'}
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
             <span>{isRtl ? 'حریم خصوصی' : 'Privacy'}</span>
             <span>{isRtl ? 'شرایط استفاده' : 'Terms'}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
