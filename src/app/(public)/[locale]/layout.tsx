import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Vazirmatn } from "next/font/google";
import "../../globals.css";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";
import { Header } from '@/ui/layout/header';
import { generateOrganizationSchema } from '@/lib/seo/schema';
import { Mail, MapPin, Phone, Globe2, ArrowUpRight, Linkedin, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';

// English Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Persian Font (Vazirmatn)
const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isRtl = locale === 'fa';
  const dir = isRtl ? 'rtl' : 'ltr';
  const jsonLd = generateOrganizationSchema();

  return (
    <div dir={dir} className={cn(
      "flex min-h-screen flex-col font-sans antialiased",
      geistSans.variable,
      geistMono.variable,
      vazirmatn.variable,
      isRtl ? "font-vazirmatn" : "font-sans"
    )}>
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Header locale={locale} />
      
      <main className="flex-1">
        {children}
      </main>
      
      {/* --- PROFESSIONAL GLOBAL FOOTER --- */}
      <footer className="relative bg-[#080808] text-white pt-24 pb-12 overflow-hidden border-t border-white/5">
        
        {/* Background World Map Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center bg-no-repeat pointer-events-none grayscale" />
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-[128px] pointer-events-none" />

        <div className="container relative z-10 px-6 mx-auto">
          
          {/* Top Section: CTA & Brand */}
          <div className="flex flex-col lg:flex-row justify-between items-start mb-20 gap-12 border-b border-white/5 pb-12">
            <div className="max-w-xl">
               <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                 {isRtl ? 'آماده‌اید تجارت خود را' : 'Ready to expand your'} <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-600">
                   {isRtl ? 'جهانی کنید؟' : 'business globally?'}
                 </span>
               </h2>
               <p className="text-zinc-400 text-lg leading-relaxed">
                 {isRtl 
                   ? 'با شبکه لجستیک قدرتمند سام، مرزها معنایی ندارند. از چین تا دبی و ایران، ما پل ارتباطی کسب‌وکار شما هستیم.'
                   : 'With SAM\'s powerful logistics network, borders mean nothing. From China to Dubai and Iran, we are your business bridge.'}
               </p>
            </div>
            
            <div className="flex flex-col gap-4 min-w-[200px]">
               <Link href={`/${locale}/contact`} className="group flex items-center justify-between w-full bg-white text-black px-6 py-4 rounded-xl font-bold hover:bg-yellow-400 transition-all">
                  <span>{isRtl ? 'شروع همکاری' : 'Start Partnership'}</span>
                  <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
               </Link>
               <Link href={`/${locale}/tracking`} className="group flex items-center justify-between w-full bg-white/5 text-white border border-white/10 px-6 py-4 rounded-xl font-bold hover:bg-white/10 transition-all">
                  <span>{isRtl ? 'رهگیری مرسوله' : 'Track Shipment'}</span>
                  <Globe2 className="text-zinc-500 group-hover:text-white transition-colors" />
               </Link>
            </div>
          </div>

          {/* Middle Section: Locations & Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            
            {/* China Office */}
            <div className="space-y-6">
               <h3 className="text-lg font-bold text-white flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-red-500"></span>
                 {isRtl ? 'دفتر چین (گوانجو)' : 'China HQ (Guangzhou)'}
               </h3>
               <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider">SAM Guangzhou Trading</p>
               <div className="space-y-4 text-zinc-400 text-sm leading-relaxed">
                 <div className="flex gap-3">
                    <MapPin size={18} className="shrink-0 mt-1 text-zinc-600" />
                    <span>No 55. Bin bin electronic new city, Liwan Lu, Guangzhou, China</span>
                 </div>
                 <div className="flex gap-3">
                    <Phone size={18} className="shrink-0 mt-1 text-zinc-600" />
                    <a href="tel:+8613610271731" className="hover:text-white transition-colors" dir="ltr">+86 136 1027 1731</a>
                 </div>
               </div>
            </div>

            {/* Dubai Office */}
            <div className="space-y-6">
               <h3 className="text-lg font-bold text-white flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                 {isRtl ? 'دفتر دبی (امارات)' : 'Dubai Office (UAE)'}
               </h3>
               <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider">SAWAT ALMASAR Trading Co.</p>
               <div className="space-y-4 text-zinc-400 text-sm leading-relaxed">
                 <div className="flex gap-3">
                    <MapPin size={18} className="shrink-0 mt-1 text-zinc-600" />
                    <span>Dubai, UAE (Office Address)</span>
                 </div>
                 <div className="flex gap-3">
                    <Phone size={18} className="shrink-0 mt-1 text-zinc-600" />
                    <a href="tel:+971501034008" className="hover:text-white transition-colors" dir="ltr">+971 50 103 4008</a>
                 </div>
               </div>
            </div>

            {/* Iran Office */}
            <div className="space-y-6">
               <h3 className="text-lg font-bold text-white flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-green-500"></span>
                 {isRtl ? 'دفتر ایران' : 'Iran Office'}
               </h3>
               <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider">{isRtl ? 'تجارت خلیج فارس الکترونیک' : 'Persian Gulf Electronics'}</p>
               <div className="space-y-4 text-zinc-400 text-sm leading-relaxed">
                 <div className="flex gap-3">
                    <MapPin size={18} className="shrink-0 mt-1 text-zinc-600" />
                    <span>{isRtl ? 'تهران، ایران' : 'Tehran, Iran'}</span>
                 </div>
                 <div className="flex gap-3">
                    <Phone size={18} className="shrink-0 mt-1 text-zinc-600" />
                    <a href="tel:+989121955663" className="hover:text-white transition-colors" dir="ltr">+98 912 195 5663</a>
                 </div>
               </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
               <h3 className="text-lg font-bold text-white">{isRtl ? 'دسترسی سریع' : 'Quick Links'}</h3>
               <nav className="flex flex-col gap-3 text-zinc-400 text-sm">
                  <Link href={`/${locale}/products`} className="hover:text-yellow-400 transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                    {isRtl ? 'محصولات ما' : 'Our Products'}
                  </Link>
                  <Link href={`/${locale}/tracking`} className="hover:text-yellow-400 transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                    {isRtl ? 'پیگیری سفارش' : 'Track Order'}
                  </Link>
                  <Link href={`/${locale}/contact`} className="hover:text-yellow-400 transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                    {isRtl ? 'تماس با ما' : 'Contact Us'}
                  </Link>
                  <Link href={`/${locale}/about`} className="hover:text-yellow-400 transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                    {isRtl ? 'درباره شرکت' : 'About Company'}
                  </Link>
               </nav>
            </div>

          </div>

          {/* Bottom Section: Copyright & Social */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6">
             <p className="text-zinc-500 text-sm">
               © 2026 SAM Logistics Group. {isRtl ? 'تمامی حقوق محفوظ است.' : 'All rights reserved.'}
             </p>
             
             <div className="flex items-center gap-4">
                <SocialLink href="#" icon={<Linkedin size={18} />} />
                <SocialLink href="#" icon={<Twitter size={18} />} />
                <SocialLink href="#" icon={<Instagram size={18} />} />
                <SocialLink href="mailto:info@saminto.com" icon={<Mail size={18} />} />
             </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-300"
    >
      {icon}
    </a>
  );
}
