'use client';

import { useParams } from 'next/navigation';
import { Boxes, Package, Ship, Anchor, Search, Filter, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ShipmentsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'fa';
  const isRtl = locale === 'fa';

  const t = {
    fa: {
      title: 'مدیریت کانتینرها',
      desc: 'نظارت بر ظرفیت کانتینرها، بارگیری و ارسال بارها.',
      search: 'جستجوی کانتینر...',
      status: { loading: 'در حال بارگیری', shipped: 'روی آب', arrived: 'رسیده به مقصد' },
      cbm: 'حجم اشغال شده',
      weight: 'وزن کل',
      btnDetail: 'جزئیات چیدمان'
    },
    en: {
      title: 'Container Management',
      desc: 'Monitor container capacity, loading, and shipments.',
      search: 'Search containers...',
      status: { loading: 'Loading', shipped: 'Shipped', arrived: 'Arrived' },
      cbm: 'Occupied CBM',
      weight: 'Total Weight',
      btnDetail: 'Layout Details'
    }
  };

  const text = isRtl ? t.fa : t.en;

  const containers = [
    { id: 'CONT-A01', type: '40ft HC', dest: 'Dubai, UAE', status: 'loading', fillCbm: 58, maxCbm: 68, weight: '18,500 kg', date: '2023-11-01' },
    { id: 'CONT-B22', type: '20ft', dest: 'Bandar Abbas, IR', status: 'shipped', fillCbm: 32, maxCbm: 33, weight: '14,200 kg', date: '2023-10-28' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-vazirmatn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2 flex items-center gap-3">
             <Boxes className="text-emerald-500" />
             {text.title}
          </h1>
          <p className="text-zinc-400 text-sm">{text.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {containers.map((container, idx) => {
          const fillPercentage = (container.fillCbm / container.maxCbm) * 100;
          return (
            <div key={idx} className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-3xl hover:border-white/10 transition-all relative overflow-hidden group">
               {/* Watermark Icon */}
               <Anchor size={120} className="absolute -bottom-6 -right-6 text-white/[0.02] group-hover:scale-110 transition-transform duration-500 pointer-events-none" />
               
               <div className="flex justify-between items-start mb-6 relative z-10">
                  <div>
                     <h3 className="text-xl font-black text-white mb-1 font-mono tracking-tight">{container.id}</h3>
                     <span className="text-xs font-bold bg-white/10 text-zinc-300 px-2 py-0.5 rounded">{container.type}</span>
                  </div>
                  <span className={cn(
                     "px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5 border",
                     container.status === 'loading' ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  )}>
                     <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                     {text.status[container.status as keyof typeof text.status]}
                  </span>
               </div>

               <div className="space-y-5 mb-8 relative z-10">
                  {/* Capacity Bar */}
                  <div>
                     <div className="flex justify-between text-xs font-bold mb-2">
                        <span className="text-zinc-400">{text.cbm}</span>
                        <span className="text-white font-mono">{container.fillCbm} / {container.maxCbm} CBM</span>
                     </div>
                     <div className="h-3 w-full bg-zinc-900 border border-white/5 rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full rounded-full transition-all duration-1000", fillPercentage > 85 ? "bg-emerald-500" : "bg-yellow-500")}
                          style={{ width: `${fillPercentage}%` }}
                        />
                     </div>
                  </div>
                  
                  {/* Weight */}
                  <div className="flex justify-between items-center bg-zinc-900/50 p-3 rounded-xl border border-white/5">
                     <span className="text-xs text-zinc-400">{text.weight}:</span>
                     <span className="text-sm font-bold text-white font-mono">{container.weight}</span>
                  </div>
               </div>

               <div className="flex justify-between items-center pt-4 border-t border-white/5 relative z-10">
                  <div className="text-xs text-zinc-500 flex items-center gap-1.5">
                     <Ship size={14} /> {container.dest}
                  </div>
                  <button className="flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
                     {text.btnDetail}
                     <ArrowRight size={14} className={cn(isRtl && "rotate-180")} />
                  </button>
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
