import { Search, Package, Ship, Truck, MapPin, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function TrackingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isRtl = locale === 'fa';

  const texts = {
    fa: {
      hero: {
        title: "رهگیری آنلاین مرسولات",
        subtitle: "از وضعیت لحظه‌ای محموله خود مطلع شوید",
        placeholder: "شماره بارنامه یا کد رهگیری (مثال: SAM-8842)",
        btn: "جستجوی وضعیت",
      },
      result: {
        title: "وضعیت فعلی: در حال حمل دریایی",
        id: "شماره سفارش: SAM-8842",
        eta: "زمان تخمینی رسیدن: ۳ روز دیگر",
        origin: "گوانگجو، چین",
        destination: "بندرعباس، ایران",
      },
      steps: [
        { title: "ثبت سفارش", date: "۱۰ مهر ۱۴۰۲", time: "۰۹:۳۰", status: "completed", icon: Package },
        { title: "بسته‌بندی و بارگیری", date: "۱۲ مهر ۱۴۰۲", time: "۱۴:۱۵", status: "completed", icon: CheckCircle2 },
        { title: "تحویل به بندر مبدا", date: "۱۵ مهر ۱۴۰۲", time: "۰۸:۰۰", status: "completed", icon: Ship },
        { title: "حرکت کشتی", date: "۱۶ مهر ۱۴۰۲", time: "۲۳:۴۵", status: "active", icon: Ship },
        { title: "رسیدن به بندر مقصد", date: "تخمین: ۲۰ مهر", time: "--:--", status: "pending", icon: MapPin },
        { title: "ترخیص و تحویل", date: "-", time: "-", status: "pending", icon: Truck },
      ],
      alert: "توجه: اطلاعات نمایش داده شده ممکن است با تاخیر ۴ ساعته به‌روزرسانی شود."
    },
    en: {
      hero: {
        title: "Track Your Shipment",
        subtitle: "Get real-time updates on your cargo status",
        placeholder: "Bill of Lading or Tracking ID (e.g. SAM-8842)",
        btn: "Track Now",
      },
      result: {
        title: "Current Status: On Vessel",
        id: "Order ID: SAM-8842",
        eta: "ETA: 3 Days",
        origin: "Guangzhou, CN",
        destination: "Bandar Abbas, IR",
      },
      steps: [
        { title: "Order Placed", date: "Oct 02, 2023", time: "09:30", status: "completed", icon: Package },
        { title: "Packing & Loading", date: "Oct 04, 2023", time: "14:15", status: "completed", icon: CheckCircle2 },
        { title: "Port Departure", date: "Oct 07, 2023", time: "08:00", status: "completed", icon: Ship },
        { title: "On Vessel", date: "Oct 08, 2023", time: "23:45", status: "active", icon: Ship },
        { title: "Arrival at Dest.", date: "Est: Oct 12", time: "--:--", status: "pending", icon: MapPin },
        { title: "Clearance & Delivery", date: "-", time: "-", status: "pending", icon: Truck },
      ],
      alert: "Note: Displayed information may have a 4-hour update delay."
    }
  };

  const t = isRtl ? texts.fa : texts.en;

  return (
    <div className="min-h-screen bg-black text-white font-vazirmatn pt-28 pb-20">
      
      {/* Background Effect */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-4xl">
        
        {/* 1. Search Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
             {t.hero.title}
          </h1>
          <p className="text-zinc-400 text-lg mb-8">
             {t.hero.subtitle}
          </p>

          <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-2 rounded-2xl md:rounded-full shadow-2xl shadow-blue-900/20 flex flex-col md:flex-row gap-2">
             <div className="relative flex-1">
                <Search className={cn("absolute top-1/2 -translate-y-1/2 text-zinc-500", isRtl ? "right-4" : "left-4")} />
                <input 
                  type="text" 
                  placeholder={t.hero.placeholder}
                  className={cn(
                    "w-full h-14 bg-transparent border-none outline-none text-white placeholder:text-zinc-600 font-mono text-lg",
                    isRtl ? "pr-12 pl-4" : "pl-12 pr-4"
                  )}
                  dir="ltr"
                />
             </div>
             <button className="h-14 px-8 rounded-xl md:rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                {t.hero.btn}
             </button>
          </div>
        </div>

        {/* 2. Mock Result Card (Demo State) */}
        <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden">
          
          {/* Status Header */}
          <div className="p-6 md:p-8 bg-white/5 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div>
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-emerald-400 font-bold text-sm uppercase tracking-wider">{t.result.title}</span>
                </div>
                <h2 className="text-2xl font-black text-white font-mono tracking-tight">{t.result.id}</h2>
             </div>
             <div className="text-left md:text-right">
                <span className="block text-zinc-500 text-xs font-bold uppercase mb-1">{t.result.eta}</span>
                <div className="flex items-center gap-2 text-zinc-300 text-sm">
                   <span>{t.result.origin}</span>
                   <div className="w-8 h-px bg-zinc-600" />
                   <span>{t.result.destination}</span>
                </div>
             </div>
          </div>

          {/* Timeline */}
          <div className="p-6 md:p-10">
             <div className="relative">
                {/* Vertical Line */}
                <div className={cn("absolute top-2 bottom-0 w-0.5 bg-zinc-800", isRtl ? "right-[27px]" : "left-[27px]")} />

                <div className="space-y-8">
                   {t.steps.map((step, idx) => {
                     const Icon = step.icon;
                     const isCompleted = step.status === 'completed';
                     const isActive = step.status === 'active';
                     
                     return (
                       <div key={idx} className="relative flex items-start gap-6 group">
                          {/* Icon Circle */}
                          <div className={cn(
                             "relative z-10 w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all duration-300 shrink-0",
                             isCompleted ? "bg-zinc-900 border-blue-600 text-blue-500" :
                             isActive ? "bg-blue-600 border-blue-600/30 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)]" :
                             "bg-zinc-900 border-zinc-800 text-zinc-600"
                          )}>
                             <Icon size={20} />
                          </div>

                          {/* Content */}
                          <div className={cn(
                             "flex-1 pt-2 p-4 rounded-2xl transition-all",
                             isActive ? "bg-white/5 border border-white/10" : ""
                          )}>
                             <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-1">
                                <h3 className={cn("font-bold text-lg", isActive ? "text-white" : isCompleted ? "text-zinc-300" : "text-zinc-600")}>
                                   {step.title}
                                </h3>
                                <span className="text-xs font-mono text-zinc-500">{step.date} • {step.time}</span>
                             </div>
                             {isActive && (
                                <div className="text-xs text-blue-400 animate-pulse mt-2">
                                   در حال پردازش...
                                </div>
                             )}
                          </div>
                       </div>
                     );
                   })}
                </div>
             </div>
          </div>

          {/* Footer Warning */}
          <div className="bg-blue-500/5 p-4 flex items-center justify-center gap-2 text-blue-300/80 text-xs text-center">
             <AlertCircle size={14} />
             <span>{t.alert}</span>
          </div>

        </div>

      </div>
    </div>
  );
}
