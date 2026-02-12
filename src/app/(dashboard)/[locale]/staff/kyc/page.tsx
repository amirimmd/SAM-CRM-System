'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { UserCheck, Search, ShieldAlert, CheckCircle, XCircle, FileImage, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function KYCPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'fa';
  const isRtl = locale === 'fa';

  const t = {
    fa: {
      title: 'تایید هویت کاربران (KYC)',
      desc: 'بررسی و تایید مدارک هویتی و ثبتی شرکای تجاری جدید.',
      search: 'جستجو نام، کدملی...',
      pending: 'در انتظار بررسی',
      approved: 'تایید شده',
      btnApprove: 'تایید مدرک',
      btnReject: 'رد مدرک',
      table: { user: 'کاربر / شرکت', id: 'کد ملی / شناسه', doc: 'مدارک', date: 'تاریخ ثبت', action: 'عملیات' }
    },
    en: {
      title: 'KYC Approvals',
      desc: 'Review and verify identity documents of new business partners.',
      search: 'Search name, ID...',
      pending: 'Pending Review',
      approved: 'Approved',
      btnApprove: 'Approve',
      btnReject: 'Reject',
      table: { user: 'User / Company', id: 'National ID', doc: 'Documents', date: 'Date', action: 'Action' }
    }
  };

  const text = isRtl ? t.fa : t.en;

  const [requests, setRequests] = useState([
    { id: 1, name: 'شرکت تجارت طلایی', nationalId: '10101234567', type: 'Company', status: 'pending', date: '1402/07/15' },
    { id: 2, name: 'محمد احمدی', nationalId: '0012345678', type: 'Person', status: 'pending', date: '1402/07/16' },
    { id: 3, name: 'بازرگانی امید', nationalId: '10109876543', type: 'Company', status: 'approved', date: '1402/07/10' },
  ]);

  const handleAction = (id: number, action: 'approved' | 'rejected') => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: action } : req));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-vazirmatn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2 flex items-center gap-3">
             <UserCheck className="text-emerald-500" />
             {text.title}
          </h1>
          <p className="text-zinc-400 text-sm">{text.desc}</p>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        {/* Search */}
        <div className="mb-6 relative max-w-md">
           <Search size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-zinc-500", isRtl ? "right-4" : "left-4")} />
           <input 
             type="text" 
             placeholder={text.search}
             className={cn("w-full bg-zinc-900 border border-white/10 rounded-xl h-12 text-sm text-white focus:border-emerald-500 outline-none transition-colors", isRtl ? "pr-12 pl-4" : "pl-12 pr-4")}
           />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-zinc-900 text-zinc-400 font-medium border-b border-white/5">
              <tr>
                <th className={cn("p-5 font-bold", isRtl ? "text-right" : "text-left")}>{text.table.user}</th>
                <th className={cn("p-5 font-bold", isRtl ? "text-right" : "text-left")}>{text.table.id}</th>
                <th className={cn("p-5 font-bold", isRtl ? "text-right" : "text-left")}>{text.table.doc}</th>
                <th className={cn("p-5 font-bold", isRtl ? "text-right" : "text-left")}>{text.table.date}</th>
                <th className="p-5 text-center font-bold">{text.table.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-5">
                    <div className="font-bold text-white mb-1">{req.name}</div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest">{req.type}</div>
                  </td>
                  <td className="p-5 font-mono text-zinc-300">{req.nationalId}</td>
                  <td className="p-5">
                     <button className="flex items-center gap-2 text-xs bg-zinc-900 hover:bg-zinc-800 border border-white/5 px-3 py-1.5 rounded-lg text-emerald-400 transition-colors">
                        <FileImage size={14} />
                        مشاهده مدارک
                        <ExternalLink size={12} className="opacity-50" />
                     </button>
                  </td>
                  <td className="p-5 text-zinc-500 text-xs font-mono">{req.date}</td>
                  <td className="p-5 text-center">
                    {req.status === 'pending' ? (
                       <div className="flex items-center justify-center gap-2">
                          <button onClick={() => handleAction(req.id, 'approved')} className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-black rounded-xl font-bold text-xs transition-all">
                             {text.btnApprove}
                          </button>
                          <button onClick={() => handleAction(req.id, 'rejected')} className="px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl font-bold text-xs transition-all">
                             {text.btnReject}
                          </button>
                       </div>
                    ) : (
                       <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-500">
                          <CheckCircle size={14} /> {text.approved}
                       </span>
                    )}
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
