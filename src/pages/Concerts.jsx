import { Link } from 'react-router-dom';
import { usePageAnimation } from '../hooks/usePageAnimation';
import { siteConfig } from '../config';
import { concerts, pastConcerts } from '../data/site';

export default function Concerts() {
  const scope = usePageAnimation();

  return (
    <main ref={scope} className="shell page">
      <div className="eyebrow" style={{ marginBottom: 24 }}>
        Concerts
      </div>
      <h1 className="display display--page" style={{ marginBottom: 64 }}>
        Where to <em className="accent">hear me</em>.
      </h1>

      <div style={{ borderTop: '1px solid var(--line-strong)' }}>
        {concerts.map((c) => (
          <div className="concert-row" key={`${c.day}-${c.month}`}>
            <div>
              <div className="concert-row__day">{c.day}</div>
              <div className="concert-row__month">{c.month}</div>
            </div>
            <div>
              <div className="concert-row__venue">{c.venue}</div>
              <div className="concert-row__city">{c.city}</div>
            </div>
            <div className="concert-row__desc">{c.description}</div>
            {c.freeEntry ? (
              <span
                className="concert-row__cta"
                style={{ fontSize: 15, color: 'var(--accent-deep)', letterSpacing: '.08em' }}
              >
                Free entry
              </span>
            ) : (
              <a href={c.ticketUrl} className="btn-outline btn-outline--sm concert-row__cta">
                Tickets ↗
              </a>
            )}
          </div>
        ))}
      </div>

      {siteConfig.showPastConcerts && (
        <section style={{ marginTop: 72 }}>
          <h3 className="serif" style={{ fontSize: 32, margin: '0 0 24px' }}>
            Past
          </h3>
          <div style={{ display: 'grid', gap: 12, color: 'var(--muted-2)', fontSize: 17 }}>
            {pastConcerts.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </section>
      )}

      <section className="panel cta-band" style={{ marginTop: 80 }}>
        <div>
          <h3 className="serif" style={{ fontSize: 34, margin: '0 0 10px' }}>
            Have a quiet space and a piano?
          </h3>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: 18 }}>
            I love small venues: living rooms, courtyards, chapels, galleries. Booking for 2026–27
            is open.
          </p>
        </div>
        <Link to="/book" className="btn" style={{ justifySelf: 'start' }}>
          Book a concert →
        </Link>
      </section>
    </main>
  );
}
