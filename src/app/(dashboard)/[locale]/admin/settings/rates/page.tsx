import { Save, RefreshCw, DollarSign, AlertCircle, Layers } from 'lucide-react';

export default async function RatesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isRtl = locale === 'fa';

  const rateTiers = [
    {
      id: 1,
      title: 'تیپ ۱: کالای معمولی',
      enTitle: 'Normal Cargo',
      desc: 'شامل بردهای الکترونیکی، قطعات صنعتی سبک، قطعات پلاستیکی (بدون برند/باتری)',
      defaultVal: 750,
      color: 'border-blue-500/30'
    },
    {
      id: 2,
      title: 'تیپ ۲: کالای برند',
      enTitle: 'Branded Goods',
      desc: 'لوازم کامپیوتر، صوتی تصویری، قطعات خودرو، کیف و کفش (با جعبه و دیزاین)',
      defaultVal: 1150,
      color: 'border-purple-500/30'
    },
    {
      id: 3,
      title: 'تیپ ۳: باتری‌دار',
      enTitle: 'Battery / Electronics',
      desc: 'اسکوتر، اسپیکر شارژی، پاوربانک و تمام کالاهای دارای باتری لیتیومی',
      defaultVal: 1400,
      color: 'border-yellow-500/30'
    },
    {
      id: 4,
      title: 'تیپ ۴: کالای خاص',
      enTitle: 'Special Cargo',
      desc: 'موتورسیکلت، قطعات سنگین و بارهای داخل پالت چوبی، کالای حجیم',
      defaultVal: 2350,
      color: 'border-red-500/30'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">
            {isRtl ? 'موتور قیمت‌گذاری' : 'Pricing Engine'}
          </h1>
          <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
            {isRtl 
              ? 'تغییر در این نرخ‌ها مستقیماً بر روی محاسبه‌گر خودکار سایت و پیش‌فاکتورهای صادر شده تاثیر می‌گذارد.' 
              : 'Changes here directly affect the automatic calculator and issued proformas.'}
          </p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20 active:scale-95 group">
          <Save size={20} className="group-hover:scale-110 transition-transform" />
          {isRtl ? 'ذخیره و اعمال تغییرات' : 'Save & Apply'}
        </button>
      </div>

      {/* Rate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rateTiers.map((tier) => (
          <div key={tier.id} className={`bg-[#0a0a0a] border ${tier.color} p-8 rounded-3xl group hover:bg-zinc-900/30 transition-all duration-300 relative overflow-hidden`}>
            
            {/* Background Icon Decoration */}
            <div className="absolute -right-6 -top-6 text-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <Layers size={100} />
            </div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                   <h3 className="text-xl font-bold text-white mb-1">{tier.title}</h3>
                   <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{tier.enTitle}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 border border-white/5">
                   <span className="font-bold font-mono text-lg">{tier.id}</span>
                </div>
              </div>
              
              <p className="text-sm text-zinc-400 mb-8 h-10 leading-relaxed opacity-80">{tier.desc}</p>
              
              <div className="relative group/input">
                <DollarSign size={20} className="absolute top-1/2 -translate-y-1/2 right-4 text-zinc-500 group-focus-within/input:text-yellow-500 transition-colors" />
                <input 
                  type="number" 
                  defaultValue={tier.defaultVal}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl h-16 pr-12 pl-16 text-white font-mono text-2xl font-bold focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/20 transition-all placeholder:text-zinc-700"
                />
                <span className="absolute top-1/2 -translate-y-1/2 left-6 text-xs font-bold text-zinc-500 bg-white/5 px-2 py-1 rounded-md">RMB / CBM</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Alert */}
      <div className="bg-yellow-500/5 border border-yellow-500/10 p-6 rounded-3xl flex items-start gap-4">
        <div className="p-3 bg-yellow-500/10 rounded-xl text-yellow-500 shrink-0">
           <AlertCircle size={24} />
        </div>
        <div>
          <h4 className="font-bold text-yellow-500 text-base mb-2">قوانین اعمال تغییرات</h4>
          <p className="text-sm text-yellow-500/70 leading-relaxed">
            ۱. نرخ‌های جدید بلافاصله برای بارهای "ثبت شده جدید" اعمال می‌شوند. <br/>
            ۲. بارهایی که در وضعیت "پیش‌نویس" هستند با نرخ روز محاسبه مجدد می‌شوند. <br/>
            ۳. بارهایی که فاکتور نهایی برای آن‌ها صادر شده است، **بدون تغییر** باقی می‌مانند.
          </p>
        </div>
      </div>

    </div>
  );
}
