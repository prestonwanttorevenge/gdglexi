import { STATS, METHODOLOGY_STEPS, TESTIMONIALS, COURSES } from '../data/mockData.js';
import { loadHtmlPartials } from './core/partialLoader.js?v=2';
import { getSavedWishlist, saveWishlist } from './core/storage.js';
import { initThemeController } from './modules/theme.js';
import { initToast } from './modules/toast.js';
import { initNavbar } from './modules/navbar.js';
import { initCourses } from './modules/courses.js';
import { initWishlistDrawer } from './modules/wishlist.js';
import { initFaq } from './modules/faq.js';
import { initContactForm } from './modules/contactForm.js';
import { initScrollMotion, initHeroTypewriter } from './modules/motion.js';

function renderStaticSections() {
  const statsContainer = document.getElementById('stats-grid');
  if (statsContainer) {
    const fragment = document.createDocumentFragment();
    STATS.forEach((stat) => {
      const item = document.createElement('div');
      item.className = 'stat-item';

      const value = document.createElement('div');
      value.className = 'stat-item__value';
      value.textContent = stat.value;

      const label = document.createElement('div');
      label.className = 'stat-item__label';
      label.textContent = stat.label;

      item.append(value, label);
      fragment.appendChild(item);
    });
    statsContainer.replaceChildren(fragment);
  }

  const stepsContainer = document.getElementById('methodology-grid');
  if (stepsContainer) {
    const fragment = document.createDocumentFragment();
    METHODOLOGY_STEPS.forEach((step) => {
      const card = document.createElement('article');
      card.className = 'method-card';

      const num = document.createElement('span');
      num.className = 'method-card__step';
      num.textContent = step.step;

      const title = document.createElement('h3');
      title.className = 'method-card__title';
      title.textContent = step.title;

      const desc = document.createElement('p');
      desc.className = 'method-card__desc';
      desc.textContent = step.description;

      card.append(num, title, desc);
      fragment.appendChild(card);
    });
    stepsContainer.replaceChildren(fragment);
  }

  const testimonialsContainer = document.getElementById('testimonials-grid');
  if (testimonialsContainer) {
    const fragment = document.createDocumentFragment();
    TESTIMONIALS.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'testimonial-card';

      const quote = document.createElement('blockquote');
      quote.className = 'testimonial-card__quote';
      quote.textContent = `“${item.quote}”`;

      const footer = document.createElement('footer');
      footer.className = 'testimonial-card__footer';

      const name = document.createElement('strong');
      name.className = 'testimonial-card__name';
      name.textContent = item.name;

      const meta = document.createElement('span');
      meta.className = 'testimonial-card__meta';
      meta.textContent = `${item.achievement} • ${item.course}`;

      footer.append(name, meta);
      card.append(quote, footer);
      fragment.appendChild(card);
    });
    testimonialsContainer.replaceChildren(fragment);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadHtmlPartials();
  } catch (error) {
    const main = document.getElementById('main-content');
    if (main) {
      const notice = document.createElement('p');
      notice.className = 'container section';
      notice.textContent =
        'Không thể nạp các thành phần HTML khi mở trực tiếp bằng file://. Vui lòng chạy qua Live Server hoặc máy chủ tĩnh (npx serve .).';
      main.replaceChildren(notice);
    }
    console.error(error);
    return;
  }

  initThemeController();
  renderStaticSections();

  const { showToast } = initToast();
  const cleanupNavbar = initNavbar();
  const cleanupTypewriter = initHeroTypewriter();
  initFaq();
  initScrollMotion();

  let wishlistIds = getSavedWishlist();
  let coursesApi = null;
  let wishlistDrawerApi = null;

  const contactApi = initContactForm({ showToast });

  const toggleWishlist = (courseId) => {
    const exists = wishlistIds.includes(courseId);
    const targetCourse = COURSES.find((c) => c.id === courseId);
    if (exists) {
      wishlistIds = wishlistIds.filter((id) => id !== courseId);
      if (targetCourse) showToast(`Đã bỏ lưu "${targetCourse.title}".`);
    } else {
      wishlistIds = [...wishlistIds, courseId];
      if (targetCourse) showToast(`Đã lưu "${targetCourse.title}" vào danh sách quan tâm.`);
    }
    saveWishlist(wishlistIds);
    wishlistDrawerApi?.refreshWishlistUI();
  };

  const removeFromWishlist = (courseId) => {
    wishlistIds = wishlistIds.filter((id) => id !== courseId);
    saveWishlist(wishlistIds);
    coursesApi?.refreshCourses();
  };

  const clearWishlist = () => {
    wishlistIds = [];
    saveWishlist(wishlistIds);
    coursesApi?.refreshCourses();
  };

  coursesApi = initCourses({
    getWishlist: () => wishlistIds,
    toggleWishlist,
    onSelectCourseForConsult: (courseId) => contactApi.selectCourse(courseId),
  });

  wishlistDrawerApi = initWishlistDrawer({
    getWishlist: () => wishlistIds,
    removeFromWishlist,
    clearWishlist,
    onOpenCourse: (courseId) => coursesApi.openCourseModal(courseId),
    showToast,
  });

  window.addEventListener(
    'beforeunload',
    () => {
      cleanupNavbar();
      cleanupTypewriter();
    },
    { once: true }
  );
});
