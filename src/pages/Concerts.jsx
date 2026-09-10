import { Link } from 'react-router-dom';
import { usePageAnimation } from '../hooks/usePageAnimation';
import { useI18n } from '../i18n/context';
import { formatDay, formatMonthYear } from '../i18n/format';
import { siteConfig } from '../config';
import { concerts, pastConcerts } from '../data/site';

export default function Concerts() {
  const scope = usePageAnimation();
  const { t, lang } = useI18n();
  const copy = t.concerts;

  return (
    <main ref={scope} className="shell page">
      <div className="eyebrow" style={{ marginBottom: 24 }}>
        {copy.eyebrow}
      </div>
      <h1 className="display display--page" style={{ marginBottom: 64 }}>
        {copy.title}
      </h1>

      <div style={{ borderTop: '1px solid var(--line-strong)' }}>
        {concerts.map(({ id, date, ticketUrl, freeEntry }) => {
          const { venue, city, description } = copy.items[id];
          return (
            <div className="concert-row" key={id}>
              <div>
                <div className="concert-row__day">{formatDay(date, lang)}</div>
                <div className="concert-row__month">{formatMonthYear(date, lang)}</div>
              </div>
              <div>
                <div className="concert-row__venue">{venue}</div>
                <div className="concert-row__city">{city}</div>
              </div>
              <div className="concert-row__desc">{description}</div>
              {freeEntry ? (
                <span
                  className="concert-row__cta"
                  style={{ fontSize: 15, color: 'var(--accent-deep)', letterSpacing: '.08em' }}
                >
                  {copy.freeEntry}
                </span>
              ) : (
                <a href={ticketUrl} className="btn-outline btn-outline--sm concert-row__cta">
                  {copy.tickets}
                </a>
              )}
            </div>
          );
        })}
      </div>

      {siteConfig.showPastConcerts && (
        <section style={{ marginTop: 72 }}>
          <h3 className="serif" style={{ fontSize: 32, margin: '0 0 24px' }}>
            {copy.pastTitle}
          </h3>
          <div style={{ display: 'grid', gap: 12, color: 'var(--muted-2)', fontSize: 17 }}>
            {pastConcerts.map(({ id, date }) => (
              <div key={id}>
                {formatMonthYear(date, lang)} · {copy.past[id].venue} · {copy.past[id].city}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="panel cta-band" style={{ marginTop: 80 }}>
        <div>
          <h3 className="serif" style={{ fontSize: 34, margin: '0 0 10px' }}>
            {copy.ctaTitle}
          </h3>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: 18 }}>{copy.ctaBody}</p>
        </div>
        <Link to="/book" className="btn" style={{ justifySelf: 'start' }}>
          {copy.cta}
        </Link>
      </section>
    </main>
  );
}
