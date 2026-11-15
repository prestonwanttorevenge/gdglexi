import { FAQ_ITEMS } from '../../data/mockData.js';
import { createChevronSvg } from '../core/dom.js';

export function initFaq() {
  const container = document.getElementById('faq-list');
  if (!container) return;

  let openItemId = FAQ_ITEMS[0]?.id ?? null;

  const renderFaq = () => {
    const fragment = document.createDocumentFragment();

    FAQ_ITEMS.forEach((item) => {
      const isOpen = item.id === openItemId;
      const panelId = `panel-${item.id}`;
      const buttonId = `btn-${item.id}`;

      const wrapper = document.createElement('div');
      wrapper.className = 'faq-item';
      if (isOpen) wrapper.classList.add('is-open');

      const heading = document.createElement('h3');
      heading.className = 'faq-item__heading';

      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.id = buttonId;
      trigger.className = 'faq-item__trigger';
      trigger.dataset.faqId = item.id;
      trigger.setAttribute('aria-expanded', String(isOpen));
      trigger.setAttribute('aria-controls', panelId);

      const questionText = document.createElement('span');
      questionText.className = 'faq-item__question';
      questionText.textContent = item.question;

      trigger.append(questionText, createChevronSvg());
      heading.appendChild(trigger);

      const panel = document.createElement('div');
      panel.id = panelId;
      panel.className = 'faq-item__panel';
      panel.setAttribute('role', 'region');
      panel.setAttribute('aria-labelledby', buttonId);
      panel.setAttribute('aria-hidden', String(!isOpen));

      const panelInner = document.createElement('div');
      panelInner.className = 'faq-item__panel-inner';

      const answer = document.createElement('p');
      answer.className = 'faq-item__answer';
      answer.textContent = item.answer;

      panelInner.appendChild(answer);
      panel.appendChild(panelInner);
      wrapper.append(heading, panel);
      fragment.appendChild(wrapper);
    });

    container.replaceChildren(fragment);
  };

  container.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-faq-id]');
    if (!trigger) return;

    const clickedId = trigger.dataset.faqId;
    if (!clickedId) return;

    openItemId = openItemId === clickedId ? null : clickedId;

    const items = container.querySelectorAll('.faq-item');
    items.forEach((itemEl) => {
      const btn = itemEl.querySelector('[data-faq-id]');
      const panel = itemEl.querySelector('.faq-item__panel');
      if (!btn || !panel) return;
      const isNowOpen = btn.dataset.faqId === openItemId;
      itemEl.classList.toggle('is-open', isNowOpen);
      btn.setAttribute('aria-expanded', String(isNowOpen));
      panel.setAttribute('aria-hidden', String(!isNowOpen));
    });
  });

  renderFaq();
}
