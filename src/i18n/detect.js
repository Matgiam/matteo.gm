/**
 * Which language to show. An explicit choice from the toggle is remembered in
 * localStorage; without one, the site follows the browser's own preferences.
 */

export const LANGUAGES = ['en', 'fr'];
export const DEFAULT_LANGUAGE = 'en';
export const STORAGE_KEY = 'matteo.gm:lang';

export const isSupported = (value) => LANGUAGES.includes(value);

/** First browser preference we have a translation for: "fr-CA" gives "fr", ["de", "fr"] gives "fr". */
export function browserLanguage() {
  if (typeof navigator === 'undefined') return DEFAULT_LANGUAGE;
  const preferences = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of preferences) {
    const base = String(tag || '')
      .toLowerCase()
      .split('-')[0];
    if (isSupported(base)) return base;
  }
  return DEFAULT_LANGUAGE;
}

export function storedLanguage() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return isSupported(value) ? value : null;
  } catch {
    return null;
  }
}

/** Pass `null` to forget the choice and go back to following the browser. */
export function rememberLanguage(lang) {
  try {
    if (lang) window.localStorage.setItem(STORAGE_KEY, lang);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // storage blocked: the choice simply lasts for this visit
  }
}
