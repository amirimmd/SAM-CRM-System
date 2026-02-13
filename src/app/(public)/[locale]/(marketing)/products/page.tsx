import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  ArrowLeft, 
  Wifi, 
  Speaker, 
  Hammer, 
  Radio, 
  CheckCircle2, 
  Phone,
  MessageSquare,
  Cpu,
  Music4,
  Settings,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- شبیه‌سازی داده‌های دریافتی از پنل ادمین (CMS) ---
const CATEGORIES = [
  { id: 'smart', titleFa: 'الکترونیک و هوشمندسازی', titleEn: 'Smart Electronics', brand: 'Arylic', color: 'blue' },
  { id: 'components', titleFa: 'قطعات صوتی حرفه‌ای', titleEn: 'Audio Components', brand: 'Santa Cruz', color: 'yellow' },
  { id: 'tools', titleFa: 'ابزار نصب و مونتاژ', titleEn: 'Installation Tools', brand: 'Santa Cruz', color: 'emerald' },
];

const PRODUCTS = [
  {
    id: 'arylic-a50',
    categoryId: 'smart',
    titleFa: 'آمپلی‌فایر استریمینگ بی‌سیم A50+',
    titleEn: 'Arylic A50+ Wireless Streaming Amplifier',
    descFa: 'یک راه‌حل کامل و قدرتمند برای راه‌اندازی اسپیکرها. تبدیل اسپیکرهای پسیو به سیستم هوشمند.',
    descEn: 'A complete powerful solution for speakers. Turns passive speakers into smart systems.',
    image: '/products/audio-system.webp', // Placeholder
    specs: [
      { labelFa: 'توان خروجی', labelEn: 'Output Power', value: '160W (2x80W)' },
      { labelFa: 'اتصالات', labelEn: 'Connectivity', value: 'Wi-Fi, Bluetooth 5.0' },
      { labelFa: 'پروتکل‌ها', labelEn: 'Protocols', value: 'AirPlay, Spotify, DLNA' },
      { labelFa: 'قابلیت خاص', labelEn: 'Special Feature', value: 'Multi-room Support' },
    ],
    tags: ['Best Seller', 'Smart Home'],
    color: 'from-blue-600 to-blue-400'
  },
  {
    id: 'arylic-bp50',
    categoryId: 'smart',
    titleFa: 'پیش‌تقویت‌کننده بلوتوث BP50',
    titleEn: 'Arylic BP50 Bluetooth Pre-amplifier',
    descFa: 'مرکز اتصالات مدرن برای سیستم‌های صوتی قدیمی. افزودن HDMI ARC و بلوتوث دوطرفه.',
    descEn: 'Modern hub for legacy systems. Adds HDMI ARC and Two-way Bluetooth.',
    image: '/products/audio-system.webp', // Placeholder
    specs: [
      { labelFa: 'ورودی اصلی', labelEn: 'Main Input', value: 'HDMI ARC' },
      { labelFa: 'ورودی آنالوگ', labelEn: 'Analog Input', value: 'Phono (Turntable)' },
      { labelFa: 'بلوتوث', labelEn: 'Bluetooth', value: 'Transmit & Receive' },
      { labelFa: 'کنترل', labelEn: 'Control', value: 'App & Remote' },
    ],
    tags: ['Versatile', 'High Fidelity'],
    color: 'from-indigo-600 to-indigo-400'
  },
  {
    id: 'santa-m165',
    categoryId: 'components',
    titleFa: 'ووفر/میدرنج خام AC-M165',
    titleEn: 'Santa Cruz AC-M165 Raw Driver',
    descFa: 'درایور ۶.۵ اینچی قدرتمند با مگنت بزرگ، مناسب برای پروژه‌های سیستم صوتی خانگی و خودرو.',
    descEn: 'Powerful 6.5" driver with large magnet, ideal for DIY home and car audio projects.',
    image: '/products/audio-system.webp', // Placeholder
    specs: [
      { labelFa: 'سایز', labelEn: 'Size', value: '6.5 Inch (165mm)' },
      { labelFa: 'متریال بدنه', labelEn: 'Frame Material', value: 'Solid Metal' },
      { labelFa: 'نوع مگنت', labelEn: 'Magnet Type', value: 'High-Grade Ferrite' },
      { labelFa: 'کاربرد', labelEn: 'Application', value: 'DIY / Car Audio' },
    ],
    tags: ['Professional', 'Heavy Duty'],
    color: 'from-yellow-600 to-yellow-400'
  },
  {
    id: 'santa-s3',
    categoryId: 'tools',
    titleFa: 'سری پیچ‌گوشتی صنعتی S3',
    titleEn: 'Santa Cruz S3 Industrial Bits',
    descFa: 'سری‌های تیتانیومی با آلیاژ فولاد S3 و خاصیت مغناطیسی قوی برای مونتاژ دقیق.',
    descEn: 'Titanium coated S3 steel alloy bits with strong magnetic ring for precision assembly.',
    image: '/products/audio-system.webp', // Placeholder
    specs: [
      { labelFa: 'آلیاژ', labelEn: 'Alloy', value: 'S3 Steel' },
      { labelFa: 'روکش', labelEn: 'Coating', value: 'Gold Titanium' },
      { labelFa: 'ویژگی', labelEn: 'Feature', value: 'Magnetic Ring' },
      { labelFa: 'مقاومت', labelEn: 'Durability', value: 'High Wear Resistance' },
    ],
    tags: ['Industrial', 'Tools'],
    color: 'from-emerald-600 to-emerald-400'
  },
];

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isRtl = locale === 'fa';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;
  const Chevron = isRtl ? ChevronLeft : ChevronRight;

  const t = {
    fa: {
      hero: {
        badge: "کاتالوگ محصولات",
        title: "تکنولوژی صدا و تصویر",
        subtitle: "مجموعه‌ای از بهترین‌های دنیای صوت، از قطعات خام تا سیستم‌های هوشمند.",
      },
      cta: {
        inquire: "استعلام قیمت و موجودی",
        consult: "مشاوره با کارشناس",
      },
      labels: {
        spec: "مشخصات فنی",
        brand: "برند",
      }
    },
    en: {
      hero: {
        badge: "Product Catalog",
        title: "Audio & Visual Tech",
        subtitle: "A collection of the best in the audio world, from raw components to smart systems.",
      },
      cta: {
        inquire: "Check Price & Stock",
        consult: "Expert Consultation",
      },
      labels: {
        spec: "Technical Specs",
        brand: "Brand",
      }
    }
  };

  const text = isRtl ? t.fa : t.en;

  return (
    <div className="min-h-screen bg-black text-white font-vazirmatn pt-24 pb-20 selection:bg-yellow-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-yellow-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* 1. Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-yellow-500 text-xs font-bold mb-6 backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-700">
              <Speaker size={14} />
              {text.hero.badge}
           </div>
           <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
             {text.hero.title}
           </h1>
           <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
             {text.hero.subtitle}
           </p>
        </div>

        {/* 2. Categories & Products Loop */}
        <div className="space-y-24">
           {CATEGORIES.map((cat) => (
             <div key={cat.id} className="space-y-8">
                
                {/* Category Header */}
                <div className="flex items-center gap-4">
                   <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-black font-bold shadow-lg", 
                      cat.color === 'blue' ? 'bg-blue-500' : 
                      cat.color === 'yellow' ? 'bg-yellow-500' : 'bg-emerald-500'
                   )}>
                      {cat.id === 'smart' && <Cpu size={24} />}
                      {cat.id === 'components' && <Music4 size={24} />}
                      {cat.id === 'tools' && <Settings size={24} />}
                   </div>
                   <div>
                      <h2 className="text-2xl font-bold text-white">{isRtl ? cat.titleFa : cat.titleEn}</h2>
                      <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{text.labels.brand}: {cat.brand}</span>
                   </div>
                   <div className="flex-1 h-px bg-white/10 ml-4" />
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   {PRODUCTS.filter(p => p.categoryId === cat.id).map((product) => (
                      <div 
                        key={product.id} 
                        className="group relative bg-zinc-900/50 border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all duration-500 flex flex-col"
                      >
                         {/* Product Image Area */}
                         <div className="relative h-64 w-full bg-zinc-950 overflow-hidden">
                            <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                            <Image 
                              src={product.image} 
                              alt={isRtl ? product.titleFa : product.titleEn}
                              fill
                              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Tags */}
                            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                               {product.tags.map(tag => (
                                  <span key={tag} className="text-[10px] font-bold bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/10">
                                     {tag}
                                  </span>
                               ))}
                            </div>
                         </div>

                         {/* Content Area */}
                         <div className="p-8 flex flex-col flex-1">
                            <div className="mb-6">
                               <h3 className="text-xl md:text-2xl font-black text-white mb-3 leading-tight group-hover:text-yellow-500 transition-colors">
                                  {isRtl ? product.titleFa : product.titleEn}
                               </h3>
                               <p className="text-sm text-zinc-400 leading-relaxed">
                                  {isRtl ? product.descFa : product.descEn}
                               </p>
                            </div>

                            {/* Specs Table */}
                            <div className="bg-black/30 rounded-2xl p-4 border border-white/5 mb-8">
                               <h4 className="text-xs font-bold text-zinc-500 uppercase mb-3 tracking-wider">{text.labels.spec}</h4>
                               <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                                  {product.specs.map((spec, idx) => (
                                     <div key={idx} className="flex flex-col">
                                        <span className="text-[10px] text-zinc-500 mb-0.5">{isRtl ? spec.labelFa : spec.labelEn}</span>
                                        <span className="text-xs font-bold text-zinc-200">{spec.value}</span>
                                     </div>
                                  ))}
                               </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-auto flex flex-col sm:flex-row gap-3">
                               <Link 
                                 href={`/${locale}/contact?subject=Inquiry: ${isRtl ? product.titleFa : product.titleEn}`}
                                 className="flex-1 flex items-center justify-center gap-2 bg-white text-black px-6 py-3.5 rounded-xl font-bold hover:bg-yellow-400 transition-all text-sm group/btn"
                               >
                                  {text.cta.inquire}
                                  <Arrow size={16} className="transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
                               </Link>
                               <Link 
                                 href={`/${locale}/contact`}
                                 className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-white/10 transition-all text-sm"
                               >
                                  <MessageSquare size={16} className="text-zinc-400" />
                                  {text.cta.consult}
                               </Link>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
           ))}
        </div>

        {/* 3. General CTA */}
        <div className="mt-32 p-10 md:p-16 rounded-3xl bg-gradient-to-r from-blue-900 to-blue-950 border border-blue-500/20 text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('/hero/hero-bg.avif')] bg-cover bg-center mix-blend-overlay opacity-30" />
           <div className="relative z-10">
              <h2 className="text-3xl font-black text-white mb-4">
                 {isRtl ? 'محصول مورد نظر خود را پیدا نکردید؟' : 'Didn\'t find what you are looking for?'}
              </h2>
              <p className="text-blue-100 max-w-xl mx-auto mb-8">
                 {isRtl 
                   ? 'تیم ما امکان تامین و واردات هرگونه تجهیزات صوتی و الکترونیکی خاص را از بازار چین دارد. سفارش خود را ثبت کنید.'
                   : 'Our team can source and import any specialized audio and electronic equipment from the Chinese market. Place your custom order.'}
              </p>
              <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-400 transition-all shadow-lg shadow-blue-600/30">
                 {isRtl ? 'ثبت سفارش اختصاصی' : 'Place Custom Order'}
                 <Chevron size={20} />
              </Link>
           </div>
        </div>

      </div>
    </div>
  );
}
