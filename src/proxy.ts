import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './lib/i18n/config';

function hasLocale(pathname: string) {
  return (SUPPORTED_LOCALES as readonly string[]).some(
    (l) => pathname === '/' + l || pathname.startsWith('/' + l + '/')
  );
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/favicon')) {
    return NextResponse.next();
  }

  if (!hasLocale(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = '/' + DEFAULT_LOCALE + pathname;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
};
