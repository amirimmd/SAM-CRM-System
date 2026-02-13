'use client';

import { useState, useEffect } from 'react';
import { 
  Calculator, 
  Box, 
  Scale, 
  DollarSign, 
  AlertCircle, 
  Plus, 
  Trash2, 
  RefreshCcw, 
  CheckCircle2,
  Info
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';

// تعریف تیپ‌های قیمتی بر اساس فایل PDF
const RATES = {
  type1: { price: 750, labelFa: 'تیپ ۱: کالای معمولی', labelEn: 'Type 1: Normal Goods', descFa: 'بدون برند، بدون باتری (قطعات پلاستیکی، بردهای سبک...)', descEn: 'No Brand, No Battery (Plastic parts, PCB...)' },
  type2: { price: 1150, labelFa: 'تیپ ۲: کالای برند/دیزاین', labelEn: 'Type 2: Branded/Design', descFa: 'لوازم کامپیوتر، صوتی تصویری، پوشاک، قطعات خودرو', descEn: 'Computer parts, Audio/Video, Clothing, Auto parts' },
  type3: { price: 1400, labelFa: 'تیپ ۳: باتری‌دار/الکترونیک', labelEn: 'Type 3: Battery/Electronics', descFa: 'اسکوتر، اسپیکر شارژی، پاوربانک (باتری لیتیومی)', descEn: 'Scooter, Rechargeable Speaker, Powerbank' },
  type4: { price: 2350, labelFa: 'تیپ ۴: کالای خاص/پالت', labelEn: 'Type 4: Special/Pallet', descFa: 'موتورسیکلت، قطعات سنگین، بارهای پالتی پلمپ', descEn: 'Motorcycle, Heavy parts, Palletized cargo' },
};

type RateType = keyof typeof RATES;

interface CargoItem {
  id: number;
  length: string;
  width: string;
  height: string;
  count: string;
  weight: string;
}

export default function CalculatorPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'fa';
  const isRtl = locale === 'fa';

  // State
  const [cargoType, setCargoType] = useState<RateType>('type1');
  const [items, setItems] = useState<CargoItem[]>([
    { id: 1, length: '', width: '', height: '', count: '1', weight: '' }
  ]);
  const [declaredValue, setDeclaredValue] = useState('');
  const [hasInsurance, setHasInsurance] = useState(true);
  
  // Results State
  const [totalCBM, setTotalCBM] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [chargeableCBM, setChargeableCBM] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [insuranceCost, setInsuranceCost] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [warnings, setWarnings] = useState<string[]>([]);

  // Texts
  const t = {
    fa: {
      title: 'استعلام نرخ حمل بار',
      subtitle: 'محاسبه دقیق هزینه‌ها بر اساس نرخ‌نامه رسمی ۲۰۲۵',
      sections: {
        cargo: 'مشخصات محموله',
        type: 'نوع کالا',
        dims: 'ابعاد و تعداد',
        value: 'ارزش و بیمه'
      },
      fields: {
        l: 'طول (cm)', w: 'عرض (cm)', h: 'ارتفاع (cm)',
        count: 'تعداد', weight: 'وزن کل (kg)',
        value: 'ارزش کل کالا (یوان)',
        insurance: 'بیمه بار (۵٪ ارزش کالا)'
      },
      results: {
        title: 'پیش‌فاکتور تخمینی',
        cbm: 'حجم کل (CBM)',
        weight: 'وزن کل',
        rate: 'نرخ پایه',
        shipping: 'هزینه حمل',
        insurance: 'هزینه بیمه',
        total: 'مبلغ نهایی (یوان)',
        minCbmAlert: 'حداقل حجم محاسباتی ۱ CBM می‌باشد.',
        weightAlert: 'وزن بار نسبت به حجم بیش از حد مجاز (۱۰۰۰ کیلوگرم بر CBM) است.',
        disclaimer: 'این مبلغ صرفاً برآورد اولیه است. فاکتور نهایی پس از باسکول و اندازه‌گیری دقیق در انبار سام صادر می‌شود.'
      },
      actions: {
        add: 'افزودن ردیف',
        reset: 'محاسبه مجدد',
        contact: 'تماس با کارشناسان'
      }
    },
    en: {
      title: 'Shipping Rate Calculator',
      subtitle: 'Accurate cost estimation based on 2025 official rates',
      sections: {
        cargo: 'Cargo Details',
        type: 'Cargo Type',
        dims: 'Dimensions & Qty',
        value: 'Value & Insurance'
      },
      fields: {
        l: 'Length (cm)', w: 'Width (cm)', h: 'Height (cm)',
        count: 'Qty', weight: 'Total Weight (kg)',
        value: 'Total Value (RMB)',
        insurance: 'Cargo Insurance (5%)'
      },
      results: {
        title: 'Estimated Proforma',
        cbm: 'Total Volume (CBM)',
        weight: 'Total Weight',
        rate: 'Base Rate',
        shipping: 'Shipping Cost',
        insurance: 'Insurance Cost',
        total: 'Final Total (RMB)',
        minCbmAlert: 'Minimum chargeable volume is 1 CBM.',
        weightAlert: 'Cargo weight exceeds the standard density limit (1000kg/CBM).',
        disclaimer: 'This is an initial estimate. The final invoice will be issued after precise measurement at SAM warehouse.'
      },
      actions: {
        add: 'Add Item',
        reset: 'Reset',
        contact: 'Contact Experts'
      }
    }
  };

  const text = isRtl ? t.fa : t.en;

  // Logic: Add/Remove Items
  const addItem = () => {
    setItems([...items, { id: Date.now(), length: '', width: '', height: '', count: '1', weight: '' }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: number, field: keyof CargoItem, value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  // Logic: Calculation Effect
  useEffect(() => {
    let cbmSum = 0;
    let weightSum = 0;
    const currentWarnings: string[] = [];

    items.forEach(item => {
      const l = parseFloat(item.length) || 0;
      const w = parseFloat(item.width) || 0;
      const h = parseFloat(item.height) || 0;
      const count = parseFloat(item.count) || 0;
      const weight = parseFloat(item.weight) || 0;

      // CBM = (cm * cm * cm) / 1,000,000 * count
      const itemCbm = (l * w * h) / 1000000 * count;
      cbmSum += itemCbm;
      weightSum += weight; // Assuming weight is total for this row
    });

    setTotalCBM(cbmSum);
    setTotalWeight(weightSum);

    // Rule 1: Min 1 CBM
    let finalCBM = cbmSum;
    if (cbmSum > 0 && cbmSum < 1) {
      finalCBM = 1;
      currentWarnings.push(text.results.minCbmAlert);
    }
    setChargeableCBM(finalCBM);

    // Rule 2: Max 1000kg per CBM
    if (weightSum > finalCBM * 1000 && finalCBM > 0) {
      currentWarnings.push(text.results.weightAlert);
    }
    setWarnings(currentWarnings);

    // Cost Calculation
    const rate = RATES[cargoType].price;
    const shipping = finalCBM * rate;
    setShippingCost(shipping);

    // Insurance: 5% of Value
    let insurance = 0;
    if (hasInsurance) {
      const val = parseFloat(declaredValue) || 0;
      insurance = val * 0.05;
    }
    setInsuranceCost(insurance);

    setFinalTotal(shipping + insurance);

  }, [items, cargoType, declaredValue, hasInsurance, text.results]);

  return (
    <div className="min-h-screen bg-black text-white font-vazirmatn pt-32 pb-20 selection:bg-yellow-500/30">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
         <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px]" />
         <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-12">
           <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-yellow-500 to-yellow-600 text-black mb-6 shadow-[0_0_40px_rgba(234,179,8,0.3)]">
              <Calculator size={32} />
           </div>
           <h1 className="text-3xl md:text-5xl font-black mb-4">{text.title}</h1>
           <p className="text-zinc-400 text-lg">{text.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
           
           {/* FORM SECTION */}
           <div className="lg:col-span-2 space-y-6">
              
              {/* 1. Cargo Type */}
              <div className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-6 md:p-8">
                 <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-black border border-white/5">1</span>
                    {text.sections.type}
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(RATES).map(([key, info]) => (
                       <button
                         key={key}
                         onClick={() => setCargoType(key as RateType)}
                         className={cn(
                           "p-4 rounded-2xl border text-right transition-all duration-300 relative overflow-hidden group",
                           cargoType === key 
                             ? "bg-yellow-500/10 border-yellow-500 text-white shadow-[0_0_20px_rgba(234,179,8,0.1)]" 
                             : "bg-zinc-900 border-white/5 text-zinc-400 hover:border-white/20 hover:bg-zinc-800"
                         )}
                       >
                          <div className="relative z-10">
                             <div className="flex justify-between items-center mb-1">
                                <span className={cn("font-bold text-sm", cargoType === key ? "text-yellow-500" : "text-white")}>
                                   {isRtl ? info.labelFa : info.labelEn}
                                </span>
                                {cargoType === key && <CheckCircle2 size={18} className="text-yellow-500" />}
                             </div>
                             <p className="text-[11px] opacity-70 leading-relaxed mb-3">
                                {isRtl ? info.descFa : info.descEn}
                             </p>
                             <div className="inline-block bg-black/30 px-2 py-1 rounded text-xs font-mono">
                                {info.price} RMB / CBM
                             </div>
                          </div>
                       </button>
                    ))}
                 </div>
              </div>

              {/* 2. Dimensions */}
              <div className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-6 md:p-8">
                 <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-black border border-white/5">2</span>
                    {text.sections.dims}
                 </h3>
                 
                 <div className="space-y-4">
                    {items.map((item, idx) => (
                       <div key={item.id} className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5 animate-in slide-in-from-top-2">
                          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                             <div className="col-span-1 md:col-span-1">
                                <label className="text-[10px] text-zinc-500 block mb-1.5">{text.fields.l}</label>
                                <input type="number" value={item.length} onChange={(e) => updateItem(item.id, 'length', e.target.value)} className="w-full bg-black border border-white/10 rounded-xl h-10 px-3 text-white text-sm focus:border-yellow-500/50 outline-none transition-colors" dir="ltr" />
                             </div>
                             <div className="col-span-1 md:col-span-1">
                                <label className="text-[10px] text-zinc-500 block mb-1.5">{text.fields.w}</label>
                                <input type="number" value={item.width} onChange={(e) => updateItem(item.id, 'width', e.target.value)} className="w-full bg-black border border-white/10 rounded-xl h-10 px-3 text-white text-sm focus:border-yellow-500/50 outline-none transition-colors" dir="ltr" />
                             </div>
                             <div className="col-span-1 md:col-span-1">
                                <label className="text-[10px] text-zinc-500 block mb-1.5">{text.fields.h}</label>
                                <input type="number" value={item.height} onChange={(e) => updateItem(item.id, 'height', e.target.value)} className="w-full bg-black border border-white/10 rounded-xl h-10 px-3 text-white text-sm focus:border-yellow-500/50 outline-none transition-colors" dir="ltr" />
                             </div>
                             <div className="col-span-1 md:col-span-1">
                                <label className="text-[10px] text-zinc-500 block mb-1.5">{text.fields.count}</label>
                                <input type="number" value={item.count} onChange={(e) => updateItem(item.id, 'count', e.target.value)} className="w-full bg-black border border-white/10 rounded-xl h-10 px-3 text-white text-sm focus:border-yellow-500/50 outline-none transition-colors" dir="ltr" />
                             </div>
                             <div className="col-span-2 md:col-span-1">
                                <label className="text-[10px] text-zinc-500 block mb-1.5">{text.fields.weight}</label>
                                <input type="number" value={item.weight} onChange={(e) => updateItem(item.id, 'weight', e.target.value)} className="w-full bg-black border border-white/10 rounded-xl h-10 px-3 text-white text-sm focus:border-yellow-500/50 outline-none transition-colors" dir="ltr" />
                             </div>
                             <div className="col-span-2 md:col-span-1 flex items-end">
                                <button onClick={() => removeItem(item.id)} disabled={items.length === 1} className="w-full h-10 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                                   <Trash2 size={16} />
                                </button>
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
                 
                 <button onClick={addItem} className="mt-4 flex items-center gap-2 text-xs font-bold text-yellow-500 hover:text-yellow-400 transition-colors">
                    <Plus size={16} />
                    {text.actions.add}
                 </button>
              </div>

              {/* 3. Value & Insurance */}
              <div className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-6 md:p-8">
                 <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-black border border-white/5">3</span>
                    {text.sections.value}
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                       <label className="text-xs font-bold text-zinc-400 mb-2 block">{text.fields.value}</label>
                       <div className="relative">
                          <DollarSign size={16} className="absolute top-1/2 -translate-y-1/2 left-3 text-zinc-500" />
                          <input 
                            type="number" 
                            value={declaredValue}
                            onChange={(e) => setDeclaredValue(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-xl h-12 px-10 text-white font-mono focus:border-yellow-500/50 outline-none transition-colors" 
                            dir="ltr"
                            placeholder="0"
                          />
                       </div>
                    </div>
                    <div className="flex items-center h-full pt-6">
                       <label className="flex items-center gap-3 cursor-pointer group">
                          <div className={cn("w-6 h-6 rounded-lg border flex items-center justify-center transition-all", hasInsurance ? "bg-yellow-500 border-yellow-500" : "bg-black border-white/20 group-hover:border-white/40")}>
                             {hasInsurance && <CheckCircle2 size={14} className="text-black" />}
                          </div>
                          <input type="checkbox" checked={hasInsurance} onChange={(e) => setHasInsurance(e.target.checked)} className="hidden" />
                          <span className={cn("text-sm transition-colors", hasInsurance ? "text-white font-bold" : "text-zinc-400")}>{text.fields.insurance}</span>
                       </label>
                    </div>
                 </div>
              </div>

           </div>

           {/* RESULTS SECTION (Sticky) */}
           <div className="lg:col-span-1">
              <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 md:p-8 sticky top-8 shadow-2xl">
                 <h3 className="font-black text-xl text-white mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
                    {text.results.title}
                 </h3>

                 <div className="space-y-4 mb-8">
                    {/* Volume */}
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-zinc-400 flex items-center gap-2"><Box size={14}/> {text.results.cbm}</span>
                       <span className="text-white font-mono">{totalCBM.toFixed(3)}</span>
                    </div>
                    {/* Weight */}
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-zinc-400 flex items-center gap-2"><Scale size={14}/> {text.results.weight}</span>
                       <span className="text-white font-mono">{totalWeight} kg</span>
                    </div>
                    {/* Rate */}
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-zinc-400 flex items-center gap-2"><Info size={14}/> {text.results.rate}</span>
                       <span className="text-white font-mono">{RATES[cargoType].price}</span>
                    </div>
                    
                    <div className="h-px bg-white/10 my-2" />
                    
                    {/* Shipping Cost */}
                    <div className="flex justify-between items-center">
                       <span className="text-zinc-300">{text.results.shipping}</span>
                       <span className="text-white font-mono font-bold">¥ {Math.ceil(shippingCost).toLocaleString()}</span>
                    </div>
                    {/* Insurance Cost */}
                    <div className="flex justify-between items-center">
                       <span className="text-zinc-300">{text.results.insurance}</span>
                       <span className="text-white font-mono font-bold">¥ {Math.ceil(insuranceCost).toLocaleString()}</span>
                    </div>
                 </div>

                 {/* Total Big */}
                 <div className="bg-black/40 rounded-2xl p-4 border border-white/5 text-center mb-6">
                    <p className="text-xs text-zinc-500 mb-1">{text.results.total}</p>
                    <p className="text-3xl md:text-4xl font-black text-yellow-500 font-mono tracking-tight">
                       {Math.ceil(finalTotal).toLocaleString()}
                    </p>
                 </div>

                 {/* Warnings */}
                 {warnings.length > 0 && (
                    <div className="mb-6 space-y-2">
                       {warnings.map((w, i) => (
                          <div key={i} className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl flex gap-2 items-start">
                             <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                             <p className="text-[10px] text-red-200/80 leading-relaxed">{w}</p>
                          </div>
                       ))}
                    </div>
                 )}

                 <p className="text-[10px] text-zinc-600 text-center mb-6 leading-relaxed">
                    {text.results.disclaimer}
                 </p>

                 <button className="w-full h-14 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold rounded-xl text-lg hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all active:scale-95">
                    {text.actions.contact}
                 </button>

              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
