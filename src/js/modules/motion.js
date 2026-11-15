export function initHeroTypewriter() {
  const targetEl = document.getElementById('hero-typewriter');
  if (!targetEl) return () => {};

  const prefersReduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    targetEl.classList.add('is-static');
    return () => {};
  }

  const phrases = ['IELTS & VSTEP', 'IELTS 7.0+', 'VSTEP B1–C1'];
  let phraseIndex = 0;
  let charIndex = phrases[0].length;
  let isDeleting = false;
  let timerId = null;

  const tick = () => {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex = Math.max(0, charIndex - 1);
      targetEl.textContent = currentPhrase.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timerId = window.setTimeout(tick, 320);
        return;
      }
      timerId = window.setTimeout(tick, 42);
      return;
    }

    charIndex = Math.min(currentPhrase.length, charIndex + 1);
    targetEl.textContent = currentPhrase.slice(0, charIndex);

    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      timerId = window.setTimeout(tick, 2200);
      return;
    }
    timerId = window.setTimeout(tick, 68);
  };

  timerId = window.setTimeout(() => {
    isDeleting = true;
    tick();
  }, 2400);

  return function cleanupTypewriter() {
    window.clearTimeout(timerId);
  };
}

export function initScrollMotion() {
  const targets = document.querySelectorAll(
    '.section-head, .about-gdg-layout, .courses-toolbar, .methodology-grid, .testimonials-layout, .faq-layout, .contact-layout'
  );

  if (targets.length === 0) return;

  const prefersReduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in-view'));
    return;
  }

  targets.forEach((el) => el.classList.add('reveal-block'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in-view');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  targets.forEach((el) => observer.observe(el));
}
