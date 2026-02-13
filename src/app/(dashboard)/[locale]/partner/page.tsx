import { Package, Truck, Receipt, AlertCircle, Clock, MapPin, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default async function PartnerDashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isRtl = locale === 'fa';

  const t = {
    fa: {
      welcome: 'خوش آمدید، شریک تجاری عزیز',
      desc: 'خلاصه وضعیت سفارشات فعال و امور مالی شما',
      stats: { active: 'بارهای در مسیر', delivered: 'رسیده به مقصد', pending: 'پیش‌فاکتورهای باز' },
      tracking: { title: 'رهگیری سریع', placeholder: 'شماره بارنامه را وارد کنید...', btn: 'جستجو' },
      orders: { title: 'آخرین سفارشات فعال', viewAll: 'مشاهده همه', status: { onVessel: 'روی کشتی', processing: 'در حال پردازش', arrived: 'رسیده به دبی' } }
    },
    en: {
      welcome: 'Welcome, Dear Partner',
      desc: 'Summary of your active orders and financial status',
      stats: { active: 'Active Shipments', delivered: 'Delivered', pending: 'Pending Invoices' },
      tracking: { title: 'Quick Track', placeholder: 'Enter tracking ID...', btn: 'Track' },
      orders: { title: 'Recent Active Orders', viewAll: 'View All', status: { onVessel: 'On Vessel', processing: 'Processing', arrived: 'Arrived in Dubai' } }
    }
  };

  const text = isRtl ? t.fa : t.en;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 font-vazirmatn">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2">{text.welcome}</h1>
          <p className="text-zinc-400 text-sm">{text.desc}</p>
        </div>
        <div className="flex w-full md:w-auto bg-zinc-900/50 p-1.5 rounded-2xl border border-white/5 focus-within:border-blue-500/50 transition-colors">
           <input 
             type="text" 
             placeholder={text.tracking.placeholder} 
             className="bg-transparent px-4 py-2 text-sm text-white outline-none w-full md:w-64 placeholder:text-zinc-600"
           />
           <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20 shrink-0">
              {text.tracking.btn}
           </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl flex items-center gap-5 hover:border-blue-500/30 transition-all group relative overflow-hidden">
          <div className="absolute right-0 top-0 p-16 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-blue-500/10 text-blue-500 shrink-0 group-hover:scale-110 transition-transform relative z-10">
            <Truck size={24} />
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl font-black text-white mb-1">3</h3>
            <p className="text-zinc-500 text-xs font-bold uppercase">{text.stats.active}</p>
          </div>
        </div>
        <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl flex items-center gap-5 hover:border-emerald-500/30 transition-all group">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-emerald-500/10 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform">
            <Package size={24} />
          </div>
          <div>
            <h3 className="text-3xl font-black text-white mb-1">12</h3>
            <p className="text-zinc-500 text-xs font-bold uppercase">{text.stats.delivered}</p>
          </div>
        </div>
        <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl flex items-center gap-5 hover:border-yellow-500/30 transition-all group">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-yellow-500/10 text-yellow-500 shrink-0 group-hover:scale-110 transition-transform">
            <Receipt size={24} />
          </div>
          <div>
            <h3 className="text-3xl font-black text-white mb-1">1</h3>
            <p className="text-zinc-500 text-xs font-bold uppercase">{text.stats.pending}</p>
          </div>
        </div>
      </div>

      {/* Recent Orders List */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="flex justify-between items-center mb-6">
           <h3 className="font-bold text-white text-lg">{text.orders.title}</h3>
           <Link href={`/${locale}/partner/orders`} className="text-blue-500 text-xs flex items-center gap-1 hover:underline">
             {text.orders.viewAll} <ArrowUpRight size={14}/>
           </Link>
        </div>

        <div className="space-y-4">
           {/* Order Item 1 */}
           <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-blue-500/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group cursor-pointer">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <Truck size={20} />
                 </div>
                 <div>
                    <div className="font-bold text-white text-sm mb-1">SAM-8842 <span className="text-zinc-500 font-normal mx-2">|</span> لوازم جانبی موبایل</div>
                    <div className="text-xs text-zinc-500 flex items-center gap-2">
                       <MapPin size={12} /> گوانگجو <span className="w-1 h-1 bg-zinc-700 rounded-full" /> بندرعباس
                    </div>
                 </div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                 <span className="text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/20">{text.orders.status.onVessel}</span>
                 <div className="text-right">
                    <div className="text-xs text-zinc-400">ETA</div>
                    <div className="text-sm font-bold text-white">3 Days</div>
                 </div>
              </div>
           </div>

           {/* Order Item 2 */}
           <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-blue-500/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group cursor-pointer">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0 group-hover:bg-yellow-500 group-hover:text-black transition-all">
                    <Clock size={20} />
                 </div>
                 <div>
                    <div className="font-bold text-white text-sm mb-1">SAM-9910 <span className="text-zinc-500 font-normal mx-2">|</span> قطعات یدکی خودرو</div>
                    <div className="text-xs text-zinc-500 flex items-center gap-2">
                       <MapPin size={12} /> شنزن <span className="w-1 h-1 bg-zinc-700 rounded-full" /> دبی
                    </div>
                 </div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                 <span className="text-yellow-400 bg-yellow-500/10 px-3 py-1 rounded-full text-xs font-bold border border-yellow-500/20">{text.orders.status.processing}</span>
                 <div className="text-right">
                    <div className="text-xs text-zinc-400">Weight</div>
                    <div className="text-sm font-bold text-white">450 Kg</div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
