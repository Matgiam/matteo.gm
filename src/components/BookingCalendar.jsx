import { useMemo } from 'react';
import { useI18n } from '../i18n/context';
import { addMonths, fromIso, monthStart, monthWeeks, todayIso } from '../lib/dates';

/**
 * A month of evenings. `statuses` maps 'YYYY-MM-DD' to a status; days not listed
 * are free. Visitors can only pick free days; in admin mode every day in range
 * is clickable (to block, free, or open the booking on it).
 *
 * Status vocabulary: free, pending, unavailable (public), confirmed, blocked (admin).
 */

const LEGEND = {
  public: ['free', 'pending', 'unavailable'],
  admin: ['free', 'pending', 'confirmed', 'blocked'],
};

// Colour is never the only signal: holds are a ring, busy days a solid dot and a struck number.
const dotKind = (status) =>
  status === 'free' ? 'free' : status === 'pending' ? 'pending' : 'busy';

const capitalise = (text) => text.charAt(0).toUpperCase() + text.slice(1);

export default function BookingCalendar({
  month,
  onMonthChange,
  statuses,
  selected,
  onSelect,
  minDate,
  maxDate,
  mode = 'public',
  loading = false,
}) {
  const { t, lang } = useI18n();
  const copy = t.calendar;
  const locale = lang === 'fr' ? 'fr-FR' : 'en-GB';
  const today = todayIso();

  const formats = useMemo(
    () => ({
      month: new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }),
      day: new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      weekdayShort: new Intl.DateTimeFormat(locale, { weekday: 'narrow' }),
      weekdayLong: new Intl.DateTimeFormat(locale, { weekday: 'long' }),
    }),
    [locale],
  );

  // 2024-01-01 was a Monday; the grid starts the week on Monday.
  const weekdays = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const date = fromIso(`2024-01-0${i + 1}`);
        return { short: formats.weekdayShort.format(date), long: formats.weekdayLong.format(date) };
      }),
    [formats],
  );

  const statusOf = (iso) => (iso < minDate || iso > maxDate ? 'out' : (statuses[iso] ?? 'free'));
  const canGoBack = month > monthStart(minDate);
  const canGoForward = addMonths(month, 1) <= maxDate;

  return (
    <div className={`cal${loading ? ' is-loading' : ''}`} aria-busy={loading}>
      <div className="cal__head">
        <button
          type="button"
          className="cal__nav"
          onClick={() => onMonthChange(addMonths(month, -1))}
          disabled={!canGoBack}
          aria-label={copy.previous}
        >
          ←
        </button>
        <h3 className="cal__month" aria-live="polite">
          {capitalise(formats.month.format(fromIso(month)))}
        </h3>
        <button
          type="button"
          className="cal__nav"
          onClick={() => onMonthChange(addMonths(month, 1))}
          disabled={!canGoForward}
          aria-label={copy.next}
        >
          →
        </button>
      </div>

      <div className="cal__weekdays" aria-hidden="true">
        {weekdays.map(({ short, long }) => (
          <span key={long} title={long}>
            {short}
          </span>
        ))}
      </div>

      <div className="cal__days">
        {monthWeeks(month)
          .flat()
          .map((iso, index) => {
            if (!iso) return <span key={`blank-${index}`} aria-hidden="true" />;
            const status = statusOf(iso);
            const clickable = status !== 'out' && (mode === 'admin' || status === 'free');
            const isSelected = iso === selected;
            return (
              <button
                key={iso}
                type="button"
                className={`cal__day cal__day--${status}${isSelected ? ' is-selected' : ''}${
                  iso === today ? ' is-today' : ''
                }`}
                disabled={!clickable}
                aria-pressed={isSelected}
                aria-label={`${formats.day.format(fromIso(iso))}, ${copy.status[status]}`}
                onClick={() => onSelect(iso)}
              >
                <span className="cal__num">{Number(iso.slice(8))}</span>
                {status !== 'out' && (
                  <span className={`cal__dot cal__dot--${dotKind(status)}`} aria-hidden="true" />
                )}
              </button>
            );
          })}
      </div>

      <ul className="cal__legend">
        {LEGEND[mode].map((status) => (
          <li key={status}>
            <span
              className={`cal__dot cal__dot--${dotKind(status)}${status === 'blocked' ? ' cal__dot--hatched' : ''}`}
              aria-hidden="true"
            />
            {copy.status[status]}
          </li>
        ))}
      </ul>
    </div>
  );
}
