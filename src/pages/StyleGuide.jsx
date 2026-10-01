import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contact, spotify } from '../config';

const SITE = 'matteo-gm.vercel.app';

const colourGroups = [
  {
    title: 'Surfaces',
    items: [
      { token: '--paper', name: 'Papier', hex: '#fbf4e9', use: 'Fond de page' },
      { token: '--paper-2', name: 'Papier 2', hex: '#f3e7d3', use: 'Panneaux, bandeaux' },
      { token: '--field', name: 'Champ', hex: '#fffbf2', use: 'Champs de formulaire' },
    ],
  },
  {
    title: 'Encre & texte',
    items: [
      { token: '--ink', name: 'Encre', hex: '#2a1b10', use: 'Titres' },
      { token: '--ink-2', name: 'Encre 2', hex: '#41301f', use: 'Texte fort' },
      { token: '--muted', name: 'Gris', hex: '#5c4633', use: 'Texte courant' },
      { token: '--muted-2', name: 'Gris clair', hex: '#8a6f5c', use: 'Légendes, notes' },
      { token: '--faint', name: 'Gris pâle', hex: '#c09b7d', use: 'Filets, numéros' },
    ],
  },
  {
    title: 'Accents',
    items: [
      { token: '--accent', name: 'Accent', hex: '#d0500e', use: 'Boutons, sélection' },
      { token: '--accent-dark', name: 'Accent foncé', hex: '#a63c0f', use: 'Survol des boutons' },
      { token: '--accent-deep', name: 'Accent profond', hex: '#a6480f', use: 'Surtitres' },
      { token: '--link', name: 'Lien', hex: '#b3400e', use: 'Liens' },
      { token: '--link-hover', name: 'Lien survol', hex: '#7e2c08', use: 'Survol' },
      { token: '--ok', name: 'Succès', hex: '#3f7d3f', use: 'Messages de confirmation' },
    ],
  },
  {
    title: 'Statuts du calendrier',
    items: [
      { token: '--free', name: 'Libre', hex: '#5b8a4c', use: 'Jour réservable' },
      { token: '--pending', name: 'En attente', hex: '#d4962a', use: 'Demande reçue' },
      { token: '--busy', name: 'Pris', hex: '#b0402c', use: 'Confirmé ou bloqué' },
    ],
  },
];

const typeSpecs = [
  {
    role: 'Titres',
    family: 'Instrument Serif',
    note: '400 · une seule graisse · interligne serré (1.02–1.05)',
    sample: 'Le piano des heures lentes',
  },
  {
    role: 'Texte courant',
    family: 'Newsreader',
    note: '400 · 18 px · interligne 1.65',
    sample: 'Des pièces intimes, écrites tard la nuit dans une chambre.',
  },
  {
    role: 'Surtitre',
    family: 'Newsreader',
    note: '500 · 12.5 px · +0.24em · MAJUSCULES · accent profond',
    sample: 'Piano & composition',
  },
  {
    role: 'Note',
    family: 'Newsreader',
    note: 'italique · 16 px · gris clair',
    sample: 'Réservations 2026–27 ouvertes',
  },
];

const buttons = [
  { className: 'btn', label: 'Réserver une date →', use: 'Bouton principal d’une page' },
  { className: 'btn btn--lg', label: 'Réserver une date', use: 'Bouton de hero' },
  { className: 'btn btn--xl', label: 'Réserver une date', use: 'Bouton de fin de page' },
  { className: 'btn btn--dark', label: 'Réserver une date', use: 'Sur fond clair, pour contraster' },
  { className: 'btn btn--sm', label: 'Réserver', use: 'Actions de formulaire' },
  { className: 'btn-outline', label: 'Réserver une date', use: 'Action secondaire' },
  { className: 'btn-outline btn-outline--sm', label: 'Réserver', use: 'Navigation, barres d’outil' },
  { className: 'btn', label: 'Réserver une date', use: 'État désactivé', disabled: true },
];

const rules = [
  {
    title: 'La disponibilité couvre la journée entière',
    body: 'On parle de dates, jamais de soirées. Bouton : « Réserver une date ». Formulaire : « Demander cette date ». Le calendrier tient un jour complet.',
  },
  {
    title: 'Court dans la nav, descriptif sur les gros boutons',
    body: 'Nav et pied de page : un seul mot (« Réserver »). Boutons de section : une phrase qui dit ce que le visiteur obtient (« Réserver une date → »).',
  },
  {
    title: 'Jamais « Booker »',
    body: 'C’est le terme des agents et impressarios, pas du public. En français : « Réserver ».',
  },
  {
    title: 'Le genre n’est jamais marqué',
    body: '« Piano & composition », « la musique m’accompagne ». Jamais « pianiste », « passionné ».',
  },
  {
    title: 'Typographie française',
    body: 'Espace insécable avant : ; ? ! et à l’intérieur des « guillemets ». Jamais de point d’exclamation dans un bouton.',
  },
  {
    title: 'Une idée par page',
    body: 'Un titre, un paragraphe, un bouton. Les listes de dates sont des lignes, pas des cartes.',
  },
];

const printSpecs = [
  ['Format', '85 × 55 mm (recto / verso, à poser)'],
  ['Fond perdu', '3 mm sur les quatre bords'],
  ['Zone de sécurité', '4 mm du bord du format fini'],
  ['Couleur', 'CMJN — valeurs dans le tableau ci-dessus, noir de texte en noir seul'],
  ['Résolution', '300 dpi (3 500 × 2 260 px avec fond perdu)'],
  ['Papier', '350 g/m² mat, ton crème proche de #FBF4E9'],
  ['Finition', 'Aucune pelliculage ; si pelliculage mat, jamais sur le texte'],
  ['Filename', 'carte-visite-giam-85x55 recto / verso, PDF/X-1a'],
];

const cmyk = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => v / 255);
  const k = 1 - Math.max(r, g, b);
  if (k >= 1) return '0 · 0 · 0 · 100';
  return [((1 - r - k) / (1 - k)) * 100, ((1 - g - k) / (1 - k)) * 100, ((1 - b - k) / (1 - k)) * 100, k * 100]
    .map((v) => Math.round(v))
    .join(' · ');
};

export default function StyleGuide() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  return (
    <div className="sg">
      <header className="sg__bar">
        <div className="sg__bar-inner">
          <span className="wordmark">GIAM</span>
          <span className="sg__bar-label">Style guide</span>
          <span className="sg__spacer" />
          <button type="button" className="btn-outline btn-outline--sm sg__only-screen" onClick={() => window.print()}>
            Imprimer / PDF
          </button>
          <Link to="/" className="btn-outline btn-outline--sm">
            Retour au site
          </Link>
        </div>
      </header>

      <main className="shell page sg__page">
        <section className="sg__intro">
          <div className="eyebrow">Identité visuelle</div>
          <h1 className="display display--page">
            Le style du site, <span className="accent">en une page</span>.
          </h1>
          <p className="lede">
            Couleurs, typographie, boutons et ton. Tout ce qu’il faut pour décliner l’identité GIAM
            ailleurs — carte de visite, flyer, dossier de presse. Imprime cette page en PDF pour la
            transmettre à un imprimeur : les encadrés et les fonds disparaissent, les valeurs CMJN
            sont imprimées.
          </p>
        </section>

        <section className="sg__block">
          <h2 className="sg__h2">Identité</h2>
          <div className="sg__grid sg__grid--2">
            <div className="panel">
              <p className="sg__label">Monogramme</p>
              <p className="sg__wordmark">GIAM</p>
              <p className="sg__label">Instrument Serif 400 · 26 px · encre #2A1B10</p>
            </div>
            <div className="panel">
              <p className="sg__label">Signature</p>
              <p className="serif" style={{ fontSize: 30, margin: '4px 0 8px' }}>
                Piano &amp; composition
              </p>
              <p className="note"> Bruxelles · pièce pour piano seul</p>
            </div>
          </div>
          <p className="sg__body">
            Le mot-symbole est toujours seul, en capitales, jamais de symbole Registered. Le
            sous-titre reste en Newsreader italique. Sur la carte de visite, le monogramme suffit :
            pas de logo, pas de pictogramme.
          </p>
        </section>

        <section className="sg__block">
          <h2 className="sg__h2">Couleurs</h2>
          {colourGroups.map((group) => (
            <div key={group.title} className="sg__group">
              <p className="sg__label">{group.title}</p>
              <div className="sg__swatches">
                {group.items.map((item) => (
                  <div key={item.token} className="sg__swatch">
                    <div className="sg__chip" style={{ background: item.hex }} />
                    <p className="sg__swatch-name">{item.name}</p>
                    <p className="sg__swatch-hex">{item.hex.toUpperCase()}</p>
                    <p className="sg__swatch-cmyk">CMJN {cmyk(item.hex)}</p>
                    <p className="sg__swatch-token">{item.token}</p>
                    <p className="sg__swatch-use">{item.use}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <p className="sg__body">
            Le papier crème n’est jamais du blanc pur, et l’encre n’est jamais du noir : c’est ce qui
            donne sa chaleur au site. Pour l’impression, le noir de texte se règle en noir seul
            (0/0/0/100) et le crème en 0/3/11/0.
          </p>
        </section>

        <section className="sg__block">
          <h2 className="sg__h2">Typographie</h2>
          <div className="sg__type">
            {typeSpecs.map((spec) => (
              <div key={spec.role} className="sg__type-row">
                <div className="sg__type-meta">
                  <p className="sg__swatch-name">{spec.role}</p>
                  <p className="sg__swatch-token">{spec.family}</p>
                  <p className="sg__swatch-use">{spec.note}</p>
                </div>
                <p className="sg__type-sample" data-role={spec.role}>
                  {spec.sample}
                </p>
              </div>
            ))}
          </div>
          <p className="sg__body">
            Deux familles seulement, jamais de troisième. Les deux sont libres (Google Fonts) : un
            imprimeur peut donc les	Vectoriser sans licence supplémentaire.
          </p>
        </section>

        <section className="sg__block">
          <h2 className="sg__h2">Boutons</h2>
          <div className="sg__buttons">
            {buttons.map((button) => (
              <div key={button.label + button.className} className="sg__button">
                <span className={button.className} aria-disabled={button.disabled || undefined}>
                  {button.label}
                </span>
                <p className="sg__swatch-use">
                  {button.disabled ? <code>.btn:disabled</code> : null} {button.use}
                </p>
              </div>
            ))}
          </div>
          <p className="sg__body">
            Un seul bouton accentué par page. Le rayon est toujours arrondi complètement
            (999&nbsp;px) : c’est la signature du site, à respecter sur le print. Jamais de
            point d’exclamation, jamais de majuscules.
          </p>
        </section>

        <section className="sg__block">
          <h2 className="sg__h2">Composants</h2>
          <div className="sg__grid sg__grid--2">
            <div className="panel panel--tight">
              <p className="sg__label">Panneau</p>
              <p className="sg__body">
                Fond papier 2, filet 0.14, rayon 22&nbsp;px. Sert à isoler un appel à l’action.
              </p>
            </div>
            <div className="panel panel--tight">
              <p className="eyebrow">Surtitre</p>
              <p className="serif" style={{ fontSize: 26, margin: '8px 0 0' }}>
                Titre court
              </p>
              <p className="note">Note en italique sous le titre</p>
            </div>
            <div className="sg__cal">
              <p className="sg__label">Statuts du calendrier</p>
              <div className="sg__dots">
                {[
                  ['free', 'Libre'],
                  ['pending', 'En attente'],
                  ['busy', 'Confirmé'],
                  ['busy hatched', 'Bloqué'],
                ].map(([kind, label]) => (
                  <span key={label} className="sg__dot-row">
                    <span className={`cal__dot cal__dot--${kind === 'free' ? 'free' : kind === 'pending' ? 'pending' : 'busy'}${kind === 'hatched' ? ' cal__dot--hatched' : ''}`} />
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="sg__cal">
              <p className="sg__label">Liens</p>
              <p>
                <a href="#sg">Lien principal</a> · <a href="#sg">Lien survol</a>
              </p>
              <p className="sg__body">Soulignement au survol seulement, couleur #B3400E.</p>
            </div>
          </div>
        </section>

        <section className="sg__block">
          <h2 className="sg__h2">Voix &amp; ton</h2>
          <ol className="sg__rules">
            {rules.map((rule) => (
              <li key={rule.title}>
                <p className="sg__rule-title">{rule.title}</p>
                <p className="sg__body">{rule.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="sg__block">
          <h2 className="sg__h2">Carte de visite</h2>
          <div className="sg__cards">
            <div className="sg__card sg__card--front">
              <p className="sg__card-mark">GIAM</p>
              <div className="sg__card-bottom">
                <p className="sg__card-role">Piano &amp; composition</p>
                <p className="sg__card-name">GIAM</p>
              </div>
            </div>
            <div className="sg__card sg__card--back">
              <p className="sg__card-line">{contact.booking}</p>
              <p className="sg__card-line">{SITE}</p>
              <p className="sg__card-line sg__card-line--muted">Bruxelles · en Europe</p>
            </div>
          </div>
          <p className="sg__body">
            Face avant : le monogramme seul, plein cadre, beaucoup de vide. Face arrière : les
            contacts en Newsreader, alignés à gauche. « GIAM » est le seul nom d’artiste :
            aucune variante du prénom n’apparaît.
          </p>
          <div className="sg__specs">
            {printSpecs.map(([label, value]) => (
              <div key={label} className="sg__spec">
                <p className="sg__swatch-name">{label}</p>
                <p className="sg__body">{value}</p>
              </div>
            ))}
          </div>
          <div className="sg__copy">
            <p className="sg__label">Textes prêts à l’emploi</p>
            <p className="sg__body">
              Recto : GIAM · Piano &amp; composition · Bruxelles. Verso : {contact.booking} · {SITE}{' '}
              · Spotify « Away » ({spotify.trackUrl}). Format 85 × 55 mm, deux faces, papier crème
              350&nbsp;g mat.
            </p>
          </div>
        </section>

        <footer className="sg__foot">
          <p className="note">
            GIAM · style guide v2 · {new Date().getFullYear()} · tout est défini par variables CSS
            dans <code>src/styles/index.css</code>.
          </p>
        </footer>
      </main>
    </div>
  );
}
