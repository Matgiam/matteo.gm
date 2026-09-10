import { useCallback, useEffect, useMemo, useState } from 'react';
import { I18nContext } from './context';
import { messages } from './messages';
import {
  STORAGE_KEY,
  browserLanguage,
  isSupported,
  rememberLanguage,
  storedLanguage,
} from './detect';

export default function LanguageProvider({ children }) {
  // `choice` is what the visitor picked on the toggle; null means "follow the browser".
  const [choice, setChoice] = useState(storedLanguage);
  const [browser, setBrowser] = useState(browserLanguage);
  const lang = choice ?? browser;
  const t = messages[lang];

  useEffect(() => {
    // Fires when the visitor changes the language in their browser settings.
    const onLanguageChange = () => setBrowser(browserLanguage());
    // Keeps other open tabs in step with a choice made in this one.
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setChoice(storedLanguage());
    };
    window.addEventListener('languagechange', onLanguageChange);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('languagechange', onLanguageChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  // Screen readers, hyphenation and the browser's own translate prompt all read <html lang>.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
  }, [lang, t]);

  const setLanguage = useCallback((next) => {
    if (!isSupported(next)) return;
    const current = browserLanguage();
    // Picking the browser's own language hands control back to automatic detection.
    const explicit = next === current ? null : next;
    rememberLanguage(explicit);
    setChoice(explicit);
    setBrowser(current);
  }, []);

  const value = useMemo(
    () => ({ lang, t, setLanguage, isAutomatic: choice === null }),
    [lang, t, setLanguage, choice],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
