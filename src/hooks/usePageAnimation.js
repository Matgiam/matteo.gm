import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CLEAR = 'opacity,visibility,transform';

/**
 * Entrance animations for a page. Attach the returned ref to the page's <main>;
 * everything is scoped to that element and reverted on unmount, so navigating
 * between routes tears down its ScrollTriggers cleanly.
 */
export function usePageAnimation() {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const main = scope.current;
    if (!main) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const ctx = gsap.context(() => {
      // Hero / first block: staggered rise
      const sections = Array.from(main.querySelectorAll(':scope > section'));
      const hero = sections[0] || main;
      // A form gets its own cascade below — animating it here too stalls the reveal.
      const heroKids = Array.from(hero.children)
        .filter((c) => c.tagName !== 'FORM')
        .flatMap((c) =>
          c.children.length > 1 && c.children.length < 8 ? Array.from(c.children) : [c],
        );
      gsap.fromTo(
        heroKids,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.09, ease: 'power3.out', clearProps: CLEAR },
      );

      // Sections below: rise on scroll, with inner stagger for grids/cards
      sections.slice(1).forEach((sec) => {
        const grid = sec.querySelector('.grid-3, .grid-2, .split, [data-anim="grid"]');
        const items =
          grid && grid.children.length > 1 && grid.children.length < 10
            ? Array.from(grid.children)
            : [sec];
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 42 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: 'power3.out',
            clearProps: CLEAR,
            scrollTrigger: { trigger: sec, start: 'top 88%', once: true },
          },
        );
      });

      // List rows (works catalogue, concerts): cascade in
      main.querySelectorAll('.work-row, .concert-row').forEach((row, i) => {
        gsap.fromTo(
          row,
          { autoAlpha: 0, x: -28 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.7,
            delay: 0.08 * i,
            ease: 'power2.out',
            clearProps: CLEAR,
            scrollTrigger: { trigger: row, start: 'top 92%', once: true },
          },
        );
      });

      // Blockquotes (press): soft fade up
      main.querySelectorAll('blockquote').forEach((q) => {
        gsap.fromTo(
          q,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            clearProps: CLEAR,
            scrollTrigger: { trigger: q, start: 'top 90%', once: true },
          },
        );
      });

      // Images: gentle scale settle
      main.querySelectorAll('[data-anim="settle"]').forEach((im) => {
        gsap.fromTo(
          im,
          { scale: 1.04 },
          {
            scale: 1,
            duration: 1.4,
            ease: 'power2.out',
            clearProps: 'transform',
            scrollTrigger: { trigger: im, start: 'top 90%', once: true },
          },
        );
      });

      // Booking form fields: cascade
      const form = main.querySelector('form');
      if (form) {
        gsap.fromTo(
          form.children,
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            delay: 0.25,
            clearProps: CLEAR,
          },
        );
      }
    }, main);

    // Nav lives outside the page scope — subtle drop-in on page change
    const nav = document.querySelector('nav');
    if (nav) {
      gsap.fromTo(
        nav,
        { y: -10, autoAlpha: 0.6 },
        { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power2.out', clearProps: CLEAR },
      );
    }

    return () => ctx.revert();
  }, []);

  return scope;
}
