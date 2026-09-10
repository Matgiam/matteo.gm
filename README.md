# Matteo.gm portfolio

Pianist & composer portfolio. Vite + React, converted from the original
single-file `Matteo.gm Portfolio v2.dc.html` prototype.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the built site
```

## Where things live

```
src/
  main.jsx              language provider + router + entry
  App.jsx               routes and page chrome
  config.js             feature flags, EmailJS keys, contact addresses
  i18n/
    locales/en.jsx      every English word on the site
    locales/fr.jsx      the same keys, in French
    detect.js           browser detection + remembered choice
    LanguageProvider.jsx  picks the language, sets <html lang> and the page title
    format.js           concert dates per language
  data/site.js          structure only: ids, dates, durations, links, nav order
  styles/index.css      design tokens + every component class
  components/           Nav, LanguageToggle, Footer, Marquee, SpotifyEmbed, ImageSlot, ScrollToTop
  hooks/
    usePageAnimation.js GSAP entrance animations, scoped per page
  pages/                one file per route
public/assets/          artwork and portrait
```

At 760px and below the nav links and the EN / FR toggle move into a hamburger
panel; the "Book me" button stays in the bar. That breakpoint lives in
`index.css` next to the `.nav__toggle` rules. If you add or rename links in
`data/site.js` (with a label in both locale files), the bar and the panel pick
them up automatically.

Each page attaches `usePageAnimation()`'s ref to its `<main>`; the hook handles
the hero stagger, scroll-triggered sections, row cascades and image settle, and
reverts cleanly when you navigate away.

## Languages (English / French)

Every visible word comes from `src/i18n/locales/en.jsx` or `fr.jsx`. The two
files have the same shape, and components read them through `useI18n()`:

```jsx
const { t, lang } = useI18n();
return <h1>{t.about.title}</h1>;
```

Which language a visitor sees:

1. The one they picked on the EN / FR toggle, if any (remembered in `localStorage`).
2. Otherwise the first of their browser's preferred languages that the site has,
   so `fr-CA` gets French and a German browser gets English. If they change their
   browser language while the site is open, it switches live.

Picking your browser's own language on the toggle forgets the saved choice, so
the site goes back to following the browser.

**Editing copy:** change the text in both locale files. In development the
browser console lists any key the French file is missing, and English is shown
in its place so nothing goes blank. Concert dates are written once, as ISO dates
in `data/site.js`, and formatted for each language automatically.

## Booking form (EmailJS)

Copy `.env.example` to `.env` and fill in the three values from your
[EmailJS dashboard](https://dashboard.emailjs.com). Until you do, the form
shows a friendly error rather than silently failing. The template should expect:
`from_name`, `reply_to`, `date`, `venue`, `booking_type`, `message`, and
optionally `language` (`en` or `fr`, the language the visitor used).

## Gallery images

`<ImageSlot>` lets you drop an image onto a frame; it is downscaled and kept in
that browser's `localStorage`, so it survives reloads **for you only**. It is
not uploaded anywhere. It's meant for dressing the layout while you gather the
real photos. When you have them, put the files in `public/assets/` and pass
`src="/assets/your-photo.jpg"` to the slot instead.

## Deploying

It's a static SPA, so the host needs to serve `index.html` for unknown paths or
deep links like `/concerts` will 404 on refresh.

- **Netlify**: add `public/_redirects` containing `/* /index.html 200`
- **Vercel**: detected automatically for Vite projects
- **GitHub Pages**: set `base` in `vite.config.js` and add a `404.html` copy of `index.html`

## Legacy files

`Matteo.gm Portfolio v2.dc.html`, `support.js`, `image-slot.js` and `assets/`
are the original prototype, kept for reference. Nothing in `src/` imports them,
so delete them once you're happy with the React version.
