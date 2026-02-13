import { Search, Filter, Package, Ship, CheckCircle2, CircleDashed } from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function PartnerOrdersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isRtl = locale === 'fa';

  const t = {
    fa: {
      title: 'سفارشات و بارهای من',
      desc: 'لیست کامل محموله‌های ارسالی و وضعیت فعلی آن‌ها',
      search: 'جستجوی بارنامه یا کالا...',
      filter: 'فیلتر وضعیت',
      table: { id: 'کد رهگیری', cargo: 'شرح کالا', status: 'وضعیت', route: 'مسیر', date: 'تاریخ ثبت', action: 'جزئیات' },
      status: { pending: 'در انبار چین', shipping: 'حمل دریایی', arrived: 'رسیده به مقصد' }
    },
    en: {
      title: 'My Shipments',
      desc: 'Full list of your shipments and their current status',
      search: 'Search tracking ID or cargo...',
      filter: 'Filter Status',
      table: { id: 'Tracking ID', cargo: 'Description', status: 'Status', route: 'Route', date: 'Date', action: 'Details' },
      status: { pending: 'China Warehouse', shipping: 'On Vessel', arrived: 'Arrived' }
    }
  };

  const text = isRtl ? t.fa : t.en;

  const orders = [
    { id: 'SAM-8842', desc: 'لوازم جانبی موبایل', route: 'GZ -> BND', status: 'shipping', date: '2023-10-12' },
    { id: 'SAM-9910', desc: 'قطعات یدکی خودرو', route: 'SZ -> DXB', status: 'pending', date: '2023-10-15' },
    { id: 'SAM-7721', desc: 'الکترونیک مصرفی', route: 'GZ -> DXB', status: 'arrived', date: '2023-09-28' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2">{text.title}</h1>
          <p className="text-zinc-400 text-sm">{text.desc}</p>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-white/5 p-4 rounded-3xl flex flex-col md:flex-row gap-3">
        <div className="relative flex-1 group">
          <Search size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-500 transition-colors", isRtl ? "right-4" : "left-4")} />
          <input 
            type="text" 
            placeholder={text.search}
            className={cn("w-full h-12 bg-zinc-900/50 border border-white/5 rounded-2xl text-sm text-white focus:border-blue-500/50 focus:bg-zinc-900 outline-none transition-all placeholder:text-zinc-600", isRtl ? "pr-12 pl-4" : "pl-12 pr-4")}
          />
        </div>
        <button className="flex items-center gap-2 px-6 h-12 bg-zinc-900 border border-white/5 rounded-2xl text-zinc-300 hover:text-white hover:border-white/20 transition-colors text-sm font-medium">
          <Filter size={16} /> {text.filter}
        </button>
      </div>

      <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-zinc-900/80 text-zinc-400 font-medium border-b border-white/5">
              <tr>
                <th className={cn("p-6 font-bold", isRtl ? "text-right" : "text-left")}>{text.table.id}</th>
                <th className={cn("p-6 font-bold", isRtl ? "text-right" : "text-left")}>{text.table.cargo}</th>
                <th className={cn("p-6 font-bold", isRtl ? "text-right" : "text-left")}>{text.table.status}</th>
                <th className={cn("p-6 font-bold", isRtl ? "text-right" : "text-left")}>{text.table.route}</th>
                <th className={cn("p-6 font-bold", isRtl ? "text-right" : "text-left")}>{text.table.date}</th>
                <th className="p-6 text-center font-bold">{text.table.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((order, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-6 font-mono text-white font-bold">{order.id}</td>
                  <td className="p-6 text-zinc-300">{order.desc}</td>
                  <td className="p-6">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 w-fit",
                      order.status === 'shipping' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                      order.status === 'arrived' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                    )}>
                      {order.status === 'shipping' && <Ship size={12} />}
                      {order.status === 'arrived' && <CheckCircle2 size={12} />}
                      {order.status === 'pending' && <CircleDashed size={12} />}
                      {text.status[order.status as keyof typeof text.status]}
                    </span>
                  </td>
                  <td className="p-6 font-mono text-zinc-500 text-xs">{order.route}</td>
                  <td className="p-6 text-zinc-500 text-xs font-mono">{order.date}</td>
                  <td className="p-6 text-center">
                    <button className="text-xs bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg transition-colors border border-white/5">
                       {text.table.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
