import Link from 'next/link';
import { getDictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';
import { Globe, Truck, Package, LogIn, LayoutDashboard, Menu } from 'lucide-react';

interface HeaderProps {
  locale: Locale;
}

export async function Header({ locale }: HeaderProps) {
  const dict = await getDictionary(locale);
  const isRtl = locale === 'fa';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/80 backdrop-blur-xl supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-20 max-w-screen-2xl items-center px-4 md:px-8 mx-auto justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-8">
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            {/* Animated Logo Container */}
            <div className="relative h-10 w-10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-yellow-600 to-yellow-400 opacity-80 blur-lg group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full w-full rounded-xl bg-black border border-yellow-500/30 flex items-center justify-center text-yellow-500">
                <Truck size={22} className={cn("transition-transform duration-500 group-hover:scale-110", isRtl ? "scale-x-[-1]" : "")} />
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-white leading-none">
                {dict.site.title}
              </span>
              <span className="text-[10px] text-yellow-500/80 font-medium tracking-widest uppercase mt-1">
                {isRtl ? 'صنایع پیشرفته' : 'PREMIUM LOGISTICS'}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 px-2 py-1.5 rounded-full border border-white/5">
            <NavLink href={`/${locale}/products`} text={isRtl ? 'محصولات' : 'Products'} active />
            <NavLink href={`/${locale}/tracking`} text={isRtl ? 'رهگیری' : 'Tracking'} />
            <NavLink href={`/${locale}/contact`} text={isRtl ? 'تماس' : 'Contact'} />
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link 
            href={isRtl ? '/en' : '/fa'} 
            className="text-xs font-bold text-zinc-500 hover:text-yellow-500 transition-colors uppercase tracking-wider"
          >
            {isRtl ? 'EN' : 'فا'}
          </Link>

          <div className="h-6 w-px bg-white/10 hidden sm:block" />

          <Link 
            href={`/${locale}/dashboard`}
            className={cn(
              "hidden sm:inline-flex h-10 items-center justify-center rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-500 px-6 text-sm font-bold text-black shadow-lg shadow-yellow-500/20 transition-all hover:brightness-110 hover:shadow-yellow-500/40 hover:-translate-y-0.5"
            )}
          >
            {dict.nav.dashboard}
          </Link>
          
          <button className="md:hidden text-white hover:text-yellow-500 transition-colors">
            <Menu />
          </button>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, text, active }: { href: string; text: string; active?: boolean }) {
  return (
    <Link 
      href={href}
      className={cn(
        "px-5 py-2 text-sm font-medium rounded-full transition-all duration-300",
        active 
          ? "bg-white/10 text-white shadow-inner" 
          : "text-zinc-400 hover:text-white hover:bg-white/5"
      )}
    >
      {text}
    </Link>
  );
}
