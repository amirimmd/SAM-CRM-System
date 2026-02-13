import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  ArrowLeft, 
  Wifi, 
  Speaker, 
  Hammer, 
  Radio, 
  Globe,
  Ship,
  Phone,
  Search,
  Calculator // اضافه کردن آیکون ماشین حساب
} from "lucide-react";
import { cn } from "@/lib/utils";

export default async function MarketingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isRtl = locale === 'fa';

  const texts = {
    fa: {
      logisticsCard: {
        badge: "خدمات اصلی",
        title: "حمل و نقل بین‌المللی",
        subtitle: "Smart Logistics",
        desc: "تمرکز اصلی ما بر روی سرعت و امنیت در ارسال بار است. سامانه جامع ما امکان رهگیری لحظه‌ای مرسولات و ارتباط مستقیم با کارشناسان خبره را برای شما فراهم می‌کند.",
        ctaTracking: "رهگیری مرسوله",
        ctaContact: "ارتباط با کارشناسان",
        ctaCalculator: "استعلام نرخ حمل", // متن دکمه جدید
      },
      audioCard: {
        badge: "محصول ویژه",
        title: "سیستم صوتی حرفه‌ای",
        subtitle: "Gold Edition",
        desc: "جدیدترین شاهکار مهندسی ما. ترکیبی از قدرت، شفافیت صدا و طراحی لوکس صنعتی. موجود برای سفارش عمده.",
        cta: "مشاهده جزئیات فنی",
      },
      products: [
        {
          title: "آمپلی‌فایر استریمینگ A50+",
          brand: "Arylic",
          desc: "مغز متفکر سیستم. آمپلی‌فایر تمام دیجیتال ۱۶۰ وات با قابلیت اتصال شبکه و Multi-room.",
          icon: Wifi,
          features: ["۱۶۰ وات توان خروجی", "Wi-Fi & Bluetooth 5.0", "AirPlay & Spotify Connect", "کنترل با اپلیکیشن"]
        },
        {
          title: "پیش‌تقویت‌کننده هوشمند BP50",
          brand: "Arylic",
          desc: "مرکز اتصالات مدرن. افزودن قابلیت‌های بلوتوث و HDMI ARC به سیستم‌های صوتی.",
          icon: Radio,
          features: ["HDMI ARC & Phono", "بلوتوث دو طرفه", "DAC داخلی با کیفیت", "ریموت کنترل"]
        },
        {
          title: "ووفر قدرتمند AC-M165",
          brand: "Santa Cruz",
          desc: "قلب تپنده بیس. درایور ۶.۵ اینچی خام با مگنت بزرگ برای پروژه‌های حرفه‌ای DIY.",
          icon: Speaker,
          features: ["سایز ۶.۵ اینچ", "مگنت High-Grade", "فریم فلزی مستحکم", "دقت فرکانسی بالا"]
        },
        {
          title: "سری‌های صنعتی S3",
          brand: "Santa Cruz",
          desc: "دقت در نصب. سری‌های پیچ‌گوشتی تیتانیومی با خاصیت مغناطیسی فوق‌العاده.",
          icon: Hammer,
          features: ["آلیاژ فولاد S3", "روکش تیتانیوم طلایی", "رینگ مغناطیسی قوی", "مقاوم در برابر سایش"]
        }
      ],
      partnersTitle: "همکاران تجاری و تامین‌کنندگان",
      partnersSubtitle: "همکاری مستقیم با برترین برندهای تکنولوژی و لجستیک چین"
    },
    en: {
      logisticsCard: {
        badge: "Core Service",
        title: "International Freight",
        subtitle: "Smart Logistics",
        desc: "Our main focus is speed and security in shipping. Our comprehensive system enables real-time shipment tracking and direct contact with expert agents.",
        ctaTracking: "Track Shipment",
        ctaContact: "Contact Experts",
        ctaCalculator: "Get Shipping Quote", // متن دکمه جدید انگلیسی
      },
      audioCard: {
        badge: "Featured Product",
        title: "Professional Audio System",
        subtitle: "Gold Edition",
        desc: "Our latest engineering masterpiece. A blend of power, clarity, and luxury industrial design. Available for bulk orders.",
        cta: "View Tech Specs",
      },
      products: [
        {
          title: "A50+ Streaming Amplifier",
          brand: "Arylic",
          desc: "The mastermind. 160W full digital amplifier with Network & Multi-room capability.",
          icon: Wifi,
          features: ["160W Output Power", "Wi-Fi & Bluetooth 5.0", "AirPlay & Spotify Connect", "App Control"]
        },
        {
          title: "BP50 Smart Pre-amp",
          brand: "Arylic",
          desc: "Modern connectivity hub. Adds HDMI ARC and Bluetooth to existing systems.",
          icon: Radio,
          features: ["HDMI ARC & Phono", "Two-way Bluetooth", "High-Quality DAC", "Remote Control"]
        },
        {
          title: "AC-M165 Powerful Woofer",
          brand: "Santa Cruz",
          desc: "The beating heart of bass. 6.5-inch raw driver for professional DIY projects.",
          icon: Speaker,
          features: ["6.5 Inch Size", "High-Grade Magnet", "Solid Metal Frame", "High Frequency Accuracy"]
        },
        {
          title: "S3 Industrial Bits",
          brand: "Santa Cruz",
          desc: "Precision installation. Titanium-coated screwdriver bits with strong magnetism.",
          icon: Hammer,
          features: ["S3 Steel Alloy", "Gold Titanium Coating", "Strong Magnetic Ring", "Wear Resistant"]
        }
      ],
      partnersTitle: "Trusted Partners & Suppliers",
      partnersSubtitle: "Collaborating with Top Chinese Tech & Logistics Brands"
    }
  };

  const t = isRtl ? texts.fa : texts.en;
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  const partnerBrands = [
    { name: "COSCO", type: "Shipping", color: "hover:text-blue-500" },
    { name: "Alibaba", type: "Trade", color: "hover:text-orange-500" },
    { name: "Xiaomi", type: "Tech", color: "hover:text-orange-600" },
    { name: "DJI", type: "Drone", color: "hover:text-sky-400" },
    { name: "SF Express", type: "Logistics", color: "hover:text-red-600" },
    { name: "HUAWEI", type: "Tech", color: "hover:text-red-500" },
    { name: "Edifier", type: "Audio", color: "hover:text-white" },
    { name: "Anker", type: "Electronics", color: "hover:text-blue-300" },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-vazirmatn pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/hero/hero-bg.avif"
            alt="Logistics Background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-bold mb-6 backdrop-blur-sm animate-pulse">
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              SAM LOGISTICS TRADING
           </div>
           <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
             {isRtl ? 'تجارت جهانی،' : 'Global Trade,'} <br className="md:hidden" />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
               {isRtl ? 'بدون مرز' : 'Limitless'}
             </span>
           </h1>
           <p className="text-zinc-400 max-w-2xl mx-auto text-lg mb-8 leading-relaxed">
             {isRtl 
               ? 'راهکارهای جامع حمل و نقل بین‌المللی از چین به سراسر دنیا. ما فاصله تولید تا مصرف را با بالاترین سرعت و امنیت پر می‌کنیم.'
               : 'Comprehensive international shipping solutions from China to the world. We bridge the gap from production to consumption with speed and security.'}
           </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 -mt-24 relative z-20 space-y-8">
        
        {/* 2. LOGISTICS CARD (دکمه جدید اینجاست) */}
        <div className="group relative w-full rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-blue-950 to-black border border-white/10 shadow-2xl shadow-blue-900/20">
          <div className="absolute inset-0 z-0">
             <Image 
               src="/services/logistics.webp" 
               alt="Smart Logistics Desktop"
               fill
               className="hidden md:block object-cover opacity-40 mix-blend-overlay transition-transform duration-[2s] group-hover:scale-105"
             />
             <Image 
               src="/services/logistics-mobile.webp" 
               alt="Smart Logistics Mobile"
               fill
               className="md:hidden object-cover opacity-50 mix-blend-overlay transition-transform duration-[2s] group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          </div>

          <div className="relative z-10 p-8 md:p-14 flex flex-col md:flex-row items-center gap-10">
             <div className="flex-1 space-y-6 text-center md:text-start">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
                   <Globe size={14} />
                   {t.logisticsCard.badge}
                </div>
                <div>
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-2">
                      {t.logisticsCard.title}
                  </h2>
                  <h3 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 font-serif italic">
                      {t.logisticsCard.subtitle}
                  </h3>
                </div>
                <p className="text-zinc-300 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
                   {t.logisticsCard.desc}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                   <Link href={`/${locale}/tracking`} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-500 hover:scale-105 transition-all shadow-lg shadow-blue-600/20">
                      <Search size={20} />
                      {t.logisticsCard.ctaTracking}
                   </Link>
                   
                   {/* دکمه جدید: استعلام قیمت */}
                   <Link href={`/${locale}/calculator`} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-yellow-500 text-black font-bold hover:bg-yellow-400 hover:scale-105 transition-all shadow-lg shadow-yellow-500/20">
                      <Calculator size={20} />
                      {t.logisticsCard.ctaCalculator}
                   </Link>

                   <Link href={`/${locale}/contact`} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all">
                      <Phone size={20} />
                      {t.logisticsCard.ctaContact}
                   </Link>
                </div>
             </div>
             <div className="hidden md:flex items-center justify-center w-1/3">
                <div className="relative w-64 h-64 flex items-center justify-center rounded-full bg-blue-500/5 border border-blue-500/20 animate-[spin_60s_linear_infinite]">
                   <div className="absolute inset-0 rounded-full border border-dashed border-blue-500/30" />
                   <Ship size={80} className="text-blue-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]" />
                   <div className="absolute top-0 left-1/2 w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399]" />
                   <div className="absolute bottom-10 right-10 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa]" />
                </div>
             </div>
          </div>
        </div>

        {/* 3. AUDIO SYSTEM CARD */}
        <div className="group relative w-full rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl shadow-black/50">
          <div className="absolute inset-0 z-0">
             <Image 
               src="/products/audio-system.webp" 
               alt="Professional Audio System"
               fill
               className="hidden md:block object-cover transition-transform duration-[2s] group-hover:scale-105"
             />
             <Image 
               src="/products/audio-system.webp" 
               alt="Professional Audio System"
               fill
               className="md:hidden object-cover transition-transform duration-[2s] group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent md:via-black/40" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          </div>

          <div className="relative z-10 p-8 md:p-16 max-w-3xl flex flex-col h-full justify-center min-h-[500px]">
             <div className="flex items-center gap-3 mb-6">
                <div className="px-4 py-1.5 rounded-full bg-yellow-500 text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(234,179,8,0.6)]">
                   {t.audioCard.badge}
                </div>
                <div className="h-px w-12 bg-white/20" />
             </div>
             <h2 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">
                {t.audioCard.title}
             </h2>
             <h3 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 font-serif italic mb-6 drop-shadow-sm">
                {t.audioCard.subtitle}
             </h3>
             <p className="text-zinc-300 text-lg md:text-xl leading-relaxed max-w-xl mb-10 border-r-2 border-yellow-500/50 pr-6 mr-1 backdrop-blur-sm bg-black/10 p-4 rounded-l-xl">
                {t.audioCard.desc}
             </p>
             <div>
                <Link href={`/${locale}/products`} className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-bold text-sm hover:bg-yellow-400 hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-white/20">
                   {t.audioCard.cta}
                   <Arrow size={18} />
                </Link>
             </div>
          </div>
        </div>

        {/* 4. TECHNICAL SPECS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.products.map((product, idx) => {
            const Icon = product.icon;
            return (
              <div 
                key={idx}
                className="group relative p-6 rounded-3xl bg-zinc-900/50 backdrop-blur-md border border-white/5 hover:border-yellow-500/30 hover:bg-zinc-800/80 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 blur-[50px] rounded-full group-hover:bg-yellow-500/20 transition-all" />
                <div className="relative z-10 flex flex-col h-full">
                   <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-yellow-500 transition-colors">
                        {product.brand}
                      </span>
                      <div className="p-2 rounded-xl bg-white/5 text-zinc-400 group-hover:text-white group-hover:bg-yellow-500 transition-all duration-300">
                        <Icon size={20} />
                      </div>
                   </div>
                   <h4 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-yellow-100 transition-colors">
                     {product.title}
                   </h4>
                   <p className="text-xs text-zinc-400 mb-6 leading-relaxed line-clamp-3">
                     {product.desc}
                   </p>
                   <ul className="mt-auto space-y-2">
                     {product.features.map((feature, fIdx) => (
                       <li key={fIdx} className="flex items-center gap-2 text-[10px] text-zinc-300">
                         <div className="w-1 h-1 rounded-full bg-yellow-500/50" />
                         {feature}
                       </li>
                     ))}
                   </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. PARTNERS */}
      <section className="container mx-auto px-6 py-24 text-center border-t border-white/5 mt-12">
         <h2 className="text-2xl font-bold text-white mb-2">
           {t.partnersTitle}
         </h2>
         <p className="text-zinc-500 text-sm mb-12">
           {t.partnersSubtitle}
         </p>
         
         <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {partnerBrands.map((brand, i) => (
              <div 
                key={i} 
                className="group w-36 h-20 md:w-44 md:h-24 flex items-center justify-center bg-zinc-900/40 border border-white/5 rounded-2xl hover:bg-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                 <span className={cn(
                   "text-xl md:text-2xl font-black text-zinc-600 transition-colors duration-300 select-none font-sans tracking-tight",
                   brand.color
                 )}>
                   {brand.name}
                 </span>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
}
