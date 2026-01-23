import type { Locale } from "./config";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, () => Promise<{ dictionary: Dictionary }>> = {
  en: () => import("./dictionaries/en"),
  fa: () => import("./dictionaries/fa"),
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeDeep<T extends Record<string, unknown>>(fallback: T, override?: Partial<T>) {
  if (!override) {
    return fallback;
  }

  const output: Record<string, unknown> = { ...fallback };
  for (const [key, value] of Object.entries(override)) {
    if (value === undefined || value === null) {
      continue;
    }
    const fallbackValue = fallback[key as keyof T];
    if (Array.isArray(value)) {
      output[key] = value;
      continue;
    }
    if (isRecord(value) && isRecord(fallbackValue)) {
      output[key] = mergeDeep(fallbackValue, value);
      continue;
    }
    output[key] = value;
  }

  return output as T;
}

export async function getDictionary(locale: Locale) {
  const fallback = await dictionaries.en().then((module) => module.dictionary);
  if (locale === "en") {
    return fallback;
  }

  try {
    const target = await dictionaries[locale]().then((module) => module.dictionary);
    return mergeDeep(fallback, target);
  } catch {
    return fallback;
  }
}
