'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowLeft, ShieldCheck, Zap, Globe2, ChevronRight, Star, CheckCircle2, TrendingUp, Anchor } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MarketingPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const isRtl = locale === 'fa';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden bg-black text-white selection:bg-yellow-500/30 selection:text-yellow-500 font-vazirmatn">
      
      {/* 1. HERO SECTION (Cinematic Dark & Gold) */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-center overflow-hidden">
        
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-black">
             <Image 
                src="/hero/hero-bg.avif"
                alt="SAM Guangzhou Trading Headquarters"
                fill
                sizes="100vw"
                // opacity increased from 40 to 60 to show more image
                className="object-cover opacity-60 scale-105 animate-slow-pan"
                priority
             />
             {/* Gradient opacity reduced (via-black/60 -> via-black/40) to let image shine through */}
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80" />
        </div>
        
        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />

        <div className="container px-4 md:px-6 mx-auto relative z-10 pt-20">
          <div className="flex flex-col items-center text-center max-w-6xl mx-auto">
            
            {/* Exclusive Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-6 py-2 text-sm font-medium text-yellow-400 mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(234,179,8,0.2)] animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Globe2 size={14} className="fill-yellow-400/20 animate-pulse" />
              <span className="tracking-[0.2em] uppercase text-xs font-bold">
                {isRtl ? 'پل ارتباطی تجارت جهانی' : 'GLOBAL TRADING BRIDGE'}
              </span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-8 leading-[1.1] drop-shadow-2xl">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-500 to-yellow-700 mb-2">
                SAM Guangzhou
              </span>
              <span className="block text-white text-3xl sm:text-5xl md:text-6xl font-bold tracking-normal opacity-90">
                Trading Co.
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="max-w-3xl mx-auto text-zinc-300 text-lg md:text-2xl leading-relaxed mb-12 font-light">
              {isRtl 
                ? 'تامین، تولید و صادرات قطعات صنعتی و الکترونیک از قلب چین به سراسر جهان. ما شریک تجاری معتمد شما در گوانجو، دبی و تهران هستیم.'
                : 'Sourcing, manufacturing, and exporting industrial and electronic components from the heart of China to the world. Your trusted trading partner in Guangzhou, Dubai, and Tehran.'
              }
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
              <Link 
                href={`/${locale}/contact`}
                className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 px-12 font-bold text-black text-lg shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(234,179,8,0.6)]"
              >
                <span className="relative z-10 flex items-center gap-3">
                   {isRtl ? 'شروع تجارت' : 'Start Trading'} 
                   <Arrow className="transition-transform group-hover:translate-x-1" size={24} />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              
              <Link 
                href={`/${locale}/products`}
                className="inline-flex h-16 items-center justify-center rounded-full border border-white/20 bg-white/5 px-10 font-bold text-white text-lg transition-all hover:bg-white/10 hover:border-white/40 backdrop-blur-sm"
              >
                {isRtl ? 'مشاهده محصولات' : 'View Products'}
              </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mt-20 pt-10 border-t border-white/10 w-full max-w-4xl">
               <StatItem value="15+" label={isRtl ? 'سال تجربه' : 'Years Experience'} />
               <StatItem value="3" label={isRtl ? 'دفتر بین‌المللی' : 'Global Offices'} />
               <StatItem value="500+" label={isRtl ? 'شریک تجاری' : 'Partners'} />
               <StatItem value="24/7" label={isRtl ? 'پشتیبانی' : 'Support'} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES & CAPABILITIES (Dark Bento Grid) */}
      <section className="w-full py-32 bg-zinc-950 relative border-t border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container px-4 mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="max-w-2xl">
              <span className="text-yellow-500 font-bold tracking-widest uppercase text-sm mb-2 block">
                 {isRtl ? 'خدمات ما' : 'OUR SERVICES'}
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {isRtl ? 'راهکارهای جامع تجاری' : 'Comprehensive Trading Solutions'}
              </h2>
              <p className="text-zinc-400 text-lg">
                {isRtl 
                  ? 'از منبع‌یابی و کنترل کیفیت در چین تا حمل و ترخیص در مقصد، ما زنجیره تامین شما را مدیریت می‌کنیم.'
                  : 'From sourcing and QC in China to shipping and clearance at destination, we manage your entire supply chain.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Service 1: Sourcing */}
            <ServiceCard 
               icon={<SearchGlobe size={40} className="text-blue-400" />}
               title={isRtl ? 'منبع‌یابی تخصصی' : 'Professional Sourcing'}
               desc={isRtl ? 'دسترسی مستقیم به هزاران کارخانه معتبر در چین با بهترین قیمت.' : 'Direct access to thousands of verified factories in China with best prices.'}
               gradient="from-blue-500/20 to-transparent"
            />
             {/* Service 2: Quality Control */}
             <ServiceCard 
               icon={<ShieldCheck size={40} className="text-emerald-400" />}
               title={isRtl ? 'کنترل کیفیت (QC)' : 'Quality Control'}
               desc={isRtl ? 'بازرسی دقیق کالا قبل از بارگیری برای تضمین کیفیت.' : 'Rigorous pre-shipment inspection to guarantee product quality.'}
               gradient="from-emerald-500/20 to-transparent"
            />
             {/* Service 3: Logistics */}
             <ServiceCard 
               icon={<Anchor size={40} className="text-yellow-400" />}
               title={isRtl ? 'حمل و نقل دریایی و هوایی' : 'Sea & Air Freight'}
               desc={isRtl ? 'ارسال سریع و مطمئن بار از بنادر چین به دبی و ایران.' : 'Fast and secure shipping from China ports to Dubai and Iran.'}
               gradient="from-yellow-500/20 to-transparent"
            />
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCT (Highlight) */}
      <section className="w-full py-32 bg-black relative overflow-hidden">
        <div className="container px-4 mx-auto">
           <div className="relative rounded-[3rem] overflow-hidden bg-zinc-900 border border-white/10">
              <div className="absolute inset-0 bg-[url('/hero/hero-bg.avif')] bg-cover bg-center opacity-30 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 p-12 lg:p-20 items-center">
                 <div className="space-y-8">
                    <div className="inline-block px-4 py-1 rounded-full bg-yellow-500 text-black font-bold text-sm uppercase tracking-wider">
                       {isRtl ? 'محصول ویژه' : 'Featured Product'}
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                       {isRtl ? 'سیستم صوتی حرفه‌ای' : 'Professional Audio System'} <br />
                       <span className="text-yellow-500">Gold Edition</span>
                    </h2>
                    <p className="text-zinc-300 text-lg leading-relaxed max-w-md">
                       {isRtl 
                         ? 'جدیدترین شاهکار مهندسی ما. ترکیبی از قدرت، شفافیت صدا و طراحی لوکس صنعتی. موجود برای سفارش عمده.'
                         : 'Our latest engineering masterpiece. A blend of power, clarity, and luxury industrial design. Available for bulk orders.'}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                       <Link href={`/${locale}/products`} className="flex items-center justify-center h-14 px-8 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-colors">
                          {isRtl ? 'اطلاعات بیشتر' : 'Learn More'}
                       </Link>
                       <Link href={`/${locale}/contact`} className="flex items-center justify-center h-14 px-8 border border-white/20 text-white rounded-xl font-bold hover:bg-white/10 transition-colors">
                          {isRtl ? 'استعلام قیمت' : 'Get Quote'}
                       </Link>
                    </div>
                 </div>
                 
                 {/* Product Image */}
                 <div className="relative h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-yellow-900/20 group">
                    <Image 
                       src="/products/audio-system.webp" 
                       alt="Gold Audio System"
                       fill
                       sizes="(min-width: 1024px) 50vw, 100vw"
                       className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 4. TRUST SECTION */}
      <section className="w-full py-24 bg-zinc-950/50 border-t border-white/5">
          <div className="container px-4 mx-auto text-center">
              <p className="text-zinc-500 text-sm font-bold tracking-widest uppercase mb-12">
                  {isRtl ? 'شرکای تجاری ما در سراسر جهان' : 'TRUSTED BY GLOBAL PARTNERS'}
              </p>
              <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                  <span className="text-3xl font-black text-white flex items-center gap-2"><Globe2 /> CHINA SHIP</span>
                  <span className="text-3xl font-black text-white flex items-center gap-2"><Anchor /> DUBAI PORT</span>
                  <span className="text-3xl font-black text-white flex items-center gap-2"><Zap /> TEHRAN ELECTRONIC</span>
              </div>
          </div>
      </section>

    </div>
  );
}

// Helper Components
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 group cursor-default">
      <span className="text-4xl md:text-5xl font-black text-white tracking-tight group-hover:text-yellow-500 transition-colors duration-300">{value}</span>
      <span className="text-xs md:text-sm text-zinc-500 font-bold uppercase tracking-widest group-hover:text-zinc-300 transition-colors">{label}</span>
    </div>
  );
}

function ServiceCard({ icon, title, desc, gradient }: any) {
    return (
      <div className="group relative overflow-hidden rounded-3xl bg-zinc-900 border border-white/10 p-8 transition-all duration-500 hover:border-white/30 hover:-translate-y-2">
         <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
         <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
               {icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
            <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
               {desc}
            </p>
         </div>
      </div>
    );
}

// Custom Icon for Sourcing
function SearchGlobe(props: any) {
    return (
        <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    )
}
