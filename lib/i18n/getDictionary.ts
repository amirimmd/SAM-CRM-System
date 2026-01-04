import type { Locale } from './config';

/**
 * Asynchronously load the translation dictionary for the requested locale.
 * This uses dynamic `import()` to enable code splitting per locale.
 */
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