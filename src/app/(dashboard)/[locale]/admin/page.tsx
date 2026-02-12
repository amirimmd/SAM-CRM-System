import { Users, Package, DollarSign, Activity, TrendingUp, AlertTriangle, ArrowUpRight, Clock } from 'lucide-react';

export default async function AdminDashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isRtl = locale === 'fa';

  const stats = [
    { 
      label: isRtl ? 'درآمد کل ماه' : 'Total Revenue', 
      value: '¥ 845,000', 
      trend: '+12.5%', 
      desc: isRtl ? 'نسبت به ماه گذشته' : 'vs last month',
      icon: DollarSign, 
      color: 'from-emerald-600 to-emerald-400',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-500'
    },
    { 
      label: isRtl ? 'سفارشات فعال' : 'Active Orders', 
      value: '124', 
      trend: '+4', 
      desc: isRtl ? 'سفارش جدید امروز' : 'new orders today',
      icon: Package, 
      color: 'from-blue-600 to-blue-400',
      bg: 'bg-blue-500/10',
      text: 'text-blue-500'
    },
    { 
      label: isRtl ? 'کاربران جدید' : 'New Users', 
      value: '1,280', 
      trend: '+8.2%', 
      desc: isRtl ? 'رشد پایگاه کاربری' : 'User base growth',
      icon: Users, 
      color: 'from-purple-600 to-purple-400',
      bg: 'bg-purple-500/10',
      text: 'text-purple-500'
    },
    { 
      label: isRtl ? 'نرخ تبدیل' : 'Conversion Rate', 
      value: '24.5%', 
      trend: '-1.2%', 
      desc: isRtl ? 'نیاز به بهبود' : 'Needs improvement',
      icon: Activity, 
      color: 'from-yellow-600 to-yellow-400',
      bg: 'bg-yellow-500/10',
      text: 'text-yellow-500'
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Title Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
            {isRtl ? 'مرکز فرماندهی' : 'Command Center'}
          </h1>
          <p className="text-zinc-400 text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {isRtl ? 'سیستم آنلاین و پایدار است' : 'System is online and stable'}
          </p>
        </div>
        <div className="flex items-center gap-3">
           <span className="text-xs text-zinc-500 font-mono bg-zinc-900 border border-white/5 px-3 py-1.5 rounded-lg">v4.2.0-beta</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="relative group bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl overflow-hidden hover:border-white/10 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3.5 rounded-2xl ${stat.bg} ${stat.text}`}>
                <stat.icon size={22} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-white/5 ${stat.trend.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                {stat.trend.startsWith('+') ? <TrendingUp size={12} /> : <TrendingUp size={12} className="rotate-180" />}
                {stat.trend}
              </div>
            </div>
            
            <div className="space-y-1">
               <h3 className="text-3xl font-black text-white tracking-tight">{stat.value}</h3>
               <p className="text-sm font-medium text-zinc-400">{stat.label}</p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/5">
               <p className="text-[10px] text-zinc-500 flex items-center gap-1">
                  <Clock size={10} />
                  {stat.desc}
               </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Activity & Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Activities (Bigger) */}
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div>
               <h3 className="font-bold text-white text-lg">
                 {isRtl ? 'تراکنش‌های اخیر سیستم' : 'Recent Transactions'}
               </h3>
               <p className="text-xs text-zinc-500 mt-1">آخرین تغییرات وضعیت بارها و سفارشات</p>
            </div>
            <button className="text-xs font-bold text-black bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded-xl transition-colors">
              {isRtl ? 'مشاهده کامل' : 'View Full Log'}
            </button>
          </div>
          
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/50 hover:bg-zinc-900 border border-white/5 hover:border-white/10 transition-all group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <Package size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                     <h4 className="text-sm font-bold text-white truncate">ثبت سفارش جدید (SAM-8842)</h4>
                     <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20">تایید شده</span>
                  </div>
                  <p className="text-xs text-zinc-500 truncate">توسط شرکت بازرگانی افق • محموله الکترونیک</p>
                </div>
                <div className="text-right">
                   <div className="text-sm font-bold text-white">¥ 12,400</div>
                   <div className="text-[10px] text-zinc-500 font-mono">14:30 PM</div>
                </div>
                <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-white transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Server Health Status */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 flex flex-col h-full">
          <h3 className="font-bold text-white text-lg mb-2">
            {isRtl ? 'وضعیت سلامت سرور' : 'Server Health'}
          </h3>
          <p className="text-xs text-zinc-500 mb-8">مانیتورینگ لحظه‌ای منابع سیستم</p>
          
          <div className="space-y-8 flex-1">
            {/* Metric 1 */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-3">
                <span className="text-zinc-300">CPU Usage</span>
                <span className="text-emerald-400">45%</span>
              </div>
              <div className="h-3 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                <div className="h-full w-[45%] bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full relative">
                   <div className="absolute top-0 right-0 bottom-0 w-1 bg-white/50 animate-pulse" />
                </div>
              </div>
            </div>
            
            {/* Metric 2 */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-3">
                <span className="text-zinc-300">Memory (RAM)</span>
                <span className="text-yellow-400">62%</span>
              </div>
              <div className="h-3 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                <div className="h-full w-[62%] bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full" />
              </div>
            </div>

            {/* Metric 3 */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-3">
                <span className="text-zinc-300">Database (IOPS)</span>
                <span className="text-blue-400">Low Load</span>
              </div>
              <div className="h-3 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                <div className="h-full w-[25%] bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
              </div>
            </div>
          </div>

          <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20 flex gap-4 items-start">
            <div className="p-2 bg-red-500/20 rounded-lg text-red-500">
               <AlertTriangle size={20} />
            </div>
            <div>
              <div className="text-sm font-bold text-red-400 mb-1">هشدار امنیتی</div>
              <div className="text-[11px] text-red-200/60 leading-relaxed">
                 تعداد ۳ تلاش ناموفق برای ورود به پنل ادمین با IP ناشناس ثبت شده است. لطفا لاگ‌ها را بررسی کنید.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
