'use client';

import { useState, useEffect, useRef } from 'react';
import { Package, UserCheck, MessageSquare, AlertTriangle, Clock, ScanBarcode, X, Camera, CheckCircle2, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

// --- کامپوننت واقعی اسکنر دوربین ---
function ScannerModal({ onClose, onScan, t, isRtl }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState('');
  const [manualCode, setManualCode] = useState('');

  useEffect(() => {
    let stream: MediaStream | null = null;
    let scanInterval: any;

    const startScanner = async () => {
      try {
        // ۱. درخواست دسترسی به دوربین پشت گوشی
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute('playsinline', 'true'); // ضروری برای iOS
          videoRef.current.play();
        }

        // ۲. استفاده از API بومی مرورگر برای پردازش تصویر
        // @ts-ignore
        if ('BarcodeDetector' in window) {
          // @ts-ignore
          const detector = new window.BarcodeDetector();
          scanInterval = setInterval(async () => {
            if (videoRef.current && videoRef.current.readyState === 4) {
              try {
                const barcodes = await detector.detect(videoRef.current);
                if (barcodes.length > 0) {
                  onScan(barcodes[0].rawValue);
                }
              } catch (e) {
                // نادیده گرفتن خطاهای فریم‌های تار
              }
            }
          }, 500);
        } else {
          setError(t.notSupported);
        }
      } catch (err) {
        setError(t.noAccess);
      }
    };

    startScanner();

    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
      if (scanInterval) clearInterval(scanInterval);
    };
  }, [onScan, t]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm flex flex-col items-center">
        
        <div className="flex justify-between items-center w-full mb-6">
           <h3 className="text-white font-bold flex items-center gap-2">
             <Camera size={20} className="text-emerald-500" />
             {t.title}
           </h3>
           <button onClick={onClose} className="p-2 bg-white/10 rounded-full text-zinc-400 hover:text-white">
              <X size={20} />
           </button>
        </div>

        {/* ناحیه دوربین */}
        <div className="relative w-full aspect-[3/4] bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
           <video 
             ref={videoRef} 
             className="absolute inset-0 w-full h-full object-cover"
           />
           {/* لایه اسکن (گرافیک لیزر) */}
           <div className="absolute inset-0 bg-black/40" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-emerald-500 rounded-2xl">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_15px_#10b981] animate-[scan_2s_ease-in-out_infinite]" />
           </div>

           {error && (
             <div className="absolute inset-0 bg-zinc-900/90 flex items-center justify-center p-6 text-center z-20">
                <div>
                   <AlertTriangle className="text-yellow-500 mx-auto mb-3" size={32} />
                   <p className="text-sm text-zinc-300 mb-4">{error}</p>
                   {/* ورود دستی به عنوان بک‌آپ */}
                   <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={manualCode}
                        onChange={(e) => setManualCode(e.target.value)}
                        placeholder="SAM-XXXX"
                        className="h-10 bg-black border border-white/10 rounded-lg px-3 text-white text-sm w-full text-center"
                      />
                      <button onClick={() => onScan(manualCode)} className="px-4 bg-emerald-600 text-black font-bold rounded-lg text-sm">OK</button>
                   </div>
                </div>
             </div>
           )}
        </div>
        
        <p className="mt-6 text-zinc-400 text-sm">{t.instruction}</p>

      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
    </div>
  );
}

// --- داشبورد اصلی ---
export default function StaffDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || 'fa';
  const isRtl = locale === 'fa';

  const [isScanning, setIsScanning] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // تولید ساعت زنده
  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString(locale === 'fa' ? 'fa-IR' : 'en-US', { hour: '2-digit', minute: '2-digit' }));
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString(locale === 'fa' ? 'fa-IR' : 'en-US', { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(timer);
  }, [locale]);

  const texts = {
    fa: {
      title: 'میز کار شما',
      desc: 'خلاصه وضعیت عملیات انبار و کارهای در انتظار انجام',
      scanBtn: 'اسکن سریع دوربین',
      stats: { pending: 'بارهای منتظر تخصیص', kyc: 'تایید هویت‌های جدید', tickets: 'پیام‌های خوانده نشده' },
      tasksTitle: 'کارهای فوری امروز',
      tasksEmpty: 'تمام کارهای امروز انجام شده است. عالی بود! 🎉',
      tasksList: [
        { id: 1, title: 'تایید بارنامه مشتری (کد ملی نامعتبر)', desc: 'شرکت بازرگانی پارس • شناسه: SAM-1042', action: 'بررسی مدارک' },
        { id: 2, title: 'تکمیل ظرفیت کانتینر TEU-40 (گوانگجو)', desc: 'نیاز به تخصیص ۳ CBM بار دیگر', action: 'تخصیص بار' }
      ],
      recent: 'بارهای اخیراً ثبت شده',
      cargoType: 'تیپ',
      camera: {
        title: 'اسکنر بارکد بومی',
        instruction: 'دوربین را روی بارکد روی کارتن قرار دهید',
        notSupported: 'مرورگر شما از Barcode API بومی پشتیبانی نمی‌کند. لطفا کد را دستی وارد کنید.',
        noAccess: 'دسترسی به دوربین داده نشد. لطفا دسترسی را در تنظیمات مرورگر فعال کنید.'
      }
    },
    en: {
      title: 'Your Workspace',
      desc: 'Overview of warehouse operations and pending tasks',
      scanBtn: 'Quick Camera Scan',
      stats: { pending: 'Pending Shipments', kyc: 'Pending KYC Approvals', tickets: 'Unread Messages' },
      tasksTitle: 'Urgent Tasks Today',
      tasksEmpty: 'All tasks completed for today. Great job! 🎉',
      tasksList: [
        { id: 1, title: 'Customer BOL Approval (Invalid ID)', desc: 'Pars Trading Co. • ID: SAM-1042', action: 'Review Docs' },
        { id: 2, title: 'Fill TEU-40 Container Capacity (GZ)', desc: 'Needs 3 CBM more cargo allocated', action: 'Assign Cargo' }
      ],
      recent: 'Recently Logged Cargo',
      cargoType: 'Tier',
      camera: {
        title: 'Native Barcode Scanner',
        instruction: 'Point the camera at the carton barcode',
        notSupported: 'Your browser does not support Native Barcode API. Please enter code manually.',
        noAccess: 'Camera access denied. Please enable it in browser settings.'
      }
    }
  };

  const t = isRtl ? texts.fa : texts.en;

  // وضعیت لیست کارها (قابل انجام)
  const [tasks, setTasks] = useState(t.tasksList);

  const handleCompleteTask = (id: number) => {
     setTasks(tasks.filter(task => task.id !== id));
  };

  const handleScanSuccess = (code: string) => {
     setIsScanning(false);
     // انتقال کاربر به صفحه ورود کالا و پر کردن اتوماتیک کد در آدرس
     router.push(`/${locale}/staff/inbound?code=${code}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-vazirmatn pb-20">
      
      {/* 📷 Modal اسکنر واقعی */}
      {isScanning && (
        <ScannerModal 
          onClose={() => setIsScanning(false)}
          onScan={handleScanSuccess}
          t={t.camera}
          isRtl={isRtl}
        />
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <h1 className="text-2xl md:text-3xl font-black text-white">{t.title}</h1>
             <span className="bg-white/5 text-zinc-400 px-3 py-1 rounded-full text-xs font-mono border border-white/10">{currentTime}</span>
          </div>
          <p className="text-zinc-400 text-sm">{t.desc}</p>
        </div>
        <button 
          onClick={() => setIsScanning(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all active:scale-95 w-full md:w-auto shrink-0 group"
        >
          <Camera size={20} className="group-hover:scale-110 transition-transform" />
          {t.scanBtn}
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-[#0a0a0a] border border-white/5 p-5 md:p-6 rounded-3xl flex items-center gap-4 hover:border-emerald-500/30 transition-all group shadow-lg">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-blue-500/10 text-blue-500 shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-all">
            <Package size={24} />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-1">18</h3>
            <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase">{t.stats.pending}</p>
          </div>
        </div>
        <div className="bg-[#0a0a0a] border border-white/5 p-5 md:p-6 rounded-3xl flex items-center gap-4 hover:border-emerald-500/30 transition-all group shadow-lg">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-yellow-500/10 text-yellow-500 shrink-0 group-hover:bg-yellow-500 group-hover:text-white transition-all">
            <UserCheck size={24} />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-1">5</h3>
            <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase">{t.stats.kyc}</p>
          </div>
        </div>
        <div className="bg-[#0a0a0a] border border-white/5 p-5 md:p-6 rounded-3xl flex items-center gap-4 hover:border-emerald-500/30 transition-all group sm:col-span-2 md:col-span-1 shadow-lg">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-purple-500/10 text-purple-500 shrink-0 group-hover:bg-purple-500 group-hover:text-white transition-all">
            <MessageSquare size={24} />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-1">12</h3>
            <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase">{t.stats.tickets}</p>
          </div>
        </div>
      </div>

      {/* Urgent Tasks & Recent Scans */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        
        {/* Dynamic Urgent Tasks */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col h-full shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-[80px] pointer-events-none" />
          
          <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2 relative z-10">
            <AlertTriangle className="text-yellow-500" size={20} />
            {t.tasksTitle}
            <span className="bg-white/10 px-2 py-0.5 rounded text-xs ml-auto mr-auto">{tasks.length}</span>
          </h3>
          
          <div className="space-y-4 flex-1 relative z-10">
            {tasks.length === 0 ? (
               <div className="h-full min-h-[150px] flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-white/5 rounded-3xl">
                  <CheckCircle2 size={40} className="text-emerald-500/50 mb-3" />
                  <p className="text-zinc-400 text-sm">{t.tasksEmpty}</p>
               </div>
            ) : (
               tasks.map((task, idx) => (
                 <div key={task.id} className="p-4 rounded-2xl bg-zinc-900 border border-white/5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between group hover:bg-zinc-800 transition-all">
                   <div>
                      <div className="font-bold text-white text-sm mb-1">{task.title}</div>
                      <div className="text-[11px] md:text-xs text-zinc-500">{task.desc}</div>
                   </div>
                   <div className="flex gap-2 w-full sm:w-auto shrink-0">
                     <button className="flex-1 sm:flex-none text-xs font-bold bg-white/5 text-white hover:bg-white/10 px-4 py-2.5 rounded-xl transition-colors border border-white/5">
                        {task.action}
                     </button>
                     <button 
                       onClick={() => handleCompleteTask(task.id)}
                       title="Mark as done"
                       className="p-2.5 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-black rounded-xl transition-colors"
                     >
                        <Check size={16} />
                     </button>
                   </div>
                 </div>
               ))
            )}
          </div>
        </div>

        {/* Recent Inbound */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col h-full shadow-2xl">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-white text-lg">{t.recent}</h3>
             <Link href={`/${locale}/staff/inbound`} className="text-emerald-500 text-xs flex items-center gap-1 hover:underline">
               View All {isRtl ? <ChevronLeft size={14}/> : <ChevronRight size={14}/>}
             </Link>
          </div>

          <div className="space-y-3 flex-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 md:gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 shrink-0 group-hover:text-emerald-500 group-hover:border-emerald-500/30 transition-all">
                  <Package size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-sm truncate">SAM-25-104{i}</div>
                  <div className="text-[10px] md:text-xs text-zinc-500 truncate mt-0.5">2.5 CBM • 450 Kg • {t.cargoType} ۲</div>
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
