import Link from 'next/link';
import { getDictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';

interface HeaderProps {
  locale: Locale;
}

export async function Header({ locale }: HeaderProps) {
  const dict = await getDictionary(locale);
  const isRtl = locale === 'fa';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 md:px-8 mx-auto">
        <div className="flex items-center gap-2 md:gap-4">
          {/* Logo Area */}
          <Link href={`/${locale}`} className="flex items-center space-x-2 font-bold text-xl tracking-tight">
            <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
              S
            </div>
            <span className="hidden md:inline-block">{dict.site.title}</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={cn("hidden md:flex items-center gap-6 text-sm font-medium", isRtl ? "mr-6" : "ml-6")}>
          <Link href={`/${locale}/tracking`} className="transition-colors hover:text-primary text-muted-foreground">
            Tracking
          </Link>
          <Link href={`/${locale}/shipping`} className="transition-colors hover:text-primary text-muted-foreground">
            Shipping
          </Link>
          <Link href={`/${locale}/services`} className="transition-colors hover:text-primary text-muted-foreground">
            Services
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className={cn("flex flex-1 items-center justify-end gap-2", isRtl ? "mr-auto" : "ml-auto")}>
          <Link 
            href={`/${locale}/auth/login`}
            className="hidden sm:inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Log in
          </Link>
          <Link 
            href={`/${locale}/dashboard`}
            className={cn(
              "inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            )}
          >
            {dict.nav.dashboard}
          </Link>
        </div>
      </div>
    </header>
  );
}
