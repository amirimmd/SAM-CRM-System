import { Mail, MapPin, Phone, Send, Clock, Building2, Globe2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isRtl = locale === 'fa';

  const texts = {
    fa: {
      header: {
        badge: "پشتیبانی ۲۴/۷",
        title: "تماس با ما",
        subtitle: "ارتباط مستقیم با کارشناسان",
        desc: "تیم متخصص سام لجستیک در دفاتر چین و ایران، آماده پاسخگویی به سوالات شما و ارائه مشاوره تخصصی در زمینه حمل و نقل بین‌المللی است.",
      },
      form: {
        title: "ارسال پیام آنلاین",
        name: "نام و نام خانوادگی",
        email: "آدرس ایمیل",
        subject: "موضوع پیام",
        message: "متن پیام شما...",
        btn: "ارسال پیام",
        placeholder_name: "مثال: علی محمدی",
        placeholder_email: "name@example.com",
        placeholder_subject: "مثال: استعلام قیمت کانتینر",
      },
      info: {
        china: {
          badge: "دفتر مرکزی",
          country: "چین",
          city: "گوانگجو",
          address: "منطقه تیانه، خیابان تجاری بین‌المللی، برج سام لجستیک، طبقه ۲۴",
        },
        iran: {
          badge: "دفتر نمایندگی",
          country: "ایران",
          city: "تهران",
          address: "خیابان ولیعصر، بالاتر از پارک ساعی، برج نگین، واحد ۴۰۲",
        },
        contact: {
          title: "اطلاعات تماس",
          email: "ایمیل سازمانی",
          work_hours: "ساعات کاری",
          hours_val: "شنبه تا پنج‌شنبه: ۹ صبح تا ۶ عصر"
        }
      }
    },
    en: {
      header: {
        badge: "24/7 Support",
        title: "Contact Us",
        subtitle: "Get in Touch with Experts",
        desc: "SAM Logistics expert team in China and Iran offices is ready to answer your questions and provide professional consultation on international shipping.",
      },
      form: {
        title: "Send Online Message",
        name: "Full Name",
        email: "Email Address",
        subject: "Subject",
        message: "Your message...",
        btn: "Send Message",
        placeholder_name: "e.g. John Doe",
        placeholder_email: "name@example.com",
        placeholder_subject: "e.g. Container Rate Inquiry",
      },
      info: {
        china: {
          badge: "Headquarters",
          country: "China",
          city: "Guangzhou",
          address: "24th Floor, SAM Logistics Tower, Int'l Trade St, Tianhe District",
        },
        iran: {
          badge: "Representative",
          country: "Iran",
          city: "Tehran",
          address: "Unit 402, Negin Tower, Above Saei Park, Valiasr St",
        },
        contact: {
          title: "Contact Info",
          email: "Corporate Email",
          work_hours: "Working Hours",
          hours_val: "Mon - Sat: 9:00 AM - 6:00 PM"
        }
      }
    }
  };

  const t = isRtl ? texts.fa : texts.en;

  return (
    <div className="min-h-screen bg-black text-white font-vazirmatn pt-24 pb-20">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[100px]" />
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-yellow-500 text-xs font-bold mb-6 backdrop-blur-sm">
             <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
             {t.header.badge}
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
             {t.header.title}
          </h1>
          <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500 font-bold mb-6">
             {t.header.subtitle}
          </p>
          <p className="text-zinc-400 leading-relaxed">
             {t.header.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info Cards (Left Side) */}
          <div className="space-y-6 lg:col-span-1">
             
             {/* China Office */}
             <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-yellow-500/30 transition-colors group">
                <div className="flex items-start justify-between mb-4">
                   <div className="p-3 rounded-2xl bg-yellow-500/10 text-yellow-500 group-hover:bg-yellow-500 group-hover:text-black transition-all">
                      <Building2 size={24} />
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 border border-white/5 px-2 py-1 rounded-lg">
                      {t.info.china.badge}
                   </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{t.info.china.city}، {t.info.china.country}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                   {t.info.china.address}
                </p>
                <div className="flex items-center gap-2 text-zinc-300 font-mono text-sm">
                   <Phone size={14} className="text-yellow-500" />
                   <span dir="ltr">+86 123 4567 8900</span>
                </div>
             </div>

             {/* Iran Office */}
             <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-blue-500/30 transition-colors group">
                <div className="flex items-start justify-between mb-4">
                   <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                      <Globe2 size={24} />
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 border border-white/5 px-2 py-1 rounded-lg">
                      {t.info.iran.badge}
                   </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{t.info.iran.city}، {t.info.iran.country}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                   {t.info.iran.address}
                </p>
                <div className="flex items-center gap-2 text-zinc-300 font-mono text-sm">
                   <Phone size={14} className="text-blue-500" />
                   <span dir="ltr">021 8888 9999</span>
                </div>
             </div>

             {/* General Info */}
             <div className="p-6 rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/5">
                <h3 className="font-bold text-white mb-4">{t.info.contact.title}</h3>
                <ul className="space-y-4">
                   <li className="flex items-center gap-3">
                      <Mail size={18} className="text-zinc-500" />
                      <div className="flex flex-col">
                         <span className="text-xs text-zinc-500">{t.info.contact.email}</span>
                         <span className="text-sm text-zinc-300 font-mono">info@sam-logistics.com</span>
                      </div>
                   </li>
                   <li className="flex items-center gap-3">
                      <Clock size={18} className="text-zinc-500" />
                      <div className="flex flex-col">
                         <span className="text-xs text-zinc-500">{t.info.contact.work_hours}</span>
                         <span className="text-sm text-zinc-300">{t.info.contact.hours_val}</span>
                      </div>
                   </li>
                </ul>
             </div>

          </div>

          {/* Contact Form (Right Side - Bigger) */}
          <div className="lg:col-span-2">
             <div className="h-full p-8 md:p-10 rounded-[2.5rem] bg-zinc-900/30 backdrop-blur-md border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-20" />
                
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                   <Send className="text-yellow-500" />
                   {t.form.title}
                </h2>

                <form className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-zinc-400 px-1">{t.form.name}</label>
                         <input 
                           type="text" 
                           placeholder={t.form.placeholder_name}
                           className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-yellow-500/50 transition-colors"
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-zinc-400 px-1">{t.form.email}</label>
                         <input 
                           type="email" 
                           placeholder={t.form.placeholder_email}
                           className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-yellow-500/50 transition-colors dir-ltr"
                         />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-400 px-1">{t.form.subject}</label>
                      <input 
                        type="text" 
                        placeholder={t.form.placeholder_subject}
                        className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-yellow-500/50 transition-colors"
                      />
                   </div>

                   <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-400 px-1">{t.form.message}</label>
                      <textarea 
                        rows={6}
                        placeholder={t.form.message}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-yellow-500/50 transition-colors resize-none"
                      />
                   </div>

                   <button className="w-full h-14 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold text-lg rounded-xl hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all active:scale-[0.99] mt-4">
                      {t.form.btn}
                   </button>
                </form>

             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
