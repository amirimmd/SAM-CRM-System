import { 
    Users, 
    Search, 
    Filter, 
    MoreHorizontal, 
    Plus, 
    TrendingUp, 
    BarChart3, 
    Phone, 
    Mail, 
    Building2,
    Calendar,
    CheckCircle2,
    XCircle,
    Clock,
    ArrowUpRight,
    PieChart,
    Settings,
    Download
  } from 'lucide-react';
  import { cn } from '@/lib/utils'; // ✅ Added missing import
  
  export default async function CRMPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const isRtl = locale === 'fa';
  
    const texts = {
      fa: {
        header: {
          title: 'مدیریت ارتباط با مشتری (CRM)',
          desc: 'مرکز کنترل فروش و تعامل با مشتریان. پیگیری سرنخ‌ها، مدیریت فرصت‌های فروش و تحلیل عملکرد تیم.',
          settings: 'تنظیمات CRM',
          add: 'ثبت مشتری جدید'
        },
        kpi: {
          total: 'کل مشتریان',
          active: 'فرصت‌های فعال',
          conversion: 'نرخ تبدیل موفق',
          pipeline: 'ارزش سبد فروش',
          target: 'هدف: ۱.۵ میلیون دلار'
        },
        pipeline: {
          title: 'وضعیت قیف فروش',
          subtitle: 'نمای کلی از مراحل پیشرفت مشتریان',
          report: 'گزارش کامل',
          stages: {
            lead: 'سرنخ جدید (Lead)',
            proposal: 'ارسال پروپوزال (Proposal)',
            negotiation: 'مذاکره نهایی (Negotiation)',
            won: 'برنده شده (Closed Won)'
          }
        },
        sources: {
          title: 'ورودی مشتریان',
          google: 'جستجوی گوگل',
          social: 'لینکدین و سوشال',
          referral: 'معرفی دوستان',
          digital: 'دیجیتال'
        },
        filters: {
          search: 'جستجو (نام شرکت، شماره تماس، ایمیل)...',
          status: 'فیلتر وضعیت',
          date: 'بازه زمانی',
          export: 'خروجی اکسل'
        },
        table: {
          headers: {
            customer: 'مشتری / شرکت',
            contact: 'اطلاعات تماس',
            status: 'وضعیت',
            value: 'ارزش',
            prob: 'احتمال',
            activity: 'آخرین تعامل',
            actions: 'عملیات'
          },
          pagination: {
            showing: 'نمایش ۱ تا ۶ از ۴۵۰ رکورد',
            prev: 'قبلی',
            next: 'بعدی'
          }
        }
      },
      en: {
        header: {
          title: 'CRM Dashboard',
          desc: 'Central hub for sales and customer interaction. Track leads, manage opportunities, and analyze team performance.',
          settings: 'CRM Settings',
          add: 'Add New Customer'
        },
        kpi: {
          total: 'Total Customers',
          active: 'Active Opportunities',
          conversion: 'Conversion Rate',
          pipeline: 'Pipeline Value',
          target: 'Target: $1.5M'
        },
        pipeline: {
          title: 'Sales Pipeline',
          subtitle: 'Overview of customer progress stages',
          report: 'Full Report',
          stages: {
            lead: 'New Lead',
            proposal: 'Proposal Sent',
            negotiation: 'Negotiation',
            won: 'Closed Won'
          }
        },
        sources: {
          title: 'Traffic Sources',
          google: 'Google Search',
          social: 'LinkedIn & Social',
          referral: 'Referrals',
          digital: 'Digital'
        },
        filters: {
          search: 'Search (Company, Phone, Email)...',
          status: 'Status Filter',
          date: 'Date Range',
          export: 'Export Excel'
        },
        table: {
          headers: {
            customer: 'Customer / Company',
            contact: 'Contact Info',
            status: 'Status',
            value: 'Value',
            prob: 'Probability',
            activity: 'Last Activity',
            actions: 'Actions'
          },
          pagination: {
            showing: 'Showing 1 to 6 of 450 entries',
            prev: 'Previous',
            next: 'Next'
          }
        }
      }
    };
  
    const t = isRtl ? texts.fa : texts.en;
  
    // داده‌های نمونه برای نمایش
    const customers = [
      { id: 1, name: 'بازرگانی آریا', contact: 'علی محمدی', phone: '+98 912 345 6789', email: 'ali@arya.co', status: 'Lead', value: '$12,000', probability: '60%', lastAction: '2h ago' },
      { id: 2, name: 'تکنولوژی افق', contact: 'سارا احمدی', phone: '+86 136 123 4567', email: 'sara@tech-horizon.cn', status: 'Customer', value: '$45,500', probability: '100%', lastAction: '1d ago' },
      { id: 3, name: 'واردات صادرات پارس', contact: 'رضا کمالی', phone: '+971 50 987 6543', email: 'reza@pars-trade.ae', status: 'Negotiation', value: '$8,200', probability: '80%', lastAction: '3d ago' },
      { id: 4, name: 'فروشگاه مدرن', contact: 'زهرا نوری', phone: '+98 21 8888 9999', email: 'info@modern-shop.ir', status: 'Lost', value: '$3,000', probability: '0%', lastAction: '1w ago' },
      { id: 5, name: 'صنایع الکترونیک', contact: 'امیر حسینی', phone: '+86 155 555 5555', email: 'amir@elec-ind.com', status: 'Lead', value: '$25,000', probability: '40%', lastAction: '5h ago' },
      { id: 6, name: 'پتروشیمی جنوب', contact: 'مهندس اکبری', phone: '+98 61 3333 4444', email: 'purchase@petrosouth.com', status: 'Proposal', value: '$150,000', probability: '50%', lastAction: '12h ago' },
    ];
  
    return (
      <div className="space-y-8 animate-in fade-in duration-500 font-vazirmatn pb-20">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white mb-2">{t.header.title}</h1>
            <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
              {t.header.desc}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-zinc-900 border border-white/10 text-zinc-300 px-4 py-3 rounded-2xl font-bold text-sm hover:text-white hover:border-white/20 transition-all">
               <Settings size={18} />
               <span className="hidden sm:inline">{t.header.settings}</span>
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black px-6 py-3 rounded-2xl font-bold text-sm hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all active:scale-95">
              <Plus size={18} />
              {t.header.add}
            </button>
          </div>
        </div>
  
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: t.kpi.total, val: '2,845', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10', trend: '+12%' },
            { label: t.kpi.active, val: '45', icon: TrendingUp, color: 'text-yellow-500', bg: 'bg-yellow-500/10', trend: '+5' },
            { label: t.kpi.conversion, val: '18.2%', icon: BarChart3, color: 'text-emerald-500', bg: 'bg-emerald-500/10', trend: '+2.4%' },
            { label: t.kpi.pipeline, val: '$1.2M', icon: PieChart, color: 'text-purple-500', bg: 'bg-purple-500/10', trend: t.kpi.target },
          ].map((stat, i) => (
            <div key={i} className="bg-[#0a0a0a] border border-white/5 p-5 md:p-6 rounded-3xl flex items-center gap-5 hover:border-white/10 transition-all group">
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                <stat.icon size={24} className="md:w-7 md:h-7" />
              </div>
              <div>
                <p className="text-zinc-500 text-[10px] md:text-xs font-bold mb-1 uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-1">{stat.val}</h3>
                <span className="text-[10px] text-zinc-400 font-mono bg-white/5 px-2 py-0.5 rounded">{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>
  
        {/* Analytics & Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Pipeline Status */}
          <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
              <div>
                 <h3 className="font-bold text-white text-lg">{t.pipeline.title}</h3>
                 <p className="text-xs text-zinc-500 mt-1">{t.pipeline.subtitle}</p>
              </div>
              <button className="text-xs bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg transition-colors">
                {t.pipeline.report}
              </button>
            </div>
            
            <div className="space-y-6 flex-1 justify-center flex flex-col">
              {[
                { label: t.pipeline.stages.lead, count: 45, val: '$450k', total: 100, color: 'bg-blue-600' },
                { label: t.pipeline.stages.proposal, count: 28, val: '$280k', total: 100, color: 'bg-purple-600' },
                { label: t.pipeline.stages.negotiation, count: 15, val: '$150k', total: 100, color: 'bg-yellow-500' },
                { label: t.pipeline.stages.won, count: 12, val: '$120k', total: 100, color: 'bg-emerald-500' },
              ].map((stage, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-300 font-bold flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${stage.color}`} />
                       {stage.label}
                    </span>
                    <div className="flex gap-3">
                       <span className="text-zinc-500 font-mono text-xs hidden sm:inline">{stage.val}</span>
                       <span className="text-white font-bold">{stage.count}</span>
                    </div>
                  </div>
                  <div className="h-4 w-full bg-zinc-900/50 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className={`h-full rounded-full ${stage.color} relative transition-all duration-1000 ease-out group-hover:brightness-110`} 
                      style={{ width: `${(stage.count / 60) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Lead Sources */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-center relative overflow-hidden min-h-[350px]">
            <div className="absolute top-0 right-0 p-32 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <h3 className="font-bold text-white text-lg mb-8 text-center relative z-10">{t.sources.title}</h3>
            
            <div className="relative w-48 h-48 md:w-52 md:h-52 mx-auto mb-8 flex items-center justify-center z-10">
               {/* CSS Chart */}
               <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#27272a" strokeWidth="12" />
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#eab308" strokeWidth="12" strokeDasharray="100 251" strokeDashoffset="0" className="drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" /> {/* 40% */}
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="12" strokeDasharray="75 251" strokeDashoffset="-100" /> {/* 30% */}
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="12" strokeDasharray="50 251" strokeDashoffset="-175" /> {/* 20% */}
               </svg>
               <div className="absolute text-center">
                  <div className="text-3xl font-black text-white">85%</div>
                  <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{t.sources.digital}</div>
               </div>
            </div>
            
            <div className="space-y-4 px-4 relative z-10">
               <div className="flex justify-between text-xs items-center">
                  <div className="flex items-center gap-2 text-zinc-300"><div className="w-3 h-1.5 rounded-full bg-yellow-500" /> {t.sources.google}</div>
                  <span className="font-mono text-zinc-500">40%</span>
               </div>
               <div className="flex justify-between text-xs items-center">
                  <div className="flex items-center gap-2 text-zinc-300"><div className="w-3 h-1.5 rounded-full bg-blue-500" /> {t.sources.social}</div>
                  <span className="font-mono text-zinc-500">30%</span>
               </div>
               <div className="flex justify-between text-xs items-center">
                  <div className="flex items-center gap-2 text-zinc-300"><div className="w-3 h-1.5 rounded-full bg-emerald-500" /> {t.sources.referral}</div>
                  <span className="font-mono text-zinc-500">20%</span>
               </div>
            </div>
          </div>
  
        </div>
  
        {/* Advanced Filter & Search */}
        <div className="bg-[#0a0a0a] border border-white/5 p-4 md:p-5 rounded-3xl flex flex-col lg:flex-row gap-4 shadow-xl relative z-20">
          <div className="relative flex-1 group">
            <Search className={cn("absolute top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-yellow-500 transition-colors", isRtl ? "right-4" : "left-4")} size={20} />
            <input 
              type="text" 
              placeholder={t.filters.search}
              className={cn(
                "w-full h-12 bg-zinc-900/50 border border-white/10 rounded-2xl text-sm text-white focus:border-yellow-500/50 focus:bg-zinc-900 outline-none transition-all placeholder:text-zinc-600",
                isRtl ? "pr-12 pl-4" : "pl-12 pr-4"
              )}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
             <button className="flex items-center gap-2 px-6 h-12 bg-zinc-900 border border-white/10 rounded-2xl text-zinc-300 hover:text-white hover:border-white/30 transition-colors text-sm whitespace-nowrap font-medium shrink-0">
               <Filter size={16} />
               {t.filters.status}
             </button>
             <button className="flex items-center gap-2 px-6 h-12 bg-zinc-900 border border-white/10 rounded-2xl text-zinc-300 hover:text-white hover:border-white/30 transition-colors text-sm whitespace-nowrap font-medium shrink-0">
               <Calendar size={16} />
               {t.filters.date}
             </button>
             <button className="flex items-center gap-2 px-6 h-12 bg-zinc-900 border border-white/10 rounded-2xl text-zinc-300 hover:text-white hover:border-white/30 transition-colors text-sm whitespace-nowrap font-medium shrink-0">
               <Download size={16} />
               {t.filters.export}
             </button>
          </div>
        </div>
  
        {/* Customers List Table */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-zinc-900 text-zinc-400 font-medium border-b border-white/5">
                <tr>
                  <th className={cn("p-6 font-bold", isRtl ? "text-right" : "text-left")}>{t.table.headers.customer}</th>
                  <th className={cn("p-6 font-bold", isRtl ? "text-right" : "text-left")}>{t.table.headers.contact}</th>
                  <th className={cn("p-6 font-bold", isRtl ? "text-right" : "text-left")}>{t.table.headers.status}</th>
                  <th className={cn("p-6 font-bold", isRtl ? "text-right" : "text-left")}>{t.table.headers.value}</th>
                  <th className={cn("p-6 font-bold", isRtl ? "text-right" : "text-left")}>{t.table.headers.prob}</th>
                  <th className={cn("p-6 font-bold", isRtl ? "text-right" : "text-left")}>{t.table.headers.activity}</th>
                  <th className="p-6 text-center font-bold">{t.table.headers.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {customers.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-zinc-800 to-zinc-700 flex items-center justify-center text-zinc-300 border border-white/5 font-black text-lg shadow-inner">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-white text-base mb-1">{item.name}</div>
                          <div className="text-xs text-zinc-500 flex items-center gap-1.5 bg-white/5 px-2 py-0.5 rounded w-fit">
                             <Building2 size={10} />
                             {item.contact}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-col gap-2">
                         <a href={`tel:${item.phone}`} className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors group/link">
                            <div className="p-1 rounded bg-white/5 group-hover/link:bg-yellow-500 group-hover/link:text-black transition-colors"><Phone size={10} /></div>
                            <span dir="ltr" className="font-mono">{item.phone}</span>
                         </a>
                         <a href={`mailto:${item.email}`} className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors group/link">
                            <div className="p-1 rounded bg-white/5 group-hover/link:bg-blue-500 group-hover/link:text-white transition-colors"><Mail size={10} /></div>
                            <span className="truncate max-w-[150px]">{item.email}</span>
                         </a>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border ${
                        item.status === 'Customer' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                        item.status === 'Lead' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                        item.status === 'Negotiation' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                        item.status === 'Proposal' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                        'bg-red-500/10 text-red-500 border-red-500/20'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                        {item.status}
                      </span>
                    </td>
                    <td className="p-6">
                       <span className="font-mono font-bold text-white text-base">{item.value}</span>
                    </td>
                    <td className="p-6">
                       <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 w-20 bg-zinc-800 rounded-full overflow-hidden border border-white/5">
                             <div 
                               className={`h-full rounded-full ${
                                 parseInt(item.probability) >= 80 ? 'bg-emerald-500' : 
                                 parseInt(item.probability) >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                               }`} 
                               style={{ width: item.probability }} 
                             />
                          </div>
                          <span className="text-xs text-zinc-400 font-mono w-8 text-right">{item.probability}</span>
                       </div>
                    </td>
                    <td className="p-6">
                       <div className="flex items-center gap-1.5 text-zinc-500 text-xs bg-zinc-900/50 px-2 py-1 rounded border border-white/5 w-fit">
                          <Clock size={12} />
                          {item.lastAction}
                       </div>
                    </td>
                    <td className="p-6 text-center">
                      <button className="p-2.5 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-colors border border-transparent hover:border-white/10">
                        <MoreHorizontal size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-900/30">
             <span className="text-xs text-zinc-500">
                {t.table.pagination.showing}
             </span>
             <div className="flex gap-2">
                <button className="px-3 py-1 text-xs rounded-lg bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors disabled:opacity-50">{t.table.pagination.prev}</button>
                <button className="px-3 py-1 text-xs rounded-lg bg-yellow-500 text-black font-bold">1</button>
                <button className="px-3 py-1 text-xs rounded-lg bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors">2</button>
                <button className="px-3 py-1 text-xs rounded-lg bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors">3</button>
                <button className="px-3 py-1 text-xs rounded-lg bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors">{t.table.pagination.next}</button>
             </div>
          </div>
        </div>
  
      </div>
    );
  }
  