import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { navLinks } from '../data/site';

export default function Nav() {
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
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
            <NavLink to="/book" className="btn btn--sm">
              Book me
            </NavLink>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className={`nav__toggle${open ? ' is-open' : ''}`}
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
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
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => `nav__menu-link${isActive ? ' is-active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
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
