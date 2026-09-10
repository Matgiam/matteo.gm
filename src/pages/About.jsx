import { Link } from 'react-router-dom';
import { usePageAnimation } from '../hooks/usePageAnimation';
import { useI18n } from '../i18n/context';

export default function About() {
  const scope = usePageAnimation();
  const { t } = useI18n();
  const copy = t.about;

  return (
    <main ref={scope} className="shell page split split--aside">
      <figure className="sticky-col">
        <img
          data-anim="settle"
          src="/assets/matteo-portrait.jpg"
          alt="Matteo"
          style={{
            width: '100%',
            display: 'block',
            borderRadius: 4,
            boxShadow: '0 26px 52px -18px rgba(90,40,10,.4)',
          }}
        />
        <figcaption className="caption">{copy.portraitCaption}</figcaption>
      </figure>

      <div>
        <div className="eyebrow" style={{ marginBottom: 24 }}>
          {copy.eyebrow}
        </div>
        <h1 className="display display--page" style={{ marginBottom: 32 }}>
          {copy.title}
        </h1>

        <div
          style={{
            fontSize: 19.5,
            color: 'var(--ink-2)',
            maxWidth: '58ch',
            display: 'grid',
            gap: 22,
          }}
        >
          {copy.paragraphs.map((paragraph, i) => (
            <p key={i} style={{ margin: 0, textWrap: 'pretty' }}>
              {paragraph}
            </p>
          ))}
        </div>

        <div style={{ marginTop: 52, borderTop: '1px solid var(--line)', paddingTop: 36 }}>
          <div className="eyebrow" style={{ marginBottom: 22 }}>
            {copy.factsEyebrow}
          </div>
          <div className="facts">
            {copy.facts.map((fact, i) => (
              <div key={i}>
                <span className="facts__dash">—</span>
                <span>{fact}</span>
              </div>
            ))}
          </div>
        </div>

        <Link to="/book" className="btn" style={{ marginTop: 44 }}>
          {copy.cta}
        </Link>
      </div>
    </main>
  );
}
