import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { usePageAnimation } from '../hooks/usePageAnimation';
import { useI18n } from '../i18n/context';
import { contact, emailjsConfig, isEmailjsConfigured } from '../config';
import { bookingTypes } from '../data/site';

const EMPTY = {
  name: '',
  email: '',
  date: '',
  venue: '',
  type: bookingTypes[0],
  message: '',
};

export default function Book() {
  const scope = usePageAnimation();
  const { t, lang } = useI18n();
  const copy = t.book;
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle');
  // Stored as data rather than a sentence, so the message follows a language switch.
  const [error, setError] = useState(null);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

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

  const sendLabel = copy.submit[status === 'sending' || status === 'sent' ? status : 'idle'];

  const errorText =
    error?.kind === 'notConfigured'
      ? copy.errors.notConfigured(contact.booking)
      : copy.errors.failed(error?.detail || copy.errors.network, contact.booking);

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

  return (
    <main ref={scope} className="shell page split split--aside">
      <form className="panel form book__form" onSubmit={handleSubmit}>
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
          <label className="field">
            {copy.fields.date}
            <input
              placeholder={copy.placeholders.date}
              value={form.date}
              onChange={update('date')}
            />
          </label>
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

        <button type="submit" className="btn btn--block" disabled={status === 'sending'}>
          {sendLabel}
        </button>

        {(status === 'sent' || status === 'error') && (
          <p className={`form__status ${status === 'sent' ? 'is-ok' : 'is-error'}`} role="status">
            {status === 'sent' ? copy.sent : errorText}
          </p>
        )}
      </form>

      {intro}
    </main>
  );
}
