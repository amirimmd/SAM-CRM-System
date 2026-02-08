'use client';

import { useState } from 'react';
import { Search, MapPin, Truck, Calendar, CheckCircle2, AlertCircle, Container } from 'lucide-react';
import { getShipmentByTrackingCode, type Shipment } from '@/lib/data/mock-db';

export default function TrackingPage({
  params,
}: {
  params: { locale: string };
}) {
  // Hardcoded for demo/client component simplicity
  const isRtl = true; 

  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Shipment | null>(null);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery) return;
    
    setIsLoading(true);
    setError('');
    setResult(null);
    setHasSearched(true);

    try {
      // درخواست به دیتابیس مجازی
      const data = await getShipmentByTrackingCode(searchQuery);
      if (data) {
        setResult(data);
      } else {
        setError('شماره رهگیری یافت نشد. لطفا کد TRK-2026 را امتحان کنید.');
      }
    } catch (err) {
      setError('خطایی در ارتباط با سرور رخ داد.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center w-full min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4 font-vazirmatn overflow-hidden">
      
      {/* Background FX */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-yellow-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Header Badge */}
        <div className="inline-flex items-center gap-3 rounded-full border border-yellow-500/20 bg-yellow-500/5 pl-2 pr-4 py-1.5 backdrop-blur-md mb-8">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
             </span>
             <span className="text-xs font-bold tracking-widest text-yellow-500 uppercase">
                سامانه هوشمند رهگیری بار
             </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-center mb-6">
           رهگیری لحظه‌ای <span className="text-yellow-500">مرسوله</span>
        </h1>

        {/* Search Box */}
        <div className="w-full mt-8 relative group max-w-2xl">
             <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600 to-yellow-300 rounded-2xl opacity-30 group-focus-within:opacity-100 transition duration-500 blur group-focus-within:blur-md" />
             <div className="relative flex items-center bg-[#0a0a0a] rounded-2xl border border-white/10 p-2 shadow-2xl">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="شماره رهگیری (مثلا: TRK-2026)"
                  className="flex-1 bg-transparent border-none focus:outline-none text-white px-4 h-14 text-lg placeholder:text-zinc-600 font-mono tracking-wide text-right"
                  dir="ltr"
                />
                <button 
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="h-14 px-8 rounded-xl bg-yellow-500 text-black font-bold text-lg hover:bg-yellow-400 transition-all flex items-center gap-2"
                >
                   {isLoading ? <span className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full" /> : <Search size={20} />}
                   <span className="hidden md:inline">رهگیری</span>
                </button>
             </div>
        </div>
        <p className="mt-4 text-zinc-500 text-sm">برای تست از کد <span className="text-zinc-300 font-mono">TRK-2026</span> استفاده کنید.</p>

        {/* Result Area */}
        {hasSearched && (
          <div className="w-full mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {error ? (
              <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center gap-3 text-right" dir="rtl">
                <AlertCircle />
                {error}
              </div>
            ) : result ? (
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-xl shadow-2xl p-8 md:p-10" dir="rtl">
                 
                 {/* Top Status */}
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-8 mb-8 gap-6">
                    <div>
                       <span className="text-zinc-500 text-xs font-bold tracking-widest uppercase mb-1 block">کانتینر</span>
                       <div className="flex items-center gap-3">
                          <Container className="text-yellow-500" />
                          <span className="text-3xl font-mono font-bold text-white tracking-wider">{result.containerNo}</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-3 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-green-400 font-bold text-sm">
                            {result.status === 'in_transit' ? 'در حال حمل' : 'رسیده به مقصد'}
                        </span>
                    </div>
                 </div>

                 {/* Timeline */}
                 <div className="space-y-8 relative before:absolute before:right-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                    {result.history.map((item, idx) => (
                      <div key={idx} className="relative flex gap-6 items-start text-right pr-14 group">
                        <div className="absolute right-0 top-0 z-10 w-10 h-10 rounded-full flex items-center justify-center border-4 border-black bg-zinc-800 text-zinc-400 group-first:bg-yellow-500 group-first:text-black group-first:shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                            {idx === 0 ? <Truck size={18} /> : <CheckCircle2 size={18} />}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-lg font-bold text-white mb-1">{item.status}</h4>
                            <p className="text-zinc-400 text-sm mb-2">{item.description}</p>
                            <div className="flex items-center gap-4 text-xs text-zinc-500">
                                <span className="flex items-center gap-1"><Calendar size={12} /> {item.date}</span>
                                <span className="flex items-center gap-1"><MapPin size={12} /> {item.location}</span>
                            </div>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            ) : null}
          </div>
        )}

      </div>
    </div>
  );
}
