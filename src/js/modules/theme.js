import { getSavedTheme, saveTheme } from '../core/storage.js';

export function initThemeController() {
  let currentTheme = getSavedTheme();
  const toggleButtons = document.querySelectorAll('[data-theme-toggle]');

  const applyTheme = (theme) => {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    saveTheme(theme);

    const isDark = theme === 'dark';
    toggleButtons.forEach((btn) => {
      btn.setAttribute('aria-pressed', String(isDark));
      btn.setAttribute(
        'aria-label',
        isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'
      );
      const labelSpan = btn.querySelector('[data-theme-label]');
      if (labelSpan) {
        labelSpan.textContent = isDark ? 'Chế độ sáng' : 'Chế độ tối';
      }
    });
  };

  applyTheme(currentTheme);

  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  });
}
