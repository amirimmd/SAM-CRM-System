'use client';

import { useState } from 'react';
import { Truck, Save, CheckCircle, MapPin, Container, AlertCircle } from 'lucide-react';

export default function LogisticsAdminPage({ params }: { params: { locale: string } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // فرم مدیریت کانتینر
  const [formData, setFormData] = useState({
    startId: '',
    endId: '',
    containerNo: '',
    location: '',
    status: 'in_transit'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess(false);

    // شبیه‌سازی عملیات آپدیت گروهی در دیتابیس
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Bulk Updating:', formData);
    setIsLoading(false);
    setSuccess(true);
    
    // پاک کردن پیام موفقیت بعد از ۳ ثانیه
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 font-vazirmatn text-right" dir="rtl">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">مدیریت کانتینر و لجستیک</h1>
          <p className="text-zinc-500 mt-2">مدیریت وضعیت بارها و تخصیص کانتینر به صورت گروهی</p>
        </div>
        <div className="p-3 bg-yellow-500/10 rounded-xl text-yellow-600">
           <Container size={32} />
        </div>
      </div>

      {/* Main Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Bulk Update Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Truck className="text-blue-500" />
              بروزرسانی وضعیت گروهی (کانتینری)
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Range Inputs */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">از شماره سفارش</label>
                  <input 
                    type="number" 
                    placeholder="مثلا: 1000"
                    className="w-full h-12 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-white"
                    value={formData.startId}
                    onChange={(e) => setFormData({...formData, startId: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">تا شماره سفارش</label>
                  <input 
                    type="number" 
                    placeholder="مثلا: 1050"
                    className="w-full h-12 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-white"
                    value={formData.endId}
                    onChange={(e) => setFormData({...formData, endId: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Container Details */}
                 <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">شماره کانتینر</label>
                  <div className="relative">
                    <Container className="absolute right-4 top-3.5 text-zinc-400" size={20} />
                    <input 
                      type="text" 
                      placeholder="مثلا: CN-8821X"
                      className="w-full h-12 pr-12 pl-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-white"
                      value={formData.containerNo}
                      onChange={(e) => setFormData({...formData, containerNo: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">موقعیت فعلی</label>
                  <div className="relative">
                    <MapPin className="absolute right-4 top-3.5 text-zinc-400" size={20} />
                    <input 
                      type="text" 
                      placeholder="مثلا: جبل علی، امارات"
                      className="w-full h-12 pr-12 pl-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-white"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">وضعیت جدید</label>
                  <select 
                    className="w-full h-12 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent dark:bg-zinc-900 text-zinc-900 dark:text-white"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="processing">در حال پردازش</option>
                    <option value="in_transit">در حال حمل (روی کشتی/کامیون)</option>
                    <option value="customs">در گمرک</option>
                    <option value="delivered">تحویل شده</option>
                  </select>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Save size={20} />
                    ثبت و بروزرسانی وضعیت {formData.endId && formData.startId ? `(${Number(formData.endId) - Number(formData.startId) + 1} سفارش)` : ''}
                  </>
                )}
              </button>

              {success && (
                <div className="p-4 bg-green-50 text-green-700 border border-green-200 rounded-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                  <CheckCircle size={20} />
                  <span>اطلاعات با موفقیت برای بازه انتخابی بروز شد.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Recent Operations Info */}
        <div className="space-y-6">
           <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-3xl border border-zinc-200 dark:border-white/5">
              <h3 className="font-bold mb-4 text-zinc-900 dark:text-white">راهنما</h3>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400 list-disc list-inside">
                <li>با وارد کردن بازه "از" و "تا"، تمام سفارشاتی که شناسه آن‌ها در این بازه است انتخاب می‌شوند.</li>
                <li>شماره کانتینر برای تمام این سفارشات ثبت خواهد شد.</li>
                <li>پس از ثبت، وضعیت سفارشات در صفحه رهگیری عمومی به‌روز می‌شود.</li>
              </ul>
           </div>

           <div className="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-3xl border border-yellow-200 dark:border-yellow-500/20">
              <h3 className="font-bold text-yellow-700 dark:text-yellow-500 mb-2 flex items-center gap-2">
                <AlertCircle size={18} />
                وضعیت سیستم
              </h3>
              <p className="text-sm text-yellow-600/80">
                آخرین کانتینر پردازش شده: <span className="font-mono font-bold">CN-9910</span>
                <br />
                تعداد: 54 سفارش
                <br />
                زمان: ۲ ساعت پیش
              </p>
           </div>
        </div>

      </div>
    </div>
  );
}
