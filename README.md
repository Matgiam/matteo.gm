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
  main.jsx              router + entry
  App.jsx               routes and page chrome
  config.js             feature flags, EmailJS keys, contact addresses
  data/site.js          all copy that repeats: works, concerts, press, nav…
  styles/index.css      design tokens + every component class
  components/           Nav, Footer, Marquee, SpotifyEmbed, ImageSlot, ScrollToTop
  hooks/
    usePageAnimation.js GSAP entrance animations, scoped per page
  pages/                one file per route
public/assets/          artwork and portrait
```

At 760px and below the seven nav links collapse into a hamburger panel; the
"Book me" button stays in the bar. That breakpoint lives in `index.css` next to
the `.nav__toggle` rules. If you add or rename links in `data/site.js`, both
the bar and the panel pick them up automatically.

Each page attaches `usePageAnimation()`'s ref to its `<main>`; the hook handles
the hero stagger, scroll-triggered sections, row cascades and image settle, and
reverts cleanly when you navigate away.

Editing content: reach for `src/data/site.js` first. The works catalogue,
concert dates, press quotes and gallery captions all live there.

## Booking form (EmailJS)

Copy `.env.example` to `.env` and fill in the three values from your
[EmailJS dashboard](https://dashboard.emailjs.com). Until you do, the form
shows a friendly error rather than silently failing. The template should expect:
`from_name`, `reply_to`, `date`, `venue`, `booking_type`, `message`.

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
