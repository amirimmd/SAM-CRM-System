'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ShieldCheck, 
  Users, 
  Briefcase, 
  ArrowLeft, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Truck,
  Globe2,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

// دیکشنری کلمات برای دو زبان
const translations = {
  fa: {
    brandName: "سام لجستیک",
    brandSubtitle: "حمل و نقل بین‌المللی",
    loginTitle: "ورود به حساب کاربری",
    loginSubtitle: "لطفا سطح دسترسی خود را انتخاب کنید",
    emailLabel: "ایمیل یا نام کاربری",
    passwordLabel: "رمز عبور",
    forgotPassword: "رمز عبور را فراموش کرده‌اید؟",
    loginButton: "ورود به پنل",
    noAccount: "هنوز حساب کاربری ندارید؟",
    requestAccess: "درخواست عضویت",
    securityNote: "اتصال امن با رمزنگاری ۲۵۶ بیتی برقرار است",
    roles: {
      partner: { title: "شریک تجاری", subtitle: "پیگیری بار و سفارشات" },
      staff: { title: "کارشناس عملیات", subtitle: "مدیریت امور مشتریان" },
      admin: { title: "مدیریت ارشد", subtitle: "دسترسی کامل سیستم" }
    },
    hero: {
      title1: "پلتفرم جامع",
      title2: "مدیریت زنجیره تامین",
      desc: "به سامانه یکپارچه سام لجستیک خوش آمدید. ما با بهره‌گیری از تکنولوژی روز، امنیت و سرعت تجارت شما را از مبدا چین تا مقصد نهایی تضمین می‌کنیم.",
      badge1: "پوشش جهانی",
      badge2: "امنیت داده‌ها"
    }
  },
  en: {
    brandName: "SAM Logistics",
    brandSubtitle: "Global Freight",
    loginTitle: "Login to Account",
    loginSubtitle: "Please select your access level",
    emailLabel: "Email or Username",
    passwordLabel: "Password",
    forgotPassword: "Forgot Password?",
    loginButton: "Login to Panel",
    noAccount: "Don't have an account?",
    requestAccess: "Request Access",
    securityNote: "256-bit Secure Connection Established",
    roles: {
      partner: { title: "Business Partner", subtitle: "Track shipments & orders" },
      staff: { title: "Operations Expert", subtitle: "Customer management" },
      admin: { title: "Super Admin", subtitle: "Full system access" }
    },
    hero: {
      title1: "Comprehensive Platform",
      title2: "Supply Chain Management",
      desc: "Welcome to SAM Logistics integrated system. We guarantee the security and speed of your trade from origin to destination.",
      badge1: "Global Coverage",
      badge2: "Data Security"
    }
  }
};

export default function LoginPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'fa';
  const isRtl = locale === 'fa';
  
  // انتخاب متن‌ها بر اساس زبان
  const t = translations[locale as 'fa' | 'en'] || translations.fa;

  const [activeRole, setActiveRole] = useState<'admin' | 'staff' | 'partner'>('partner');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        console.log("Logged in as", activeRole);
    }, 2000);
  };

  const roles = [
    {
      id: 'partner',
      icon: Users,
      color: 'from-blue-400 to-blue-600',
      ...t.roles.partner
    },
    {
      id: 'staff',
      icon: Briefcase,
      color: 'from-emerald-400 to-emerald-600',
      ...t.roles.staff
    },
    {
      id: 'admin',
      icon: ShieldCheck,
      color: 'from-yellow-400 to-yellow-600',
      ...t.roles.admin
    }
  ] as const;

  return (
    <div className="flex min-h-[calc(100vh-80px)] mt-[80px] w-full overflow-hidden bg-black selection:bg-yellow-500/30">
      
      {/* RIGHT SIDE: Visuals (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero/hero-bg.avif"
            alt="Logistics World"
            fill
            className="object-cover opacity-40 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
        </div>

        {/* Brand Content */}
        <div className="relative z-10">
           <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center text-black shadow-[0_0_25px_rgba(234,179,8,0.4)]">
                 <Truck size={24} strokeWidth={2.5} className={cn(isRtl && "scale-x-[-1]")} />
              </div>
              <span className="text-2xl font-black text-white tracking-tight uppercase">{t.brandName}</span>
           </div>
        </div>

        <div className="relative z-10 max-w-lg">
           <h1 className="text-5xl font-black text-white mb-6 leading-tight">
             {t.hero.title1} <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-600">
               {t.hero.title2}
             </span>
           </h1>
           <p className="text-zinc-400 text-lg leading-relaxed mb-8">
             {t.hero.desc}
           </p>
           
           <div className="flex gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                 <Globe2 size={16} className="text-blue-400" />
                 <span className="text-xs font-bold text-zinc-300">{t.hero.badge1}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                 <ShieldCheck size={16} className="text-emerald-400" />
                 <span className="text-xs font-bold text-zinc-300">{t.hero.badge2}</span>
              </div>
           </div>
        </div>

        <div className="relative z-10 text-xs text-zinc-600 font-mono">
           SYSTEM VERSION 4.2.0 (BETA)
        </div>
      </div>

      {/* LEFT SIDE: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
         {/* Mobile BG */}
         <div className="absolute inset-0 lg:hidden bg-[url('/hero/hero-bg.avif')] bg-cover bg-center opacity-10" />
         
         <div className="w-full max-w-md relative z-10">
            
            <div className="text-center mb-10 lg:hidden">
               <Truck size={40} className={cn("mx-auto text-yellow-500 mb-4", isRtl && "scale-x-[-1]")} />
               <h2 className="text-2xl font-bold text-white uppercase">{t.brandName}</h2>
            </div>

            <div className="mb-8">
               <h2 className="text-3xl font-bold text-white mb-2">{t.loginTitle}</h2>
               <p className="text-zinc-400 text-sm">{t.loginSubtitle}</p>
            </div>

            {/* Role Selector Tabs */}
            <div className="grid grid-cols-3 gap-2 mb-8 p-1 bg-zinc-900/50 border border-white/5 rounded-2xl">
               {roles.map((role) => {
                 const Icon = role.icon;
                 const isActive = activeRole === role.id;
                 return (
                   <button
                     key={role.id}
                     onClick={() => setActiveRole(role.id as any)}
                     className={cn(
                       "relative flex flex-col items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 group",
                       isActive 
                         ? "bg-zinc-800 text-white shadow-lg ring-1 ring-white/10" 
                         : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
                     )}
                   >
                     <Icon size={20} className={cn("transition-colors", isActive ? `text-${role.id === 'admin' ? 'yellow' : role.id === 'staff' ? 'emerald' : 'blue'}-500` : "")} />
                     <span className="text-[10px] font-bold text-center leading-tight">{role.title}</span>
                     
                     {/* Active Indicator Dot */}
                     {isActive && (
                       <span className={cn("absolute top-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r", isRtl ? "right-2" : "left-2", role.color)} />
                     )}
                   </button>
                 );
               })}
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
               
               <div className="space-y-4">
                  <div className="relative group">
                     <label className="text-xs font-bold text-zinc-400 mb-1.5 block px-1">{t.emailLabel}</label>
                     <div className="relative">
                        <input 
                          type="email" 
                          className="w-full h-14 bg-zinc-900/50 border border-white/10 rounded-xl px-12 text-white placeholder:text-zinc-600 focus:outline-none focus:border-yellow-500/50 focus:bg-zinc-900 transition-all text-left dir-ltr"
                          placeholder={activeRole === 'admin' ? 'admin@sam-logistics.com' : 'user@example.com'}
                        />
                        <div className={cn("absolute top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-yellow-500 transition-colors", isRtl ? "right-4" : "left-4")}>
                           <Mail size={20} />
                        </div>
                     </div>
                  </div>

                  <div className="relative group">
                     <div className="flex justify-between items-center mb-1.5 px-1">
                        <label className="text-xs font-bold text-zinc-400">{t.passwordLabel}</label>
                        <Link href="#" className="text-xs text-yellow-500/80 hover:text-yellow-500 transition-colors">{t.forgotPassword}</Link>
                     </div>
                     <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"}
                          className="w-full h-14 bg-zinc-900/50 border border-white/10 rounded-xl px-12 text-white placeholder:text-zinc-600 focus:outline-none focus:border-yellow-500/50 focus:bg-zinc-900 transition-all text-left dir-ltr font-mono tracking-widest"
                          placeholder="••••••••"
                        />
                        <div className={cn("absolute top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-yellow-500 transition-colors", isRtl ? "right-4" : "left-4")}>
                           <Lock size={20} />
                        </div>
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className={cn("absolute top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors", isRtl ? "left-4" : "right-4")}
                        >
                           {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                     </div>
                  </div>
               </div>

               <button 
                 type="submit" 
                 disabled={isLoading}
                 className={cn(
                   "w-full h-14 rounded-xl font-bold text-lg text-black flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden",
                   activeRole === 'admin' ? "bg-gradient-to-r from-yellow-600 to-yellow-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)]" :
                   activeRole === 'staff' ? "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] text-white" :
                   "bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] text-white"
                 )}
               >
                 {isLoading ? (
                    <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
                 ) : (
                    <>
                       <span>{t.loginButton} {roles.find(r => r.id === activeRole)?.title}</span>
                       {isRtl ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
                    </>
                 )}
               </button>

            </form>

            <div className="mt-8 text-center">
               <p className="text-zinc-500 text-sm">
                  {t.noAccount}{' '}
                  <Link href={`/${locale}/contact`} className="text-white font-bold hover:underline decoration-yellow-500 underline-offset-4">
                     {t.requestAccess}
                  </Link>
               </p>
            </div>

            {/* Security Note */}
            <div className="mt-12 flex items-center justify-center gap-2 text-[10px] text-zinc-600 bg-zinc-900/30 py-2 rounded-lg border border-white/5">
               <Lock size={10} />
               <span>{t.securityNote}</span>
            </div>

         </div>
      </div>

    </div>
  );
}
