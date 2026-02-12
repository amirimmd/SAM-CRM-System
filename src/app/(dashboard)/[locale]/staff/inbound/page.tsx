'use client';

import { useState } from 'react';
import { usePathname, useParams } from 'next/navigation';
import { 
  Camera, 
  Keyboard, 
  PackageSearch, 
  Calculator,
  Save,
  AlertCircle,
  X,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function InboundPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'fa';
  const isRtl = locale === 'fa';

  const [scanMode, setScanMode] = useState<'manual' | 'camera'>('manual');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [scannedCode, setScannedCode] = useState('');

  // Form State
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  // Auto-calculate CBM
  const l = parseFloat(length) || 0;
  const w = parseFloat(width) || 0;
  const h = parseFloat(height) || 0;
  const kg = parseFloat(weight) || 0;
  
  const calculatedCbm = (l * w * h) / 1000000;
  const chargeableCbm = calculatedCbm > 0 && calculatedCbm < 1 ? 1 : calculatedCbm; // حداقل 1 CBM
  
  // هشدار اضافه وزن (هر CBM مکس ۱۰۰۰ کیلو)
  const isOverweight = kg > (chargeableCbm * 1000) && chargeableCbm > 0;

  const handleSimulateScan = () => {
    setIsCameraActive(false);
    setScanMode('manual');
    setScannedCode('SAM-25-' + Math.floor(Math.random() * 9000 + 1000));
  };

  const t = {
    fa: {
      title: 'ورود کالا به انبار',
      subtitle: 'ثبت محموله جدید با اسکنر یا دستی',
      modes: { manual: 'ورود دستی', camera: 'اسکن با دوربین' },
      camera: {
        open: 'دوربین را به سمت بارکد کارتن بگیرید',
        simulate: 'شبیه‌سازی اسکن موفق',
        close: 'بستن دوربین'
      },
      form: {
        tracking: 'کد رهگیری / بارنامه',
        dims: 'ابعاد کارتن (سانتیمتر)',
        l: 'طول', w: 'عرض', h: 'ارتفاع',
        weight: 'وزن خالص (کیلوگرم)',
        cargoType: 'دسته‌بندی کالا',
        types: ['تیپ ۱ (معمولی)', 'تیپ ۲ (برند دار)', 'تیپ ۳ (باتری دار)', 'تیپ ۴ (کالای خاص)']
      },
      calc: {
        title: 'محاسبات سیستم',
        cbm: 'حجم (CBM)',
        chargeable: 'حجم قابل محاسبه (حداقل ۱)',
        overweight: 'هشدار: وزن محموله نسبت به حجم آن بیش از حد مجاز (۱۰۰۰ کیلوگرم بر CBM) است. فرمول محاسبه تغییر خواهد کرد.'
      },
      btn: 'ثبت و تولید لیبل'
    },
    en: {
      title: 'Inbound Cargo',
      subtitle: 'Register new shipment via scanner or manually',
      modes: { manual: 'Manual Entry', camera: 'Camera Scan' },
      camera: {
        open: 'Point camera at the carton barcode',
        simulate: 'Simulate Scan',
        close: 'Close Camera'
      },
      form: {
        tracking: 'Tracking ID',
        dims: 'Dimensions (cm)',
        l: 'Length', w: 'Width', h: 'Height',
        weight: 'Gross Weight (kg)',
        cargoType: 'Cargo Category',
        types: ['Tier 1 (Normal)', 'Tier 2 (Branded)', 'Tier 3 (Battery)', 'Tier 4 (Special)']
      },
      calc: {
        title: 'System Calculations',
        cbm: 'Volume (CBM)',
        chargeable: 'Chargeable CBM (Min 1)',
        overweight: 'Warning: Cargo weight exceeds the maximum allowed limit (1000kg per CBM). Pricing formula will adjust.'
      },
      btn: 'Register & Print Label'
    }
  };

  const text = isRtl ? t.fa : t.en;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 font-vazirmatn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2 flex items-center gap-3">
             <PackageSearch className="text-emerald-500" />
             {text.title}
          </h1>
          <p className="text-zinc-400 text-sm">{text.subtitle}</p>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex bg-zinc-900 p-1.5 rounded-2xl w-full md:w-fit border border-white/5">
         <button 
           onClick={() => setScanMode('manual')}
           className={cn("flex-1 md:w-40 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all", scanMode === 'manual' ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500")}
         >
            <Keyboard size={18} /> {text.modes.manual}
         </button>
         <button 
           onClick={() => { setScanMode('camera'); setIsCameraActive(true); }}
           className={cn("flex-1 md:w-40 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all", scanMode === 'camera' ? "bg-emerald-600 text-white shadow-sm" : "text-zinc-500")}
         >
            <Camera size={18} /> {text.modes.camera}
         </button>
      </div>

      {/* 📷 Camera Scanner Modal / Viewfinder */}
      {isCameraActive && (
         <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
            {/* Camera Viewfinder UI (Simulated) */}
            <div className="relative w-full max-w-sm aspect-[3/4] bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col items-center justify-center">
               
               {/* Scanner Overlay */}
               <div className="absolute inset-0 bg-black/50" />
               <div className="relative z-10 w-64 h-64 border-2 border-emerald-500 rounded-xl relative">
                  {/* Scanning Laser Line */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_15px_#10b981] animate-[scan_2s_ease-in-out_infinite]" />
                  
                  {/* Corner Accents */}
                  <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-emerald-500 rounded-tl-xl" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-emerald-500 rounded-tr-xl" />
                  <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-emerald-500 rounded-bl-xl" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-emerald-500 rounded-br-xl" />
               </div>

               <p className="relative z-10 text-white text-sm font-bold mt-8">{text.camera.open}</p>
               
               {/* Mock Button to simulate a successful scan */}
               <button 
                 onClick={handleSimulateScan}
                 className="relative z-10 mt-8 px-6 py-3 bg-emerald-500 text-black font-bold rounded-xl animate-pulse"
               >
                  {text.camera.simulate}
               </button>

            </div>

            <button 
              onClick={() => { setIsCameraActive(false); setScanMode('manual'); }}
              className="mt-8 flex items-center gap-2 text-zinc-400 hover:text-white"
            >
               <X size={20} /> {text.camera.close}
            </button>
         </div>
      )}

      {/* Main Entry Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8">
               
               {/* Tracking ID */}
               <div className="mb-6">
                  <label className="block text-xs font-bold text-zinc-400 mb-2 px-1">{text.form.tracking}</label>
                  <input 
                    type="text" 
                    value={scannedCode}
                    onChange={(e) => setScannedCode(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl h-14 px-4 text-white font-mono text-lg focus:outline-none focus:border-emerald-500/50 transition-colors"
                    placeholder="e.g. SAM-2025-..."
                    dir="ltr"
                  />
               </div>

               {/* Dimensions */}
               <div className="mb-6">
                  <label className="block text-xs font-bold text-zinc-400 mb-2 px-1">{text.form.dims}</label>
                  <div className="grid grid-cols-3 gap-4">
                     <div className="relative">
                        <input type="number" value={length} onChange={e=>setLength(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl h-12 px-4 text-white font-mono focus:border-emerald-500/50 outline-none" placeholder={text.form.l} dir="ltr" />
                        <span className="absolute top-1/2 -translate-y-1/2 right-4 text-xs text-zinc-600">L</span>
                     </div>
                     <div className="relative">
                        <input type="number" value={width} onChange={e=>setWidth(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl h-12 px-4 text-white font-mono focus:border-emerald-500/50 outline-none" placeholder={text.form.w} dir="ltr" />
                        <span className="absolute top-1/2 -translate-y-1/2 right-4 text-xs text-zinc-600">W</span>
                     </div>
                     <div className="relative">
                        <input type="number" value={height} onChange={e=>setHeight(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl h-12 px-4 text-white font-mono focus:border-emerald-500/50 outline-none" placeholder={text.form.h} dir="ltr" />
                        <span className="absolute top-1/2 -translate-y-1/2 right-4 text-xs text-zinc-600">H</span>
                     </div>
                  </div>
               </div>

               {/* Weight & Type */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                     <label className="block text-xs font-bold text-zinc-400 mb-2 px-1">{text.form.weight}</label>
                     <div className="relative">
                        <input type="number" value={weight} onChange={e=>setWeight(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl h-12 pl-4 pr-10 text-white font-mono focus:border-emerald-500/50 outline-none" placeholder="0.00" dir="ltr" />
                        <span className="absolute top-1/2 -translate-y-1/2 right-4 text-xs text-zinc-500">KG</span>
                     </div>
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-zinc-400 mb-2 px-1">{text.form.cargoType}</label>
                     <select className={cn("w-full bg-black/40 border border-white/10 rounded-xl h-12 px-4 text-white text-sm focus:border-emerald-500/50 outline-none appearance-none cursor-pointer", isRtl ? "text-right" : "text-left")}>
                        {text.form.types.map((opt, i) => <option key={i} value={i} className="bg-zinc-900">{opt}</option>)}
                     </select>
                  </div>
               </div>

            </div>
         </div>

         {/* Sidebar Calculator */}
         <div className="space-y-6">
            <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-3xl p-6 md:p-8 relative overflow-hidden">
               
               <div className="absolute top-0 right-0 p-16 bg-emerald-500/5 rounded-full blur-3xl" />
               
               <h3 className="font-bold text-emerald-500 text-lg mb-6 flex items-center gap-2">
                  <Calculator size={20} />
                  {text.calc.title}
               </h3>

               <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                     <span className="text-zinc-400 text-sm">{text.calc.cbm}</span>
                     <span className="text-white font-mono font-bold">{calculatedCbm.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                     <span className="text-zinc-400 text-sm">{text.calc.chargeable}</span>
                     <span className="text-emerald-400 font-mono font-black text-xl">{chargeableCbm.toFixed(3)}</span>
                  </div>
               </div>

               {/* Overweight Warning */}
               {isOverweight && (
                  <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 animate-in slide-in-from-top-2">
                     <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                     <p className="text-[11px] text-red-200/80 leading-relaxed">
                        {text.calc.overweight}
                     </p>
                  </div>
               )}

               <button className="w-full mt-8 flex items-center justify-center gap-2 bg-emerald-600 text-white h-14 rounded-2xl font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20 active:scale-95 disabled:opacity-50">
                  <Save size={20} />
                  {text.btn}
               </button>

            </div>
         </div>

      </div>

      {/* Animation Styles specifically for the scanner */}
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
