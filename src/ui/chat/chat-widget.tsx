'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Paperclip, 
  File, 
  Image as ImageIcon, 
  Minimize2,
  User,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'text' | 'file';
  content: string;
  fileName?: string;
  fileType?: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

interface ChatWidgetProps {
  locale: string;
}

export function ChatWidget({ locale }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isRtl = locale === 'fa';

  // پیام خوش‌آمدگویی اولیه
  useEffect(() => {
    const initialMessage: Message = {
      id: 'init',
      type: 'text',
      content: locale === 'fa' 
        ? 'سلام! 👋 \nچطور می‌توانم در مورد حمل بار یا پیگیری سفارش به شما کمک کنم؟' 
        : 'Hello! 👋 \nHow can I assist you with shipping or order tracking today?',
      sender: 'agent',
      timestamp: new Date()
    };
    setMessages([initialMessage]);
  }, [locale]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'text',
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // شبیه‌سازی پاسخ خودکار اپراتور
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        type: 'text',
        content: locale === 'fa' 
          ? 'پیام شما دریافت شد. کارشناسان ما در حال بررسی هستند و به زودی پاسخ می‌دهند.' 
          : 'Message received. Our experts are reviewing your inquiry and will reply shortly.',
        sender: 'agent',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'file',
      content: 'File uploaded',
      fileName: file.name,
      fileType: isImage ? 'image' : 'doc',
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';

    // شبیه‌سازی تایید دریافت فایل
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        type: 'text',
        content: locale === 'fa' 
          ? `فایل "${file.name}" با موفقیت دریافت شد.` 
          : `File "${file.name}" received successfully.`,
        sender: 'agent',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={cn("fixed bottom-6 z-[100] font-vazirmatn", isRtl ? "left-6" : "right-6")}>
      
      {/* دکمه باز کردن چت (Launcher) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-600 to-yellow-400 text-black shadow-[0_4px_20px_rgba(234,179,8,0.4)] hover:scale-110 transition-all duration-300 flex items-center justify-center relative z-20",
          isOpen ? "rotate-90 opacity-0 scale-50 pointer-events-none absolute" : "rotate-0 opacity-100 scale-100"
        )}
      >
        <MessageCircle size={28} fill="currentColor" className="text-black/80" />
        {/* نشانگر آنلاین بودن */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-black rounded-full animate-pulse" />
      </button>

      {/* پنجره چت (Window) */}
      <div 
        className={cn(
          "w-[340px] md:w-[380px] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col transition-all duration-500 origin-bottom-right overflow-hidden absolute bottom-0",
          isRtl ? "left-0 origin-bottom-left" : "right-0 origin-bottom-right",
          isOpen 
            ? "opacity-100 scale-100 translate-y-0 h-[550px] max-h-[80vh]" 
            : "opacity-0 scale-75 translate-y-10 h-0 pointer-events-none"
        )}
      >
        {/* هدر چت */}
        <div className="p-4 bg-zinc-900 border-b border-white/5 flex items-center justify-between shadow-lg relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center border-2 border-zinc-800 shadow-inner">
                <User className="text-black" size={20} />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-zinc-900 rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white text-sm">
                {locale === 'fa' ? 'پشتیبانی سام لجستیک' : 'SAM Support'}
              </span>
              <span className="text-[10px] text-zinc-400 font-medium">
                {locale === 'fa' ? 'پاسخگویی سریع' : 'Typically replies instantly'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
             <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors">
                <Minimize2 size={18} />
             </button>
             <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-colors">
                <X size={18} />
             </button>
          </div>
        </div>

        {/* لیست پیام‌ها */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('/hero/hero-bg.avif')] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" /> {/* تیره کردن پس‌زمینه */}
          
          <div className="relative z-10 space-y-4">
            <div className="flex justify-center">
                <span className="text-[10px] bg-zinc-800/80 text-zinc-400 px-3 py-1 rounded-full border border-white/5 backdrop-blur-md">
                    {locale === 'fa' ? 'امروز' : 'Today'}
                </span>
            </div>

            {messages.map((msg) => (
                <div 
                key={msg.id} 
                className={cn(
                    "flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300",
                    msg.sender === 'user' ? "justify-end" : "justify-start"
                )}
                >
                <div 
                    className={cn(
                    "max-w-[85%] rounded-2xl p-3 text-sm relative shadow-md",
                    msg.sender === 'user' 
                        ? "bg-yellow-500 text-black rounded-tr-sm" 
                        : "bg-zinc-800 text-zinc-200 border border-white/5 rounded-tl-sm"
                    )}
                >
                    {msg.type === 'text' ? (
                    <p className="leading-relaxed whitespace-pre-line">{msg.content}</p>
                    ) : (
                    <div className="flex items-center gap-3 bg-black/10 p-2.5 rounded-xl cursor-pointer hover:bg-black/20 transition-colors">
                        <div className="p-2 bg-white/20 rounded-lg">
                        {msg.fileType === 'image' ? <ImageIcon size={20} /> : <File size={20} />}
                        </div>
                        <div className="flex flex-col overflow-hidden min-w-[100px]">
                        <span className="text-xs font-bold truncate max-w-[140px]">{msg.fileName}</span>
                        <span className="text-[10px] opacity-70 uppercase tracking-wider">{msg.fileType} FILE</span>
                        </div>
                    </div>
                    )}
                    <span className={cn(
                    "text-[9px] block mt-1.5 opacity-60 font-mono",
                    msg.sender === 'user' ? "text-right text-black/70" : "text-left text-zinc-400"
                    )}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* ناحیه ورودی (Input) */}
        <div className="p-3 bg-zinc-950 border-t border-white/10 relative z-20">
          <div className="flex items-end gap-2 bg-zinc-900 border border-white/10 rounded-2xl p-2 focus-within:border-yellow-500/50 focus-within:ring-1 focus-within:ring-yellow-500/20 transition-all">
            
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-xl text-zinc-400 hover:text-yellow-500 hover:bg-yellow-500/10 transition-colors shrink-0"
              title={locale === 'fa' ? 'ارسال فایل' : 'Attach file'}
            >
              <Paperclip size={20} />
            </button>

            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={locale === 'fa' ? 'پیام خود را بنویسید...' : 'Type a message...'}
              className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-zinc-600 resize-none max-h-24 py-3 min-h-[44px] scrollbar-hide"
              rows={1}
            />

            <button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="p-2.5 rounded-xl bg-yellow-500 text-black hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-yellow-500/20 shrink-0"
            >
              <Send size={18} className={cn(isRtl && "rotate-180")} />
            </button>
          </div>
          <div className="text-center mt-2">
             <div className="flex items-center justify-center gap-1.5 text-[9px] text-zinc-600">
                <div className="w-1 h-1 rounded-full bg-green-500" />
                <span>Secured by SAM CRM</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
