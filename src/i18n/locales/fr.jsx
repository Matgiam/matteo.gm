import Accent from '../Accent';

// French typography puts a no-break space before : ; ? ! and inside « guillemets ».
const nbsp = String.fromCharCode(160); // U+00A0
const quoted = (text) => `«${nbsp}${text}${nbsp}»`;

/**
 * French copy. Same shape as en.jsx; see the note there.
 *
 * Written in French rather than translated line by line. It is also phrased so
 * the author's gender is never marked ("Piano & composition" rather than
 * "Pianiste & compositeur", "la musique m'accompagne" rather than "passionné").
 * Switch to gendered forms here if you prefer them.
 */
const fr = {
  meta: {
    title: 'Matteo.gm · Piano & composition',
    description:
      'Matteo.gm, piano et composition, à Bruxelles. Des pièces intimes et chargées d’émotion, écrites tard le soir dans le secret d’une chambre. Réservations 2026–27 ouvertes.',
  },

  language: {
    label: 'Langue',
    names: { en: 'English', fr: 'Français' },
  },

  common: {
    quote: quoted,
    spotifyTitle: `${quoted('Away')} sur Spotify`,
  },

  nav: {
    home: 'Accueil',
    about: 'À propos',
    music: 'Musique',
    contact: 'Contact',
    works: 'Œuvres',
    concerts: 'Concerts',
    gallery: 'Galerie',
    press: 'Presse',
    cta: 'Réserver',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
  },

  footer: {
    music: 'Musique',
    concerts: 'Concerts',
    book: 'Réserver',
    legal: `© 2026 Matteo.gm · Illustration${nbsp}: ${quoted('Away')}, pastel sur papier`,
  },

  marquee: [
    'Réservations 2026–27 ouvertes',
    'Concerts chez l’habitant',
    'Salles & festivals',
    'Musique à l’image',
    `${quoted('Away')}, désormais disponible`,
  ],

  imageSlot: {
    placeholder: 'Déposez une image',
    hint: 'Cliquez ou déposez une image ici',
    remove: 'Retirer l’image',
    errors: {
      type: 'Ce fichier ne semble pas être une image.',
      read: 'Impossible de lire ce fichier.',
      decode: 'Cette image ne peut pas être lue.',
      quota: 'Image affichée, mais trop lourde pour être conservée après rechargement.',
    },
  },

  home: {
    hero: {
      eyebrow: 'Piano & composition',
      title: (
        <>
          Le piano des <Accent>heures lentes</Accent>.
        </>
      ),
      lede: 'Je suis Matteo. J’écris au piano de brèves pièces empreintes de douceur. Elles naissent tard le soir, dans l’intimité de ma chambre à Bruxelles, pour dire ce que les mots taisent.',
      book: 'Réserver une soirée',
      listen: `Écouter ${quoted('Away')} →`,
      artworkAlt: `${quoted('Away')}, pochette du single`,
      caption: `${quoted('Away')} · pochette du single · pastel sur papier`,
    },
    about: {
      eyebrow: 'Portrait',
      body: 'La musique m’accompagne depuis mes plus lointains souvenirs. J’écris et j’interprète au piano, en solitaire, des pièces où l’émotion guide chaque note, pour offrir des instants d’intimité et de recueillement. Je compose également pour le jeu vidéo et pour l’image.',
      link: 'Mon histoire →',
    },
    release: {
      eyebrow: 'Dernière parution',
      body: 'Trois minutes de crépuscule et de douce nostalgie. Une seule prise au piano, enregistrée tard dans ma chambre, les fenêtres ouvertes sur la nuit. C’est ainsi que résonne une soirée à mes côtés.',
      link: 'Découvrir ma musique →',
    },
    booking: {
      eyebrow: 'Réservations 2026–27 ouvertes',
      title: (
        <>
          Un lieu paisible
          <br />
          et un piano{nbsp}?
        </>
      ),
      kinds: [
        {
          title: 'Concert chez l’habitant',
          body: 'Votre salon, vingt à quarante convives, une heure de piano à la tombée du jour, assez près pour ressentir chaque note.',
        },
        {
          title: 'Salles & festivals',
          body: 'Salles de concert, chapelles, galeries ou plein air. En solo, ou avec un violoncelle.',
        },
        {
          title: 'Musique à l’image',
          body: 'Une partition originale et apaisée, écrite au rythme de vos images.',
        },
      ],
      cta: 'Réserver une soirée',
    },
    teasers: {
      concertEyebrow: 'Prochain concert',
      concert: '12 sept. 2026 · Casa della Musica, Palerme',
      concertLink: 'Toutes les dates →',
      pressEyebrow: 'Dans la presse',
      press: quoted('De petites pièces où l’on voudrait s’attarder.'),
      pressLink: 'Presse →',
      aboutEyebrow: 'À propos',
      about:
        'Des soirées qui s’étirent, les fenêtres ouvertes, et un piano qui vit dans ma chambre.',
      aboutLink: 'Mon histoire →',
    },
  },

  about: {
    portraitCaption: 'Chez moi, peu après le coucher du soleil',
    eyebrow: 'À propos',
    title: (
      <>
        Je m’appelle <Accent>Matteo</Accent>.
      </>
    ),
    paragraphs: [
      `Tout ce que j’écris commence par une émotion${nbsp}: un souvenir, un manque, une tendresse qui ne trouve pas ses mots. Tard le soir, dans ma chambre à Bruxelles, je m’installe au piano et je la laisse prendre forme.`,
      `Je joue du piano et compose de courtes pièces, tout en retenue${nbsp}: le piano seul, parfois un violoncelle ou le souffle discret d’une bande magnétique. J’enregistre chez moi, tard, les fenêtres ouvertes, et j’aime que l’on entende la chambre respirer dans chaque prise.`,
      <>
        Mon premier single, <em>{quoted('Away')}</em>, a vu le jour en 2026. Trois minutes de
        crépuscule et de nostalgie, et le premier chapitre d’un recueil encore en devenir.
      </>,
      'Lorsque je n’enregistre pas, je joue dans des salons, des cours intérieures et de petites salles. Si vous disposez d’un lieu paisible et d’un piano, nous devrions nous entendre.',
    ],
    factsEyebrow: 'Quelques repères',
    facts: [
      'Vit à Bruxelles, en Belgique · se produit dans toute l’Europe',
      'Piano seul, piano et violoncelle, musique à l’image',
      `Enregistre à domicile${nbsp}: une pièce, un piano, les fenêtres ouvertes`,
      `Premier single, ${quoted('Away')}, disponible sur Spotify`,
    ],
    cta: 'Réserver une soirée →',
  },

  music: {
    eyebrow: 'Musique',
    title: (
      <>
        À <Accent>l’écoute</Accent>.
      </>
    ),
    artworkAlt: `${quoted('Away')}, illustration de la pochette`,
    single: 'Single · 2026',
    body: `Une prise unique, tard le soir, dans ma chambre. La première page d’une histoire plus vaste${nbsp}: un piano feutré pour les émotions qui affleurent à la fin du jour.`,
    spotify: 'Spotify ↗',
    youtube: 'YouTube ↗',
    upcomingTitle: 'Prochainement',
    upcomingNote: 'deux pièces qui paraîtront bientôt',
    upcoming: {
      'cover-vespro': {
        meta: 'Piano et violoncelle · automne 2026',
        placeholder: `Déposez ici la pochette de ${quoted('Vespro')}`,
      },
      'cover-cartoline': {
        meta: 'Cinq miniatures pour piano seul · hiver 2026',
        placeholder: `Déposez ici la pochette de ${quoted('Cartoline')}`,
      },
    },
    cta: `Cette musique vous parle${nbsp}? Réservez une soirée`,
  },

  works: {
    eyebrow: 'Œuvres',
    title: (
      <>
        Catalogue des <Accent>compositions</Accent>.
      </>
    ),
    intro: (WriteLink) => (
      <>
        Tout ce que j’ai achevé jusqu’ici. Partitions disponibles sur demande. Pour une musique de
        film ou une commande, <WriteLink>écrivez-moi</WriteLink>.
      </>
    ),
    items: {
      away: { forces: 'piano seul', tag: 'Single' },
      vespro: { forces: 'piano et violoncelle', tag: 'Musique de chambre' },
      cartoline: { forces: 'cinq miniatures pour piano seul', tag: 'Cycle' },
      'sea-glass': { forces: 'piano et bande magnétique', tag: 'Ambient' },
      'sull-acqua': { forces: 'partition pour un court métrage', tag: 'Cinéma' },
      'prima-luce': { forces: 'piano seul', tag: 'Solo' },
    },
    note: 'Catalogue provisoire. Remplacez-le par vos œuvres et leurs durées réelles.',
  },

  concerts: {
    eyebrow: 'Concerts',
    title: (
      <>
        Où <Accent>m’écouter</Accent>.
      </>
    ),
    items: {
      'casa-della-musica': {
        venue: 'Casa della Musica',
        city: 'Palerme, Italie',
        description: `Piano seul${nbsp}: ${quoted('Away')} et pièces inédites`,
      },
      'piano-city': {
        venue: 'Piano City, en plein air',
        city: 'Milan, Italie',
        description: 'Au soleil couchant, sur la scène de la cour',
      },
      'salle-des-saisons': {
        venue: 'Salle des Saisons',
        city: 'Paris, France',
        description: `Avec violoncelle${nbsp}: création de ${quoted('Vespro')}`,
      },
    },
    freeEntry: 'Entrée libre',
    tickets: 'Billetterie ↗',
    pastTitle: 'Dates passées',
    past: {
      'cortile-in-musica': { venue: 'Cortile in Musica', city: 'Catane, IT' },
      'teatro-piccolo': { venue: 'Teatro Piccolo', city: 'Palerme, IT' },
      'living-room-roma': { venue: 'Concert chez l’habitant', city: 'Rome, IT' },
    },
    ctaTitle: `Un lieu paisible et un piano${nbsp}?`,
    ctaBody: `J’affectionne les lieux intimes${nbsp}: salons, cours intérieures, chapelles, galeries. Les réservations pour 2026–27 sont ouvertes.`,
    cta: 'Réserver un concert →',
  },

  gallery: {
    eyebrow: 'Galerie',
    title: (
      <>
        En <Accent>images</Accent>.
      </>
    ),
    note: 'Faites glisser vos photos dans les cadres ci-dessous. Elles seront conservées dans ce navigateur.',
    placeholders: {
      'gal-1': 'Au piano, en concert · plan large',
      'gal-2': 'Portrait en plan serré',
      'gal-3': 'La pièce, le studio',
      'gal-4': 'Coulisses ou balance',
      'gal-5': 'Le public, la salle à la tombée du jour',
      'gal-6': 'Image tirée d’une vidéo. À remplacer plus tard par le lien YouTube du concert',
    },
  },

  press: {
    eyebrow: 'Presse',
    title: (
      <>
        Ils en <Accent>parlent</Accent>.
      </>
    ),
    quotes: [
      {
        quote:
          'Une musique qui a la douceur de l’heure qui précède le dîner, au terme d’une longue journée d’été.',
        source: 'The Quiet Review · 2026',
      },
      {
        quote: 'Matteo.gm compose de petites pièces où l’on voudrait s’attarder.',
        source: 'Neue Klaviermusik · 2026',
      },
      {
        quote: `“Away” offre trois minutes de crépuscule${nbsp}: patientes, chaleureuses, sans la moindre hâte.`,
        source: 'Onde · Radio · 2026',
      },
    ],
    note: 'Citations provisoires. Remplacez-les par de véritables articles au fil des parutions.',
    photosTitle: 'Photos de presse',
    photosLink: 'Les télécharger depuis la galerie →',
    requestsTitle: 'Entretiens & demandes',
  },

  book: {
    eyebrow: 'Réservation',
    title: 'Deux minutes suffisent.',
    lede: 'Dites-moi où et quand. Je vous réponds personnellement sous 48 heures, avec mes disponibilités et un devis simple.',
    steps: [
      `Envoyez le formulaire${nbsp}: date, lieu, occasion`,
      `Je confirme mes disponibilités et vous adresse un devis sous 48${nbsp}h`,
      'Nous imaginons la soirée ensemble',
    ],
    fields: {
      name: 'Votre nom',
      email: 'Adresse e-mail',
      date: 'Date (même approximative)',
      venue: 'Ville & lieu',
      type: 'Type de prestation',
      message: 'Parlez-moi de la soirée',
    },
    placeholders: {
      name: 'Camille Durand',
      email: 'vous@exemple.fr',
      date: 'Par ex. mi-octobre 2026',
      venue: 'Bruxelles, dans notre salon',
      message: 'L’occasion, le lieu, le nombre d’invités, la présence d’un piano…',
    },
    types: {
      house: 'Concert chez l’habitant',
      venue: 'Salle ou festival',
      film: 'Musique à l’image ou commande',
      other: 'Autre demande',
    },
    submit: {
      idle: 'Envoyer ma demande',
      sending: 'Envoi en cours…',
      sent: 'Demande envoyée, à très bientôt ✓',
    },
    sent: `Merci${nbsp}! Votre demande m’est bien parvenue. Je vous réponds sous 48 heures.`,
    errors: {
      notConfigured: (email) =>
        `Les clés EmailJS ne sont pas encore configurées. Ajoutez-les au fichier .env, ou écrivez directement à ${email}.`,
      failed: (detail, email) =>
        `Une erreur est survenue (${detail}). Veuillez réessayer, ou écrire à ${email}.`,
      network: 'réseau',
    },
    modes: {
      label: `Comment souhaitez-vous me contacter${nbsp}?`,
      date: 'Choisir une date',
      message: 'Envoyer un message',
    },
    phone: { label: 'Téléphone', placeholder: '+32 470 12 34 56' },
    dated: {
      intro:
        'Choisissez une soirée libre. Elle reste posée en option pour vous pendant 7 jours, le temps d’en parler ensemble.',
      unreachable:
        'Le calendrier est momentanément inaccessible. Vous pouvez toujours m’envoyer un message.',
      switchToMessage: 'Envoyer un message à la place',
      pickFirst: 'Choisissez d’abord une soirée disponible dans le calendrier.',
      selected: (date) => `Soirée du ${date}`,
      submit: 'Demander cette soirée',
      sending: 'Envoi en cours…',
      success: (date) =>
        `Merci. La soirée du ${date} est désormais posée en option pour vous pendant 7 jours. Vous allez recevoir un e-mail, et je vous appelle très vite pour en parler.`,
      another: 'Demander une autre date',
    },
    bookingErrors: {
      day_taken: 'Quelqu’un vient de demander cette soirée. Choisissez une autre date.',
      day_unavailable: 'Cette soirée n’est plus disponible. Choisissez une autre date.',
      invalid_day: 'Cette date ne peut pas être réservée. Choisissez-en une autre.',
      invalid_input: `Vérifiez vos coordonnées${nbsp}: nom, e-mail et téléphone.`,
      rate_limited:
        'Trop de demandes pour le moment. Réessayez plus tard, ou envoyez-moi un message.',
      unknown: 'Une erreur est survenue. Réessayez, ou envoyez-moi un message.',
    },
  },

  calendar: {
    previous: 'Mois précédent',
    next: 'Mois suivant',
    status: {
      free: 'Disponible',
      pending: 'Option en cours',
      unavailable: 'Indisponible',
      confirmed: 'Réservé',
      blocked: 'Bloqué',
      out: 'Hors période',
    },
  },

  admin: {
    eyebrow: 'Espace privé',
    backToSite: 'Retour au site',
    signOut: 'Se déconnecter',
    notConfigured: `Supabase n’est pas configuré${nbsp}: ajoutez VITE_SUPABASE_URL et VITE_SUPABASE_PUBLISHABLE_KEY.`,
    login: {
      title: 'Connexion',
      lede: 'Saisissez votre adresse e-mail pour recevoir un lien de connexion.',
      email: 'Adresse e-mail',
      submit: 'Recevoir le lien',
      sending: 'Envoi en cours…',
      sent: 'Si cette adresse a accès, un lien de connexion est en route. Ouvrez-le sur cet appareil.',
      rateLimited: 'Trop de tentatives. Patientez quelques minutes.',
    },
    confirm: {
      title: 'Confirmer la connexion',
      lede: 'Un dernier clic pour ouvrir le tableau de bord.',
      submit: 'Se connecter',
      working: 'Connexion…',
      expired: 'Ce lien a expiré ou a déjà servi. Demandez-en un nouveau.',
      newLink: 'Recevoir un nouveau lien',
    },
    denied: 'Ce compte n’a pas accès au tableau de bord.',
    dashboard: {
      title: 'Réservations',
      calendarTitle: 'Calendrier',
      calendarHint:
        'Cliquez sur un jour libre pour le bloquer, sur un jour bloqué pour le libérer, ou sur un jour réservé pour voir la demande.',
      rangeTitle: 'Bloquer une période',
      from: 'Du',
      to: 'Au',
      note: 'Note (facultative)',
      block: 'Bloquer',
      unblock: 'Libérer',
      rangeDone: (count) => (count <= 1 ? `${count} jour modifié.` : `${count} jours modifiés.`),
      rangeSkipped: 'Les jours qui portent une demande ne sont jamais bloqués.',
      refresh: 'Actualiser',
      loadFailed: 'Impossible de charger les réservations.',
    },
    requests: {
      pending: 'En attente de réponse',
      upcoming: 'Confirmées',
      history: 'Historique',
      none: 'Rien pour le moment.',
      received: (date) => `Reçue le ${date}`,
      expires: (when) => `L’option expire ${when}`,
      fields: {
        phone: 'Téléphone',
        email: 'E-mail',
        venue: 'Lieu',
        type: 'Type',
        language: 'Langue',
      },
      languages: { en: 'Anglais', fr: 'Français' },
      actions: { confirmed: 'Accepter', declined: 'Refuser', cancelled: 'Annuler la réservation' },
      prompts: {
        confirmed: `Accepter cette réservation${nbsp}? La personne reçoit un e-mail de confirmation.`,
        declined: `Refuser cette demande${nbsp}? La personne reçoit un e-mail et la date redevient libre.`,
        cancelled: `Annuler cette réservation${nbsp}? La date redevient libre${nbsp}; aucun e-mail n’est envoyé.`,
      },
      yes: 'Oui, confirmer',
      no: 'Pas maintenant',
      statuses: {
        pending: 'Option en cours',
        confirmed: 'Confirmée',
        declined: 'Refusée',
        expired: 'Expirée',
        cancelled: 'Annulée',
      },
      errors: {
        not_authorized: 'Votre session a expiré. Reconnectez-vous.',
        invalid_transition:
          'Cette demande a déjà été traitée. Actualisez pour voir où elle en est.',
        not_found: 'Cette demande n’existe plus.',
        unknown: 'Une erreur est survenue. Réessayez.',
      },
    },
  },
};

export default fr;
