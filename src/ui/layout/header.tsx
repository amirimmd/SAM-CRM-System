'use client'; // Client Component for interactivity

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Truck, Menu, X } from 'lucide-react';

interface HeaderProps {
  locale: string; // Changed from Locale type to string for client component simplicity
}

export function Header({ locale }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isRtl = locale === 'fa';

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/80 backdrop-blur-xl supports-[backdrop-filter]:bg-black/60 font-vazirmatn">
      <div className="container flex h-20 max-w-screen-2xl items-center px-4 md:px-8 mx-auto justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-8">
          <Link href={`/${locale}`} className="flex items-center gap-3 group z-50 relative">
            <div className="relative h-10 w-10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-yellow-600 to-yellow-400 opacity-80 blur-lg group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full w-full rounded-xl bg-black border border-yellow-500/30 flex items-center justify-center text-yellow-500">
                <Truck size={22} className={cn("transition-transform duration-500 group-hover:scale-110", isRtl ? "scale-x-[-1]" : "")} />
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-white leading-none">
                {isRtl ? 'سام لجستیک' : 'SAM Logistics'}
              </span>
              <span className="text-[10px] text-yellow-500/80 font-medium tracking-widest uppercase mt-1">
                {isRtl ? 'صنایع پیشرفته' : 'PREMIUM LOGISTICS'}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 px-2 py-1.5 rounded-full border border-white/5">
            <NavLink href={`/${locale}/products`} text={isRtl ? 'محصولات' : 'Products'} />
            <NavLink href={`/${locale}/tracking`} text={isRtl ? 'رهگیری' : 'Tracking'} />
            <NavLink href={`/${locale}/contact`} text={isRtl ? 'تماس' : 'Contact'} />
          </nav>
        </div>

        {/* Actions & Mobile Toggle */}
        <div className="flex items-center gap-4 z-50 relative">
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
            {isRtl ? 'داشبورد' : 'Dashboard'}
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            type="button"
            className="md:hidden text-white hover:text-yellow-500 transition-colors p-2"
            onClick={toggleMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!isMobileMenuOpen}
        className={cn(
          "fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl transition-opacity duration-300 ease-out md:hidden",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeMenu}
      >
        <div
          className={cn(
            "relative flex h-full flex-col justify-center px-8 transition-transform duration-300 ease-out",
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-4"
          )}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className={cn(
              "absolute top-6 text-white hover:text-yellow-500 transition-colors p-2",
              isRtl ? "left-6" : "right-6"
            )}
          >
            <X size={28} />
          </button>

          <nav className="flex flex-col gap-6 text-2xl font-bold text-center">
            <MobileNavLink href={`/${locale}`} text={isRtl ? 'خانه' : 'Home'} onClick={closeMenu} />
            <MobileNavLink href={`/${locale}/products`} text={isRtl ? 'محصولات' : 'Products'} onClick={closeMenu} />
            <MobileNavLink href={`/${locale}/tracking`} text={isRtl ? 'رهگیری مرسوله' : 'Tracking'} onClick={closeMenu} />
            <MobileNavLink href={`/${locale}/contact`} text={isRtl ? 'تماس با ما' : 'Contact'} onClick={closeMenu} />
            <MobileNavLink href={`/${locale}/dashboard`} text={isRtl ? 'پنل کاربری' : 'Dashboard'} onClick={closeMenu} className="text-yellow-500" />
          </nav>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, text }: { href: string; text: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href}
      className={cn(
        "px-5 py-2 text-sm font-medium rounded-full transition-all duration-300",
        isActive 
          ? "bg-white/10 text-white shadow-inner" 
          : "text-zinc-400 hover:text-white hover:bg-white/5"
      )}
    >
      {text}
    </Link>
  );
}

function MobileNavLink({ href, text, onClick, className }: { href: string; text: string; onClick: () => void; className?: string }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={cn("hover:text-yellow-500 transition-colors py-2 border-b border-white/5", className)}
    >
      {text}
    </Link>
  );
}
