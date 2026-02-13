import { Receipt, Download, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function InvoicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isRtl = locale === 'fa';

  const t = {
    fa: {
      title: 'امور مالی و فاکتورها',
      desc: 'مشاهده و پرداخت پیش‌فاکتورها و دریافت اسناد مالی',
      alert: 'توجه: حمل بار شما منوط به پرداخت "پیش‌فاکتور" می‌باشد. لطفا نسبت به تسویه حساب اقدام فرمایید.',
      table: { id: 'شماره فاکتور', related: 'مربوط به بار', amount: 'مبلغ کل', date: 'تاریخ صدور', status: 'وضعیت', action: 'دریافت' },
      status: { paid: 'پرداخت شده', unpaid: 'منتظر پرداخت' }
    },
    en: {
      title: 'Financial & Invoices',
      desc: 'View and pay proforma invoices and download financial docs',
      alert: 'Note: Shipment requires "Pre-invoice" payment. Please proceed with settlement.',
      table: { id: 'Invoice #', related: 'Shipment', amount: 'Total Amount', date: 'Issued Date', status: 'Status', action: 'Download' },
      status: { paid: 'Paid', unpaid: 'Unpaid' }
    }
  };

  const text = isRtl ? t.fa : t.en;

  const invoices = [
    { id: 'INV-2023-001', tracking: 'SAM-8842', amount: '¥ 12,450', date: '2023-10-12', status: 'unpaid' },
    { id: 'INV-2023-002', tracking: 'SAM-7721', amount: '¥ 8,200', date: '2023-09-25', status: 'paid' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-2xl md:text-3xl font-black text-white mb-2">{text.title}</h1>
        <p className="text-zinc-400 text-sm">{text.desc}</p>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-2xl flex gap-3 items-start">
         <AlertTriangle className="text-yellow-500 shrink-0 mt-0.5" size={20} />
         <p className="text-sm text-yellow-500/90 leading-relaxed">{text.alert}</p>
      </div>

      <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-zinc-900/80 text-zinc-400 font-medium border-b border-white/5">
              <tr>
                <th className={cn("p-6 font-bold", isRtl ? "text-right" : "text-left")}>{text.table.id}</th>
                <th className={cn("p-6 font-bold", isRtl ? "text-right" : "text-left")}>{text.table.related}</th>
                <th className={cn("p-6 font-bold", isRtl ? "text-right" : "text-left")}>{text.table.amount}</th>
                <th className={cn("p-6 font-bold", isRtl ? "text-right" : "text-left")}>{text.table.date}</th>
                <th className={cn("p-6 font-bold", isRtl ? "text-right" : "text-left")}>{text.table.status}</th>
                <th className="p-6 text-center font-bold">{text.table.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {invoices.map((inv, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-6 font-mono text-white font-bold">{inv.id}</td>
                  <td className="p-6 text-zinc-400 font-mono text-xs">{inv.tracking}</td>
                  <td className="p-6 font-mono text-white font-bold">{inv.amount}</td>
                  <td className="p-6 text-zinc-500 text-xs font-mono">{inv.date}</td>
                  <td className="p-6">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 w-fit",
                      inv.status === 'paid' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"
                    )}>
                      {inv.status === 'paid' ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                      {text.status[inv.status as keyof typeof text.status]}
                    </span>
                  </td>
                  <td className="p-6 text-center">
                    <button className="flex items-center gap-2 text-xs bg-zinc-900 hover:bg-white/10 text-zinc-300 hover:text-white px-4 py-2 rounded-lg transition-colors border border-white/5 mx-auto">
                       <Download size={14} />
                       PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
