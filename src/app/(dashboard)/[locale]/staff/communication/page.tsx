'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  Search, 
  MessageSquare, 
  Send, 
  Paperclip, 
  MoreVertical, 
  User, 
  Users, 
  Megaphone, 
  ChevronRight,
  ChevronLeft,
  Check,
  CheckCircle2,
  Clock,
  Pin,
  Eye,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

type TabType = 'customers' | 'groups' | 'announcements';

export default function CommunicationPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'fa';
  const isRtl = locale === 'fa';

  const t = {
    fa: {
      title: 'مرکز پیام (پیام‌رسان)',
      search: 'جستجو در گفتگوها...',
      tabs: { customers: 'مشتریان', groups: 'گروه‌های داخلی', announcements: 'اطلاعیه‌ها' },
      chat: { typeMessage: 'پیام خود را بنویسید...', broadcast: 'ارسال پیام عمومی به همه مشتریان', select: 'یک گفتگو را برای نمایش انتخاب کنید' },
      status: { online: 'آنلاین', offline: 'آخرین بازدید اخیراً' },
      roles: { customer: 'مشتری', partner: 'شریک تجاری', staff: 'کارشناس', admin: 'مدیر' },
      announcementDesc: 'شما در حال ارسال پیام به کانال «باشگاه مشتریان» هستید. این پیام برای ۲,۸۴۵ کاربر ارسال خواهد شد.',
      sharedInbox: 'صندوق مشترک: پاسخ شما توسط سایر کارشناسان نیز قابل مشاهده است.'
    },
    en: {
      title: 'Message Center (Messenger)',
      search: 'Search chats...',
      tabs: { customers: 'Customers', groups: 'Internal Groups', announcements: 'Announcements' },
      chat: { typeMessage: 'Type a message...', broadcast: 'Broadcast to all customers', select: 'Select a chat to view messages' },
      status: { online: 'Online', offline: 'Last seen recently' },
      roles: { customer: 'Customer', partner: 'Partner', staff: 'Staff', admin: 'Admin' },
      announcementDesc: 'You are broadcasting to the "Customer Club". This message will be sent to 2,845 users.',
      sharedInbox: 'Shared Inbox: Your replies are visible to other staff members.'
    }
  };

  const text = isRtl ? t.fa : t.en;

  // وضعیت‌های پیام‌رسان
  const [activeTab, setActiveTab] = useState<TabType>('customers');
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState('');

  // --- داده‌های شبیه‌سازی شده برای ۳ تب مختلف ---

  // ۱. لیست مشتریان (Shared Inbox)
  const [customersChats] = useState([
    { id: 1, name: 'بازرگانی پارس', role: 'partner', lastMessage: 'لطفاً عکس بارگیری کانتینر را بفرستید.', time: '10:30', unread: 2, online: true, isPinned: true },
    { id: 2, name: 'الکترونیک نوین', role: 'customer', lastMessage: 'سلام، بار ما چه زمانی می‌رسد؟', time: 'دیروز', unread: 0, online: false, isPinned: false },
    { id: 3, name: 'تجارت افق', role: 'partner', lastMessage: 'تاییدیه مالی انجام شد.', time: 'دوشنبه', unread: 0, online: false, isPinned: false },
  ]);

  // ۲. لیست گروه‌های داخلی شرکت
  const [groupsChats] = useState([
    { id: 11, name: 'هماهنگی گمرک دبی', members: 12, lastMessage: 'کانتینر TEU-40 ترخیص شد.', time: '09:15', unread: 5, isPinned: true },
    { id: 12, name: 'تیم عملیات گوانگجو', members: 8, lastMessage: 'بارگیری پالت‌ها تمام شد. خسته نباشید.', time: 'دیروز', unread: 0, isPinned: false },
    { id: 13, name: 'مدیران ارشد', members: 4, lastMessage: 'نرخ جدید بیمه در پنل اعمال گردید.', time: 'هفته پیش', unread: 0, isPinned: false },
  ]);

  // ۳. تاریخچه اطلاعیه‌های کانال
  const [announcements, setAnnouncements] = useState([
    { id: 101, title: 'تغییر نرخ ارز گمرکی', text: 'به اطلاع کلیه مشتریان گرامی می‌رساند، با توجه به تغییرات نرخ ارز گمرکی، از فردا محاسبه فاکتورها بر اساس نرخ جدید خواهد بود.', time: '۱۴۰۲/۰۸/۱۵ - ۱۰:۰۰', views: '2.1k' },
    { id: 102, title: 'تاخیر در حرکت کشتی‌ها', text: 'به دلیل شرایط جوی در بندر گوانگجو، حرکت کشتی کانتینربر با ۳ روز تاخیر مواجه خواهد شد.', time: '۱۴۰۲/۰۸/۱۰ - ۱۶:۳۰', views: '2.5k' },
  ]);

  // تاریخچه چت فعلی (شبیه‌سازی دمو)
  const [currentChatHistory, setCurrentChatHistory] = useState([
    { id: 1, sender: 'them', text: 'سلام، وقت بخیر.', time: '10:25' },
    { id: 2, sender: 'me', text: 'سلام. چطور می‌توانم کمکتان کنم؟', time: '10:28' },
    { id: 3, sender: 'them', text: 'لطفاً وضعیت کانتینر شماره SAM-8842 را پیگیری کنید.', time: '10:30' },
  ]);

  // هندلر ارسال پیام
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    if (activeTab === 'announcements') {
      // ارسال اطلاعیه
      setAnnouncements([{
        id: Date.now(),
        title: 'اطلاعیه جدید',
        text: messageInput,
        time: new Date().toLocaleTimeString(locale === 'fa' ? 'fa-IR' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
        views: '0'
      }, ...announcements]);
    } else {
      // ارسال پیام چت
      setCurrentChatHistory([...currentChatHistory, {
        id: Date.now(),
        sender: 'me',
        text: messageInput,
        time: new Date().toLocaleTimeString(locale === 'fa' ? 'fa-IR' : 'en-US', { hour: '2-digit', minute: '2-digit' })
      }]);
    }
    setMessageInput('');
  };

  // دریافت اطلاعات چت فعال برای هدر
  const activeChatDetails = activeTab === 'customers' 
    ? customersChats.find(c => c.id === activeChatId)
    : groupsChats.find(g => g.id === activeChatId);

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col font-vazirmatn animate-in fade-in duration-500 pb-4">
      
      {/* هدر بالای صفحه */}
      <div className="mb-4 shrink-0 flex items-center justify-between">
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
           <MessageSquare className="text-emerald-500" />
           {text.title}
        </h1>
      </div>

      {/* رابط کاربری اصلی تلگرام‌مانند */}
      <div className="flex-1 bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden flex shadow-2xl relative">
        
        {/* === سایدبار (لیست چت‌ها و تب‌ها) === */}
        <div className={cn(
           "w-full md:w-[340px] flex flex-col border-white/5 bg-zinc-950/50 shrink-0 transition-all duration-300 relative z-20",
           isRtl ? "border-l" : "border-r",
           activeChatId || activeTab === 'announcements' ? "hidden md:flex" : "flex"
        )}>
           {/* سرچ‌بار */}
           <div className="p-4 border-b border-white/5 shrink-0">
              <div className="relative group">
                 <Search size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors", isRtl ? "right-3" : "left-3")} />
                 <input 
                   type="text" 
                   placeholder={text.search}
                   className={cn("w-full bg-black border border-white/10 rounded-xl h-11 text-sm text-white focus:border-emerald-500/50 focus:bg-zinc-900 outline-none transition-all placeholder:text-zinc-600", isRtl ? "pr-10 pl-3" : "pl-10 pr-3")}
                 />
              </div>
           </div>
           
           {/* لیست چت‌ها */}
           <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-hide">
              
              {/* لیست مشتریان */}
              {activeTab === 'customers' && customersChats.map(chat => (
                 <div 
                   key={chat.id}
                   onClick={() => setActiveChatId(chat.id)}
                   className={cn(
                     "p-3 rounded-2xl cursor-pointer transition-all flex gap-3 group relative",
                     activeChatId === chat.id ? "bg-emerald-600/10 border border-emerald-500/20" : "hover:bg-white/5 border border-transparent"
                   )}
                 >
                    <div className="relative shrink-0">
                       <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 flex items-center justify-center text-zinc-300 font-bold shadow-inner">
                          {chat.name.charAt(0)}
                       </div>
                       {chat.online && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0a0a0a] rounded-full" />}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                       <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-sm text-white truncate flex items-center gap-1">
                             {chat.isPinned && <Pin size={12} className="text-zinc-500" />}
                             {chat.name}
                          </span>
                          <span className={cn("text-[10px] shrink-0", activeChatId === chat.id ? "text-emerald-500" : "text-zinc-500")}>{chat.time}</span>
                       </div>
                       <div className="flex justify-between items-center gap-2">
                          <span className={cn("text-xs truncate", activeChatId === chat.id ? "text-emerald-100/70" : "text-zinc-400")}>{chat.lastMessage}</span>
                          {chat.unread > 0 && (
                             <span className="px-1.5 h-5 rounded-full bg-emerald-500 text-black text-[10px] font-bold flex items-center justify-center shrink-0">
                                {chat.unread}
                             </span>
                          )}
                       </div>
                    </div>
                 </div>
              ))}

              {/* لیست گروه‌های داخلی */}
              {activeTab === 'groups' && groupsChats.map(chat => (
                 <div 
                   key={chat.id}
                   onClick={() => setActiveChatId(chat.id)}
                   className={cn(
                     "p-3 rounded-2xl cursor-pointer transition-all flex gap-3 group relative",
                     activeChatId === chat.id ? "bg-blue-600/10 border border-blue-500/20" : "hover:bg-white/5 border border-transparent"
                   )}
                 >
                    <div className="relative shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-900/40 to-blue-900/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                       <Users size={20} />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                       <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-sm text-white truncate">{chat.name}</span>
                          <span className="text-[10px] text-zinc-500 shrink-0">{chat.time}</span>
                       </div>
                       <div className="flex justify-between items-center gap-2">
                          <span className="text-xs text-blue-200/50 truncate">{chat.lastMessage}</span>
                          {chat.unread > 0 && (
                             <span className="px-1.5 h-5 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                                {chat.unread}
                             </span>
                          )}
                       </div>
                    </div>
                 </div>
              ))}

           </div>

           {/* تب‌های پایین سایدبار (Bottom Navigation Style) */}
           <div className="p-2 border-t border-white/5 bg-zinc-950 flex gap-1 shrink-0">
              <button 
                onClick={() => { setActiveTab('customers'); setActiveChatId(null); }}
                className={cn("flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-xl text-[10px] font-bold transition-all", activeTab === 'customers' ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300")}
              >
                 <User size={18} className={activeTab === 'customers' ? "text-emerald-500" : ""} />
                 {text.tabs.customers}
              </button>
              <button 
                onClick={() => { setActiveTab('groups'); setActiveChatId(null); }}
                className={cn("flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-xl text-[10px] font-bold transition-all", activeTab === 'groups' ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300")}
              >
                 <Users size={18} className={activeTab === 'groups' ? "text-blue-500" : ""} />
                 {text.tabs.groups}
              </button>
              <button 
                onClick={() => { setActiveTab('announcements'); setActiveChatId(null); }}
                className={cn("flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-xl text-[10px] font-bold transition-all", activeTab === 'announcements' ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300")}
              >
                 <Megaphone size={18} className={activeTab === 'announcements' ? "text-yellow-500" : ""} />
                 {text.tabs.announcements}
              </button>
           </div>
        </div>

        {/* === ناحیه اصلی چت === */}
        <div className={cn(
           "flex-1 flex flex-col bg-[#0f0f0f] relative overflow-hidden",
           (!activeChatId && activeTab !== 'announcements') ? "hidden md:flex" : "flex"
        )}>
           
           {/* الگوی پس‌زمینه تلگرامی */}
           <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

           {/* حالت ۱: تب اطلاعیه‌ها انتخاب شده باشد */}
           {activeTab === 'announcements' ? (
             <div className="flex-1 flex flex-col relative z-10">
                {/* هدر کانال */}
                <div className="h-16 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md px-4 md:px-6 flex items-center gap-4 shrink-0">
                   <button onClick={() => setActiveTab('customers')} className="md:hidden p-2 -ml-2 text-zinc-400">
                      {isRtl ? <ChevronRight /> : <ChevronLeft />}
                   </button>
                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-400 flex items-center justify-center text-black">
                      <Megaphone size={20} />
                   </div>
                   <div>
                      <div className="font-bold text-white text-sm">باشگاه مشتریان (اعلان عمومی)</div>
                      <div className="text-[11px] text-yellow-500 font-mono">2,845 Subscribers</div>
                   </div>
                </div>

                {/* پیام‌های کانال */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 flex flex-col">
                   {/* Info Message */}
                   <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 p-3 rounded-2xl text-xs flex items-start gap-2 mx-auto max-w-md text-center">
                      <Info size={16} className="shrink-0 mt-0.5" />
                      {text.announcementDesc}
                   </div>

                   {announcements.map(ann => (
                      <div key={ann.id} className="w-full max-w-xl mx-auto flex flex-col animate-in slide-in-from-bottom-2">
                         <div className="bg-zinc-900 border border-white/5 p-5 rounded-3xl rounded-tl-sm relative shadow-lg">
                            <h4 className="font-bold text-white mb-2 text-base">{ann.title}</h4>
                            <p className="text-sm text-zinc-300 leading-relaxed mb-4">{ann.text}</p>
                            <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono">
                               <span>{ann.time}</span>
                               <span className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-md"><Eye size={12}/> {ann.views}</span>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>

                {/* فرم ارسال اطلاعیه */}
                <div className="p-4 bg-zinc-950 border-t border-white/5 shrink-0">
                   <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex gap-2 bg-black border border-white/10 rounded-3xl p-2 focus-within:border-yellow-500/50 transition-colors">
                      <textarea 
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="متن اطلاعیه عمومی را بنویسید..."
                        className="flex-1 bg-transparent border-none outline-none text-white text-sm resize-none max-h-32 min-h-[48px] py-3.5 px-4 scrollbar-hide"
                        rows={1}
                      />
                      <button 
                        type="submit"
                        disabled={!messageInput.trim()}
                        className="px-6 rounded-2xl bg-yellow-500 text-black font-bold hover:bg-yellow-400 disabled:opacity-50 transition-all flex items-center gap-2 shrink-0"
                      >
                         <span className="hidden sm:inline">{text.chat.broadcast}</span>
                         <Megaphone size={18} />
                      </button>
                   </form>
                </div>
             </div>
           ) : 
           /* حالت ۲: یک چت باز شده باشد */
           activeChatId && activeChatDetails ? (
             <div className="flex-1 flex flex-col relative z-10">
                {/* هدر چت */}
                <div className="h-16 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md px-4 md:px-6 flex items-center justify-between shrink-0">
                   <div className="flex items-center gap-3">
                      <button onClick={() => setActiveChatId(null)} className="md:hidden p-2 -ml-2 text-zinc-400">
                         {isRtl ? <ChevronRight /> : <ChevronLeft />}
                      </button>
                      <div className="relative">
                         <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-inner", activeTab === 'groups' ? "bg-blue-600/20 text-blue-500 border border-blue-500/20" : "bg-zinc-800")}>
                            {activeTab === 'groups' ? <Users size={18} /> : activeChatDetails.name.charAt(0)}
                         </div>
                         {/* خطای تایپ اسکریپت با استفاده از type narrowing برطرف شد */}
                         {('online' in activeChatDetails && activeChatDetails.online) && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0a0a0a] rounded-full" />
                         )}
                      </div>
                      <div>
                         <div className="font-bold text-white text-sm">{activeChatDetails.name}</div>
                         {activeTab === 'groups' ? (
                            <div className="text-[10px] text-blue-400">
                               {'members' in activeChatDetails ? activeChatDetails.members : ''} Members
                            </div>
                         ) : (
                            <div className="text-[10px] text-emerald-500">
                               {('online' in activeChatDetails && activeChatDetails.online) ? text.status.online : text.status.offline}
                            </div>
                         )}
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <button className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
                         <Search size={18} />
                      </button>
                      <button className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
                         <MoreVertical size={18} />
                      </button>
                   </div>
                </div>

                {/* پیام‌های چت */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 flex flex-col">
                   {/* Shared Inbox Notice */}
                   {activeTab === 'customers' && (
                      <div className="flex justify-center mb-4">
                         <span className="text-[10px] bg-zinc-900 text-zinc-500 px-3 py-1.5 rounded-full border border-white/5">
                            {text.sharedInbox}
                         </span>
                      </div>
                   )}

                   {currentChatHistory.map((msg) => (
                      <div key={msg.id} className={cn("flex w-full animate-in slide-in-from-bottom-1", msg.sender === 'me' ? "justify-end" : "justify-start")}>
                         <div className={cn(
                            "max-w-[85%] md:max-w-[70%] p-3 md:p-4 text-sm relative shadow-md",
                            msg.sender === 'me' 
                              ? (activeTab === 'groups' ? "bg-blue-600 text-white rounded-2xl rounded-tr-sm" : "bg-emerald-600 text-white rounded-2xl rounded-tr-sm") 
                              : "bg-zinc-900 text-zinc-200 border border-white/5 rounded-2xl rounded-tl-sm"
                         )}>
                            <p className="leading-relaxed">{msg.text}</p>
                            <div className={cn(
                               "flex items-center gap-1 mt-2 text-[9px] font-mono",
                               msg.sender === 'me' ? (activeTab === 'groups' ? "text-blue-200/70 justify-end" : "text-emerald-100/70 justify-end") : "text-zinc-500 justify-start"
                            )}>
                               <span>{msg.time}</span>
                               {msg.sender === 'me' && <CheckCircle2 size={10} />}
                            </div>
                         </div>
                      </div>
                   ))}
                </div>

                {/* فرم ارسال پیام چت */}
                <div className="p-3 bg-zinc-950 border-t border-white/5 shrink-0">
                   <form onSubmit={handleSendMessage} className="max-w-5xl mx-auto flex items-end gap-2 bg-black border border-white/10 rounded-3xl p-1.5 focus-within:border-emerald-500/50 transition-colors">
                      <button type="button" className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors shrink-0">
                         <Paperclip size={20} />
                      </button>
                      <textarea 
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder={text.chat.typeMessage}
                        className="flex-1 bg-transparent border-none outline-none text-white text-sm resize-none max-h-32 min-h-[44px] py-3.5 px-2 scrollbar-hide"
                        rows={1}
                        onKeyDown={(e) => {
                           if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(e); }
                        }}
                      />
                      <button 
                        type="submit"
                        disabled={!messageInput.trim()}
                        className={cn("p-3 rounded-2xl text-white disabled:opacity-50 transition-all shrink-0", activeTab === 'groups' ? "bg-blue-600 hover:bg-blue-500" : "bg-emerald-600 hover:bg-emerald-500")}
                      >
                         <Send size={18} className={cn(isRtl && "rotate-180")} />
                      </button>
                   </form>
                </div>
             </div>
           ) : (
             /* حالت ۳: هیچ چتی انتخاب نشده است */
             <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-zinc-500 bg-zinc-950/30">
                <div className="w-20 h-20 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center mb-4 shadow-inner">
                   <MessageSquare size={32} className="opacity-20" />
                </div>
                <p className="text-sm font-medium">{text.chat.select}</p>
             </div>
           )}
        </div>

      </div>
    </div>
  );
}
