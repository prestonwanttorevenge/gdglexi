export async function loadHtmlPartials() {
  const placeholders = Array.from(document.querySelectorAll('[data-partial]'));
  if (placeholders.length === 0) return;

  await Promise.all(
    placeholders.map(async (placeholder) => {
      const partialPath = placeholder.getAttribute('data-partial');
      if (!partialPath) return;

      const response = await fetch(partialPath, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Không thể nạp partial: ${partialPath} (${response.status})`);
      }

      const rawHtml = await response.text();
      const htmlText = rawHtml.replace(
        /<!--\s*Code injected by live-server\s*-->[\s\S]*?<\/script>/gi,
        ''
      );
      const range = document.createRange();
      const fragment = range.createContextualFragment(htmlText);
      placeholder.replaceWith(fragment);
    })
  );
}
