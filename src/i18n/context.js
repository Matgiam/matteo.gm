import { createContext, useContext } from 'react';

export const I18nContext = createContext(null);

/** `t` is the dictionary for the active language: `t.nav.home`, `t.book.types.house`… */
export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n() must be used inside <LanguageProvider>.');
  return value;
}
