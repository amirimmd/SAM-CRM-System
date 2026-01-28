import { getDictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowLeft, ShieldCheck, Zap, Globe2, ChevronRight, Star, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function MarketingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const isRtl = locale === 'fa';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden bg-black text-white selection:bg-yellow-500/30 selection:text-yellow-500">
      
      {/* 1. HERO SECTION (Cinematic Dark & Gold) */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-center overflow-hidden">
        
        {/* Dynamic Background - Using Local Asset */}
        <div className="absolute inset-0 bg-black">
             <Image 
                src="/hero/hero-bg.avif"
                alt="Industrial Background"
                fill
                className="object-cover opacity-30"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
        </div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />

        <div className="container px-4 md:px-6 mx-auto relative z-10 pt-20">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            
            {/* Exclusive Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-6 py-2 text-sm font-medium text-yellow-400 mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(234,179,8,0.2)] animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Star size={14} className="fill-yellow-400 animate-pulse" />
              <span className="tracking-[0.2em] uppercase text-xs font-bold">
                {isRtl ? 'استاندارد جهانی صنعت' : 'WORLD CLASS INDUSTRY STANDARDS'}
              </span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[1.1] drop-shadow-2xl">
              {isRtl ? (
                <>
                  <span className="block text-zinc-500 text-3xl sm:text-5xl font-bold mb-2 tracking-normal">مهندسی دقیق،</span>
                  تلفیق <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-700">قدرت و ظرافت</span>
                </>
              ) : (
                <>
                  <span className="block text-zinc-500 text-3xl sm:text-5xl font-bold mb-2 tracking-normal">Precision Engineering,</span>
                  The Art of <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-700">Heavy Industry</span>
                </>
              )}
            </h1>
            
            {/* Subheadline */}
            <p className="max-w-2xl mx-auto text-zinc-300 text-lg md:text-xl leading-relaxed mb-12 font-light">
              {isRtl 
                ? 'تولیدکننده سیستم‌های صوتی فوق سنگین صنعتی و ارائه دهنده راهکارهای لجستیک یکپارچه. جایی که تکنولوژی مدرن با سال‌ها تجربه در هم می‌آمیزد.'
                : 'Manufacturing heavy industrial audio systems and providing integrated logistics solutions. Where modern technology meets decades of expertise.'
              }
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
              <Link 
                href={`/${locale}/products`}
                className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 px-10 font-bold text-black shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(234,179,8,0.6)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                   {isRtl ? 'کاتالوگ محصولات' : 'View Catalog'} 
                   <Arrow className="transition-transform group-hover:translate-x-1" size={20} />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              
              <Link 
                href={`/${locale}/contact`}
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/10 bg-white/5 px-10 font-bold text-white transition-all hover:bg-white/10 hover:border-white/20 backdrop-blur-sm"
              >
                {isRtl ? 'مشاوره فنی' : 'Technical Consult'}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-yellow-500 to-transparent" />
        </div>
      </section>

      {/* 2. PRODUCT SHOWCASE (Immersive Gallery) */}
      <section className="w-full py-32 bg-zinc-950 relative border-t border-white/5">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
        
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="max-w-2xl">
              <span className="text-yellow-500 font-bold tracking-widest uppercase text-sm mb-2 block">
                 {isRtl ? 'محصولات انحصاری' : 'EXCLUSIVE PRODUCTS'}
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {isRtl ? 'شاهکارهای خط تولید' : 'Production Masterpieces'}
              </h2>
              <p className="text-zinc-400 text-lg">
                {isRtl 
                  ? 'هر قطعه با دقت میکرونی تراشیده شده و تحت سخت‌ترین آزمون‌های کیفیت قرار گرفته است.'
                  : 'Each component is machined with micron-level precision and subjected to the most rigorous quality tests.'}
              </p>
            </div>
            <Link href={`/${locale}/products`} className="group flex items-center gap-3 text-white font-bold border-b border-yellow-500/50 pb-1 hover:text-yellow-400 hover:border-yellow-400 transition-all">
              {isRtl ? 'مشاهده همه محصولات' : 'View All Products'} 
              <Arrow size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
            {/* Hero Product (Large) - UPDATED TO AUDIO SYSTEM */}
            <div className="md:col-span-7 h-[400px] md:h-full">
                <ProductCard 
                  size="large"
                  tag={isRtl ? 'تولید ویژه' : 'Signature Series'}
                  title={isRtl ? 'سیستم صوتی حرفه‌ای گلد' : 'Professional Gold Audio System'}
                  desc={isRtl ? 'کیفیت صدای بی‌نظیر با طراحی صنعتی لوکس و قطعات طلاکاری شده برای دوام ابدی.' : 'Unmatched sound quality with luxury industrial design and gold-plated components for eternal durability.'}
                  image="/products/audio-system.jpg" 
                  price="$Custom Quote"
                />
            </div>

            <div className="md:col-span-5 flex flex-col gap-6 h-full">
                {/* Secondary Product 1 */}
                <div className="flex-1 min-h-[250px]">
                    <ProductCard 
                      size="small"
                      tag={isRtl ? 'دقت بالا' : 'High Precision'}
                      title={isRtl ? 'ساب‌ووفر صنعتی' : 'Industrial Subwoofer'}
                      image="/products/valve.jpg" // Placeholder
                      price="$2,450"
                    />
                </div>
                {/* Secondary Product 2 */}
                <div className="flex-1 min-h-[250px]">
                     <ProductCard 
                      size="small"
                      tag={isRtl ? 'جدید' : 'New Arrival'}
                      title={isRtl ? 'آمپلی‌فایر کلاس A' : 'Class-A Amplifier'}
                      image="/products/turbine.jpg" // Placeholder
                      price="$1,890"
                    />
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOGISTICS CAPABILITIES (Bento Grid) */}
      <section className="w-full py-32 bg-black relative">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="text-zinc-500 font-bold tracking-widest uppercase text-sm mb-4 block">
                {isRtl ? 'لجستیک هوشمند' : 'SMART LOGISTICS'}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {isRtl ? 'فراتر از مرزهای جغرافیایی' : 'Beyond Geographic Borders'}
            </h2>
            <p className="text-zinc-400">
                {isRtl 
                 ? 'شبکه لجستیک ما با استفاده از هوش مصنوعی، سریع‌ترین و امن‌ترین مسیر را برای محموله‌های شما انتخاب می‌کند.' 
                 : 'Our AI-powered logistics network selects the fastest and safest routes for your shipments globally.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
             {/* Feature 1: Global Coverage (Wide) */}
             <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl bg-zinc-900 border border-white/5 p-8 flex flex-col justify-end">
                <div className="absolute top-0 right-0 p-40 bg-blue-500/10 rounded-full blur-[100px] group-hover:bg-blue-500/20 transition-all" />
                <Globe2 size={48} className="text-blue-500 mb-6 relative z-10" />
                <h3 className="text-2xl font-bold text-white mb-2 relative z-10">{isRtl ? 'پوشش جهانی' : 'Global Coverage'}</h3>
                <p className="text-zinc-400 relative z-10 max-w-sm">
                    {isRtl ? 'ارسال به ۱۸۰+ کشور با شرکای تجاری در ۵ قاره.' : 'Shipping to 180+ countries with partners across 5 continents.'}
                </p>
             </div>

             {/* Feature 2: Speed */}
             <div className="md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-3xl bg-zinc-900 border border-white/5 p-8 flex flex-col justify-end">
                 <div className="absolute top-0 left-0 p-40 bg-yellow-500/10 rounded-full blur-[100px] group-hover:bg-yellow-500/20 transition-all" />
                 <Zap size={48} className="text-yellow-500 mb-6 relative z-10" />
                 <h3 className="text-2xl font-bold text-white mb-2 relative z-10">{isRtl ? 'اکسپرس هوایی' : 'Air Express'}</h3>
                 <p className="text-zinc-400 relative z-10">
                     {isRtl ? 'تحویل ۲۴ ساعته.' : '24h Delivery.'}
                 </p>
             </div>

             {/* Feature 3: Security */}
             <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl bg-zinc-900 border border-white/5 p-8 flex flex-col justify-center">
                 <ShieldCheck size={32} className="text-emerald-500 mb-4" />
                 <h3 className="text-xl font-bold text-white">{isRtl ? 'بیمه کامل' : 'Full Insurance'}</h3>
             </div>

             {/* Feature 4: Tech */}
             <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 p-8 flex flex-col justify-center">
                 <div className="flex items-center gap-2 mb-2">
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                     <span className="text-xs font-mono text-green-500">SYSTEM ONLINE</span>
                 </div>
                 <h3 className="text-xl font-bold text-white">{isRtl ? 'رهگیری زنده' : 'Live Tracking'}</h3>
             </div>
          </div>
        </div>
      </section>

      {/* 4. TRUST SECTION */}
      <section className="w-full py-20 border-t border-white/5 bg-zinc-950/50">
          <div className="container px-4 mx-auto text-center">
              <p className="text-zinc-500 text-sm font-bold tracking-widest uppercase mb-10">
                  {isRtl ? 'مورد اعتماد بزرگان صنعت' : 'TRUSTED BY INDUSTRY LEADERS'}
              </p>
              <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                  {/* Logos would go here - using text placeholders for now */}
                  <span className="text-2xl font-black text-white">SIEMENS</span>
                  <span className="text-2xl font-black text-white">GE</span>
                  <span className="text-2xl font-black text-white">BOSCH</span>
                  <span className="text-2xl font-black text-white">CAT</span>
              </div>
          </div>
      </section>

    </div>
  );
}

// Components
function ChevronRightIcon(props: any) { return <ChevronRight {...props} /> }
function ChevronLeftIcon(props: any) { return <ChevronRight {...props} className="rotate-180" /> }

function ProductCard({ title, desc, price, image, tag, size = 'small' }: any) {
  return (
    <div className="group relative w-full h-full overflow-hidden rounded-3xl bg-zinc-900 border border-white/5 transition-all duration-500 hover:border-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-900/20">
      
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 z-0">
         {/* Note: In a real app, use a valid src. These are placeholders. */}
         {/* The 'bond.jpg' refers to the generated image above */}
         <Image 
            src={image} 
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
      </div>
      
      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
        
        {/* Top Tag */}
        <div className="absolute top-6 right-6">
             <span className="inline-block px-3 py-1 bg-yellow-500/90 text-black text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm rounded-full shadow-lg">
              {tag}
            </span>
        </div>

        <div className="transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
            <h3 className={cn("font-bold text-white mb-2 leading-tight drop-shadow-lg", size === 'large' ? 'text-3xl md:text-4xl' : 'text-xl')}>
                {title}
            </h3>
            
            {size === 'large' && (
                <p className="text-zinc-300 mb-4 max-w-md line-clamp-2 text-sm md:text-base font-light">
                    {desc}
                </p>
            )}
            
            <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                 <p className="text-yellow-400 font-mono font-bold">{price}</p>
                 <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md text-white hover:bg-yellow-500 hover:text-black transition-colors">
                    <ArrowRight size={14} />
                 </span>
            </div>
        </div>
      </div>
    </div>
  );
}
