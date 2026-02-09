'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Truck, Menu, X, ChevronDown, Phone, Globe, User } from 'lucide-react';

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isRtl = locale === 'fa';

  // تشخیص اسکرول برای تغییر استایل هدر
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    document.body.style.overflow = 'auto';
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: `/${locale}/products`, label: isRtl ? 'محصولات' : 'Products' },
    { href: `/${locale}/tracking`, label: isRtl ? 'رهگیری بار' : 'Tracking' },
    { href: `/${locale}/contact`, label: isRtl ? 'تماس با ما' : 'Contact' },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out font-vazirmatn will-change-transform",
          isScrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent py-6 border-b border-transparent"
        )}
      >
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex items-center justify-between">

            {/* Logo Area */}
            <div className="flex items-center gap-2 z-50">
              <Link href={`/${locale}`} className="group flex items-center gap-3" onClick={closeMenu}>
                <div className="relative flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-gradient-to-tr from-yellow-600 to-yellow-400 shadow-lg shadow-yellow-500/20 group-hover:shadow-yellow-500/40 transition-all duration-300 overflow-hidden ring-1 ring-white/10">
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                   {/* Shine Effect */}
                   <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                   
                   <Truck className={cn("text-white w-5 h-5 md:w-6 md:h-6 relative z-10 transition-transform duration-500 group-hover:scale-110 drop-shadow-md", isRtl && "scale-x-[-1]")} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg md:text-xl font-black text-white tracking-tight group-hover:text-yellow-400 transition-colors duration-300 leading-none">
                    {isRtl ? 'سام لجستیک' : 'SAM Logistics'}
                  </span>
                  <span className="text-[10px] md:text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em] group-hover:text-white transition-colors duration-300 mt-1">
                    {isRtl ? 'حمل و نقل بین‌المللی' : 'Global Freight'}
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm shadow-inner shadow-black/20">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 relative overflow-hidden group",
                    pathname === link.href
                      ? "text-black bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.4)] ring-2 ring-yellow-400/50"
                      : "text-zinc-400 hover:text-white hover:bg-white/10"
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}
            </nav>

            {/* Actions Area */}
            <div className="hidden md:flex items-center gap-3 z-50">
              {/* Language Switcher */}
              <Link
                href={isRtl ? '/en' : '/fa'}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-300 text-xs font-bold uppercase tracking-wider border border-white/5 hover:border-white/20 bg-white/5"
              >
                <Globe size={16} className="text-yellow-500" />
                <span>{isRtl ? 'EN' : 'فا'}</span>
              </Link>

              {/* Dashboard Button */}
              <Link
                href={`/${locale}/dashboard`}
                className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white font-bold text-sm transition-all duration-300 hover:border-yellow-500/50 hover:shadow-[0_0_20px_rgba(234,179,8,0.15)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2 group-hover:text-yellow-400 transition-colors">
                  <User size={18} />
                  {isRtl ? 'حساب کاربری' : 'Dashboard'}
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden relative z-50 p-2.5 rounded-xl bg-white/5 border border-white/5 text-white hover:text-yellow-400 hover:bg-white/10 transition-all active:scale-95"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl transition-all duration-500 lg:hidden flex flex-col font-vazirmatn",
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="flex flex-col h-full pt-32 px-6 pb-10 overflow-y-auto">
          <nav className="flex flex-col gap-4 relative z-10 w-full max-w-md mx-auto flex-1">
            {navLinks.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="group flex items-center justify-between p-5 rounded-2xl bg-zinc-900/50 border border-white/5 hover:bg-white/10 hover:border-yellow-500/30 transition-all duration-300 active:scale-[0.98]"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <span className="text-xl font-bold text-zinc-300 group-hover:text-yellow-400 transition-colors">
                  {link.label}
                </span>
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center bg-black/50 border border-white/5 group-hover:bg-yellow-500 text-zinc-500 group-hover:text-black transition-all duration-300", isRtl ? "rotate-180" : "")}>
                   <ChevronDown size={20} className="-rotate-90" />
                </div>
              </Link>
            ))}
          </nav>

          <div className="relative z-10 w-full max-w-md mx-auto mt-auto space-y-4">
             <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full" />
             
             <div className="grid grid-cols-2 gap-4">
                <Link
                   href={isRtl ? '/en' : '/fa'}
                   onClick={closeMenu}
                   className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-zinc-900/80 border border-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all active:scale-95"
                >
                   <Globe size={20} className="text-blue-400" />
                   <span className="text-sm font-bold">{isRtl ? 'English' : 'فارسی'}</span>
                </Link>

                <Link
                   href={`/${locale}/dashboard`}
                   onClick={closeMenu}
                   className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-yellow-600 to-yellow-500 text-black font-bold shadow-lg shadow-yellow-500/20 active:scale-95 transition-transform"
                >
                   <User size={20} />
                   <span className="text-sm">{isRtl ? 'پنل کاربری' : 'Dashboard'}</span>
                </Link>
             </div>
             
             <div className="text-center">
                <p className="text-xs text-zinc-600 font-mono">SAM Logistics © 2026</p>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
