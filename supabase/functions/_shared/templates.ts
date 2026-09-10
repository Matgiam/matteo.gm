import type { Email } from './email.ts';

/**
 * Email copy. Visitors get their own language; the admin gets French.
 * French typography: a no-break space before : ; ? ! (built from its code point).
 */

export type BookingRow = {
  id: string;
  day: string;
  status: string;
  name: string;
  email: string;
  phone: string;
  venue: string | null;
  booking_type: string;
  message: string | null;
  language: 'en' | 'fr';
  created_at: string;
  expires_at: string;
};

const nbsp = String.fromCharCode(160);

const escapeHtml = (text: string) =>
  text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const locale = (lang: string) => (lang === 'fr' ? 'fr-FR' : 'en-GB');

/** "vendredi 12 septembre 2026" / "Friday 12 September 2026" */
export function formatDay(day: string, lang: string): string {
  return new Intl.DateTimeFormat(locale(lang), {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${day}T12:00:00Z`));
}

function formatMoment(iso: string, lang: string): string {
  return new Intl.DateTimeFormat(locale(lang), {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Brussels',
  }).format(new Date(iso));
}

const paragraphs = (...lines: string[]) =>
  lines
    .map((line) => `<p style="margin:0 0 16px;">${escapeHtml(line).replaceAll('\n', '<br>')}</p>`)
    .join('');

const button = (label: string, href: string, primary = true) =>
  `<a href="${escapeHtml(href)}" style="display:inline-block;margin:0 10px 12px 0;padding:12px 26px;border-radius:999px;text-decoration:none;font-size:16px;${
    primary ? 'background:#d0500e;color:#fbf4e9;' : 'border:1px solid #c9b8a4;color:#2a1b10;'
  }">${escapeHtml(label)}</a>`;

function layout(inner: string): string {
  return `<!doctype html><html><body style="margin:0;padding:0;background:#fbf4e9;">
<div style="max-width:560px;margin:0 auto;padding:36px 28px;font-family:Georgia,'Times New Roman',serif;color:#2a1b10;font-size:16px;line-height:1.6;">
<div style="font-size:24px;margin-bottom:28px;">Matteo<span style="color:#d0500e;">.</span>gm</div>
${inner}
</div></body></html>`;
}

// ── to the visitor ─────────────────────────────────────────────────────────

const visitorCopy = {
  fr: {
    received: (b: BookingRow, date: string) => ({
      subject: `Votre demande pour le ${date}`,
      lines: [
        `Bonjour ${b.name},`,
        `Merci pour votre message. La soirée du ${date} est désormais posée en option pour vous, pendant 7 jours.`,
        `Je vous appelle très vite au ${b.phone} pour en parler ensemble, puis je vous confirme la date.`,
        'À très bientôt,\nMatteo',
      ],
    }),
    confirmed: (b: BookingRow, date: string) => ({
      subject: `C’est confirmé${nbsp}: ${date}`,
      lines: [
        `Bonjour ${b.name},`,
        `Bonne nouvelle${nbsp}: la soirée du ${date} est confirmée. J’ai hâte de jouer pour vous.`,
        'Je reviens vers vous pour les derniers détails.',
        'À très bientôt,\nMatteo',
      ],
    }),
    declined: (b: BookingRow, date: string, siteUrl: string) => ({
      subject: `Votre demande pour le ${date}`,
      lines: [
        `Bonjour ${b.name},`,
        `Merci encore pour votre demande. Je ne pourrai malheureusement pas jouer le ${date}, et la date est de nouveau libre.`,
        `Si une autre soirée vous convient, le calendrier reste ouvert${nbsp}: ${siteUrl}/book`,
        'Bien à vous,\nMatteo',
      ],
    }),
  },
  en: {
    received: (b: BookingRow, date: string) => ({
      subject: `Your request for ${date}`,
      lines: [
        `Hello ${b.name},`,
        `Thank you for your message. The evening of ${date} is now on hold for you, for 7 days.`,
        `I’ll call you soon on ${b.phone} to talk it through, then confirm the date.`,
        'Speak soon,\nMatteo',
      ],
    }),
    confirmed: (b: BookingRow, date: string) => ({
      subject: `Confirmed: ${date}`,
      lines: [
        `Hello ${b.name},`,
        `Good news: the evening of ${date} is confirmed. I can’t wait to play for you.`,
        'I’ll be in touch about the last details.',
        'Speak soon,\nMatteo',
      ],
    }),
    declined: (b: BookingRow, date: string, siteUrl: string) => ({
      subject: `Your request for ${date}`,
      lines: [
        `Hello ${b.name},`,
        `Thank you again for your request. Unfortunately I won’t be able to play on ${date}, and the date is free again.`,
        `If another evening works for you, the calendar is still open: ${siteUrl}/book`,
        'All the best,\nMatteo',
      ],
    }),
  },
};

export function visitorEmail(
  kind: 'received' | 'confirmed' | 'declined',
  booking: BookingRow,
  siteUrl: string,
): Email {
  const lang = booking.language === 'fr' ? 'fr' : 'en';
  const date = formatDay(booking.day, lang);
  const { subject, lines } = visitorCopy[lang][kind](booking, date, siteUrl);
  return { to: booking.email, subject, html: layout(paragraphs(...lines)) };
}

// ── to the admin (French) ─────────────────────────────────────────────────

const typeLabels: Record<string, string> = {
  house: 'Concert chez l’habitant',
  venue: 'Salle ou festival',
  film: 'Musique à l’image ou commande',
  other: 'Autre demande',
};

function details(b: BookingRow): string {
  const rows: [string, string][] = [
    ['Date', formatDay(b.day, 'fr')],
    ['Nom', b.name],
    ['Téléphone', b.phone],
    ['E-mail', b.email],
    ['Lieu', b.venue ?? ''],
    ['Type', typeLabels[b.booking_type] ?? b.booking_type],
    ['Langue', b.language === 'fr' ? 'Français' : 'Anglais'],
  ];
  const list = rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#8a6f5c;vertical-align:top;">${label}</td><td style="padding:4px 0;">${escapeHtml(value)}</td></tr>`,
    )
    .join('');
  const message = b.message
    ? `<div style="margin:18px 0 24px;padding:16px 18px;background:#f3e7d3;border-radius:12px;font-style:italic;">${escapeHtml(b.message).replaceAll('\n', '<br>')}</div>`
    : '';
  return `<table style="border-collapse:collapse;margin:0 0 8px;">${list}</table>${message}`;
}

const requestLink = (siteUrl: string, b: BookingRow, action?: string) =>
  `${siteUrl}/admin?request=${encodeURIComponent(b.id)}${action ? `&action=${action}` : ''}`;

export function adminNewRequest(b: BookingRow, siteUrl: string, adminEmail: string): Email {
  const date = formatDay(b.day, 'fr');
  return {
    to: adminEmail,
    replyTo: b.email,
    subject: `Nouvelle demande · ${date} · ${b.name}`,
    html: layout(
      `<h1 style="font-weight:normal;font-size:26px;margin:0 0 20px;">Nouvelle demande de réservation</h1>
${details(b)}
${paragraphs(`Sans décision, l’option expirera le ${formatMoment(b.expires_at, 'fr')}.`)}
<div style="margin:8px 0 12px;">${button('Accepter', requestLink(siteUrl, b, 'confirmed'))}${button('Refuser', requestLink(siteUrl, b, 'declined'), false)}</div>
<p style="margin:0;color:#8a6f5c;font-size:14px;">Chaque bouton ouvre la demande dans le tableau de bord, où la décision se confirme.</p>`,
    ),
  };
}

export function adminReminder(b: BookingRow, siteUrl: string, adminEmail: string): Email {
  const date = formatDay(b.day, 'fr');
  return {
    to: adminEmail,
    replyTo: b.email,
    subject: `Rappel · l’option du ${date} expire bientôt`,
    html: layout(
      `${paragraphs(
        `La demande de ${b.name} pour le ${date} attend toujours une réponse. Elle expirera le ${formatMoment(b.expires_at, 'fr')}.`,
      )}
${details(b)}
<div>${button('Voir la demande', requestLink(siteUrl, b))}</div>`,
    ),
  };
}

export function adminExpired(b: BookingRow, siteUrl: string, adminEmail: string): Email {
  const date = formatDay(b.day, 'fr');
  return {
    to: adminEmail,
    replyTo: b.email,
    subject: `Option expirée · ${date}`,
    html: layout(
      `${paragraphs(
        `Sans réponse, l’option de ${b.name} pour le ${date} a expiré. La date est de nouveau libre dans le calendrier.`,
      )}
<div>${button('Ouvrir le tableau de bord', `${siteUrl}/admin`, false)}</div>`,
    ),
  };
}
