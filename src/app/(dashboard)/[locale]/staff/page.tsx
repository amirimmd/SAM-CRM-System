import { Package, UserCheck, MessageSquare, AlertTriangle, ArrowUpRight, Clock, ScanBarcode } from 'lucide-react';
import Link from 'next/link';

export default async function StaffDashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isRtl = locale === 'fa';

  const t = {
    fa: {
      title: 'میز کار شما',
      desc: 'خلاصه وضعیت عملیات انبار و کارهای در انتظار انجام',
      scanBtn: 'اسکن بار جدید',
      stats: {
        pending: 'بارهای منتظر تخصیص',
        kyc: 'تایید هویت‌های جدید',
        tickets: 'پیام‌های خوانده نشده',
      },
      tasks: 'کارهای فوری امروز',
      tasksList: [
        { title: 'تایید بارنامه مشتری (کد ملی نامعتبر)', desc: 'شرکت بازرگانی پارس • شناسه: SAM-1042', action: 'بررسی مدارک' },
        { title: 'تکمیل ظرفیت کانتینر TEU-40 (گوانگجو)', desc: 'نیاز به تخصیص ۳ CBM بار دیگر', action: 'تخصیص بار' }
      ],
      recent: 'بارهای اخیراً ثبت شده',
      cargoType: 'تیپ'
    },
    en: {
      title: 'Your Workspace',
      desc: 'Overview of warehouse operations and pending tasks',
      scanBtn: 'Scan New Cargo',
      stats: {
        pending: 'Pending Shipments',
        kyc: 'Pending KYC Approvals',
        tickets: 'Unread Messages',
      },
      tasks: 'Urgent Tasks Today',
      tasksList: [
        { title: 'Customer BOL Approval (Invalid ID)', desc: 'Pars Trading Co. • ID: SAM-1042', action: 'Review Docs' },
        { title: 'Fill TEU-40 Container Capacity (GZ)', desc: 'Needs 3 CBM more cargo allocated', action: 'Assign Cargo' }
      ],
      recent: 'Recently Logged Cargo',
      cargoType: 'Tier'
    }
  };

  const text = isRtl ? t.fa : t.en;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-vazirmatn pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2">{text.title}</h1>
          <p className="text-zinc-400 text-sm">{text.desc}</p>
        </div>
        <Link 
          href={`/${locale}/staff/inbound`}
          className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20 active:scale-95 w-full md:w-auto justify-center shrink-0"
        >
          <ScanBarcode size={20} />
          {text.scanBtn}
        </Link>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-[#0a0a0a] border border-white/5 p-5 md:p-6 rounded-3xl flex items-center gap-4 hover:border-emerald-500/30 transition-all group">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-blue-500/10 text-blue-500 shrink-0 group-hover:scale-110 transition-transform">
            <Package size={24} />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-1">18</h3>
            <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase">{text.stats.pending}</p>
          </div>
        </div>
        <div className="bg-[#0a0a0a] border border-white/5 p-5 md:p-6 rounded-3xl flex items-center gap-4 hover:border-emerald-500/30 transition-all group">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-yellow-500/10 text-yellow-500 shrink-0 group-hover:scale-110 transition-transform">
            <UserCheck size={24} />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-1">5</h3>
            <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase">{text.stats.kyc}</p>
          </div>
        </div>
        <div className="bg-[#0a0a0a] border border-white/5 p-5 md:p-6 rounded-3xl flex items-center gap-4 hover:border-emerald-500/30 transition-all group sm:col-span-2 md:col-span-1">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-purple-500/10 text-purple-500 shrink-0 group-hover:scale-110 transition-transform">
            <MessageSquare size={24} />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-1">12</h3>
            <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase">{text.stats.tickets}</p>
          </div>
        </div>
      </div>

      {/* Urgent Tasks & Recent Scans */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        
        {/* Urgent Tasks */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col h-full">
          <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
            <AlertTriangle className="text-yellow-500" size={20} />
            {text.tasks}
          </h3>
          <div className="space-y-4 flex-1">
            <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between group hover:border-white/10 transition-all">
               <div>
                  <div className="font-bold text-white text-sm mb-1">{text.tasksList[0].title}</div>
                  <div className="text-[11px] md:text-xs text-zinc-500">{text.tasksList[0].desc}</div>
               </div>
               <button className="text-xs font-bold bg-white/5 text-white hover:bg-white/10 px-4 py-2.5 rounded-xl transition-colors w-full sm:w-auto shrink-0 border border-white/5">
                  {text.tasksList[0].action}
               </button>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between group hover:border-emerald-500/30 transition-all">
               <div>
                  <div className="font-bold text-emerald-400 text-sm mb-1">{text.tasksList[1].title}</div>
                  <div className="text-[11px] md:text-xs text-emerald-500/70">{text.tasksList[1].desc}</div>
               </div>
               <button className="text-xs font-bold bg-emerald-500 text-black hover:bg-emerald-400 px-4 py-2.5 rounded-xl transition-colors w-full sm:w-auto shrink-0">
                  {text.tasksList[1].action}
               </button>
            </div>
          </div>
        </div>

        {/* Recent Inbound */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col h-full">
          <h3 className="font-bold text-white text-lg mb-6">
            {text.recent}
          </h3>
          <div className="space-y-3 flex-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 md:gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 shrink-0 group-hover:text-emerald-500 group-hover:border-emerald-500/30 transition-all">
                  <Package size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-sm truncate">SAM-25-104{i}</div>
                  <div className="text-[10px] md:text-xs text-zinc-500 truncate mt-0.5">2.5 CBM • 450 Kg • {text.cargoType} ۲</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] text-zinc-500 flex items-center gap-1 bg-zinc-900 px-2 py-1 rounded-md border border-white/5">
                     <Clock size={10} /> 10m ago
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
