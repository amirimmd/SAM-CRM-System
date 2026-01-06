import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  SUPPORTED_LOCALES,
  isSupportedLocale,
} from "@/lib/i18n/config";

const LOCALE_PATTERN = new RegExp(`^/(${SUPPORTED_LOCALES.join("|")})(/|$)`);
const EXCLUDED_PATHS = [
  "/robots.txt",
  "/sitemap.xml",
  "/favicon.ico",
  "/manifest.webmanifest",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    EXCLUDED_PATHS.includes(pathname)
  ) {
    return NextResponse.next();
  }

  if (LOCALE_PATTERN.test(pathname)) {
    const currentLocale = pathname.split("/")[1];
    if (isSupportedLocale(currentLocale)) {
      const response = NextResponse.next();
      response.cookies.set(LOCALE_COOKIE_NAME, currentLocale, {
        path: "/",
        sameSite: "lax",
      });
      return response;
    }
  }

  const redirectURL = request.nextUrl.clone();
  redirectURL.pathname = `/${DEFAULT_LOCALE}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
  const response = NextResponse.redirect(redirectURL);
  response.cookies.set(LOCALE_COOKIE_NAME, DEFAULT_LOCALE, {
    path: "/",
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|assets|.*\\.(?:js|css|png|jpg|jpeg|gif|svg)$).*)",
  ],
};
