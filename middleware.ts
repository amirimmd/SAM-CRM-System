import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, isSupportedLocale } from '@/lib/i18n/config';

const LOCALE_PATTERN = new RegExp(`^/(${SUPPORTED_LOCALES.join('|')})(/|$)`);
const EXCLUDED_PATHS = [
  '/robots.txt',
  '/sitemap.xml',
  '/favicon.ico',
  '/manifest.webmanifest',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || EXCLUDED_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  if (LOCALE_PATTERN.test(pathname)) {
    const currentLocale = pathname.split('/')[1];
    if (isSupportedLocale(currentLocale)) {
      return NextResponse.next();
    }
  }

  const redirectURL = request.nextUrl.clone();
  redirectURL.pathname = `/${DEFAULT_LOCALE}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
  return NextResponse.redirect(redirectURL);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|assets|.*\\.(?:js|css|png|jpg|jpeg|gif|svg)$).*)'],
};
