import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <Link to="/" className="wordmark wordmark--sm">
          Matteo<span className="accent">.</span>gm
        </Link>

        <div className="footer__links">
          <Link to="/music">{t.footer.music}</Link>
          <Link to="/concerts">{t.footer.concerts}</Link>
          <Link to="/book">{t.footer.book}</Link>
        </div>

        <div className="footer__legal">{t.footer.legal}</div>
      </div>
    </footer>
  );
}
