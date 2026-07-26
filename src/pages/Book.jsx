import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { usePageAnimation } from '../hooks/usePageAnimation';
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

const steps = [
  'Send the form — date, place, occasion',
  'I confirm availability & quote within 48 h',
  'We plan the evening together',
];

export default function Book() {
  const scope = usePageAnimation();
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailjsConfigured) {
      setStatus('error');
      setErrorMessage(
        `EmailJS keys not set yet — add them to .env, or email ${contact.booking} directly.`,
      );
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
          booking_type: form.type,
          message: form.message,
        },
        { publicKey: emailjsConfig.publicKey },
      );
      setStatus('sent');
      setForm(EMPTY);
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        `Something went wrong (${err?.text || 'network'}). Try again or email ${contact.booking}.`,
      );
    }
  };

  const sendLabel =
    status === 'sending'
      ? 'Sending…'
      : status === 'sent'
        ? 'Sent — talk soon ✓'
        : 'Send booking request';

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
        Booking
      </div>
      <h1
        className="display"
        style={{ fontSize: 'clamp(40px,4vw,60px)', lineHeight: 1.08, margin: '0 0 22px' }}
      >
        Two minutes, and it’s done.
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
        Tell me when and where. I reply personally within 48 hours with availability and a simple
        quote.
      </p>

      <div className="steps">
        {steps.map((step, i) => (
          <div key={step}>
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
      >
        <div>
          Booking —{' '}
          <a href={`mailto:${contact.booking}`} className="link-u link-u--sm">
            {contact.booking}
          </a>
        </div>
        <div>
          Commissions —{' '}
          <a href={`mailto:${contact.hello}`} className="link-u link-u--sm">
            {contact.hello}
          </a>
        </div>
        <div>
          Press —{' '}
          <a href={`mailto:${contact.press}`} className="link-u link-u--sm">
            {contact.press}
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <main ref={scope} className="shell page split split--aside">
      <form className="panel form book__form" onSubmit={handleSubmit}>
        <div className="field-row">
          <label className="field">
            Your name
            <input
              required
              placeholder="Anna Rossi"
              value={form.name}
              onChange={update('name')}
              autoComplete="name"
            />
          </label>
          <label className="field">
            Email
            <input
              type="email"
              required
              placeholder="you@email.com"
              value={form.email}
              onChange={update('email')}
              autoComplete="email"
            />
          </label>
        </div>

        <div className="field-row">
          <label className="field">
            Date (or roughly)
            <input
              placeholder="e.g. mid-October 2026"
              value={form.date}
              onChange={update('date')}
            />
          </label>
          <label className="field">
            City &amp; venue
            <input
              placeholder="Palermo — our living room"
              value={form.venue}
              onChange={update('venue')}
            />
          </label>
        </div>

        <label className="field">
          Type of booking
          <select value={form.type} onChange={update('type')}>
            {bookingTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>

        <label className="field">
          Tell me about the evening
          <textarea
            rows={5}
            placeholder="The occasion, the room, how many people, whether there’s a piano…"
            value={form.message}
            onChange={update('message')}
          />
        </label>

        <button type="submit" className="btn btn--block" disabled={status === 'sending'}>
          {sendLabel}
        </button>

        {(status === 'sent' || status === 'error') && (
          <p className={`form__status ${status === 'sent' ? 'is-ok' : 'is-error'}`} role="status">
            {status === 'sent'
              ? 'Thank you! Your request is in my inbox — I reply within 48 hours.'
              : errorMessage}
          </p>
        )}
      </form>

      {intro}
    </main>
  );
}
