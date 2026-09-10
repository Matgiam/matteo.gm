import { Link } from 'react-router-dom';
import { usePageAnimation } from '../hooks/usePageAnimation';
import { useI18n } from '../i18n/context';
import { contact } from '../config';

export default function Press() {
  const scope = usePageAnimation();
  const { t } = useI18n();
  const copy = t.press;

  return (
    <main ref={scope} className="shell page">
      <div className="eyebrow" style={{ marginBottom: 24 }}>
        {copy.eyebrow}
      </div>
      <h1 className="display display--page" style={{ marginBottom: 72 }}>
        {copy.title}
      </h1>

      <div className="quotes">
        {copy.quotes.map(({ quote, source }, i) => (
          <blockquote className="quote" key={i}>
            <p>{t.common.quote(quote)}</p>
            <cite>{source}</cite>
          </blockquote>
        ))}
      </div>

      <p className="note" style={{ marginTop: 64 }}>
        {copy.note}
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
          <strong style={{ fontWeight: 500 }}>{copy.photosTitle}</strong>
          <br />
          <Link to="/gallery" className="link-u link-u--sm">
            {copy.photosLink}
          </Link>
        </div>
        <div>
          <strong style={{ fontWeight: 500 }}>{copy.requestsTitle}</strong>
          <br />
          <a href={`mailto:${contact.press}`} className="link-u link-u--sm">
            {contact.press} →
          </a>
        </div>
      </section>
    </main>
  );
}
