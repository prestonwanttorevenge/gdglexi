import { COURSES } from '../../data/mockData.js';

export function initWishlistDrawer({
  getWishlist,
  removeFromWishlist,
  clearWishlist,
  onOpenCourse,
  showToast,
}) {
  const openBtn = document.getElementById('wishlist-open-btn');
  const badgeEl = document.getElementById('wishlist-count');
  const drawer = document.getElementById('wishlist-drawer');
  const backdrop = document.getElementById('wishlist-backdrop');
  const closeBtn = document.getElementById('wishlist-close-btn');
  const listEl = document.getElementById('wishlist-items');
  const clearBtn = document.getElementById('wishlist-clear-btn');
  const consultLink = document.getElementById('wishlist-consult-link');

  let isOpen = false;
  let lastFocusedElement = null;

  const updateBadge = () => {
    const count = getWishlist().length;
    if (badgeEl) {
      badgeEl.textContent = String(count);
      badgeEl.hidden = count === 0;
    }
    if (clearBtn) {
      clearBtn.hidden = count === 0;
    }
  };

  const closeDrawer = () => {
    if (!drawer || !backdrop || !isOpen) return;
    isOpen = false;
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';

    window.setTimeout(() => {
      if (!isOpen) {
        drawer.hidden = true;
        backdrop.hidden = true;
      }
    }, 220);

    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  };

  const renderList = () => {
    updateBadge();
    if (!listEl) return;

    const savedIds = getWishlist();
    const savedCourses = COURSES.filter((course) => savedIds.includes(course.id));

    if (savedCourses.length === 0) {
      const emptyMsg = document.createElement('p');
      emptyMsg.className = 'wishlist-empty';
      emptyMsg.textContent =
        'Bạn chưa lưu khóa học nào. Nhấn biểu tượng đánh dấu trên từng khóa học để lưu lại so sánh.';
      listEl.replaceChildren(emptyMsg);
      return;
    }

    const fragment = document.createDocumentFragment();
    savedCourses.forEach((course) => {
      const item = document.createElement('div');
      item.className = 'wishlist-item';

      const info = document.createElement('div');
      info.className = 'wishlist-item__info';

      const titleBtn = document.createElement('button');
      titleBtn.type = 'button';
      titleBtn.className = 'wishlist-item__title';
      titleBtn.textContent = course.title;
      titleBtn.addEventListener('click', () => {
        closeDrawer();
        onOpenCourse(course.id);
      });

      const meta = document.createElement('span');
      meta.className = 'wishlist-item__meta';
      meta.textContent = `${course.target} • ${course.price}`;

      info.append(titleBtn, meta);

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'wishlist-item__remove';
      removeBtn.setAttribute('aria-label', `Xóa ${course.title} khỏi danh sách quan tâm`);
      removeBtn.textContent = 'Xóa';
      removeBtn.addEventListener('click', () => {
        removeFromWishlist(course.id);
        renderList();
        showToast(`Đã xóa "${course.title}" khỏi danh sách quan tâm.`);
      });

      item.append(info, removeBtn);
      fragment.appendChild(item);
    });

    listEl.replaceChildren(fragment);
  };

  const openDrawer = () => {
    if (!drawer || !backdrop || isOpen) return;
    isOpen = true;
    lastFocusedElement = document.activeElement;
    renderList();

    drawer.hidden = false;
    backdrop.hidden = false;
    requestAnimationFrame(() => {
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
    });

    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  };

  openBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);
  consultLink?.addEventListener('click', closeDrawer);
  clearBtn?.addEventListener('click', () => {
    clearWishlist();
    renderList();
    showToast('Đã xóa toàn bộ danh sách khóa học quan tâm.');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen) {
      closeDrawer();
    }
  });

  renderList();
  return { refreshWishlistUI: renderList };
}
