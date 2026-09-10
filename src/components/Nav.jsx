import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import LanguageToggle from './LanguageToggle';
import { useI18n } from '../i18n/context';
import { navLinks } from '../data/site';

export default function Nav() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef(null);

  // A route change means the menu did its job.
  useEffect(() => setOpen(false), [pathname]);

  // Escape closes it and hands focus back to the button that opened it.
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // Growing past the breakpoint should not leave a stranded open panel.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 761px)');
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <>
      <nav className={`nav${open ? ' is-open' : ''}`}>
        <div className="shell nav__inner">
          <NavLink to="/" className="wordmark">
            Matteo<span className="accent">.</span>gm
          </NavLink>

          <div className="nav__links">
            {navLinks.map(({ to, id }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`}
              >
                {t.nav[id]}
              </NavLink>
            ))}
            {/* Hidden at the hamburger breakpoint; the panel carries its own copy. */}
            <LanguageToggle className="nav__lang" />
            <NavLink to="/book" className="btn btn--sm">
              {t.nav.cta}
            </NavLink>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className={`nav__toggle${open ? ' is-open' : ''}`}
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav__bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>

        {/* Kept mounted so it can transition; `visibility` takes it out of the tab order when closed. */}
        <div id="nav-menu" className={`nav__menu${open ? ' is-open' : ''}`}>
          <div className="shell nav__menu-inner">
            {navLinks.map(({ to, id }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => `nav__menu-link${isActive ? ' is-active' : ''}`}
              >
                {t.nav[id]}
              </NavLink>
            ))}
            <div className="nav__menu-lang">
              <span className="eyebrow">{t.language.label}</span>
              <LanguageToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Sibling of <nav>, not a child: a negative-z-index child would paint on
          top of the bar's own background and tint it. */}
      {open && (
        <button
          type="button"
          className="nav__backdrop"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
