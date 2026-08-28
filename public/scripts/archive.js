/*
 * archive.js
 * ニュースアーカイブページ（news.astro）専用のスクリプト
 * - トップバーのスクロール検知
 * - カテゴリフィルタ機能
 * - ?filter=xxx URLパラメータの自動適用
 *
 * 注意：setLang と初期言語判定は共通の site.js に含まれる
 */

(function() {
  const topBar = document.getElementById('topBar');
  if (topBar) {
    window.addEventListener('scroll', () => {
      topBar.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  // カテゴリー絞り込み
  const filterButtons = document.querySelectorAll('.filter-btn');
  const allItems = document.querySelectorAll('.talk-item');
  const yearGroups = document.querySelectorAll('.year-group');

  function applyFilter(filter) {
    filterButtons.forEach(b => {
      b.classList.toggle('active', b.dataset.filter === filter);
    });
    allItems.forEach(item => {
      if (filter === 'all') {
        item.classList.remove('is-filtered');
      } else {
        const hasTag = item.querySelector('.tag-' + filter);
        item.classList.toggle('is-filtered', !hasTag);
      }
    });
    yearGroups.forEach(group => {
      const visible = group.querySelectorAll('.talk-item:not(.is-filtered)').length;
      group.classList.toggle('is-empty', visible === 0);
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      applyFilter(btn.dataset.filter);
    });
  });

  // URL パラメータ ?filter=xxx があれば自動適用
  const params = new URLSearchParams(window.location.search);
  const f = params.get('filter');
  const valid = ['paper', 'book', 'conf', 'lect', 'media', 'grant', 'other'];
  if (f && valid.indexOf(f) >= 0) {
    applyFilter(f);
    setTimeout(() => {
      const bar = document.getElementById('filterBar');
      if (bar) bar.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }
})();
