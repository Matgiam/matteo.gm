import { Link } from 'react-router-dom';
import ImageSlot from '../components/ImageSlot';
import SpotifyEmbed from '../components/SpotifyEmbed';
import { usePageAnimation } from '../hooks/usePageAnimation';
import { useI18n } from '../i18n/context';
import { spotify } from '../config';
import { upcomingReleases } from '../data/site';

export default function Music() {
  const scope = usePageAnimation();
  const { t } = useI18n();
  const copy = t.music;

  return (
    <main ref={scope} className="shell page">
      <div className="eyebrow" style={{ marginBottom: 24 }}>
        {copy.eyebrow}
      </div>
      <h1 className="display display--page" style={{ marginBottom: 64 }}>
        {copy.title}
      </h1>

      <section className="panel split split--media">
        <img
          data-anim="settle"
          src="/assets/away-artwork.png"
          alt={copy.artworkAlt}
          style={{
            width: '100%',
            display: 'block',
            borderRadius: 6,
            boxShadow: 'var(--shadow-md)',
          }}
        />

        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            {copy.single}
          </div>
          <h2
            className="display"
            style={{ fontSize: 'clamp(40px,4.5vw,56px)', margin: '0 0 14px', lineHeight: 1 }}
          >
            Away
          </h2>
          <p style={{ color: 'var(--muted)', margin: '0 0 26px', maxWidth: '46ch', fontSize: 19 }}>
            {copy.body}
          </p>

          <SpotifyEmbed style={{ marginBottom: 24 }} />

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href={spotify.trackUrl} target="_blank" rel="noreferrer" className="btn-dark">
              {copy.spotify}
            </a>
            <a href={spotify.youtubeUrl} className="btn-outline">
              {copy.youtube}
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
            {copy.upcomingTitle}
          </h3>
          <span className="note">{copy.upcomingNote}</span>
        </div>

        <div className="grid-2">
          {upcomingReleases.map(({ id, title }) => (
            <div key={id}>
              <div style={{ aspectRatio: '1', borderRadius: 6, overflow: 'hidden' }}>
                <ImageSlot id={id} shape="rect" placeholder={copy.upcoming[id].placeholder} />
              </div>
              <h4 className="serif" style={{ fontSize: 28, margin: '18px 0 4px' }}>
                {title}
              </h4>
              <p style={{ margin: 0, color: 'var(--muted-2)', fontSize: 16.5 }}>
                {copy.upcoming[id].meta}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: 80 }}>
        <Link to="/book" className="btn btn--lg">
          {copy.cta}
        </Link>
      </div>
    </main>
  );
}
