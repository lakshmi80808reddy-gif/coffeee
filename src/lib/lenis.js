import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initLenis() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return null;
  }

  const lenis = new Lenis({
    duration: 0.9,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });

  // On Lenis scroll, update ScrollTrigger
  lenis.on('scroll', () => {
    ScrollTrigger.update();
  });

  // Connect GSAP ticker to Lenis raf
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Turn off lag smoothing in GSAP ticker
  gsap.ticker.lagSmoothing(0);

  // Intercept anchor clicks
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        
        // Temporarily pause and update ScrollTrigger before scrolling to ensure offsets are correct
        ScrollTrigger.refresh();

        lenis.scrollTo(target, {
          offset: 0,
          immediate: false,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        // Update URL hash without breaking back history
        history.pushState(null, null, href);
      }
    });
  });

  // Handle hash landing on page load
  if (window.location.hash) {
    const hash = window.location.hash;
    // Delay scroll to allow React component mounting and ScrollTrigger computations to complete
    setTimeout(() => {
      const target = document.querySelector(hash);
      if (target) {
        ScrollTrigger.refresh();
        lenis.scrollTo(target, { immediate: true });
      }
    }, 600);
  }

  return lenis;
}
