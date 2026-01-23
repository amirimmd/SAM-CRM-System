export const SUPPORTED_LOCALES = ['fa', 'en'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'fa';
export const FALLBACK_LOCALE: Locale = 'fa';

// این خطوط جدید اضافه شده‌اند که باعث خطا شده بودند
export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

export function getLocaleDir(locale: Locale): 'rtl' | 'ltr' {
  return locale === 'fa' ? 'rtl' : 'ltr';
}

export function isSupportedLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}
