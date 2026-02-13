'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Send, Paperclip, Headphones, User, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PartnerSupportPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'fa';
  const isRtl = locale === 'fa';

  const t = {
    fa: {
      title: 'پشتیبانی آنلاین',
      desc: 'گفتگوی مستقیم با کارشناسان سام لجستیک برای پیگیری امور.',
      placeholder: 'پیام خود را بنویسید...',
      agent: 'کارشناس پشتیبانی',
      status: 'پاسخگویی سریع'
    },
    en: {
      title: 'Online Support',
      desc: 'Chat directly with SAM Logistics experts.',
      placeholder: 'Type your message...',
      agent: 'Support Agent',
      status: 'Typically replies instantly'
    }
  };

  const text = isRtl ? t.fa : t.en;

  const [messages, setMessages] = useState([
    { id: 1, sender: 'agent', text: isRtl ? 'سلام! چطور می‌توانم کمکتان کنم؟' : 'Hello! How can I help you?', time: '10:00' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'me', text: input, time: 'Now' }]);
    setInput('');
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col font-vazirmatn pb-4">
      <div className="mb-4 shrink-0">
        <h1 className="text-2xl md:text-3xl font-black text-white mb-1 flex items-center gap-2">
           <Headphones className="text-blue-500" />
           {text.title}
        </h1>
        <p className="text-zinc-400 text-sm">{text.desc}</p>
      </div>

      <div className="flex-1 bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden flex flex-col shadow-2xl relative">
         <div className="h-16 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md px-6 flex items-center gap-3 shrink-0">
            <div className="relative">
               <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                  <User size={20} />
               </div>
               <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0a0a0a] rounded-full" />
            </div>
            <div>
               <div className="font-bold text-white text-sm">{text.agent}</div>
               <div className="text-[10px] text-emerald-500">{text.status}</div>
            </div>
         </div>

         <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-[url('/hero/hero-bg.avif')] bg-cover bg-center relative">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
            
            {messages.map((msg) => (
               <div key={msg.id} className={cn("flex w-full relative z-10", msg.sender === 'me' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                     "max-w-[80%] p-3 md:p-4 text-sm relative shadow-md rounded-2xl",
                     msg.sender === 'me' ? "bg-blue-600 text-white rounded-tr-sm" : "bg-zinc-800 text-zinc-200 border border-white/5 rounded-tl-sm"
                  )}>
                     <p>{msg.text}</p>
                     <span className={cn("text-[9px] block mt-1 opacity-60 font-mono", msg.sender === 'me' ? "text-right" : "text-left")}>{msg.time}</span>
                  </div>
               </div>
            ))}
         </div>

         <div className="p-3 bg-zinc-950 border-t border-white/5 shrink-0 relative z-20">
            <form onSubmit={handleSend} className="max-w-4xl mx-auto flex items-end gap-2 bg-black border border-white/10 rounded-3xl p-1.5 focus-within:border-blue-500/50 transition-colors">
               <button type="button" className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors shrink-0">
                  <Paperclip size={20} />
               </button>
               <input 
                 type="text" 
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 placeholder={text.placeholder}
                 className="flex-1 bg-transparent border-none outline-none text-white text-sm h-[44px] px-2"
               />
               <button type="submit" disabled={!input.trim()} className="p-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 transition-all shrink-0">
                  <Send size={18} className={cn(isRtl && "rotate-180")} />
               </button>
            </form>
         </div>
      </div>
    </div>
  );
}
