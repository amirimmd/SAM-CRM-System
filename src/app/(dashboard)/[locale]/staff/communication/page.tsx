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
  Clock, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Image as ImageIcon,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CommunicationPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'fa';
  const isRtl = locale === 'fa';

  const t = {
    fa: {
      title: 'مرکز ارتباطات و پشتیبانی',
      desc: 'مدیریت تیکت‌ها و گفتگوی مستقیم با مشتریان و مدیران سیستم.',
      search: 'جستجوی گفتگو، شماره بارنامه...',
      activeChats: 'گفتگوهای فعال',
      typeMessage: 'پیام خود را بنویسید...',
      status: { open: 'باز', waiting: 'در انتظار کاربر', closed: 'بسته شده' },
      roles: { customer: 'مشتری', admin: 'مدیر سیستم', partner: 'شریک تجاری' }
    },
    en: {
      title: 'Communication Hub',
      desc: 'Manage tickets and chat directly with customers and system admins.',
      search: 'Search chats, tracking IDs...',
      activeChats: 'Active Chats',
      typeMessage: 'Type your message...',
      status: { open: 'Open', waiting: 'Waiting for User', closed: 'Closed' },
      roles: { customer: 'Customer', admin: 'System Admin', partner: 'Business Partner' }
    }
  };

  const text = isRtl ? t.fa : t.en;

  // شبیه‌سازی داده‌های تیکت
  const [tickets] = useState([
    { id: 1, user: 'بازرگانی پارس', role: 'partner', subject: 'پیگیری بار SAM-1042', time: '10:30', unread: 2, status: 'open', online: true },
    { id: 2, user: 'مدیریت ارشد (Admin)', role: 'admin', subject: 'هماهنگی کانتینر TEU-40', time: 'دیروز', unread: 0, status: 'open', online: false },
    { id: 3, user: 'الکترونیک نوین', role: 'customer', subject: 'درخواست تغییر آدرس', time: 'دوشنبه', unread: 0, status: 'waiting', online: false },
  ]);

  const [activeTicketId, setActiveTicketId] = useState<number | null>(1);
  const [message, setMessage] = useState('');
  
  // شبیه‌سازی تاریخچه چت
  const [chatHistory, setChatHistory] = useState([
    { id: 1, sender: 'user', text: 'سلام، بار ما با شماره SAM-1042 چه زمانی روی کشتی میره؟', time: '10:25 AM' },
    { id: 2, sender: 'me', text: 'سلام وقت بخیر. بار شما دیروز در کانتینر چیده شده و فردا صبح کشتی حرکت میکنه.', time: '10:28 AM' },
    { id: 3, sender: 'user', text: 'ممنون. آیا عکس‌های بارگیری رو میتونید بفرستید؟', time: '10:30 AM' },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setChatHistory([...chatHistory, {
      id: Date.now(),
      sender: 'me',
      text: message,
      time: new Date().toLocaleTimeString(locale === 'fa' ? 'fa-IR' : 'en-US', { hour: '2-digit', minute: '2-digit' })
    }]);
    setMessage('');
  };

  const activeTicket = tickets.find(t => t.id === activeTicketId);

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col font-vazirmatn animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="mb-6 shrink-0">
        <h1 className="text-2xl font-black text-white mb-1 flex items-center gap-2">
           <MessageSquare className="text-emerald-500" />
           {text.title}
        </h1>
        <p className="text-zinc-400 text-sm">{text.desc}</p>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden flex shadow-2xl relative">
        
        {/* Sidebar (Ticket List) */}
        <div className={cn(
           "w-full md:w-80 flex flex-col border-white/5 bg-zinc-950/50 shrink-0 transition-all duration-300",
           isRtl ? "border-l" : "border-r",
           activeTicketId ? "hidden md:flex" : "flex"
        )}>
           <div className="p-4 border-b border-white/5">
              <div className="relative">
                 <Search size={16} className={cn("absolute top-1/2 -translate-y-1/2 text-zinc-500", isRtl ? "right-3" : "left-3")} />
                 <input 
                   type="text" 
                   placeholder={text.search}
                   className={cn("w-full bg-black border border-white/10 rounded-xl h-10 text-sm text-white focus:border-emerald-500 outline-none transition-colors", isRtl ? "pr-9 pl-3" : "pl-9 pr-3")}
                 />
              </div>
           </div>
           
           <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {tickets.map(ticket => (
                 <div 
                   key={ticket.id}
                   onClick={() => setActiveTicketId(ticket.id)}
                   className={cn(
                     "p-3 rounded-2xl cursor-pointer transition-all flex gap-3",
                     activeTicketId === ticket.id ? "bg-white/10" : "hover:bg-white/5"
                   )}
                 >
                    <div className="relative shrink-0">
                       <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold",
                          ticket.role === 'admin' ? "bg-yellow-500/20 text-yellow-500" : "bg-zinc-800"
                       )}>
                          <User size={20} />
                       </div>
                       {ticket.online && <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0a0a0a] rounded-full" />}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                       <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-sm text-white truncate">{ticket.user}</span>
                          <span className="text-[10px] text-zinc-500 shrink-0">{ticket.time}</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-xs text-zinc-400 truncate">{ticket.subject}</span>
                          {ticket.unread > 0 && (
                             <span className="w-4 h-4 rounded-full bg-emerald-500 text-black text-[10px] font-bold flex items-center justify-center shrink-0">
                                {ticket.unread}
                             </span>
                          )}
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Chat Area */}
        <div className={cn(
           "flex-1 flex flex-col bg-[url('/hero/hero-bg.avif')] bg-cover bg-center relative",
           !activeTicketId ? "hidden md:flex" : "flex"
        )}>
           <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-0" />
           
           {activeTicket ? (
             <>
                {/* Chat Header */}
                <div className="relative z-10 h-16 border-b border-white/5 bg-zinc-900/80 backdrop-blur-md px-4 md:px-6 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setActiveTicketId(null)}
                        className="md:hidden p-2 -ml-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5"
                      >
                         {isRtl ? <ChevronRight /> : <ChevronLeft />}
                      </button>
                      <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400">
                         <User size={18} />
                      </div>
                      <div>
                         <div className="font-bold text-white text-sm">{activeTicket.user}</div>
                         <div className="text-[10px] text-zinc-400">{text.roles[activeTicket.role as keyof typeof text.roles]} • {activeTicket.subject}</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className={cn(
                         "hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border",
                         activeTicket.status === 'open' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                      )}>
                         <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                         {text.status[activeTicket.status as keyof typeof text.status]}
                      </span>
                      <button className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
                         <MoreVertical size={20} />
                      </button>
                   </div>
                </div>

                {/* Messages List */}
                <div className="relative z-10 flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                   {chatHistory.map((msg) => (
                      <div key={msg.id} className={cn("flex w-full", msg.sender === 'me' ? "justify-end" : "justify-start")}>
                         <div className={cn(
                            "max-w-[85%] md:max-w-[70%] rounded-2xl p-3 md:p-4 text-sm relative shadow-md",
                            msg.sender === 'me' 
                              ? "bg-emerald-600 text-white rounded-tr-sm" 
                              : "bg-zinc-800 text-zinc-200 border border-white/5 rounded-tl-sm"
                         )}>
                            <p className="leading-relaxed">{msg.text}</p>
                            <span className={cn(
                               "text-[9px] block mt-2 opacity-60 font-mono",
                               msg.sender === 'me' ? "text-right text-emerald-100" : "text-left text-zinc-400"
                            )}>
                               {msg.time}
                            </span>
                         </div>
                      </div>
                   ))}
                </div>

                {/* Input Area */}
                <div className="relative z-10 p-4 bg-zinc-950/80 backdrop-blur-md border-t border-white/5">
                   <form onSubmit={handleSendMessage} className="flex items-end gap-2 bg-black border border-white/10 rounded-2xl p-2 focus-within:border-emerald-500/50 transition-colors">
                      <button type="button" className="p-2.5 rounded-xl text-zinc-400 hover:text-emerald-500 hover:bg-emerald-500/10 transition-colors shrink-0">
                         <Paperclip size={20} />
                      </button>
                      <textarea 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={text.typeMessage}
                        className="flex-1 bg-transparent border-none outline-none text-white text-sm resize-none max-h-32 min-h-[44px] py-3 scrollbar-hide"
                        rows={1}
                        onKeyDown={(e) => {
                           if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage(e);
                           }
                        }}
                      />
                      <button 
                        type="submit"
                        disabled={!message.trim()}
                        className="p-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-50 transition-all shrink-0"
                      >
                         <Send size={18} className={cn(isRtl && "rotate-180")} />
                      </button>
                   </form>
                </div>
             </>
           ) : (
             <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-zinc-500">
                <MessageSquare size={48} className="mb-4 opacity-20" />
                <p>یک گفتگو را برای نمایش انتخاب کنید</p>
             </div>
           )}
        </div>

      </div>
    </div>
  );
}
