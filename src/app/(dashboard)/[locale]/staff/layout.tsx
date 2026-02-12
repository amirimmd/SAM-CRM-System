'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { 
  LayoutDashboard, 
  PackagePlus, 
  Boxes, 
  UserCheck, 
  MessageSquare, 
  LogOut, 
  Menu,
  Bell,
  Search,
  Briefcase,
  X,
  Globe,
  ScanBarcode
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();
  
  const locale = (params?.locale as string) || 'fa';
  const isRtl = locale === 'fa';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const toggleLanguage = () => {
    const newLocale = locale === 'fa' ? 'en' : 'fa';
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    const segments = pathname.split('/');
    segments[1] = newLocale; 
    window.location.href = segments.join('/');
  };

  const menuItems = [
    { title: isRtl ? 'کارهای امروز' : 'Today\'s Tasks', href: `/${locale}/staff`, icon: LayoutDashboard },
    { title: isRtl ? 'ورود کالا (اسکن)' : 'Inbound (Scan)', href: `/${locale}/staff/inbound`, icon: ScanBarcode },
    { title: isRtl ? 'مدیریت کانتینرها' : 'Containers', href: `/${locale}/staff/shipments`, icon: Boxes },
    { title: isRtl ? 'تایید هویت (KYC)' : 'KYC Approvals', href: `/${locale}/staff/kyc`, icon: UserCheck },
    { title: isRtl ? 'تیکت و پشتیبانی' : 'Support Tickets', href: `/${locale}/staff/communication`, icon: MessageSquare },
  ];

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="flex min-h-screen bg-[#050505] text-white font-vazirmatn selection:bg-emerald-500/30">
      
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-[60] lg:hidden backdrop-blur-sm transition-opacity" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar (Staff Theme: Emerald) */}
      <aside className={cn(
        "w-72 bg-[#0a0a0a] border-white/5 flex flex-col fixed inset-y-0 z-[70] shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0",
        isRtl ? "border-l right-0" : "border-r left-0",
        isMobileMenuOpen ? "translate-x-0" : (isRtl ? "translate-x-full" : "-translate-x-full")
      )}>
        
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className={cn("lg:hidden absolute top-6 text-zinc-400 hover:text-white z-50 p-2 bg-zinc-900/80 rounded-xl border border-white/10", isRtl ? "left-4" : "right-4")}
        >
          <X size={20} />
        </button>

        <div className="h-20 lg:h-24 flex flex-col items-center justify-center border-b border-white/5 bg-[url('/hero/hero-bg.avif')] bg-cover bg-center relative shrink-0">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />
          <div className="relative z-10 flex items-center gap-3 w-full px-6">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
                <Briefcase size={24} className="text-black" />
             </div>
             <div>
                <span className="block text-base lg:text-lg font-black text-white tracking-tight">SAM STAFF</span>
                <span className="block text-[10px] text-emerald-500 font-bold tracking-widest uppercase">Operations Panel</span>
             </div>
          </div>
        </div>

        <nav className="flex-1 p-4 lg:p-6 space-y-1.5 overflow-y-auto">
          <div className="text-[10px] lg:text-xs font-bold text-zinc-600 px-4 mb-4 uppercase tracking-widest">
            {isRtl ? 'عملیات انبار' : 'Operations'}
          </div>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                 "group flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden",
                 pathname === item.href ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={20} className={cn("relative z-10 transition-colors shrink-0", pathname === item.href ? "text-emerald-500" : "group-hover:text-emerald-500")} />
              <span className="relative z-10 font-medium text-sm truncate">{item.title}</span>
              
              <div className={cn(
                 "absolute top-0 bottom-0 w-1 bg-emerald-500 transition-all duration-300",
                 isRtl ? "right-0 rounded-l-full" : "left-0 rounded-r-full",
                 pathname === item.href ? "opacity-100" : "opacity-0"
              )} />
            </Link>
          ))}
        </nav>

        <div className="p-4 lg:p-6 border-t border-white/5 bg-zinc-900/30 shrink-0">
          <Link 
            href={`/${locale}/login`} 
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all group"
          >
            <LogOut size={20} className={cn("transition-transform shrink-0", isRtl ? "group-hover:translate-x-1" : "group-hover:-translate-x-1")} />
            <span className="font-medium text-sm truncate">{isRtl ? 'خروج از حساب' : 'Logout'}</span>
          </Link>
        </div>
      </aside>

      <div className={cn(
         "flex-1 flex flex-col min-h-screen w-full transition-all duration-300",
         isRtl ? "lg:pr-72" : "lg:pl-72"
      )}>
        
        <header className="h-20 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40 px-4 lg:px-8 flex items-center justify-between shadow-sm shrink-0">
          <div className="flex items-center gap-4 lg:gap-6">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white transition-colors shrink-0"
            >
              <Menu size={24} />
            </button>
            
            <div className="relative hidden lg:block group">
              <Search size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-500 transition-colors", isRtl ? "right-4" : "left-4")} />
              <input 
                type="text" 
                placeholder={isRtl ? "جستجوی بارنامه یا مشتری..." : "Search tracking or customer..."}
                className={cn(
                   "w-80 h-11 bg-zinc-900/50 border border-white/5 rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:bg-zinc-800 transition-all",
                   isRtl ? "pr-11 pl-4" : "pl-11 pr-4"
                )}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-2 rounded-xl bg-zinc-900 border border-white/10 hover:bg-zinc-800 hover:border-white/20 text-zinc-300 transition-all font-bold text-xs lg:text-sm shadow-sm shrink-0"
            >
              <Globe size={16} className="text-emerald-500 shrink-0" />
              <span className="hidden sm:inline-block">{locale === 'fa' ? 'English' : 'فارسی'}</span>
              <span className="sm:hidden">{locale === 'fa' ? 'EN' : 'فا'}</span>
            </button>

            <button className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all shrink-0">
              <Bell size={18} className="sm:w-5 sm:h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-[#0a0a0a]" />
            </button>
            
            <div className="h-8 w-px bg-white/10 hidden lg:block" />
            
            <div className="flex items-center gap-3">
              <div className="text-end hidden sm:block">
                <div className="text-sm font-bold text-white">{isRtl ? 'کارشناس انبار' : 'Staff'}</div>
                <div className="text-[10px] text-emerald-500 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded ml-auto w-fit">Guangzhou</div>
              </div>
              <div className="w-9 h-9 lg:w-11 lg:h-11 rounded-full p-0.5 bg-gradient-to-br from-emerald-500 to-transparent shrink-0">
                 <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden">
                    <span className="font-bold text-emerald-500 text-xs lg:text-sm">ST</span>
                 </div>
              </div>
            </div>

          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-10 w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto w-full">
             {children}
          </div>
        </main>

      </div>
    </div>
  );
}
