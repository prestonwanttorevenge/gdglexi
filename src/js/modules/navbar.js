export function initNavbar() {
  const header = document.getElementById('site-header');
  const menuToggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('mobile-drawer-backdrop');
  const drawerCloseBtn = document.getElementById('mobile-drawer-close');
  const drawerLinks = drawer ? drawer.querySelectorAll('a[href^="#"]') : [];

  const SCROLL_THRESHOLD = 50;
  let isDrawerOpen = false;
  let lastFocusedElement = null;

  const handleScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
  };

  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  const openDrawer = () => {
    if (!drawer || !drawerBackdrop || isDrawerOpen) return;
    isDrawerOpen = true;
    lastFocusedElement = document.activeElement;

    drawer.hidden = false;
    drawerBackdrop.hidden = false;
    requestAnimationFrame(() => {
      drawer.classList.add('is-open');
      drawerBackdrop.classList.add('is-open');
    });

    menuToggleBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    drawerCloseBtn?.focus();
  };

  const closeDrawer = () => {
    if (!drawer || !drawerBackdrop || !isDrawerOpen) return;
    isDrawerOpen = false;

    drawer.classList.remove('is-open');
    drawerBackdrop.classList.remove('is-open');
    menuToggleBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    window.setTimeout(() => {
      if (!isDrawerOpen) {
        drawer.hidden = true;
        drawerBackdrop.hidden = true;
      }
    }, 220);

    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && isDrawerOpen) {
      closeDrawer();
    }
  };

  menuToggleBtn?.addEventListener('click', openDrawer);
  drawerCloseBtn?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);
  drawerLinks.forEach((link) => link.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', handleKeyDown);

  return function cleanupNavbar() {
    window.removeEventListener('scroll', handleScroll);
    menuToggleBtn?.removeEventListener('click', openDrawer);
    drawerCloseBtn?.removeEventListener('click', closeDrawer);
    drawerBackdrop?.removeEventListener('click', closeDrawer);
    document.removeEventListener('keydown', handleKeyDown);
    if (isDrawerOpen) {
      document.body.style.overflow = '';
    }
  };
}
