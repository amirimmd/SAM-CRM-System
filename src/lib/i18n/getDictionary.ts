import type { Locale } from './config';

export async function getDictionary(locale: Locale) {
  switch (locale) {
    case 'fa':
      return (await import('./dictionaries/fa.json')).default;
    case 'en':
      return (await import('./dictionaries/en.json')).default;
    default:
      return (await import('./dictionaries/fa.json')).default;
  }
}
