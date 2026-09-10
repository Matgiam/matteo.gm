import { isValidElement } from 'react';
import en from './locales/en';
import fr from './locales/fr';

// Nested sections are plain objects; strings, JSX, arrays and functions are leaf values.
const isSection = (value) =>
  value !== null && typeof value === 'object' && !Array.isArray(value) && !isValidElement(value);

/** Key-by-key merge, so a string missing from French shows in English instead of blank. */
function withFallback(base, override) {
  if (override === undefined) return base;
  if (!isSection(base) || !isSection(override)) return override;
  const merged = { ...base };
  for (const key of Object.keys(override)) merged[key] = withFallback(base[key], override[key]);
  return merged;
}

function keysMissingFrom(source, target, path = '') {
  if (!isSection(source)) return [];
  return Object.keys(source).flatMap((key) => {
    const here = path ? `${path}.${key}` : key;
    if (!isSection(target) || !(key in target)) return [here];
    return keysMissingFrom(source[key], target[key], here);
  });
}

if (import.meta.env.DEV) {
  const untranslated = keysMissingFrom(en, fr);
  const unknown = keysMissingFrom(fr, en);
  if (untranslated.length) {
    console.warn(
      `[i18n] Not translated to French yet, English is shown:\n  ${untranslated.join('\n  ')}`,
    );
  }
  if (unknown.length) {
    console.warn(
      `[i18n] French keys with no English counterpart (typo?):\n  ${unknown.join('\n  ')}`,
    );
  }
}

export const messages = { en, fr: withFallback(en, fr) };
