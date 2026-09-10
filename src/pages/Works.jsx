import { Link } from 'react-router-dom';
import { usePageAnimation } from '../hooks/usePageAnimation';
import { useI18n } from '../i18n/context';
import { works } from '../data/site';

// Handed to the translated intro sentence, which decides where the link falls.
// Defined at module level so React doesn't remount it on every render.
function WriteLink({ children }) {
  return (
    <Link to="/book" className="link-u link-u--sm">
      {children}
    </Link>
  );
}

export default function Works() {
  const scope = usePageAnimation();
  const { t } = useI18n();
  const copy = t.works;

  return (
    <main ref={scope} className="shell page">
      <div className="eyebrow" style={{ marginBottom: 24 }}>
        {copy.eyebrow}
      </div>
      <h1 className="display display--page" style={{ marginBottom: 20 }}>
        {copy.title}
      </h1>
      <p style={{ color: 'var(--muted)', fontSize: 19, maxWidth: '56ch', margin: '0 0 64px' }}>
        {copy.intro(WriteLink)}
      </p>

      <div className="works">
        {works.map(({ id, n, title, year, length }) => (
          <div className="work-row" key={id}>
            <span className="work-row__n">{n}</span>
            <span className="work-row__title">{title}</span>
            <span className="work-row__year">{year}</span>
            <span className="work-row__forces">{copy.items[id].forces}</span>
            <span className="work-row__len">{length}</span>
            <span className="work-row__tag">{copy.items[id].tag}</span>
          </div>
        ))}
      </div>

      <p className="note" style={{ marginTop: 28 }}>
        {copy.note}
      </p>
    </main>
  );
}
