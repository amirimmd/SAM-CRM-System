import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, isSupportedLocale } from '@/lib/i18n/config';

// الگوی تشخیص زبان در ابتدای URL
const LOCALE_PATTERN = new RegExp(`^/(${SUPPORTED_LOCALES.join('|')})(/|$)`);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ۱. نادیده گرفتن فایل‌های سیستمی Next.js، پوشه API و فایل‌های استاتیک رایج
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') || 
    pathname.startsWith('/favicon.ico') ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|css|js|map)$/) // نادیده گرفتن تمام فایل‌های استاتیک
  ) {
    return NextResponse.next();
  }

  // ۲. بررسی اینکه آیا مسیر فعلی زبان دارد یا خیر
  // اگر مسیر با یکی از زبان‌های پشتیبانی شده شروع شود (مثل /en/dashboard یا /fa)
  if (LOCALE_PATTERN.test(pathname)) {
    const localeSegment = pathname.split('/')[1];
    // اطمینان حاصل کنیم که بخش اول واقعاً یکی از زبان‌های ماست
    if (isSupportedLocale(localeSegment)) {
      return NextResponse.next();
    }
  }

  // ۳. اگر زبان در URL نبود، ریدارکت کن به زبان پیش‌فرض (مثلاً /fa)
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
  
  return NextResponse.redirect(url);
}

// تنظیمات Matcher برای اینکه پروکسی روی فایل‌های غیرضروری اجرا نشود (بهینه سازی سرعت)
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - extension files (svg, png, jpg, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
