import { Link } from 'react-router-dom';
import { usePageAnimation } from '../hooks/usePageAnimation';
import { contact } from '../config';
import { pressQuotes } from '../data/site';

export default function Press() {
  const scope = usePageAnimation();

  return (
    <main ref={scope} className="shell page">
      <div className="eyebrow" style={{ marginBottom: 24 }}>
        Press
      </div>
      <h1 className="display display--page" style={{ marginBottom: 72 }}>
        Kind <em className="accent">words</em>.
      </h1>

      <div className="quotes">
        {pressQuotes.map(({ quote, source }) => (
          <blockquote className="quote" key={source}>
            <p>“{quote}”</p>
            <cite>{source}</cite>
          </blockquote>
        ))}
      </div>

      <p className="note" style={{ marginTop: 64 }}>
        Placeholder quotes — replace with real press as it arrives.
      </p>

      <section
        style={{
          marginTop: 56,
          borderTop: '1px solid var(--line)',
          paddingTop: 40,
          display: 'flex',
          gap: 'clamp(28px,5vw,56px)',
          fontSize: 17,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <strong style={{ fontWeight: 500 }}>Press photos</strong>
          <br />
          <Link to="/gallery" className="link-u link-u--sm">
            Download from the gallery →
          </Link>
        </div>
        <div>
          <strong style={{ fontWeight: 500 }}>Interviews &amp; requests</strong>
          <br />
          <a href={`mailto:${contact.press}`} className="link-u link-u--sm">
            {contact.press} →
          </a>
        </div>
      </section>
    </main>
  );
}
