import { Link } from 'react-router-dom';
import Marquee from '../components/Marquee';
import SpotifyEmbed from '../components/SpotifyEmbed';
import { usePageAnimation } from '../hooks/usePageAnimation';
import { siteConfig } from '../config';
import { bookingKinds } from '../data/site';

export default function Home() {
  const scope = usePageAnimation();

  return (
    <main ref={scope}>
      {/* ══ hero ══ */}
      <section className="shell split split--hero" style={{ padding: '88px var(--gutter) 72px' }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 28 }}>
            Pianist &amp; Composer
          </div>
          <h1 className="display display--hero" style={{ marginBottom: 28 }}>
            Music for the <em className="accent">quiet hours</em>.
          </h1>
          <p className="lede" style={{ maxWidth: '44ch', marginBottom: 40 }}>
            I’m Matteo. I write small, warm pieces for piano — music to slow down to, made in a room
            by the sea.
          </p>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link to="/book" className="btn">
              Book an evening
            </Link>
            <Link to="/music" className="link-u">
              Listen to “Away” →
            </Link>
          </div>
        </div>

        <div>
          <figure style={{ margin: 0 }}>
            <img
              data-anim="settle"
              src="/assets/away-artwork.png"
              alt="Away — single artwork"
              style={{
                width: '100%',
                display: 'block',
                borderRadius: 4,
                boxShadow: 'var(--shadow-lg)',
              }}
            />
            <figcaption className="caption">“Away” — single artwork · pastel on paper</figcaption>
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
          About me
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
        <p className="lede" style={{ maxWidth: '52ch', margin: '28px auto 32px' }}>
          I grew up by the sea, where evenings end slowly. I write and play small, calm pieces for
          piano — in living rooms, courtyards and little halls — recorded at home, late, with the
          windows open.
        </p>
        <Link to="/about" className="link-u">
          My story →
        </Link>
      </section>

      {/* ══ latest release ══ */}
      <section className="shell split split--flip" style={{ padding: '96px var(--gutter)' }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 20 }}>
            Latest release
          </div>
          <h2
            className="display"
            style={{ fontSize: 'clamp(44px,5vw,64px)', margin: '0 0 18px', lineHeight: 1.05 }}
          >
            Away
          </h2>
          <p style={{ color: 'var(--muted)', maxWidth: '42ch', margin: '0 0 28px', fontSize: 19 }}>
            Three minutes of dusk. A single take at the piano, recorded late, windows open. This is
            what an evening with me sounds like.
          </p>
          <Link to="/music" className="link-u">
            All music →
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
            Booking 2026–27 is open
          </div>
          <h2
            className="display"
            style={{ fontSize: 'clamp(38px,5vw,64px)', margin: '0 0 44px', lineHeight: 1.05 }}
          >
            Have a quiet space
            <br />
            and a piano?
          </h2>

          <div
            className="grid-3"
            style={{ maxWidth: 980, margin: '0 auto 48px', textAlign: 'left' }}
          >
            {bookingKinds.map(({ n, title, body }) => (
              <div className="card" key={n}>
                <div className="card__num">{n}</div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>

          <Link to="/book" className="btn btn--xl">
            Book an evening — I reply within 48 h
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
              Next concert
            </div>
            <p className="serif" style={{ fontSize: 27, lineHeight: 1.25, margin: '0 0 14px' }}>
              12 Sept 2026 — Casa della Musica, Palermo
            </p>
            <Link to="/concerts" className="link-u link-u--sm">
              All dates →
            </Link>
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              From the press
            </div>
            <p
              className="serif"
              style={{ fontStyle: 'italic', fontSize: 27, lineHeight: 1.25, margin: '0 0 14px' }}
            >
              “Small rooms you want to stay in.”
            </p>
            <Link to="/press" className="link-u link-u--sm">
              Press →
            </Link>
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              About
            </div>
            <p className="serif" style={{ fontSize: 27, lineHeight: 1.25, margin: '0 0 14px' }}>
              Evenings, sea air, and a piano that lives by the window.
            </p>
            <Link to="/about" className="link-u link-u--sm">
              My story →
            </Link>
          </div>
        </div>
      </section> */}
    </main>
  );
}
