import { Link } from 'react-router-dom';
import { usePageAnimation } from '../hooks/usePageAnimation';
import { works } from '../data/site';

export default function Works() {
  const scope = usePageAnimation();

  return (
    <main ref={scope} className="shell page">
      <div className="eyebrow" style={{ marginBottom: 24 }}>
        Works
      </div>
      <h1 className="display display--page" style={{ marginBottom: 20 }}>
        Catalogue of <em className="accent">compositions</em>.
      </h1>
      <p style={{ color: 'var(--muted)', fontSize: 19, maxWidth: '56ch', margin: '0 0 64px' }}>
        Everything I’ve finished so far — scores available on request. For film and commission work,{' '}
        <Link to="/book" className="link-u link-u--sm">
          write to me
        </Link>
        .
      </p>

      <div className="works">
        {works.map(({ n, title, year, forces, length, tag }) => (
          <div className="work-row" key={n}>
            <span className="work-row__n">{n}</span>
            <span className="work-row__title">{title}</span>
            <span className="work-row__year">{year}</span>
            <span className="work-row__forces">{forces}</span>
            <span className="work-row__len">{length}</span>
            <span className="work-row__tag">{tag}</span>
          </div>
        ))}
      </div>

      <p className="note" style={{ marginTop: 28 }}>
        Sample catalogue — swap in your real works and timings.
      </p>
    </main>
  );
}
