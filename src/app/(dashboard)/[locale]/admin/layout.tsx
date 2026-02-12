'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useParams } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  FileText, 
  LogOut, 
  Menu,
  Bell,
  Search,
  Package,
  ShieldCheck,
  Briefcase,
  X,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const locale = (params?.locale as string) || 'fa';
  const isRtl = locale === 'fa';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // بستن منوی موبایل هنگام تغییر مسیر (تغییر صفحه)
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // تابع تغییر زبان کل پنل
  const toggleLanguage = () => {
    const newLocale = locale === 'fa' ? 'en' : 'fa';
    // جایگزینی زبان فعلی در آدرس با زبان جدید
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  const menuItems = [
    { 
      title: isRtl ? 'داشبورد مدیریتی' : 'Dashboard', 
      href: `/${locale}/admin`, 
      icon: LayoutDashboard 
    },
    { 
      title: isRtl ? 'مدیریت کاربران' : 'User Management', 
      href: `/${locale}/admin/users`, 
      icon: Users 
    },
    { 
      title: isRtl ? 'پنل CRM و فروش' : 'CRM & Sales', 
      href: `/${locale}/admin/crm`, 
      icon: Briefcase 
    },
    { 
      title: isRtl ? 'لجستیک و بارها' : 'Logistics', 
      href: `/${locale}/admin/logistics`, 
      icon: Package 
    },
    { 
      title: isRtl ? 'مدیریت محتوا (CMS)' : 'CMS', 
      href: `/${locale}/admin/cms`, 
      icon: FileText 
    },
    { 
      title: isRtl ? 'تنظیمات نرخ‌ها' : 'Rate Settings', 
      href: `/${locale}/admin/settings/rates`, 
      icon: Settings 
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-vazirmatn selection:bg-yellow-500/30">
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-[60] lg:hidden backdrop-blur-sm transition-opacity" 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "w-72 bg-[#0a0a0a] border-white/5 flex flex-col fixed h-full z-[70] shadow-2xl transition-transform duration-300 ease-in-out",
        isRtl ? "border-l right-0" : "border-r left-0",
        // کنترل نمایش در موبایل و دسکتاپ
        isMobileMenuOpen 
          ? "translate-x-0" 
          : (isRtl ? "translate-x-full lg:translate-x-0" : "-translate-x-full lg:translate-x-0")
      )}>
        
        {/* دکمه بستن منو در موبایل */}
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className={cn("lg:hidden absolute top-6 text-zinc-400 hover:text-white z-50", isRtl ? "left-6" : "right-6")}
        >
          <X size={24} />
        </button>

        {/* Brand Header */}
        <div className="h-24 flex flex-col items-center justify-center border-b border-white/5 bg-[url('/hero/hero-bg.avif')] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative z-10 flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                <ShieldCheck size={24} className="text-black" />
             </div>
             <div>
                <span className="block text-lg font-black text-white tracking-tight">SAM ADMIN</span>
                <span className="block text-[10px] text-yellow-500 font-bold tracking-widest uppercase">System Panel</span>
             </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          <div className="text-xs font-bold text-zinc-600 px-4 mb-4 uppercase tracking-widest">
            {isRtl ? 'منوی دسترسی' : 'Main Menu'}
          </div>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-3 px-4 py-3.5 rounded-2xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-300 relative overflow-hidden"
            >
              <item.icon size={20} className="relative z-10 group-hover:text-yellow-500 transition-colors" />
              <span className="relative z-10 font-medium text-sm">{item.title}</span>
              
              {/* Active/Hover Indicator */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* User Footer */}
        <div className="p-6 border-t border-white/5 bg-zinc-900/30">
          <Link 
            href={`/${locale}/login`} 
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-sm">{isRtl ? 'خروج امن' : 'Secure Logout'}</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={cn("flex-1 flex flex-col min-h-screen transition-all", isRtl ? "lg:mr-72" : "lg:ml-72")}>
        
        {/* Top Header Bar */}
        <header className="h-20 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40 px-6 lg:px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Hamburger Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white/5 text-zinc-400 hover:text-white transition-colors"
            >
              <Menu size={24} />
            </button>
            
            {/* Search (Desktop only) */}
            <div className="relative hidden lg:block group">
              <Search size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-yellow-500 transition-colors", isRtl ? "right-4" : "left-4")} />
              <input 
                type="text" 
                placeholder={isRtl ? "جستجو در سیستم..." : "Search system..."}
                className={cn(
                   "w-80 h-11 bg-zinc-900 border border-white/5 rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-yellow-500/30 focus:bg-zinc-800 transition-all",
                   isRtl ? "pr-11 pl-4" : "pl-11 pr-4"
                )}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            
            {/* 🌐 Language Switcher Button */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl bg-zinc-900 border border-white/5 hover:bg-white/5 hover:border-white/10 text-zinc-300 transition-all font-bold text-xs lg:text-sm shadow-sm"
              title={isRtl ? 'تغییر زبان' : 'Change Language'}
            >
              <Globe size={16} className="text-yellow-500" />
              <span>{locale === 'fa' ? 'English' : 'فارسی'}</span>
            </button>

            <button className="hidden sm:block relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#0a0a0a]" />
            </button>
            
            <div className="h-8 w-px bg-white/10 hidden lg:block" />
            
            <div className="flex items-center gap-3">
              <div className="text-end hidden sm:block">
                <div className="text-sm font-bold text-white">{isRtl ? 'مدیریت ارشد' : 'Admin'}</div>
                <div className="text-[10px] text-emerald-500 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded ml-auto w-fit">Super Admin</div>
              </div>
              <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full p-0.5 bg-gradient-to-br from-yellow-500 to-transparent shrink-0">
                 <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden">
                    <span className="font-bold text-yellow-500 text-xs lg:text-sm">AD</span>
                 </div>
              </div>
            </div>

          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-x-hidden">
          {children}
        </main>

      </div>
    </div>
  );
}
