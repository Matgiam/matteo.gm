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
    title: 'GIAM · Artiste & compositeur',
    description:
      'GIAM, artiste et compositeur. Des musiques apaisantes, composées avec passion dans mon studio pour faire vivre des émotions uniques. Réservations 2026–27 ouvertes.',
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
    legal: `© 2026 GIAM · Artiste & compositeur · Illustration${nbsp}: ${quoted('Away')}, pastel sur papier`,
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
      eyebrow: 'Artiste & compositeur',
      title: (
        <>
          La musique des <Accent>émotions</Accent>.
        </>
      ),
      lede: 'Je suis Matteo. Je compose des musiques apaisantes et chills, écrites avec passion dans mon studio. Chacune est pensée pour faire vivre une émotion unique, à ceux qui l’écoutent.',
      book: 'Réserver',
      listen: `Écouter ${quoted('Away')} →`,
      artworkAlt: `${quoted('Away')}, pochette du single`,
      caption: `${quoted('Away')} · pochette du single · pastel sur papier`,
    },
    about: {
      eyebrow: 'Portrait',
      body: 'La musique est ma passion depuis toujours. Artiste et compositeur, j’écris des morceaux apaisants où chaque note sert une émotion. Je compose pour l’image, pour le jeu vidéo, et pour tous ceux qui cherchent un moment pour eux.',
      link: 'Mon histoire →',
    },
    release: {
      eyebrow: 'Dernière parution',
      body: 'Trois minutes de crépuscule et de douce nostalgie. Un morceau calme et enveloppant, composé et enregistré dans mon studio. C’est ainsi que ma musique vous accompagne, à toute heure.',
      link: 'Découvrir ma musique →',
    },
    booking: {
      eyebrow: 'Réservations 2026–27 ouvertes',
      title: (
        <>
          Un lieu paisible
          <br />
          et de la musique{nbsp}?
        </>
      ),
      kinds: [
        {
          title: 'Concert chez l’habitant',
          body: 'Votre salon, vingt à quarante convives, une heure de musique apaisante à la tombée du jour, assez près pour ressentir chaque émotion.',
        },
        {
          title: 'Salles & festivals',
          body: 'Salles de concert, chapelles, galeries ou plein air.',
        },
        {
          title: 'Musique à l’image',
          body: 'Une composition originale et apaisée, écrite au rythme de vos images.',
        },
      ],
      cta: 'Réserver',
    },
    teasers: {
      concertEyebrow: 'Prochain concert',
      concert: '12 sept. 2026 · Casa della Musica, Palerme',
      concertLink: 'Toutes les dates →',
      pressEyebrow: 'Dans la presse',
      press: quoted('Des morceaux apaisants où l’on voudrait s’attarder.'),
      pressLink: 'Presse →',
      aboutEyebrow: 'À propos',
      about: 'Un studio, une passion, et des musiques écrites pour faire vibrer.',
      aboutLink: 'Mon histoire →',
    },
  },

  about: {
    // portraitCaption: 'Au studio',
    eyebrow: 'À propos',
    title: (
      <>
        Je m’appelle <Accent>Matteo</Accent>.
      </>
    ),
    paragraphs: [
      `Tout ce que j’écris commence par une émotion${nbsp}: un souvenir, un manque, une tendresse qui ne trouve pas ses mots. Dans mon studio, je cherche la couleur et la texture qui la feront ressentir à quelqu’un qui ne me connaît pas.`,
      `Je compose des musiques apaisantes et relaxantes, qui font tomber le stress et laissent de la place${nbsp}: piano, cordes, nappes, le souffle discret d’une bande magnétique. J’aime qu’un morceau fasse du bien à celui qui l’écoute.`,
      <>
        Mon premier single, <em>{quoted('Away')}</em>, a vu le jour en 2026. Trois minutes de
        crépuscule et de nostalgie, et le premier chapitre d’un recueil encore en devenir.
      </>,
      'Je me produis dans des salons, des cours intérieures et de petites salles. Je compose aussi pour l’image et pour le jeu vidéo. Si vous disposez d’un lieu paisible, nous devrions nous entendre.',
    ],
    factsEyebrow: 'Quelques repères',
    facts: [
      'Vit à Bruxelles, en Belgique · se produit dans toute l’Europe',
      `Artiste & compositeur${nbsp}: piano, cordes, musique à l’image`,
      `Premier single, ${quoted('Away')}, disponible sur Spotify`,
    ],
    cta: 'Réserver une date →',
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
    body: `Un morceau apaisant et enveloppant, composé dans mon studio. La première page d’une histoire plus vaste${nbsp}: une musique qui fait du bien, pour les émotions qui affleurent à la fin du jour.`,
    spotify: 'Spotify ↗',
    youtube: 'YouTube ↗',
    // SECRET — copie « Prochainement », masquée jusqu’à la sortie de Vespro / Cartoline.
    // upcomingTitle: 'Prochainement',
    // upcomingNote: 'deux pièces qui paraîtront bientôt',
    // upcoming: {
    //   'cover-vespro': {
    //     meta: 'Piano et violoncelle · automne 2026',
    //     placeholder: `Déposez ici la pochette de ${quoted('Vespro')}`,
    //   },
    //   'cover-cartoline': {
    //     meta: 'Cinq miniatures pour piano seul · hiver 2026',
    //     placeholder: `Déposez ici la pochette de ${quoted('Cartoline')}`,
    //   },
    // },
    cta: `Cette musique vous parle${nbsp}? Réservez une date`,
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
      away: { forces: 'piano et cordes', tag: 'Single' },
      // SECRET — vespro: { forces: 'piano et violoncelle', tag: 'Musique de chambre' },
      // SECRET — cartoline: { forces: 'cinq miniatures pour piano seul', tag: 'Cycle' },
      'sea-glass': { forces: 'piano et bande magnétique', tag: 'Ambient' },
      'sull-acqua': { forces: 'composition pour un court métrage', tag: 'Cinéma' },
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
        description: `Piano et cordes${nbsp}: ${quoted('Away')} et morceaux inédites`,
      },
      'piano-city': {
        venue: 'Piano City, en plein air',
        city: 'Milan, Italie',
        description: 'Au soleil couchant, sur la scène de la cour',
      },
      'salle-des-saisons': {
        venue: 'Salle des Saisons',
        city: 'Paris, France',
        // SECRET — révèle le titre non sorti :
        // description: `Avec violoncelle${nbsp}: création de ${quoted('Vespro')}`,
        description: `Avec violoncelle${nbsp}: une pièce inédite, en création`,
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
    ctaTitle: `Un lieu paisible${nbsp}?`,
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
        quote: 'GIAM compose des morceaux apaisants où l’on voudrait s’attarder.',
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
      'Nous imaginons l’événement ensemble',
    ],
    fields: {
      name: 'Votre nom',
      email: 'Adresse e-mail',
      date: 'Date (même approximative)',
      venue: 'Ville & lieu',
      type: 'Type de prestation',
      message: 'Parlez-moi de l’événement',
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
        'Choisissez une date libre. Elle reste posée en option pour vous pendant 7 jours, le temps d’en parler ensemble.',
      unreachable:
        'Le calendrier est momentanément inaccessible. Vous pouvez toujours m’envoyer un message.',
      switchToMessage: 'Envoyer un message à la place',
      pickFirst: 'Choisissez d’abord une date disponible dans le calendrier.',
      selected: (date) => `Le ${date}`,
      submit: 'Demander cette date',
      sending: 'Envoi en cours…',
      success: (date) =>
        `Merci. Le ${date} est désormais posé en option pour vous pendant 7 jours. Vous allez recevoir un e-mail, et je vous appelle très vite pour en parler.`,
      another: 'Demander une autre date',
    },
    bookingErrors: {
      day_taken: 'Quelqu’un vient de demander cette date. Choisissez un autre jour.',
      day_unavailable: 'Cette date n’est plus disponible. Choisissez un autre jour.',
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
      lede: 'Saisissez l’adresse e-mail et le mot de passe du compte administrateur.',
      email: 'Adresse e-mail',
      password: 'Mot de passe',
      submit: 'Se connecter',
      sending: 'Connexion en cours…',
      invalid: 'Adresse e-mail ou mot de passe incorrect.',
      rateLimited: 'Trop de tentatives. Patientez quelques minutes.',
      failed: 'Connexion impossible. Vérifiez votre connexion internet et réessayez.',
    },
    reset: {
      title: 'Nouveau mot de passe',
      lede: 'Choisissez un nouveau mot de passe pour votre compte administrateur.',
      password: 'Nouveau mot de passe',
      confirm: 'Confirmer le mot de passe',
      submit: 'Enregistrer',
      sending: 'Enregistrement…',
      mismatch: 'Les deux mots de passe ne correspondent pas.',
      tooShort: 'Le mot de passe doit contenir au moins 8 caractères.',
      done: 'Mot de passe mis à jour. Vous pouvez vous connecter à l’espace privé.',
      invalidLink: 'Ce lien n’est plus valide. Demandez-en un nouveau depuis l’administrateur Supabase.',
      failed: 'Impossible de changer le mot de passe. Rechargez la page et réessayez.',
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
