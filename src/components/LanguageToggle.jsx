import { LANGUAGES } from '../i18n/detect';
import { useI18n } from '../i18n/context';

/** EN / FR switch. Sits in the nav bar on desktop and inside the menu panel on mobile. */
export default function LanguageToggle({ className = '' }) {
  const { lang, setLanguage, t } = useI18n();

  return (
    <div className={`lang-toggle ${className}`.trim()} role="group" aria-label={t.language.label}>
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          className="lang-toggle__btn"
          aria-pressed={lang === code}
          aria-label={t.language.names[code]}
          title={t.language.names[code]}
          onClick={() => setLanguage(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
