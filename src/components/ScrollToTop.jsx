import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** The old runtime scrolled to the top on every page switch; routes should too. */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return null;
}
