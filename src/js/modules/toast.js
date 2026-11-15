export function initToast() {
  const toastEl = document.getElementById('toast');
  const toastTextEl = document.getElementById('toast-message');
  const toastCloseBtn = document.getElementById('toast-close');
  let hideTimerId = null;

  const hideToast = () => {
    if (!toastEl) return;
    toastEl.classList.remove('is-visible');
    window.setTimeout(() => {
      if (!toastEl.classList.contains('is-visible')) {
        toastEl.hidden = true;
      }
    }, 220);
  };

  const showToast = (message) => {
    if (!toastEl || !toastTextEl) return;
    window.clearTimeout(hideTimerId);
    toastTextEl.textContent = message;
    toastEl.hidden = false;
    requestAnimationFrame(() => {
      toastEl.classList.add('is-visible');
    });
    hideTimerId = window.setTimeout(hideToast, 4500);
  };

  toastCloseBtn?.addEventListener('click', hideToast);
  return { showToast };
}
