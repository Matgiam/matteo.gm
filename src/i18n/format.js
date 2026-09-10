/**
 * Dates are stored once as ISO strings and formatted per language, so the two
 * translations can never disagree about when a concert is.
 */

// en-GB abbreviates September as "Sept", matching the site's original copy.
const LOCALES = { en: 'en-GB', fr: 'fr-FR' };

// Midday, so no visitor's timezone can push the date into the previous day.
const toDate = (iso) => new Date(`${iso}T12:00:00`);

const capitalise = (text) => text.charAt(0).toUpperCase() + text.slice(1);

/** "12" */
export function formatDay(iso, lang) {
  return new Intl.DateTimeFormat(LOCALES[lang], { day: '2-digit' }).format(toDate(iso));
}

/** "Sept 2026" in English, "Sept. 2026" in French (capitalised, as it can open a line). */
export function formatMonthYear(iso, lang) {
  const text = new Intl.DateTimeFormat(LOCALES[lang], { month: 'short', year: 'numeric' }).format(
    toDate(iso),
  );
  return capitalise(text);
}
