/** Content of the site. Edit here rather than in the page components. */

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/music', label: 'Music' },
  { to: '/book', label: 'Contact' },
  // { to: '/works', label: 'Works' },
  // { to: '/concerts', label: 'Concerts' },
  // { to: '/gallery', label: 'Gallery' },
  // { to: '/press', label: 'Press' },
];

export const marqueeItems = [
  'Booking 2026–27 open',
  'House concerts',
  'Venues & festivals',
  'Film commissions',
  '“Away” — out now',
];

export const bookingKinds = [
  {
    n: '01',
    title: 'House concert',
    body: 'Your living room, 20–40 guests, an hour of piano at dusk.',
  },
  {
    n: '02',
    title: 'Venue & festival',
    body: 'Halls, chapels, galleries, open air — solo or with cello.',
  },
  {
    n: '03',
    title: 'Film & commission',
    body: 'Original calm music written to your picture and pace.',
  },
];

export const bookingTypes = [
  'House concert',
  'Venue / festival',
  'Film / commission',
  'Something else',
];

export const upcomingReleases = [
  {
    id: 'cover-vespro',
    title: 'Vespro',
    meta: 'Piano & cello · autumn 2026',
    placeholder: 'Drop the “Vespro” cover art',
  },
  {
    id: 'cover-cartoline',
    title: 'Cartoline',
    meta: 'Five miniatures for solo piano · winter 2026',
    placeholder: 'Drop the “Cartoline” cover art',
  },
];

export const works = [
  { n: '01', title: 'Away', year: '2026', forces: 'solo piano', length: '3′40″', tag: 'Single' },
  {
    n: '02',
    title: 'Vespro',
    year: '2026',
    forces: 'piano & cello',
    length: '6′10″',
    tag: 'Chamber',
  },
  {
    n: '03',
    title: 'Cartoline',
    year: '2026',
    forces: 'five miniatures, solo piano',
    length: '12′',
    tag: 'Cycle',
  },
  {
    n: '04',
    title: 'Sea Glass',
    year: '2025',
    forces: 'piano & tape',
    length: '4′30″',
    tag: 'Ambient',
  },
  {
    n: '05',
    title: "Sull'acqua",
    year: '2024',
    forces: 'score for short film',
    length: '9′',
    tag: 'Film',
  },
  { n: '06', title: 'Prima luce', year: '2024', forces: 'solo piano', length: '5′', tag: 'Solo' },
];

export const concerts = [
  {
    day: '12',
    month: 'Sept 2026',
    venue: 'Casa della Musica',
    city: 'Palermo, Italy',
    description: 'Solo piano — “Away” & new pieces',
    ticketUrl: '#',
  },
  {
    day: '03',
    month: 'Oct 2026',
    venue: 'Piano City — open air',
    city: 'Milano, Italy',
    description: 'Sunset set, courtyard stage',
    freeEntry: true,
  },
  {
    day: '24',
    month: 'Oct 2026',
    venue: 'Salle des Saisons',
    city: 'Paris, France',
    description: 'With cello — “Vespro” premiere',
    ticketUrl: '#',
  },
];

export const pastConcerts = [
  'Jun 2026 — Cortile in Musica · Catania, IT',
  'Apr 2026 — Teatro Piccolo · Palermo, IT',
  'Nov 2025 — Living-room session · Roma, IT',
];

export const pressQuotes = [
  {
    quote: 'Music that feels like the hour before dinner on a long summer day.',
    source: 'The Quiet Review · 2026',
  },
  {
    quote: 'Matteo.gm writes small rooms you want to stay in.',
    source: 'Neue Klaviermusik · 2026',
  },
  {
    quote: '‘Away’ is three minutes of dusk — patient, warm, unhurried.',
    source: 'Onde · Radio · 2026',
  },
];

export const galleryCells = [
  { id: 'gal-1', className: 'gallery__cell--big', placeholder: 'Live at the piano — wide shot' },
  { id: 'gal-2', placeholder: 'Portrait, close' },
  { id: 'gal-3', placeholder: 'The room / studio' },
  { id: 'gal-4', placeholder: 'Backstage or soundcheck' },
  { id: 'gal-5', className: 'gallery__cell--wide', placeholder: 'Audience / venue at dusk' },
  {
    id: 'gal-6',
    className: 'gallery__cell--full',
    placeholder: 'Video still — paste your YouTube performance link over this later',
  },
];
