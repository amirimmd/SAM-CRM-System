import { Plus, Edit, Trash2, Eye, FileText, Image as ImageIcon, Calendar } from 'lucide-react';

export default async function CMSPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isRtl = locale === 'fa';

  const pages = [
    { id: 1, title: 'راهنمای جامع ارسال بار از چین', slug: '/guide-china', type: 'Article', status: 'Published', views: '1.2k', date: '2023-10-05' },
    { id: 2, title: 'تعرفه گمرکی جدید سال ۲۰۲۵', slug: '/tariffs-2025', type: 'News', status: 'Draft', views: '0', date: '2023-10-12' },
    { id: 3, title: 'درباره شرکت سام لجستیک', slug: '/about', type: 'Page', status: 'Published', views: '5.6k', date: '2023-01-15' },
    { id: 4, title: 'سوالات متداول', slug: '/faq', type: 'Page', status: 'Published', views: '3.4k', date: '2023-02-20' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">{isRtl ? 'مدیریت محتوا' : 'Content Management'}</h1>
          <p className="text-zinc-400 text-sm">انتشار اخبار، مقالات و ویرایش صفحات سایت</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-2xl font-bold text-sm hover:bg-zinc-200 transition-colors shadow-lg active:scale-95">
          <Plus size={20} />
          {isRtl ? 'ایجاد محتوای جدید' : 'Create New Content'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <div key={page.id} className="group bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-all duration-300 flex flex-col h-full">
            
            <div className="flex justify-between items-start mb-6">
              <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/5 text-zinc-400 group-hover:text-white group-hover:border-yellow-500/30 transition-all shadow-sm">
                <FileText size={24} />
              </div>
              <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full border ${
                page.status === 'Published' 
                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                  : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
              }`}>
                {page.status}
              </span>
            </div>
            
            <div className="flex-1">
               <h3 className="font-bold text-white text-xl mb-2 line-clamp-2 leading-tight group-hover:text-yellow-500 transition-colors">
                  {page.title}
               </h3>
               <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono mb-6 bg-white/5 w-fit px-2 py-1 rounded">
                  <span className="opacity-50">/</span>
                  {page.slug}
               </div>
            </div>
            
            <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
              <div className="flex items-center gap-4 text-xs text-zinc-500">
                <div className="flex items-center gap-1.5" title="Views">
                   <Eye size={14} />
                   <span>{page.views}</span>
                </div>
                <div className="flex items-center gap-1.5" title="Date">
                   <Calendar size={14} />
                   <span>{page.date}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                <button className="p-2.5 hover:bg-blue-500/10 rounded-xl text-zinc-400 hover:text-blue-400 transition-colors" title="Edit">
                  <Edit size={18} />
                </button>
                <button className="p-2.5 hover:bg-red-500/10 rounded-xl text-zinc-400 hover:text-red-400 transition-colors" title="Delete">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
