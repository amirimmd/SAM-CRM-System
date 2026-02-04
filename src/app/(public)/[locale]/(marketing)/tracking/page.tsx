import { getDictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';
import { Search, Package, MapPin, Truck, Calendar, ArrowRight } from 'lucide-react';

export default async function TrackingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const isRtl = locale === 'fa';

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-black text-white pt-24 pb-12 px-4">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1 text-xs font-medium text-yellow-400 mb-6">
           {isRtl ? 'سامانه رهگیری جهانی' : 'GLOBAL TRACKING SYSTEM'}
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4">
           {isRtl ? 'رهگیری مرسوله' : 'Track Your Shipment'}
        </h1>
        <p className="text-zinc-400">
           {isRtl 
             ? 'شماره رهگیری خود را وارد کنید تا از آخرین وضعیت محموله خود مطلع شوید.'
             : 'Enter your tracking ID to get real-time updates on your cargo status.'}
        </p>
      </div>

      {/* Tracking Input */}
      <div className="w-full max-w-xl bg-zinc-900 border border-white/10 p-2 rounded-2xl flex items-center shadow-2xl shadow-yellow-900/10 mb-16">
         <div className="pl-4 text-zinc-500">
            <Search />
         </div>
         <input 
           type="text" 
           placeholder={isRtl ? 'شماره رهگیری (مثلا TRK-9821)' : 'Tracking ID (e.g. TRK-9821)'}
           className="flex-1 bg-transparent border-none focus:outline-none text-white px-4 h-12 text-lg placeholder:text-zinc-600"
         />
         <button className="h-12 px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl transition-colors">
            {isRtl ? 'رهگیری' : 'Track'}
         </button>
      </div>

      {/* Mock Result (Demo) */}
      <div className="w-full max-w-3xl bg-zinc-900/50 border border-white/5 rounded-3xl overflow-hidden p-8">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-8 border-b border-white/5">
            <div>
               <span className="text-zinc-500 text-sm block mb-1">{isRtl ? 'شماره سفارش' : 'Order Number'}</span>
               <span className="text-2xl font-mono font-bold text-white">#TRK-882190</span>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-3">
               <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               <span className="text-green-500 font-medium text-sm uppercase tracking-wider">
                  {isRtl ? 'در حال حمل' : 'IN TRANSIT'}
               </span>
            </div>
         </div>

         <div className="space-y-8 relative before:absolute before:left-[19px] rtl:before:right-[19px] rtl:before:left-auto before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
            <TimelineItem 
               icon={<Truck size={18} />}
               title={isRtl ? 'خروج از مرکز توزیع' : 'Departed Distribution Center'}
               time="Today, 10:23 AM"
               location="Hamburg, Germany"
               active
            />
            <TimelineItem 
               icon={<Package size={18} />}
               title={isRtl ? 'پردازش در انبار' : 'Processed at Facility'}
               time="Yesterday, 04:12 PM"
               location="Hamburg, Germany"
            />
            <TimelineItem 
               icon={<Calendar size={18} />}
               title={isRtl ? 'ثبت سفارش' : 'Shipment Created'}
               time="Jan 28, 09:00 AM"
               location="Tehran, Iran"
            />
         </div>
      </div>

    </div>
  );
}

function TimelineItem({ icon, title, time, location, active }: any) {
  return (
    <div className="relative flex gap-6">
       <div className={`
          relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-4 
          ${active 
             ? 'bg-yellow-500 border-black text-black shadow-[0_0_0_4px_rgba(234,179,8,0.2)]' 
             : 'bg-zinc-800 border-black text-zinc-500'}
       `}>
          {icon}
       </div>
       <div className="flex-1 pt-1">
          <h4 className={`font-bold text-lg ${active ? 'text-white' : 'text-zinc-500'}`}>{title}</h4>
          <div className="flex gap-4 mt-1 text-sm text-zinc-500">
             <span>{time}</span>
             <span className="text-zinc-600">•</span>
             <span>{location}</span>
          </div>
       </div>
    </div>
  );
}
