import { Search, Filter, MoreHorizontal, UserPlus, Shield, User, Briefcase, CheckCircle2, XCircle } from 'lucide-react';

export default async function UsersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isRtl = locale === 'fa';

  const users = [
    { id: 1, name: 'علی رضایی', email: 'ali@example.com', role: 'Staff', status: 'Active', lastSeen: '2 min ago' },
    { id: 2, name: 'بازرگانی امید', email: 'omid@trade.com', role: 'Partner', status: 'Active', lastSeen: '1 hour ago' },
    { id: 3, name: 'سارا محمدی', email: 'sara@example.com', role: 'Staff', status: 'Offline', lastSeen: '2 days ago' },
    { id: 4, name: 'شرکت تکنو', email: 'tech@co.ir', role: 'Partner', status: 'Suspended', lastSeen: '1 week ago' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">{isRtl ? 'مدیریت کاربران' : 'User Management'}</h1>
          <p className="text-zinc-400 text-sm flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
             {isRtl ? 'لیست تمام کارشناسان و شرکای تجاری فعال در سیستم' : 'Manage active staff and partners'}
          </p>
        </div>
        <button className="flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-2xl font-bold text-sm hover:bg-yellow-400 hover:scale-105 transition-all shadow-lg shadow-yellow-500/20 active:scale-95">
          <UserPlus size={18} />
          {isRtl ? 'افزودن کاربر جدید' : 'Add New User'}
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-[#0a0a0a] border border-white/5 p-2 rounded-2xl flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 -translate-y-1/2 right-4 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder={isRtl ? "جستجو بر اساس نام، ایمیل یا نقش..." : "Search users..."}
            className="w-full h-12 bg-zinc-900/50 border border-white/5 rounded-xl pr-12 pl-4 text-sm text-white focus:border-yellow-500/30 focus:bg-zinc-900 outline-none transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-6 h-12 bg-zinc-900 border border-white/5 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors text-sm font-medium">
          <Filter size={18} />
          {isRtl ? 'فیلتر پیشرفته' : 'Filters'}
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-900/50 text-zinc-400 font-medium border-b border-white/5">
              <tr>
                <th className="p-6 text-right">{isRtl ? 'نام کاربر' : 'User Name'}</th>
                <th className="p-6 text-right">{isRtl ? 'نقش دسترسی' : 'Role'}</th>
                <th className="p-6 text-right">{isRtl ? 'وضعیت حساب' : 'Status'}</th>
                <th className="p-6 text-right">{isRtl ? 'آخرین بازدید' : 'Last Seen'}</th>
                <th className="p-6 text-center">{isRtl ? 'عملیات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 flex items-center justify-center text-zinc-300 border border-white/5">
                        <User size={18} />
                      </div>
                      <div>
                        <div className="font-bold text-white text-base mb-0.5">{user.name}</div>
                        <div className="text-xs text-zinc-500 font-mono">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border ${
                      user.role === 'Staff' 
                        ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/20' 
                        : 'bg-blue-500/5 text-blue-500 border-blue-500/20'
                    }`}>
                      {user.role === 'Staff' ? <Shield size={12} /> : <Briefcase size={12} />}
                      {user.role === 'Staff' ? 'کارشناس' : 'شریک تجاری'}
                    </span>
                  </td>
                  <td className="p-6">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${
                      user.status === 'Active' 
                        ? 'bg-green-500/10 text-green-400' 
                        : 'bg-red-500/10 text-red-400'
                    }`}>
                      {user.status === 'Active' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      {user.status === 'Active' ? 'فعال' : 'مسدود'}
                    </span>
                  </td>
                  <td className="p-6">
                     <span className="text-zinc-500 text-xs font-mono">{user.lastSeen}</span>
                  </td>
                  <td className="p-6 text-center">
                    <button className="p-2 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination (Static for now) */}
        <div className="p-4 border-t border-white/5 flex justify-center">
           <span className="text-xs text-zinc-600">نمایش ۱ تا ۴ از ۴ کاربر</span>
        </div>
      </div>
    </div>
  );
}
