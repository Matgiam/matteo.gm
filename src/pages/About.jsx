import { Link } from 'react-router-dom';
import { usePageAnimation } from '../hooks/usePageAnimation';

const facts = [
  'Based in Sicily, Italy · plays across Europe',
  'Writes for solo piano, piano & cello, and film',
  'Records at home — one room, one piano, open windows',
  'Debut single “Away” out now on Spotify',
];

export default function About() {
  const scope = usePageAnimation();

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
        <figcaption className="caption">Home, just after sunset</figcaption>
      </figure>

      <div>
        <div className="eyebrow" style={{ marginBottom: 24 }}>
          About
        </div>
        <h1 className="display display--page" style={{ marginBottom: 32 }}>
          Hi, I’m <em className="accent">Matteo</em>.
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
          <p style={{ margin: 0, textWrap: 'pretty' }}>
            I grew up by the sea, where evenings end slowly. Most of what I write starts there — at
            the hour when the light turns orange and everything gets a little quieter.
          </p>
          <p style={{ margin: 0, textWrap: 'pretty' }}>
            I play piano and I compose small, calm pieces: solo piano, sometimes a cello or a soft
            layer of tape. I record at home, late, with the windows open, and I like when you can
            hear the room breathing in a take.
          </p>
          <p style={{ margin: 0, textWrap: 'pretty' }}>
            My first single, <em>“Away”</em>, came out in 2026. It’s three minutes of dusk — and the
            beginning of a longer collection I’m writing now.
          </p>
          <p style={{ margin: 0, textWrap: 'pretty' }}>
            When I’m not recording, I play living rooms, courtyards and small halls. If you have a
            quiet space and a piano, we’ll get along.
          </p>
        </div>

        <div style={{ marginTop: 52, borderTop: '1px solid var(--line)', paddingTop: 36 }}>
          <div className="eyebrow" style={{ marginBottom: 22 }}>
            A few facts
          </div>
          <div className="facts">
            {facts.map((fact) => (
              <div key={fact}>
                <span className="facts__dash">—</span>
                <span>{fact}</span>
              </div>
            ))}
          </div>
        </div>

        <Link to="/book" className="btn" style={{ marginTop: 44 }}>
          Book an evening →
        </Link>
      </div>
    </main>
  );
}
