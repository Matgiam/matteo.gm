import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <Link to="/" className="wordmark wordmark--sm">
          Matteo<span className="accent">.</span>gm
        </Link>

        <div className="footer__links">
          <Link to="/music">Music</Link>
          <Link to="/concerts">Concerts</Link>
          <Link to="/book">Book me</Link>
        </div>

        <div className="footer__legal">© 2026 Matteo.gm · Artwork: “Away”, pastel on paper</div>
      </div>
    </footer>
  );
}
