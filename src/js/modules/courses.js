import { COURSES, COURSE_CATEGORIES } from '../../data/mockData.js';
import { debounce, createBookmarkSvg, createArrowSvg } from '../core/dom.js';

export function initCourses({ getWishlist, toggleWishlist, onSelectCourseForConsult }) {
  const tabsContainer = document.getElementById('course-tabs');
  const searchInput = document.getElementById('course-search');
  const searchClearBtn = document.getElementById('course-search-clear');
  const gridContainer = document.getElementById('course-grid');
  const statusEl = document.getElementById('course-results-status');

  const modalBackdrop = document.getElementById('course-modal-backdrop');
  const modal = document.getElementById('course-modal');
  const modalCloseBtn = document.getElementById('course-modal-close');
  const modalBadge = document.getElementById('modal-course-badge');
  const modalTitle = document.getElementById('modal-course-title');
  const modalSummary = document.getElementById('modal-course-summary');
  const modalTarget = document.getElementById('modal-course-target');
  const modalDuration = document.getElementById('modal-course-duration');
  const modalSchedule = document.getElementById('modal-course-schedule');
  const modalFormat = document.getElementById('modal-course-format');
  const modalInstructor = document.getElementById('modal-course-instructor');
  const modalPrice = document.getElementById('modal-course-price');
  const modalSuitable = document.getElementById('modal-course-suitable');
  const modalCurriculum = document.getElementById('modal-course-curriculum');
  const modalHighlights = document.getElementById('modal-course-highlights');
  const modalWishlistBtn = document.getElementById('modal-course-wishlist');
  const modalConsultBtn = document.getElementById('modal-course-consult');

  let activeCategory = 'all';
  let searchQuery = '';
  let activeModalCourseId = null;
  let lastFocusedElement = null;

  const renderTabs = () => {
    if (!tabsContainer) return;
    const fragment = document.createDocumentFragment();

    COURSE_CATEGORIES.forEach((cat) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'filter-tab';
      btn.dataset.category = cat.id;
      btn.setAttribute('role', 'tab');
      const isSelected = cat.id === activeCategory;
      btn.setAttribute('aria-selected', String(isSelected));
      if (isSelected) btn.classList.add('is-active');
      btn.textContent = cat.label;
      fragment.appendChild(btn);
    });

    tabsContainer.replaceChildren(fragment);
  };

  const getFilteredCourses = () => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return COURSES.filter((course) => {
      const matchesCategory =
        activeCategory === 'all' || course.tags.includes(activeCategory);

      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;

      const searchableText = [
        course.title,
        course.summary,
        course.target,
        course.level,
        course.badge,
        course.instructor,
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  };

  const createCourseCard = (course, savedIds) => {
    const isSaved = savedIds.includes(course.id);
    const article = document.createElement('article');
    article.className = 'course-card';
    article.dataset.courseId = course.id;

    const topRow = document.createElement('div');
    topRow.className = 'course-card__top';

    const badge = document.createElement('span');
    badge.className = 'course-badge';
    badge.textContent = course.badge;

    const wishlistBtn = document.createElement('button');
    wishlistBtn.type = 'button';
    wishlistBtn.className = 'icon-btn course-wishlist-btn';
    if (isSaved) wishlistBtn.classList.add('is-saved');
    wishlistBtn.dataset.action = 'toggle-wishlist';
    wishlistBtn.dataset.courseId = course.id;
    wishlistBtn.setAttribute('aria-pressed', String(isSaved));
    wishlistBtn.setAttribute(
      'aria-label',
      isSaved
        ? `Bỏ lưu khóa học ${course.title}`
        : `Lưu khóa học ${course.title} vào danh sách quan tâm`
    );
    wishlistBtn.appendChild(createBookmarkSvg(isSaved));

    topRow.append(badge, wishlistBtn);

    const title = document.createElement('h3');
    title.className = 'course-card__title';
    title.textContent = course.title;

    const target = document.createElement('p');
    target.className = 'course-card__target';
    target.textContent = `${course.target} • ${course.duration}`;

    const summary = document.createElement('p');
    summary.className = 'course-card__summary';
    summary.textContent = course.summary;

    const footer = document.createElement('div');
    footer.className = 'course-card__footer';

    const priceBox = document.createElement('div');
    priceBox.className = 'course-card__price-wrap';

    const priceLabel = document.createElement('span');
    priceLabel.className = 'course-card__price-label';
    priceLabel.textContent = 'Học phí trọn khóa';

    const priceValue = document.createElement('span');
    priceValue.className = 'course-card__price';
    priceValue.textContent = course.price;

    priceBox.append(priceLabel, priceValue);

    const detailBtn = document.createElement('button');
    detailBtn.type = 'button';
    detailBtn.className = 'btn btn--ghost course-detail-btn';
    detailBtn.dataset.action = 'open-detail';
    detailBtn.dataset.courseId = course.id;

    const btnText = document.createElement('span');
    btnText.textContent = 'Xem chi tiết';
    detailBtn.append(btnText, createArrowSvg());

    footer.append(priceBox, detailBtn);
    article.append(topRow, title, target, summary, footer);
    return article;
  };

  const renderCourses = () => {
    if (!gridContainer) return;
    const filtered = getFilteredCourses();
    const savedIds = getWishlist();

    if (statusEl) {
      statusEl.textContent =
        filtered.length > 0
          ? `Hiển thị ${filtered.length} khóa học phù hợp`
          : 'Không tìm thấy khóa học nào khớp với từ khóa của bạn.';
    }

    if (filtered.length === 0) {
      const emptyBox = document.createElement('div');
      emptyBox.className = 'course-empty';

      const emptyTitle = document.createElement('p');
      emptyTitle.className = 'course-empty__title';
      emptyTitle.textContent = 'Chưa có khóa học phù hợp với bộ lọc hiện tại.';

      const resetBtn = document.createElement('button');
      resetBtn.type = 'button';
      resetBtn.className = 'btn btn--outline';
      resetBtn.textContent = 'Đặt lại bộ lọc';
      resetBtn.addEventListener('click', () => {
        activeCategory = 'all';
        searchQuery = '';
        if (searchInput) searchInput.value = '';
        if (searchClearBtn) searchClearBtn.hidden = true;
        renderTabs();
        renderCourses();
      });

      emptyBox.append(emptyTitle, resetBtn);
      gridContainer.replaceChildren(emptyBox);
      return;
    }

    const fragment = document.createDocumentFragment();
    filtered.forEach((course, index) => {
      const card = createCourseCard(course, savedIds);
      card.style.setProperty('--stagger-index', String(Math.min(index, 5)));
      fragment.appendChild(card);
    });
    gridContainer.replaceChildren(fragment);
  };

  const syncModalWishlistButton = (courseId) => {
    if (!modalWishlistBtn || !courseId) return;
    const isSaved = getWishlist().includes(courseId);
    modalWishlistBtn.classList.toggle('is-saved', isSaved);
    modalWishlistBtn.setAttribute('aria-pressed', String(isSaved));
    modalWishlistBtn.textContent = isSaved ? 'Đã lưu quan tâm' : 'Lưu vào quan tâm';
  };

  const openModal = (courseId) => {
    const course = COURSES.find((item) => item.id === courseId);
    if (!course || !modal || !modalBackdrop) return;

    activeModalCourseId = course.id;
    lastFocusedElement = document.activeElement;

    if (modalBadge) modalBadge.textContent = course.badge;
    if (modalTitle) modalTitle.textContent = course.title;
    if (modalSummary) modalSummary.textContent = course.summary;
    if (modalTarget) modalTarget.textContent = course.target;
    if (modalDuration) modalDuration.textContent = course.duration;
    if (modalSchedule) modalSchedule.textContent = course.schedule;
    if (modalFormat) modalFormat.textContent = course.format;
    if (modalInstructor) modalInstructor.textContent = course.instructor ?? '';
    if (modalPrice) modalPrice.textContent = course.price ?? '';
    if (modalSuitable) modalSuitable.textContent = course.suitableFor ?? course.summary ?? '';

    if (modalCurriculum) {
      const fragment = document.createDocumentFragment();
      (course.curriculum ?? []).forEach((stage) => {
        const li = document.createElement('li');
        li.textContent = stage;
        fragment.appendChild(li);
      });
      modalCurriculum.replaceChildren(fragment);
    }

    if (modalHighlights) {
      const fragment = document.createDocumentFragment();
      (course.highlights ?? []).forEach((point) => {
        const li = document.createElement('li');
        li.textContent = point;
        fragment.appendChild(li);
      });
      modalHighlights.replaceChildren(fragment);
    }

    syncModalWishlistButton(course.id);

    modal.hidden = false;
    modalBackdrop.hidden = false;
    void modal.offsetWidth;
    modal.classList.add('is-open');
    modalBackdrop.classList.add('is-open');

    document.body.style.overflow = 'hidden';
    modalCloseBtn?.focus();
  };

  const closeModal = () => {
    if (!modal || !modalBackdrop || !activeModalCourseId) return;
    activeModalCourseId = null;

    modal.classList.remove('is-open');
    modalBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';

    window.setTimeout(() => {
      if (!activeModalCourseId) {
        modal.hidden = true;
        modalBackdrop.hidden = true;
      }
    }, 200);

    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  };

  tabsContainer?.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-category]');
    if (!tab) return;
    const nextCategory = tab.dataset.category;
    if (!nextCategory || nextCategory === activeCategory) return;

    activeCategory = nextCategory;
    renderTabs();
    renderCourses();
  });

  const handleDebouncedSearch = debounce((value) => {
    searchQuery = value;
    renderCourses();
  }, 200);

  searchInput?.addEventListener('input', (event) => {
    const value = event.target.value;
    if (searchClearBtn) {
      searchClearBtn.hidden = value.length === 0;
    }
    handleDebouncedSearch(value);
  });

  searchClearBtn?.addEventListener('click', () => {
    if (!searchInput) return;
    searchInput.value = '';
    searchQuery = '';
    searchClearBtn.hidden = true;
    renderCourses();
    searchInput.focus();
  });

  gridContainer?.addEventListener('click', (event) => {
    const actionBtn = event.target.closest('[data-action]');
    if (!actionBtn) return;

    const { action, courseId } = actionBtn.dataset;
    if (!courseId) return;

    if (action === 'open-detail') {
      openModal(courseId);
    } else if (action === 'toggle-wishlist') {
      toggleWishlist(courseId);
      renderCourses();
    }
  });

  modalCloseBtn?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', closeModal);

  modalWishlistBtn?.addEventListener('click', () => {
    if (!activeModalCourseId) return;
    toggleWishlist(activeModalCourseId);
    syncModalWishlistButton(activeModalCourseId);
    renderCourses();
  });

  modalConsultBtn?.addEventListener('click', () => {
    if (!activeModalCourseId) return;
    const selectedId = activeModalCourseId;
    closeModal();
    onSelectCourseForConsult?.(selectedId);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && activeModalCourseId) {
      closeModal();
    }
  });

  renderTabs();
  renderCourses();

  return {
    refreshCourses: renderCourses,
    openCourseModal: openModal,
  };
}
