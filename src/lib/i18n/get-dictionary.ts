import type { Locale } from "./config";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, () => Promise<{ dictionary: Dictionary }>> = {
  en: () => import("./dictionaries/en"),
  fa: () => import("./dictionaries/fa"),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]().then((module) => module.dictionary);
}
