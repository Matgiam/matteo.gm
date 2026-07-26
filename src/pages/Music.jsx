import { Link } from 'react-router-dom';
import ImageSlot from '../components/ImageSlot';
import SpotifyEmbed from '../components/SpotifyEmbed';
import { usePageAnimation } from '../hooks/usePageAnimation';
import { spotify } from '../config';
import { upcomingReleases } from '../data/site';

export default function Music() {
  const scope = usePageAnimation();

  return (
    <main ref={scope} className="shell page">
      <div className="eyebrow" style={{ marginBottom: 24 }}>
        Music
      </div>
      <h1 className="display display--page" style={{ marginBottom: 64 }}>
        The <em className="accent">music</em>.
      </h1>

      <section className="panel split split--media">
        <img
          data-anim="settle"
          src="/assets/away-artwork.png"
          alt="Away — artwork"
          style={{
            width: '100%',
            display: 'block',
            borderRadius: 6,
            boxShadow: 'var(--shadow-md)',
          }}
        />

        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            Single · 2026
          </div>
          <h2
            className="display"
            style={{ fontSize: 'clamp(40px,4.5vw,56px)', margin: '0 0 14px', lineHeight: 1 }}
          >
            Away
          </h2>
          <p style={{ color: 'var(--muted)', margin: '0 0 26px', maxWidth: '46ch', fontSize: 19 }}>
            One take, late evening. The first page of a longer story — quiet piano for the end of
            the day.
          </p>

          <SpotifyEmbed style={{ marginBottom: 24 }} />

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href={spotify.trackUrl} target="_blank" rel="noreferrer" className="btn-dark">
              Spotify ↗
            </a>
            <a href={spotify.youtubeUrl} className="btn-outline">
              YouTube ↗
            </a>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 88 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            borderTop: '1px solid var(--line)',
            paddingTop: 36,
            marginBottom: 40,
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <h3 className="serif" style={{ fontSize: 36, margin: 0 }}>
            Coming next
          </h3>
          <span className="note">two pieces on their way to streaming</span>
        </div>

        <div className="grid-2">
          {upcomingReleases.map(({ id, title, meta, placeholder }) => (
            <div key={id}>
              <div style={{ aspectRatio: '1', borderRadius: 6, overflow: 'hidden' }}>
                <ImageSlot id={id} shape="rect" placeholder={placeholder} />
              </div>
              <h4 className="serif" style={{ fontSize: 28, margin: '18px 0 4px' }}>
                {title}
              </h4>
              <p style={{ margin: 0, color: 'var(--muted-2)', fontSize: 16.5 }}>{meta}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: 80 }}>
        <Link to="/book" className="btn btn--lg">
          Like it? Book an evening
        </Link>
      </div>
    </main>
  );
}
