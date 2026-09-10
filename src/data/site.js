/**
 * Structure of the site: ids, dates, durations, links. Anything written in
 * words lives in src/i18n/locales/en.jsx and fr.jsx, looked up by these ids.
 */

/** `id` picks the label from `t.nav`. */
export const navLinks = [
  { to: '/', id: 'home' },
  { to: '/about', id: 'about' },
  { to: '/music', id: 'music' },
  { to: '/book', id: 'contact' },
  // { to: '/works', id: 'works' },
  // { to: '/concerts', id: 'concerts' },
  // { to: '/gallery', id: 'gallery' },
  // { to: '/press', id: 'press' },
];

/** Stable values for the booking form's select; labels come from `t.book.types`. */
export const bookingTypes = ['house', 'venue', 'film', 'other'];

export const upcomingReleases = [
  { id: 'cover-vespro', title: 'Vespro' },
  { id: 'cover-cartoline', title: 'Cartoline' },
];

export const works = [
  { id: 'away', n: '01', title: 'Away', year: '2026', length: '3′40″' },
  { id: 'vespro', n: '02', title: 'Vespro', year: '2026', length: '6′10″' },
  { id: 'cartoline', n: '03', title: 'Cartoline', year: '2026', length: '12′' },
  { id: 'sea-glass', n: '04', title: 'Sea Glass', year: '2025', length: '4′30″' },
  { id: 'sull-acqua', n: '05', title: "Sull'acqua", year: '2024', length: '9′' },
  { id: 'prima-luce', n: '06', title: 'Prima luce', year: '2024', length: '5′' },
];

/** `date` is ISO (YYYY-MM-DD). The day and month labels are formatted per language. */
export const concerts = [
  { id: 'casa-della-musica', date: '2026-09-12', ticketUrl: '#' },
  { id: 'piano-city', date: '2026-10-03', freeEntry: true },
  { id: 'salle-des-saisons', date: '2026-10-24', ticketUrl: '#' },
];

export const pastConcerts = [
  { id: 'cortile-in-musica', date: '2026-06-01' },
  { id: 'teatro-piccolo', date: '2026-04-01' },
  { id: 'living-room-roma', date: '2025-11-01' },
];

export const galleryCells = [
  { id: 'gal-1', className: 'gallery__cell--big' },
  { id: 'gal-2' },
  { id: 'gal-3' },
  { id: 'gal-4' },
  { id: 'gal-5', className: 'gallery__cell--wide' },
  { id: 'gal-6', className: 'gallery__cell--full' },
];
