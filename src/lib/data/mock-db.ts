// این فایل نقش دیتابیس را بازی می‌کند تا سیستم رهگیری کار کند.
// در آینده می‌توانید این توابع را به Supabase یا API واقعی متصل کنید.

export type ShipmentStatus = 'pending' | 'processing' | 'in_transit' | 'customs' | 'delivered';

export interface Shipment {
  id: string;
  trackingCode: string;
  containerNo?: string;
  status: ShipmentStatus;
  location: string;
  updatedAt: string;
  history: {
    status: string;
    location: string;
    date: string;
    description: string;
  }[];
}

// تابع جستجوی مرسوله (برای صفحه رهگیری عمومی)
export async function getShipmentByTrackingCode(code: string): Promise<Shipment | null> {
  // شبیه‌سازی تاخیر شبکه (1 ثانیه)
  await new Promise(resolve => setTimeout(resolve, 1000));

  // اگر کد "TRK-2026" باشد، یک نمونه موفق برمی‌گرداند (برای دمو)
  if (code.toUpperCase() === 'TRK-2026') {
    return {
      id: '1001',
      trackingCode: 'TRK-2026',
      containerNo: 'CN-8821X',
      status: 'in_transit',
      location: 'Jebel Ali, UAE',
      updatedAt: new Date().toISOString(),
      history: [
        { status: 'تایید شده', location: 'تهران، انبار مرکزی', date: '2026-02-01', description: 'سفارش ثبت و تایید شد.' },
        { status: 'بارگیری شده', location: 'بندرعباس', date: '2026-02-03', description: 'محموله در کانتینر CN-8821X بارگیری شد.' },
        { status: 'در حال حمل', location: 'خلیج فارس', date: '2026-02-05', description: 'کشتی به سمت مقصد حرکت کرد.' },
      ]
    };
  }
  
  return null;
}
