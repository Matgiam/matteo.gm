import { useCallback, useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import BookingCalendar from '../components/BookingCalendar';
import { usePageAnimation } from '../hooks/usePageAnimation';
import { useI18n } from '../i18n/context';
import { contact, emailjsConfig, isEmailjsConfigured } from '../config';
import { bookingTypes } from '../data/site';
import { bookingApi, BookingError } from '../lib/bookingApi';
import { addDays, fromIso, monthEnd, monthStart, toIso, todayIso } from '../lib/dates';

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  date: '',
  venue: '',
  type: bookingTypes[0],
  message: '',
  // honeypot: hidden from people, filled in by bots
  website: '',
};

// Bookable window: from tomorrow until 12 months from today (the database enforces the same).
function bookableRange() {
  const today = todayIso();
  const now = fromIso(today);
  const inAYear = toIso(new Date(now.getFullYear() + 1, now.getMonth(), now.getDate(), 12));
  return { minDate: addDays(today, 1), maxDate: addDays(inAYear, -1) };
}

export default function Book() {
  const scope = usePageAnimation();
  const { t, lang } = useI18n();
  const copy = t.book;
  const locale = lang === 'fr' ? 'fr-FR' : 'en-GB';

  // Without a backend the page offers only the message form, as before.
  const [mode, setMode] = useState(bookingApi ? 'date' : 'message');
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle');
  // Stored as data rather than a sentence, so the message follows a language switch.
  const [error, setError] = useState(null);

  const [{ minDate, maxDate }] = useState(bookableRange);
  const [month, setMonth] = useState(() => monthStart(minDate));
  const [statuses, setStatuses] = useState({});
  const [calendarState, setCalendarState] = useState('loading');
  const [selected, setSelected] = useState(null);
  const [requestedDay, setRequestedDay] = useState(null);
  const latestLoad = useRef(0);

  const loadMonth = useCallback(async (monthIso) => {
    if (!bookingApi) return;
    const load = (latestLoad.current += 1);
    setCalendarState('loading');
    try {
      const days = await bookingApi.fetchCalendar(monthIso, monthEnd(monthIso));
      if (load !== latestLoad.current) return; // a newer month was asked for meanwhile
      const prefix = monthIso.slice(0, 7);
      setStatuses((previous) => ({
        ...Object.fromEntries(Object.entries(previous).filter(([day]) => !day.startsWith(prefix))),
        ...days,
      }));
      setCalendarState('ready');
    } catch {
      if (load === latestLoad.current) setCalendarState('error');
    }
  }, []);

  useEffect(() => {
    if (mode === 'date') loadMonth(month);
  }, [mode, month, loadMonth]);

  const formatDate = (iso) =>
    new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(fromIso(iso));

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const switchMode = (next) => {
    setMode(next);
    setStatus('idle');
    setError(null);
  };

  const selectDay = (day) => {
    setSelected(day);
    if (status === 'error') {
      setStatus('idle');
      setError(null);
    }
  };

  const submitDated = async () => {
    if (!selected) {
      setStatus('error');
      setError({ kind: 'pickFirst' });
      return;
    }
    setStatus('sending');
    setError(null);
    try {
      await bookingApi.requestBooking({
        day: selected,
        name: form.name,
        email: form.email,
        phone: form.phone,
        venue: form.venue,
        bookingType: form.type,
        message: form.message,
        language: lang,
        website: form.website,
      });
      setRequestedDay(selected);
      setSelected(null);
      setForm(EMPTY);
      setStatus('sent');
      loadMonth(month);
    } catch (err) {
      const code = err instanceof BookingError ? err.code : 'unknown';
      setStatus('error');
      setError({ kind: 'booking', code });
      if (code === 'day_taken' || code === 'day_unavailable' || code === 'invalid_day') {
        setSelected(null);
        loadMonth(month);
      }
    }
  };

  const submitMessage = async () => {
    if (!isEmailjsConfigured) {
      setStatus('error');
      setError({ kind: 'notConfigured' });
      return;
    }

    setStatus('sending');
    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: form.name,
          reply_to: form.email,
          date: form.date,
          venue: form.venue,
          booking_type: copy.types[form.type],
          message: form.message,
          // "en" or "fr", so you know which language to reply in
          language: lang,
        },
        { publicKey: emailjsConfig.publicKey },
      );
      setStatus('sent');
      setForm(EMPTY);
    } catch (err) {
      setStatus('error');
      setError({ kind: 'failed', detail: err?.text });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'date') submitDated();
    else submitMessage();
  };

  const errorText = !error
    ? ''
    : error.kind === 'pickFirst'
      ? copy.dated.pickFirst
      : error.kind === 'booking'
        ? (copy.bookingErrors[error.code] ?? copy.bookingErrors.unknown)
        : error.kind === 'notConfigured'
          ? copy.errors.notConfigured(contact.booking)
          : copy.errors.failed(error.detail || copy.errors.network, contact.booking);

  const sendLabel =
    mode === 'date'
      ? status === 'sending'
        ? copy.dated.sending
        : copy.dated.submit
      : copy.submit[status === 'sending' || status === 'sent' ? status : 'idle'];

  const dated = mode === 'date';

  /* The form is the point of this page, so it comes first in the source: on
     mobile that is also the visual order, and keyboard order matches. On
     desktop the stylesheet pulls the intro back into the left column. */
  const intro = (
    <div className="sticky-col book__intro">
      <img
        src="/assets/matteo-portrait.jpg"
        alt="Matteo"
        style={{
          width: 150,
          height: 150,
          objectFit: 'cover',
          objectPosition: '70% 15%',
          borderRadius: '50%',
          display: 'block',
          marginBottom: 28,
          boxShadow: 'var(--shadow-sm)',
        }}
      />
      <div className="eyebrow" style={{ marginBottom: 18 }}>
        {copy.eyebrow}
      </div>
      <h1
        className="display"
        style={{ fontSize: 'clamp(40px,4vw,60px)', lineHeight: 1.08, margin: '0 0 22px' }}
      >
        {copy.title}
      </h1>
      <p
        style={{
          color: 'var(--muted)',
          fontSize: 18,
          margin: '0 0 32px',
          maxWidth: '44ch',
          textWrap: 'pretty',
        }}
      >
        {copy.lede}
      </p>

      <div className="steps">
        {copy.steps.map((step, i) => (
          <div key={i}>
            <span className="steps__n">{i + 1}.</span>
            <span>{step}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 40,

          paddingTop: 26,
          fontSize: 16.5,
          color: 'var(--muted-2)',
          display: 'grid',
          gap: 10,
        }}
      ></div>
    </div>
  );

  const requestedView = (
    <div className="book__success" role="status">
      <p>{copy.dated.success(formatDate(requestedDay ?? minDate))}</p>
      <button
        type="button"
        className="btn-outline btn-outline--sm"
        onClick={() => {
          setRequestedDay(null);
          setStatus('idle');
        }}
      >
        {copy.dated.another}
      </button>
    </div>
  );

  return (
    <main ref={scope} className="shell page split split--aside">
      <div className="panel book__form">
        {bookingApi && (
          <div className="book__modes" role="group" aria-label={copy.modes.label}>
            {['date', 'message'].map((option) => (
              <button
                key={option}
                type="button"
                className="book__mode"
                aria-pressed={mode === option}
                onClick={() => switchMode(option)}
              >
                {copy.modes[option]}
              </button>
            ))}
          </div>
        )}

        {dated && status === 'sent' && requestedDay ? (
          requestedView
        ) : (
          <>
            {dated && (
              <div className="book__calendar">
                <p className="book__lead">{copy.dated.intro}</p>
                {calendarState === 'error' ? (
                  <div className="book__unreachable">
                    <p>{copy.dated.unreachable}</p>
                    <button
                      type="button"
                      className="btn-outline btn-outline--sm"
                      onClick={() => switchMode('message')}
                    >
                      {copy.dated.switchToMessage}
                    </button>
                  </div>
                ) : (
                  <BookingCalendar
                    month={month}
                    onMonthChange={setMonth}
                    statuses={statuses}
                    selected={selected}
                    onSelect={selectDay}
                    minDate={minDate}
                    maxDate={maxDate}
                    loading={calendarState === 'loading'}
                  />
                )}
                <p className={`book__selected${selected ? ' is-set' : ''}`} aria-live="polite">
                  {selected ? copy.dated.selected(formatDate(selected)) : copy.dated.pickFirst}
                </p>
              </div>
            )}

            <form className="form" onSubmit={handleSubmit}>
              <div className="field-row">
                <label className="field">
                  {copy.fields.name}
                  <input
                    required
                    placeholder={copy.placeholders.name}
                    value={form.name}
                    onChange={update('name')}
                    autoComplete="name"
                  />
                </label>
                <label className="field">
                  {copy.fields.email}
                  <input
                    type="email"
                    required
                    placeholder={copy.placeholders.email}
                    value={form.email}
                    onChange={update('email')}
                    autoComplete="email"
                  />
                </label>
              </div>

              <div className="field-row">
                {dated ? (
                  <label className="field">
                    {copy.phone.label}
                    <input
                      type="tel"
                      required
                      placeholder={copy.phone.placeholder}
                      value={form.phone}
                      onChange={update('phone')}
                      autoComplete="tel"
                    />
                  </label>
                ) : (
                  <label className="field">
                    {copy.fields.date}
                    <input
                      placeholder={copy.placeholders.date}
                      value={form.date}
                      onChange={update('date')}
                    />
                  </label>
                )}
                <label className="field">
                  {copy.fields.venue}
                  <input
                    placeholder={copy.placeholders.venue}
                    value={form.venue}
                    onChange={update('venue')}
                  />
                </label>
              </div>

              <label className="field">
                {copy.fields.type}
                <select value={form.type} onChange={update('type')}>
                  {bookingTypes.map((type) => (
                    <option key={type} value={type}>
                      {copy.types[type]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                {copy.fields.message}
                <textarea
                  rows={5}
                  placeholder={copy.placeholders.message}
                  value={form.message}
                  onChange={update('message')}
                />
              </label>

              {dated && (
                <div className="hp" aria-hidden="true">
                  <label>
                    Website
                    <input
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={update('website')}
                    />
                  </label>
                </div>
              )}

              <button
                type="submit"
                className="btn btn--block"
                disabled={status === 'sending' || (dated && !selected)}
              >
                {sendLabel}
              </button>

              {((status === 'sent' && !dated) || status === 'error') && (
                <p
                  className={`form__status ${status === 'sent' ? 'is-ok' : 'is-error'}`}
                  role="status"
                >
                  {status === 'sent' ? copy.sent : errorText}
                </p>
              )}
            </form>
          </>
        )}
      </div>

      {intro}
    </main>
  );
}
