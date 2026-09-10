import { Link } from 'react-router-dom';
import Marquee from '../components/Marquee';
import SpotifyEmbed from '../components/SpotifyEmbed';
import { usePageAnimation } from '../hooks/usePageAnimation';
import { useI18n } from '../i18n/context';
import { siteConfig } from '../config';

export default function Home() {
  const scope = usePageAnimation();
  const { t } = useI18n();
  const { hero, about, release, booking } = t.home;

  return (
    <main ref={scope}>
      {/* ══ hero ══ */}
      <section className="shell split split--hero" style={{ padding: '88px var(--gutter) 72px' }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 28 }}>
            {hero.eyebrow}
          </div>
          <h1 className="display display--hero" style={{ marginBottom: 28 }}>
            {hero.title}
          </h1>
          <p className="lede" style={{ maxWidth: '44ch', marginBottom: 40 }}>
            {hero.lede}
          </p>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link to="/book" className="btn">
              {hero.book}
            </Link>
            <Link to="/music" className="link-u">
              {hero.listen}
            </Link>
          </div>
        </div>

        <div>
          <figure style={{ margin: 0 }}>
            <img
              data-anim="settle"
              src="/assets/away-artwork.png"
              alt={hero.artworkAlt}
              style={{
                width: '100%',
                display: 'block',
                borderRadius: 4,
                boxShadow: 'var(--shadow-lg)',
              }}
            />
            <figcaption className="caption">{hero.caption}</figcaption>
          </figure>
        </div>
      </section>

      {siteConfig.showMarquee && <Marquee />}

      {/* ══ about teaser ══ */}
      <section
        className="shell"
        style={{ padding: '96px var(--gutter) 24px', textAlign: 'center' }}
      >
        <div className="eyebrow" style={{ marginBottom: 36 }}>
          {about.eyebrow}
        </div>
        <img
          src="/assets/matteo-portrait.jpg"
          alt="Matteo"
          style={{
            width: 'min(430px,84vw)',
            aspectRatio: '43 / 56',
            objectFit: 'cover',
            objectPosition: '72% 18%',
            borderRadius: '999px 999px 18px 18px',
            display: 'block',
            margin: '0 auto',
            boxShadow: '0 40px 80px -28px rgba(90,40,10,.45)',
          }}
        />
        <h2
          className="display"
          style={{ fontSize: 'clamp(52px,8.5vw,120px)', lineHeight: 0.95, margin: '40px 0 0' }}
        >
          Matteo<span className="accent">.</span>gm
        </h2>
        <p className="lede" style={{ maxWidth: '55vh', margin: '28px auto 32px' }}>
          {about.body}
        </p>
        <Link to="/about" className="link-u">
          {about.link}
        </Link>
      </section>

      {/* ══ latest release ══ */}
      <section className="shell split split--flip" style={{ padding: '96px var(--gutter)' }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 20 }}>
            {release.eyebrow}
          </div>
          <h2
            className="display"
            style={{ fontSize: 'clamp(44px,5vw,64px)', margin: '0 0 18px', lineHeight: 1.05 }}
          >
            Away
          </h2>
          <p style={{ color: 'var(--muted)', maxWidth: '42ch', margin: '0 0 28px', fontSize: 19 }}>
            {release.body}
          </p>
          <Link to="/music" className="link-u">
            {release.link}
          </Link>
        </div>

        <div className="panel panel--tight">
          <SpotifyEmbed />
        </div>
      </section>

      {/* ══ booking band ══ */}
      <section className="band">
        <div className="shell" style={{ padding: '88px var(--gutter)', textAlign: 'center' }}>
          <div className="eyebrow" style={{ marginBottom: 20 }}>
            {booking.eyebrow}
          </div>
          <h2
            className="display"
            style={{ fontSize: 'clamp(38px,5vw,64px)', margin: '0 0 44px', lineHeight: 1.05 }}
          >
            {booking.title}
          </h2>

          <div
            className="grid-3"
            style={{ maxWidth: 980, margin: '0 auto 48px', textAlign: 'left' }}
          >
            {booking.kinds.map(({ title, body }, i) => (
              <div className="card" key={i}>
                <div className="card__num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>

          <Link to="/book" className="btn btn--xl">
            {booking.cta}
          </Link>
        </div>
      </section>

      {/* ══ three-up teasers ══ */}
      {/* <section>
        <div
          className="shell grid-3"
          style={{ padding: '72px var(--gutter) 96px', gap: 'clamp(32px,4vw,56px)' }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              {t.home.teasers.concertEyebrow}
            </div>
            <p className="serif" style={{ fontSize: 27, lineHeight: 1.25, margin: '0 0 14px' }}>
              {t.home.teasers.concert}
            </p>
            <Link to="/concerts" className="link-u link-u--sm">
              {t.home.teasers.concertLink}
            </Link>
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              {t.home.teasers.pressEyebrow}
            </div>
            <p
              className="serif"
              style={{ fontStyle: 'italic', fontSize: 27, lineHeight: 1.25, margin: '0 0 14px' }}
            >
              {t.home.teasers.press}
            </p>
            <Link to="/press" className="link-u link-u--sm">
              {t.home.teasers.pressLink}
            </Link>
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              {t.home.teasers.aboutEyebrow}
            </div>
            <p className="serif" style={{ fontSize: 27, lineHeight: 1.25, margin: '0 0 14px' }}>
              {t.home.teasers.about}
            </p>
            <Link to="/about" className="link-u link-u--sm">
              {t.home.teasers.aboutLink}
            </Link>
          </div>
        </div>
      </section> */}
    </main>
  );
}
