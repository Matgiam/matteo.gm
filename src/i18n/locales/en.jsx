import Accent from '../Accent';

/**
 * English copy. fr.jsx mirrors this shape key for key. In development the
 * console lists any key the French file is missing, and English fills the gap.
 */
const en = {
  meta: {
    title: 'Matteo.gm · Pianist & Composer',
    description:
      'Matteo.gm, pianist and composer in Brussels. Intimate, emotional piano pieces, written late at night in a small room. Booking 2026–27 open.',
  },

  language: {
    label: 'Language',
    names: { en: 'English', fr: 'Français' },
  },

  common: {
    quote: (text) => `“${text}”`,
    spotifyTitle: 'Away on Spotify',
  },

  nav: {
    home: 'Home',
    about: 'About',
    music: 'Music',
    contact: 'Contact',
    works: 'Works',
    concerts: 'Concerts',
    gallery: 'Gallery',
    press: 'Press',
    cta: 'Book me',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },

  footer: {
    music: 'Music',
    concerts: 'Concerts',
    book: 'Book me',
    legal: '© 2026 Matteo.gm · Artwork: “Away”, pastel on paper',
  },

  marquee: [
    'Booking 2026–27 open',
    'House concerts',
    'Venues & festivals',
    'Film commissions',
    '“Away” out now',
  ],

  imageSlot: {
    placeholder: 'Drop an image',
    hint: 'Click or drop an image here',
    remove: 'Remove image',
    errors: {
      type: 'That doesn’t look like an image.',
      read: 'Could not read that file.',
      decode: 'That file is not an image we can read.',
      quota: 'Shown, but too large to remember after a reload.',
    },
  },

  home: {
    hero: {
      eyebrow: 'Pianist & Composer',
      title: (
        <>
          Music for the <Accent>quiet hours</Accent>.
        </>
      ),
      lede: 'I’m Matteo. I write small, warm pieces for piano, late at night in my room in Brussels, for the feelings words can’t quite hold.',
      book: 'Book an evening',
      listen: 'Listen to “Away” →',
      artworkAlt: 'Away, single artwork',
      caption: '“Away” · single artwork · pastel on paper',
    },
    about: {
      eyebrow: 'About me',
      body: 'Passionate about music since my first memories, I write and play emotional pieces for solo piano, to create intimate, reflective moments. I also compose original music for videogames and other media.',
      link: 'My story →',
    },
    release: {
      eyebrow: 'Latest release',
      body: 'Three minutes of dusk and quiet longing. A single take at the piano, recorded late in my room, windows open. This is what an evening with me feels like.',
      link: 'All music →',
    },
    booking: {
      eyebrow: 'Booking 2026–27 is open',
      title: (
        <>
          Have a quiet space
          <br />
          and a piano?
        </>
      ),
      kinds: [
        {
          title: 'House concert',
          body: 'Your living room, 20–40 guests, an hour of piano at dusk, close enough to feel every note.',
        },
        {
          title: 'Venue & festival',
          body: 'Halls, chapels, galleries, open air. Solo or with cello.',
        },
        {
          title: 'Film & commission',
          body: 'Original calm music written to your picture and pace.',
        },
      ],
      cta: 'Book an evening',
    },
    // Used by the three-up teaser section, currently commented out in Home.jsx.
    teasers: {
      concertEyebrow: 'Next concert',
      concert: '12 Sept 2026 · Casa della Musica, Palermo',
      concertLink: 'All dates →',
      pressEyebrow: 'From the press',
      press: '“Small rooms you want to stay in.”',
      pressLink: 'Press →',
      aboutEyebrow: 'About',
      about: 'Late evenings, open windows, and a piano that lives in my room.',
      aboutLink: 'My story →',
    },
  },

  about: {
    portraitCaption: 'Home, just after sunset',
    eyebrow: 'About',
    title: (
      <>
        Hi, I’m <Accent>Matteo</Accent>.
      </>
    ),
    paragraphs: [
      'Everything I write starts with a feeling: a memory, a longing, a tenderness I can’t quite say out loud. Late in the evening, in my room in Brussels, I sit down at the piano and let it find its shape.',
      'I play piano and I compose small, calm pieces: solo piano, sometimes a cello or a soft layer of tape. I record at home, late, with the windows open, and I like when you can hear the room breathing in a take.',
      <>
        My first single, <em>“Away”</em>, came out in 2026. It’s three minutes of dusk and
        nostalgia, and the beginning of a longer collection I’m writing now.
      </>,
      'When I’m not recording, I play living rooms, courtyards and small halls. If you have a quiet space and a piano, we’ll get along.',
    ],
    factsEyebrow: 'A few facts',
    facts: [
      'Based in Brussels, Belgium · plays across Europe',
      'Writes for solo piano, piano & cello, and film',
      'Records at home: one room, one piano, open windows',
      'Debut single “Away” out now on Spotify',
    ],
    cta: 'Book an evening →',
  },

  music: {
    eyebrow: 'Music',
    title: (
      <>
        The <Accent>music</Accent>.
      </>
    ),
    artworkAlt: 'Away, artwork',
    single: 'Single · 2026',
    body: 'One take, late evening, in my room. The first page of a longer story: quiet piano for the feelings that surface at the end of the day.',
    spotify: 'Spotify ↗',
    youtube: 'YouTube ↗',
    upcomingTitle: 'Coming next',
    upcomingNote: 'two pieces on their way to streaming',
    upcoming: {
      'cover-vespro': {
        meta: 'Piano & cello · autumn 2026',
        placeholder: 'Drop the “Vespro” cover art',
      },
      'cover-cartoline': {
        meta: 'Five miniatures for solo piano · winter 2026',
        placeholder: 'Drop the “Cartoline” cover art',
      },
    },
    cta: 'Like it? Book an evening',
  },

  works: {
    eyebrow: 'Works',
    title: (
      <>
        Catalogue of <Accent>compositions</Accent>.
      </>
    ),
    // WriteLink is the "write to me" link; the page passes it in.
    intro: (WriteLink) => (
      <>
        Everything I’ve finished so far. Scores available on request. For film and commission work,{' '}
        <WriteLink>write to me</WriteLink>.
      </>
    ),
    items: {
      away: { forces: 'solo piano', tag: 'Single' },
      vespro: { forces: 'piano & cello', tag: 'Chamber' },
      cartoline: { forces: 'five miniatures, solo piano', tag: 'Cycle' },
      'sea-glass': { forces: 'piano & tape', tag: 'Ambient' },
      'sull-acqua': { forces: 'score for short film', tag: 'Film' },
      'prima-luce': { forces: 'solo piano', tag: 'Solo' },
    },
    note: 'Sample catalogue. Swap in your real works and timings.',
  },

  concerts: {
    eyebrow: 'Concerts',
    title: (
      <>
        Where to <Accent>hear me</Accent>.
      </>
    ),
    items: {
      'casa-della-musica': {
        venue: 'Casa della Musica',
        city: 'Palermo, Italy',
        description: 'Solo piano: “Away” & new pieces',
      },
      'piano-city': {
        venue: 'Piano City, open air',
        city: 'Milano, Italy',
        description: 'Sunset set, courtyard stage',
      },
      'salle-des-saisons': {
        venue: 'Salle des Saisons',
        city: 'Paris, France',
        description: 'With cello: “Vespro” premiere',
      },
    },
    freeEntry: 'Free entry',
    tickets: 'Tickets ↗',
    pastTitle: 'Past',
    past: {
      'cortile-in-musica': { venue: 'Cortile in Musica', city: 'Catania, IT' },
      'teatro-piccolo': { venue: 'Teatro Piccolo', city: 'Palermo, IT' },
      'living-room-roma': { venue: 'Living-room session', city: 'Roma, IT' },
    },
    ctaTitle: 'Have a quiet space and a piano?',
    ctaBody:
      'I love small venues: living rooms, courtyards, chapels, galleries. Booking for 2026–27 is open.',
    cta: 'Book a concert →',
  },

  gallery: {
    eyebrow: 'Gallery',
    title: (
      <>
        In <Accent>pictures</Accent>.
      </>
    ),
    note: 'Drag your photos onto the frames below. They’ll stay in this browser.',
    placeholders: {
      'gal-1': 'Live at the piano, wide shot',
      'gal-2': 'Portrait, close',
      'gal-3': 'The room / studio',
      'gal-4': 'Backstage or soundcheck',
      'gal-5': 'Audience / venue at dusk',
      'gal-6': 'Video still. Paste your YouTube performance link over this later',
    },
  },

  press: {
    eyebrow: 'Press',
    title: (
      <>
        Kind <Accent>words</Accent>.
      </>
    ),
    quotes: [
      {
        quote: 'Music that feels like the hour before dinner on a long summer day.',
        source: 'The Quiet Review · 2026',
      },
      {
        quote: 'Matteo.gm writes small rooms you want to stay in.',
        source: 'Neue Klaviermusik · 2026',
      },
      {
        quote: '‘Away’ is three minutes of dusk: patient, warm, unhurried.',
        source: 'Onde · Radio · 2026',
      },
    ],
    note: 'Placeholder quotes. Replace with real press as it arrives.',
    photosTitle: 'Press photos',
    photosLink: 'Download from the gallery →',
    requestsTitle: 'Interviews & requests',
  },

  book: {
    eyebrow: 'Booking',
    title: 'Two minutes, and it’s done.',
    lede: 'Tell me when and where. I reply personally within 48 hours with availability and a simple quote.',
    steps: [
      'Send the form: date, place, occasion',
      'I confirm availability & quote within 48 h',
      'We plan the evening together',
    ],
    fields: {
      name: 'Your name',
      email: 'Email',
      date: 'Date (or roughly)',
      venue: 'City & venue',
      type: 'Type of booking',
      message: 'Tell me about the evening',
    },
    placeholders: {
      name: 'Anna Rossi',
      email: 'you@email.com',
      date: 'e.g. mid-October 2026',
      venue: 'Brussels, our living room',
      message: 'The occasion, the room, how many people, whether there’s a piano…',
    },
    types: {
      house: 'House concert',
      venue: 'Venue / festival',
      film: 'Film / commission',
      other: 'Something else',
    },
    submit: {
      idle: 'Send booking request',
      sending: 'Sending…',
      sent: 'Sent, talk soon ✓',
    },
    sent: 'Thank you! Your request is in my inbox. I reply within 48 hours.',
    errors: {
      notConfigured: (email) =>
        `EmailJS keys not set yet. Add them to .env, or email ${email} directly.`,
      failed: (detail, email) => `Something went wrong (${detail}). Try again or email ${email}.`,
      network: 'network',
    },
    modes: {
      label: 'How would you like to get in touch?',
      date: 'Choose a date',
      message: 'Send a message',
    },
    phone: { label: 'Phone', placeholder: '+32 470 12 34 56' },
    dated: {
      intro: 'Pick a free evening. It stays on hold for you for 7 days while we talk it through.',
      unreachable: 'The calendar can’t be reached right now. You can still send me a message.',
      switchToMessage: 'Send a message instead',
      pickFirst: 'Choose an available evening in the calendar first.',
      selected: (date) => `Evening of ${date}`,
      submit: 'Request this evening',
      sending: 'Sending…',
      success: (date) =>
        `Thank you. The evening of ${date} is now on hold for you for 7 days. You’ll receive an email, and I’ll call you soon to talk it through.`,
      another: 'Request another date',
    },
    bookingErrors: {
      day_taken: 'Someone has just asked for this evening. Please choose another date.',
      day_unavailable: 'This evening is no longer available. Please choose another date.',
      invalid_day: 'This date can’t be booked. Please choose another one.',
      invalid_input: 'Please check your details: name, email and phone number.',
      rate_limited: 'Too many requests for now. Please try again later, or send me a message.',
      unknown: 'Something went wrong. Please try again, or send me a message.',
    },
  },

  calendar: {
    previous: 'Previous month',
    next: 'Next month',
    status: {
      free: 'Available',
      pending: 'On hold',
      unavailable: 'Unavailable',
      confirmed: 'Booked',
      blocked: 'Blocked',
      out: 'Not bookable',
    },
  },

  admin: {
    eyebrow: 'Private space',
    backToSite: 'Back to the site',
    signOut: 'Sign out',
    notConfigured:
      'Supabase is not configured: add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.',
    login: {
      title: 'Sign in',
      lede: 'Enter your email address to receive a sign-in link.',
      email: 'Email',
      submit: 'Send me a link',
      sending: 'Sending…',
      sent: 'If this address has access, a sign-in link is on its way. Open it on this device.',
      rateLimited: 'Too many attempts. Please wait a few minutes.',
    },
    confirm: {
      title: 'Confirm sign-in',
      lede: 'One last click to open the dashboard.',
      submit: 'Sign in',
      working: 'Signing in…',
      expired: 'This link has expired or was already used. Ask for a new one.',
      newLink: 'Get a new link',
    },
    denied: 'This account doesn’t have access to the dashboard.',
    dashboard: {
      title: 'Bookings',
      calendarTitle: 'Calendar',
      calendarHint:
        'Click a free day to block it, a blocked day to free it, or a booked day to see its request.',
      rangeTitle: 'Block a period',
      from: 'From',
      to: 'To',
      note: 'Note (optional)',
      block: 'Block',
      unblock: 'Free',
      rangeDone: (count) => `${count} ${count === 1 ? 'day' : 'days'} updated.`,
      rangeSkipped: 'Days holding a request are never blocked.',
      refresh: 'Refresh',
      loadFailed: 'The bookings could not be loaded.',
    },
    requests: {
      pending: 'Awaiting your answer',
      upcoming: 'Confirmed',
      history: 'History',
      none: 'Nothing here for now.',
      received: (date) => `Received ${date}`,
      expires: (when) => `Hold expires ${when}`,
      fields: {
        phone: 'Phone',
        email: 'Email',
        venue: 'Venue',
        type: 'Type',
        language: 'Language',
      },
      languages: { en: 'English', fr: 'French' },
      actions: { confirmed: 'Accept', declined: 'Decline', cancelled: 'Cancel booking' },
      prompts: {
        confirmed: 'Accept this booking? A confirmation email goes to the person.',
        declined: 'Decline this request? The person gets an email and the date is free again.',
        cancelled: 'Cancel this booking? The date is free again; no email is sent.',
      },
      yes: 'Yes, confirm',
      no: 'Not now',
      statuses: {
        pending: 'On hold',
        confirmed: 'Confirmed',
        declined: 'Declined',
        expired: 'Expired',
        cancelled: 'Cancelled',
      },
      errors: {
        not_authorized: 'Your session has expired. Please sign in again.',
        invalid_transition: 'This request was already handled. Refresh to see where it stands.',
        not_found: 'This request no longer exists.',
        unknown: 'Something went wrong. Please try again.',
      },
    },
  },
};

export default en;
