import { 
   Search, 
   Package, 
   Ship, 
   Truck, 
   MapPin, 
   CheckCircle2, 
   Clock, 
   AlertCircle,
   Box,
   Scale,
   Anchor,
   FileCheck,
   RefreshCw,
   Building2,
   Calendar,
   DollarSign
 } from "lucide-react";
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
         title: "وضعیت فعلی: ترخیص از گمرک دبی",
         id: "شماره سفارش: SAM-8842",
         eta: "زمان تخمینی رسیدن: ۵ روز دیگر",
         origin: "گوانگجو، چین",
         destination: "بندرعباس، ایران",
       },
       // مراحل ۱۰ گانه دقیق طبق درخواست
       steps: [
         { title: "تحویل در مبدا", date: "۱۰ مهر ۱۴۰۲", time: "۰۹:۳۰", status: "completed", icon: MapPin, location: "انبار گوانگجو" },
         { 
           title: "بسته‌بندی و ارزیابی", 
           date: "۱۲ مهر ۱۴۰۲", 
           time: "۱۴:۱۵", 
           status: "completed", 
           icon: Box, 
           details: { vol: "۲.۵ CBM", wgt: "۴۵۰ Kg", val: "۱۲,۰۰۰ ¥" } 
         },
         { title: "ارسال به کانتینر", date: "۱۵ مهر ۱۴۰۲", time: "۰۸:۰۰", status: "completed", icon: Package, desc: "کانتینر شماره CCLU-409" },
         { title: "تاریخ حرکت کشتی به DXB", date: "۱۶ مهر ۱۴۰۲", time: "۲۳:۴۵", status: "completed", icon: Ship, desc: "کشتی Ever Given" },
         { title: "تاریخ رسیدن کشتی DXB", date: "۲۸ مهر ۱۴۰۲", time: "۰۶:۳۰", status: "completed", icon: Anchor, location: "بندر جبل‌علی" },
         { title: "ترخیص از گمرک", date: "۳۰ مهر ۱۴۰۲", time: "۱۰:۰۰", status: "active", icon: FileCheck, desc: "در حال انجام تشریفات اداری" },
         { title: "ارسال به کشتی IR", date: "تخمین: ۲ آبان", time: "--:--", status: "pending", icon: RefreshCw },
         { title: "تاریخ حرکت کشتی", date: "-", time: "-", status: "pending", icon: Ship },
         { title: "تخلیه و گمرک IR", date: "-", time: "-", status: "pending", icon: Building2 },
         { title: "ارسال به مقصد", date: "-", time: "-", status: "pending", icon: Truck },
       ],
       labels: {
         vol: "حجم:",
         wgt: "وزن:",
         val: "ارزش:",
       },
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
         title: "Current Status: UAE Customs Clearance",
         id: "Order ID: SAM-8842",
         eta: "ETA: 5 Days",
         origin: "Guangzhou, CN",
         destination: "Bandar Abbas, IR",
       },
       // 10 Exact Steps
       steps: [
         { title: "Delivery at Origin", date: "Oct 02, 2023", time: "09:30", status: "completed", icon: MapPin, location: "Guangzhou Warehouse" },
         { 
           title: "Packing & Assessment", 
           date: "Oct 04, 2023", 
           time: "14:15", 
           status: "completed", 
           icon: Box, 
           details: { vol: "2.5 CBM", wgt: "450 Kg", val: "¥ 12,000" } 
         },
         { title: "Loaded into Container", date: "Oct 07, 2023", time: "08:00", status: "completed", icon: Package, desc: "Container No. CCLU-409" },
         { title: "Vessel Departure to DXB", date: "Oct 08, 2023", time: "23:45", status: "completed", icon: Ship, desc: "Vessel: Ever Given" },
         { title: "Vessel Arrival at DXB", date: "Oct 20, 2023", time: "06:30", status: "completed", icon: Anchor, location: "Jebel Ali Port" },
         { title: "Customs Clearance", date: "Oct 22, 2023", time: "10:00", status: "active", icon: FileCheck, desc: "Processing documents" },
         { title: "Sent to IR Vessel", date: "Est: Oct 24", time: "--:--", status: "pending", icon: RefreshCw },
         { title: "Vessel Departure", date: "-", time: "-", status: "pending", icon: Ship },
         { title: "Discharge & IR Customs", date: "-", time: "-", status: "pending", icon: Building2 },
         { title: "Out for Delivery", date: "-", time: "-", status: "pending", icon: Truck },
       ],
       labels: {
         vol: "Vol:",
         wgt: "Wgt:",
         val: "Val:",
       },
       alert: "Note: Displayed information may have a 4-hour update delay."
     }
   };
 
   const t = isRtl ? texts.fa : texts.en;
 
   return (
     <div className="min-h-screen bg-black text-white font-vazirmatn pt-28 pb-20">
       
       {/* Background Effect */}
       <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-emerald-600/5 rounded-full blur-[100px]" />
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
 
           <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-2 rounded-2xl md:rounded-full shadow-2xl shadow-blue-900/20 flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
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
 
         {/* 2. Tracking Result Card */}
         <div className="bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
           
           {/* Status Header */}
           <div className="p-6 md:p-10 bg-gradient-to-r from-blue-900/20 to-emerald-900/20 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                 <div className="flex items-center gap-2 mb-3">
                    <div className="relative">
                       <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute inset-0" />
                       <div className="w-3 h-3 rounded-full bg-emerald-500 relative" />
                    </div>
                    <span className="text-emerald-400 font-bold text-sm uppercase tracking-wider">{t.result.title}</span>
                 </div>
                 <h2 className="text-3xl font-black text-white font-mono tracking-tight">{t.result.id}</h2>
              </div>
              <div className="text-left md:text-right bg-black/20 p-4 rounded-2xl border border-white/5">
                 <span className="block text-zinc-400 text-xs font-bold uppercase mb-2">{t.result.eta}</span>
                 <div className="flex items-center gap-3 text-white font-bold text-sm">
                    <span>{t.result.origin}</span>
                    <div className="flex-1 w-12 h-0.5 bg-zinc-600 relative">
                       <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-400 rounded-full" />
                    </div>
                    <span>{t.result.destination}</span>
                 </div>
              </div>
           </div>
 
           {/* Timeline */}
           <div className="p-6 md:p-10">
              <div className="relative pl-4 pr-4">
                 {/* Vertical Line */}
                 <div className={cn("absolute top-4 bottom-4 w-0.5 bg-zinc-800", isRtl ? "right-[42px]" : "left-[42px]")} />
 
                 <div className="space-y-8">
                    {t.steps.map((step, idx) => {
                      const Icon = step.icon;
                      const isCompleted = step.status === 'completed';
                      const isActive = step.status === 'active';
                      
                      return (
                        <div key={idx} className="relative flex items-start gap-6 group">
                           {/* Icon Circle */}
                           <div className={cn(
                              "relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 shrink-0 shadow-lg",
                              isCompleted ? "bg-zinc-900 border-emerald-500 text-emerald-500" :
                              isActive ? "bg-blue-600 border-blue-400/50 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] scale-110" :
                              "bg-zinc-900 border-zinc-800 text-zinc-600"
                           )}>
                              <Icon size={isCompleted || isActive ? 20 : 18} />
                           </div>
 
                           {/* Content Card */}
                           <div className={cn(
                              "flex-1 p-5 rounded-2xl transition-all border",
                              isActive 
                                ? "bg-white/5 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]" 
                                : "bg-transparent border-transparent hover:bg-white/[0.02]"
                           )}>
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                 <h3 className={cn("font-bold text-lg", isActive ? "text-white" : isCompleted ? "text-zinc-300" : "text-zinc-600")}>
                                    {step.title}
                                 </h3>
                                 <span className={cn("text-xs font-mono px-2 py-1 rounded bg-black/20", isActive ? "text-blue-300" : "text-zinc-600")}>
                                    {step.date} • {step.time}
                                 </span>
                              </div>
                              
                              {/* Description / Location */}
                              {(step.desc || step.location) && (
                                 <p className="text-sm text-zinc-500 mb-2 flex items-center gap-2">
                                    {step.location && <MapPin size={14} className="text-zinc-600" />}
                                    {step.desc || step.location}
                                 </p>
                              )}
 
                              {/* Special Details for Packing Step */}
                              {step.details && (
                                 <div className="mt-3 grid grid-cols-3 gap-2 bg-black/30 p-3 rounded-xl border border-white/5">
                                    <div className="text-center border-r border-white/5 last:border-0 px-2">
                                       <div className="text-[10px] text-zinc-500 mb-1 flex items-center justify-center gap-1"><Box size={10} /> {t.labels.vol}</div>
                                       <div className="text-xs font-mono text-white font-bold">{step.details.vol}</div>
                                    </div>
                                    <div className="text-center border-r border-white/5 last:border-0 px-2">
                                       <div className="text-[10px] text-zinc-500 mb-1 flex items-center justify-center gap-1"><Scale size={10} /> {t.labels.wgt}</div>
                                       <div className="text-xs font-mono text-white font-bold">{step.details.wgt}</div>
                                    </div>
                                    <div className="text-center px-2">
                                       <div className="text-[10px] text-zinc-500 mb-1 flex items-center justify-center gap-1"><DollarSign size={10} /> {t.labels.val}</div>
                                       <div className="text-xs font-mono text-yellow-500 font-bold">{step.details.val}</div>
                                    </div>
                                 </div>
                              )}
 
                              {isActive && (
                                 <div className="text-xs text-blue-400 animate-pulse mt-2 flex items-center gap-1.5">
                                    <Clock size={14} />
                                    {isRtl ? 'در حال پردازش...' : 'Processing...'}
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
           <div className="bg-blue-500/5 p-4 flex items-center justify-center gap-2 text-blue-300/80 text-xs text-center border-t border-white/5">
              <AlertCircle size={14} />
              <span>{t.alert}</span>
           </div>
 
         </div>
 
       </div>
     </div>
   );
 }
 