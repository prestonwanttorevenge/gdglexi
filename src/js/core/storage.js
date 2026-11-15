const STORAGE_KEYS = {
  THEME: 'gdglexi_theme',
  WISHLIST: 'gdglexi_wishlist',
};

export function getSavedTheme() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
  }

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export function saveTheme(theme) {
  try {
    window.localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch {
  }
}

export function getSavedWishlist() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.WISHLIST);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

export function saveWishlist(ids) {
  try {
    window.localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(ids));
  } catch {
  }
}
