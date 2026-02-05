import { getDictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';
import { Search, Package, MapPin, Truck, Calendar, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function TrackingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const isRtl = locale === 'fa';

  return (
    <div className="relative flex flex-col items-center w-full min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4 font-vazirmatn overflow-hidden">
      
      {/* --- BACKGROUND FX --- */}
      {/* World Map / Dot Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/10 via-[#050505] to-[#050505] pointer-events-none" />
      
      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-yellow-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Large Text Background */}
      <div className="absolute top-20 left-0 w-full text-center pointer-events-none overflow-hidden select-none">
        <h1 className="text-[12rem] md:text-[20rem] font-black text-white/[0.02] leading-none tracking-tighter whitespace-nowrap">
          TRACKING
        </h1>
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Header Badge */}
        <div className="animate-in fade-in slide-in-from-top-4 duration-700 delay-100">
          <div className="inline-flex items-center gap-3 rounded-full border border-yellow-500/20 bg-yellow-500/5 pl-2 pr-4 py-1.5 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(234,179,8,0.3)]">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
             </span>
             <span className="text-xs font-bold tracking-widest text-yellow-500 uppercase">
                {isRtl ? 'سامانه هوشمند رهگیری' : 'LIVE TRACKING SYSTEM'}
             </span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="mt-8 text-4xl md:text-6xl font-black text-center leading-tight bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
           {isRtl ? 'وضعیت محموله خود را' : 'Track Your Global'} <br />
           <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
             {isRtl ? 'رصد کنید' : 'Shipment Instantly'}
           </span>
        </h1>

        <p className="mt-6 text-zinc-400 text-center max-w-lg text-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
           {isRtl 
             ? 'با وارد کردن شماره رهگیری، از موقعیت دقیق و لحظه‌ای محموله خود در سراسر جهان مطلع شوید.'
             : 'Enter your unique tracking ID to get real-time GPS updates and estimated delivery forecasts.'}
        </p>

        {/* --- SEARCH INTERFACE --- */}
        <div className="w-full mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <div className="relative group">
             {/* Glowing border effect */}
             <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600 to-yellow-300 rounded-2xl opacity-30 group-focus-within:opacity-100 transition duration-500 blur group-focus-within:blur-md" />
             
             <div className="relative flex items-center bg-[#0a0a0a] rounded-2xl border border-white/10 p-2 shadow-2xl">
                <div className="pl-4 pr-2 text-zinc-500 group-focus-within:text-yellow-500 transition-colors">
                   <Search size={24} />
                </div>
                <input 
                  type="text" 
                  placeholder={isRtl ? 'شماره رهگیری (مثلا TRK-9821)' : 'Tracking ID (e.g. TRK-9821)'}
                  className="flex-1 bg-transparent border-none focus:outline-none text-white px-4 h-14 text-lg md:text-xl placeholder:text-zinc-700 font-mono tracking-wide"
                />
                <button className="h-14 px-8 rounded-xl bg-yellow-500 text-black font-bold text-lg hover:bg-yellow-400 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                   {isRtl ? 'جستجو' : 'Track'}
                </button>
             </div>
          </div>
        </div>

        {/* --- RESULT CARD (Glassmorphism) --- */}
        <div className="w-full mt-16 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700">
           <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-xl shadow-2xl">
              
              {/* Card Header (Gradient Line) */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />

              <div className="p-8 md:p-10">
                 {/* Order Info Header */}
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8 mb-10">
                    <div>
                       <span className="text-zinc-500 text-xs font-bold tracking-widest uppercase mb-2 block">
                          {isRtl ? 'شناسه سفارش' : 'ORDER IDENTIFIER'}
                       </span>
                       <div className="flex items-baseline gap-3">
                          <span className="text-3xl md:text-4xl font-mono font-bold text-white tracking-wider">#TRK-882190</span>
                          <button className="text-zinc-600 hover:text-yellow-500 transition-colors">
                             <span className="sr-only">Copy</span>
                             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                          </button>
                       </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                       <div className="flex items-center gap-2 mb-2">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                          </span>
                          <span className="text-green-400 font-bold text-sm tracking-wider uppercase">
                             {isRtl ? 'در حال حمل' : 'IN TRANSIT'}
                          </span>
                       </div>
                       <div className="text-zinc-400 text-sm">
                          {isRtl ? 'تخمین تحویل:' : 'Est. Delivery:'} <span className="text-white font-mono">Oct 24, 2026</span>
                       </div>
                    </div>
                 </div>

                 {/* Graphical Timeline */}
                 <div className="relative">
                    {/* Connecting Line (Gradient) */}
                    <div className={`absolute top-4 bottom-12 w-0.5 bg-gradient-to-b from-yellow-500 via-yellow-500/20 to-zinc-800 ${isRtl ? 'right-[27px]' : 'left-[27px]'}`} />

                    <div className="space-y-12">
                       <TimelineItem 
                          icon={<Truck size={20} />}
                          title={isRtl ? 'خروج از مرکز توزیع هامبورگ' : 'Departed Hamburg Distribution Center'}
                          time="Today, 10:23 AM"
                          location="Hamburg, Germany"
                          status="active" // active, completed, pending
                          isRtl={isRtl}
                       />
                       <TimelineItem 
                          icon={<Package size={20} />}
                          title={isRtl ? 'پردازش و بسته‌بندی ایمن' : 'Processed & Securely Packed'}
                          time="Yesterday, 04:12 PM"
                          location="Hamburg, Germany"
                          status="completed"
                          isRtl={isRtl}
                       />
                       <TimelineItem 
                          icon={<Calendar size={20} />}
                          title={isRtl ? 'ثبت سفارش در سیستم' : 'Shipment Created & Approved'}
                          time="Jan 28, 09:00 AM"
                          location="Tehran, Iran"
                          status="completed"
                          isRtl={isRtl}
                       />
                    </div>
                 </div>
              </div>
              
              {/* Card Footer (Map Preview) */}
              <div className="h-24 bg-white/5 border-t border-white/5 flex items-center justify-between px-8 relative overflow-hidden group cursor-pointer hover:bg-white/10 transition-colors">
                 <div className="flex items-center gap-4 relative z-10">
                    <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400 group-hover:text-white transition-colors">
                       <MapPin size={20} />
                    </div>
                    <div>
                       <span className="block text-xs text-zinc-500 uppercase font-bold tracking-wider">{isRtl ? 'مقصد نهایی' : 'DESTINATION'}</span>
                       <span className="text-white font-medium">{isRtl ? 'تهران، ایران - دفتر مرکزی' : 'Tehran, Iran - HQ'}</span>
                    </div>
                 </div>
                 <ArrowRight className={`text-zinc-600 group-hover:text-yellow-500 transition-colors ${isRtl ? 'rotate-180' : ''}`} />
                 
                 {/* Fake Map Background Pattern */}
                 <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center mix-blend-overlay" />
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}

function TimelineItem({ icon, title, time, location, status, isRtl }: any) {
  const isActive = status === 'active';
  const isCompleted = status === 'completed';
  
  return (
    <div className="relative flex gap-8 items-start group">
       {/* Icon Container */}
       <div className={`
          relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-500
          ${isActive 
             ? 'bg-yellow-500 border-yellow-400 text-black shadow-[0_0_20px_rgba(234,179,8,0.4)] scale-110' 
             : isCompleted 
               ? 'bg-zinc-900 border-yellow-500/30 text-yellow-500' 
               : 'bg-zinc-900 border-zinc-800 text-zinc-600'}
       `}>
          {isCompleted && !isActive ? <CheckCircle2 size={24} /> : icon}
          
          {/* Pulse effect for active item */}
          {isActive && (
             <span className="absolute -inset-1 rounded-2xl bg-yellow-500 opacity-20 animate-ping" />
          )}
       </div>
       
       {/* Content */}
       <div className={`flex-1 pt-1.5 transition-all duration-300 ${isActive ? 'translate-x-2' : ''}`}>
          <h4 className={`text-xl font-bold mb-2 ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
             {title}
          </h4>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
             <span className={`flex items-center gap-2 ${isActive ? 'text-yellow-500' : 'text-zinc-500'}`}>
                <Calendar size={14} /> {time}
             </span>
             <span className="flex items-center gap-2 text-zinc-600">
                <MapPin size={14} /> {location}
             </span>
          </div>
       </div>
    </div>
  );
}
