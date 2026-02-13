import Image from "next/image";
import Link from "next/link";
import { 
  Building2, 
  Users, 
  Globe2, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight,
  ArrowLeft,
  Clock,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isRtl = locale === 'fa';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  const t = {
    fa: {
      hero: {
        badge: "درباره سام لجستیک",
        title: "پل ارتباطی مطمئن بین",
        highlight: "چین و خاورمیانه",
        desc: "ما با بیش از یک دهه تجربه، پیچیدگی‌های تجارت بین‌الملل و حمل‌ونقل را برای شما ساده می‌کنیم. سام لجستیک، شریک تجاری شما در مسیر رشد.",
      },
      stats: [
        { label: "سال تجربه موفق", value: "+۱۲" },
        { label: "مشتری راضی", value: "+۲,۵۰۰" },
        { label: "کانتینر حمل شده", value: "+۱۵,۰۰۰" },
        { label: "دفتر فعال", value: "۳" },
      ],
      story: {
        title: "داستان ما",
        subtitle: "از گوانگجو تا تهران، یک مسیر بی‌پایان",
        p1: "شرکت SAM Guangzhou Trading با هدف تسهیل روابط تجاری میان تولیدکنندگان چینی و بازرگانان خاورمیانه تأسیس شد. ما فعالیت خود را با یک دفتر کوچک در گوانگجو آغاز کردیم و امروز با افتخار در سه قطب تجاری مهم (چین، امارات، ایران) حضور فیزیکی داریم.",
        p2: "باور ما این است که لجستیک فقط حمل کالا نیست؛ بلکه انتقال اعتماد است. به همین دلیل، با به‌کارگیری تکنولوژی‌های روز (مانند سیستم رهگیری آنلاین و پنل اختصاصی مشتریان) تلاش می‌کنیم شفاف‌ترین خدمات را ارائه دهیم.",
      },
      values: {
        title: "چرا بازرگانان ما را انتخاب می‌کنند؟",
        items: [
          { title: "امنیت تضمین شده", desc: "بیمه کامل بار و نظارت دقیق بر فرآیند بسته‌بندی و بارگیری.", icon: ShieldCheck },
          { title: "سرعت در عملیات", desc: "هماهنگی سریع کشتی‌ها و ترخیص کالا بدون فوت وقت.", icon: Clock },
          { title: "شفافیت مالی", desc: "محاسبه دقیق هزینه‌ها بدون هزینه‌های پنهان و غیرمنتظره.", icon: TrendingUp },
          { title: "شبکه گسترده", desc: "دسترسی به بهترین تامین‌کنندگان و خطوط کشتیرانی معتبر.", icon: Globe2 },
        ]
      },
      cta: {
        title: "آماده شروع همکاری هستید؟",
        btn: "تماس با کارشناسان",
      }
    },
    en: {
      hero: {
        badge: "About SAM Logistics",
        title: "Your Reliable Bridge Between",
        highlight: "China & Middle East",
        desc: "With over a decade of experience, we simplify the complexities of international trade and logistics. SAM Logistics, your partner in growth.",
      },
      stats: [
        { label: "Years Experience", value: "+12" },
        { label: "Happy Clients", value: "+2,500" },
        { label: "Containers Shipped", value: "+15,000" },
        { label: "Active Offices", value: "3" },
      ],
      story: {
        title: "Our Story",
        subtitle: "From Guangzhou to Tehran, An Endless Journey",
        p1: "SAM Guangzhou Trading was established to facilitate trade relations between Chinese manufacturers and Middle Eastern merchants. We started with a small office in Guangzhou and today we are proudly present in three major trade hubs (China, UAE, Iran).",
        p2: "We believe logistics is not just about moving goods; it's about delivering trust. That's why we strive to offer the most transparent services by employing modern technologies (like online tracking and dedicated customer panels).",
      },
      values: {
        title: "Why Merchants Choose Us?",
        items: [
          { title: "Guaranteed Security", desc: "Full cargo insurance and strict supervision of packing and loading.", icon: ShieldCheck },
          { title: "Operational Speed", desc: "Fast vessel coordination and customs clearance without delay.", icon: Clock },
          { title: "Financial Transparency", desc: "Accurate cost calculation with no hidden fees.", icon: TrendingUp },
          { title: "Extensive Network", desc: "Access to top suppliers and reputable shipping lines.", icon: Globe2 },
        ]
      },
      cta: {
        title: "Ready to Start?",
        btn: "Contact Experts",
      }
    }
  };

  const text = isRtl ? t.fa : t.en;

  return (
    <div className="min-h-screen bg-black text-white font-vazirmatn pt-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <div className="container mx-auto px-4 md:px-8 relative z-10 mb-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-yellow-500 text-xs font-bold mb-6 backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-700">
             <Building2 size={14} />
             {text.hero.badge}
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
             {text.hero.title} <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700">
               {text.hero.highlight}
             </span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
             {text.hero.desc}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
           {text.stats.map((stat, i) => (
             <div key={i} className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl text-center hover:border-yellow-500/30 transition-all group">
                <div className="text-3xl md:text-4xl font-black text-white mb-2 group-hover:text-yellow-500 transition-colors">{stat.value}</div>
                <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">{stat.label}</div>
             </div>
           ))}
        </div>
      </div>

      {/* 2. OUR STORY SECTION */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-zinc-900/30 skew-y-3 transform origin-top-left scale-110" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
           <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative group">
                 <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-[2rem] opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
                 <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                    <Image 
                      src="/services/logistics.webp" 
                      alt="SAM Logistics Team" 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                       <div className="flex items-center gap-2 text-white font-bold mb-1">
                          <MapPin className="text-yellow-500" size={18} />
                          Guangzhou, China
                       </div>
                       <p className="text-xs text-zinc-400">Main Warehouse & Headquarters</p>
                    </div>
                 </div>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2 space-y-6">
                 <h2 className="text-3xl md:text-4xl font-black text-white">
                    {text.story.title}
                 </h2>
                 <h3 className="text-xl text-yellow-500 font-bold">
                    {text.story.subtitle}
                 </h3>
                 <div className="space-y-4 text-zinc-400 leading-relaxed text-justify">
                    <p>{text.story.p1}</p>
                    <p>{text.story.p2}</p>
                 </div>
                 
                 <div className="pt-4 flex gap-4">
                    <div className="flex -space-x-4 space-x-reverse">
                       {[1,2,3].map(i => (
                          <div key={i} className="w-12 h-12 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-500">
                             <Users size={16} />
                          </div>
                       ))}
                    </div>
                    <div className="flex flex-col justify-center">
                       <span className="text-white font-bold text-sm">تیم متخصص ما</span>
                       <span className="text-xs text-zinc-500">آماده خدمت‌رسانی در ۳ کشور</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 3. CORE VALUES */}
      <section className="container mx-auto px-4 md:px-8 py-24">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-white mb-4">{text.values.title}</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto rounded-full" />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {text.values.items.map((item, i) => {
               const Icon = item.icon;
               return (
                  <div key={i} className="bg-black border border-white/10 p-8 rounded-3xl hover:bg-white/5 hover:border-yellow-500/50 transition-all duration-300 group">
                     <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center mb-6 group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                        <Icon size={28} />
                     </div>
                     <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                     <p className="text-sm text-zinc-400 leading-relaxed">
                        {item.desc}
                     </p>
                  </div>
               )
            })}
         </div>
      </section>

      {/* 4. CTA SECTION */}
      <section className="container mx-auto px-4 md:px-8 mb-12">
         <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('/hero/hero-bg.avif')] bg-cover bg-center mix-blend-overlay opacity-20" />
            <div className="relative z-10">
               <h2 className="text-3xl md:text-5xl font-black text-black mb-8">{text.cta.title}</h2>
               <Link 
                 href={`/${locale}/contact`}
                 className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-xl"
               >
                  {text.cta.btn}
                  <Arrow size={20} />
               </Link>
            </div>
         </div>
      </section>

    </div>
  );
}
