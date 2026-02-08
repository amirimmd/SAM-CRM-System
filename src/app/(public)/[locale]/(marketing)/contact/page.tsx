'use client';

import { Mail, MapPin, Phone, Clock, Send, Globe2 } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  const isRtl = true; // Hardcoded for demo, ensuring Persian layout
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  return (
    <div className="relative flex flex-col items-center w-full min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4 font-vazirmatn overflow-hidden">
      
      {/* Background FX */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 px-4 py-1.5 backdrop-blur-md mb-6">
             <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
             <span className="text-xs font-bold tracking-widest text-yellow-500 uppercase">
                ارتباط مستقیم
             </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
               شبکه جهانی ما
            </span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
             با دفاتر ما در گوانجو، دبی و ایران در تماس باشید. تیم پشتیبانی سام لجستیک آماده پاسخگویی به نیازهای تجاری شماست.
          </p>
        </div>

        {/* Office Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20" dir="rtl">
           
           {/* Guangzhou Office */}
           <OfficeCard 
             title="دفتر مرکزی چین (گوانجو)"
             company="SAM Guangzhou Trading"
             address="No 55. Bin bin electronic new city, Liwan Lu, Guangzhou, China"
             phone="+86 136 1027 1731"
             icon={<Globe2 className="text-blue-500" />}
             gradient="from-blue-500/10 to-transparent"
           />

           {/* Dubai Office */}
           <OfficeCard 
             title="دفتر دبی (امارات)"
             company="SAWAT ALMASAR Trading Co. L.L.C"
             address="Dubai, UAE (Office Address)"
             phone="+971 50 103 4008"
             icon={<MapPin className="text-yellow-500" />}
             gradient="from-yellow-500/10 to-transparent"
             isMain
           />

           {/* Iran Office */}
           <OfficeCard 
             title="دفتر ایران"
             company="تجارت خلیج فارس الکترونیک"
             address="تهران، ایران"
             phone="+98 912 195 5663"
             icon={<Phone className="text-green-500" />}
             gradient="from-green-500/10 to-transparent"
           />

        </div>

        {/* Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start" dir="rtl">
           
           {/* Contact Info */}
           <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white">پیام به مدیریت</h2>
              <p className="text-zinc-400 leading-relaxed">
                 برای استعلام قیمت، مشاوره واردات یا پیگیری سفارشات خاص، می‌توانید از طریق فرم روبرو با ما در ارتباط باشید. کارشناسان ما در سریع‌ترین زمان ممکن پاسخگوی شما خواهند بود.
              </p>
              
              <div className="space-y-6">
                 <div className="flex items-center gap-4 text-zinc-300">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-yellow-500">
                       <Clock size={20} />
                    </div>
                    <div>
                       <span className="block text-sm text-zinc-500">ساعات کاری</span>
                       <span className="font-bold">شنبه تا چهارشنبه: ۹ صبح تا ۵ عصر</span>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-4 text-zinc-300">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-yellow-500">
                       <Mail size={20} />
                    </div>
                    <div>
                       <span className="block text-sm text-zinc-500">ایمیل سازمانی</span>
                       <span className="font-bold dir-ltr">info@saminto.com</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Form */}
           <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-blue-500/20 blur-3xl opacity-20 -z-10" />
              
              <form onSubmit={handleSubmit} className="bg-zinc-900/50 border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                       <label className="text-sm font-medium text-zinc-400">نام و نام خانوادگی</label>
                       <input type="text" className="w-full h-12 bg-black/50 border border-white/10 rounded-xl px-4 text-white focus:border-yellow-500/50 focus:outline-none transition-colors" placeholder="مثلا: علی محمدی" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-medium text-zinc-400">شماره تماس</label>
                       <input type="text" className="w-full h-12 bg-black/50 border border-white/10 rounded-xl px-4 text-white focus:border-yellow-500/50 focus:outline-none transition-colors" placeholder="مثلا: 0912..." dir="ltr" />
                    </div>
                 </div>
                 
                 <div className="space-y-2 mb-6">
                    <label className="text-sm font-medium text-zinc-400">موضوع پیام</label>
                    <select className="w-full h-12 bg-black/50 border border-white/10 rounded-xl px-4 text-white focus:border-yellow-500/50 focus:outline-none transition-colors">
                       <option>استعلام قیمت حمل</option>
                       <option>مشاوره واردات</option>
                       <option>پیگیری سفارش</option>
                       <option>سایر موارد</option>
                    </select>
                 </div>

                 <div className="space-y-2 mb-8">
                    <label className="text-sm font-medium text-zinc-400">متن پیام</label>
                    <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-yellow-500/50 focus:outline-none transition-colors resize-none" placeholder="توضیحات خود را بنویسید..." />
                 </div>

                 <button 
                   type="submit" 
                   disabled={formStatus === 'submitting' || formStatus === 'success'}
                   className={`w-full h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300
                     ${formStatus === 'success' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black hover:bg-yellow-400'}
                   `}
                 >
                    {formStatus === 'submitting' ? (
                       <span className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full" />
                    ) : formStatus === 'success' ? (
                       'پیام ارسال شد ✓'
                    ) : (
                       <>ارسال پیام <Send size={18} /></>
                    )}
                 </button>
              </form>
           </div>

        </div>

      </div>
    </div>
  );
}

function OfficeCard({ title, company, address, phone, icon, gradient, isMain }: any) {
  return (
    <div className={`relative group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 p-8 transition-all duration-500 hover:border-white/20 ${isMain ? 'shadow-[0_0_50px_-12px_rgba(234,179,8,0.2)] border-yellow-500/20' : ''}`}>
       <div className={`absolute inset-0 bg-gradient-to-b ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
       
       <div className="relative z-10 flex flex-col h-full">
          <div className="w-14 h-14 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center mb-6 text-2xl">
             {icon}
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-yellow-500 text-sm font-medium mb-4">{company}</p>
          
          <div className="mt-auto space-y-4">
             <div className="flex items-start gap-3 text-zinc-400 text-sm">
                <MapPin size={16} className="shrink-0 mt-1" />
                <span className="leading-relaxed">{address}</span>
             </div>
             <div className="flex items-center gap-3 text-white font-mono text-lg bg-white/5 p-3 rounded-xl border border-white/5">
                <Phone size={16} className="text-zinc-500" />
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-yellow-500 transition-colors" dir="ltr">{phone}</a>
             </div>
          </div>
       </div>
    </div>
  );
}
