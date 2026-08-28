    function setLang(lang, opts) {
      opts = opts || {};
      document.body.classList.toggle('en', lang === 'en');
      document.documentElement.setAttribute('lang', lang);
      document.querySelectorAll('.lang-btn[data-set-lang]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.setLang === lang);
      });
      // URLに ?lang を反映（共有可能にする）
      if (opts.updateUrl !== false) {
        try {
          const url = new URL(window.location.href);
          if (lang === 'en') url.searchParams.set('lang', 'en');
          else url.searchParams.delete('lang');
          window.history.replaceState({}, '', url);
        } catch (e) {}
      }
    }

    // 初期言語を決定：?lang > ブラウザ言語（デフォルト日本語）
    (function() {
      const params = new URLSearchParams(window.location.search);
      const p = params.get('lang');
      let initial = 'ja';
      if (p === 'en' || p === 'ja') {
        initial = p;
      } else if (navigator.language && !navigator.language.toLowerCase().startsWith('ja')) {
        initial = 'en';
      }
      // 初期化時はURL更新をスキップ（既に ?lang があるものはそのまま尊重）
      setLang(initial, { updateUrl: false });
    })();

    // ── Header bar: scroll direction (hide on down, show on up) + scrolled state + progress
    (function() {
      const headerBar = document.getElementById('headerBar');
      const navProgress = document.getElementById('navProgress');
      let lastY = window.scrollY;
      let ticking = false;

      function update() {
        const y = window.scrollY;
        const dy = y - lastY;

        // subtle background after slight scroll
        headerBar.classList.toggle('scrolled', y > 20);

        // hide on scroll down, show on scroll up
        if (y > 120 && dy > 6) {
          headerBar.classList.add('hidden');
        } else if (dy < -3 || y < 120) {
          headerBar.classList.remove('hidden');
        }

        // scroll progress
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docH > 0 ? (y / docH) * 100 : 0;
        navProgress.style.width = pct + '%';

        lastY = y;
        ticking = false;
      }

      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      }, { passive: true });
    })();

    // ── Active section indicator (IntersectionObserver)
    (function() {
      const sections = document.querySelectorAll('section[id]');
      const links = document.querySelectorAll('.header-bar .nav-links a[href^="#"], .nav-overlay a[href^="#"]');
      if (!sections.length || !links.length) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            links.forEach(link => {
              link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
          }
        });
      }, {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0
      });
      sections.forEach(sec => observer.observe(sec));
    })();

    // ── Hamburger / overlay menu (mobile)
    (function() {
      const toggle = document.getElementById('navToggle');
      const overlay = document.getElementById('navOverlay');
      if (!toggle || !overlay) return;

      function open() {
        overlay.classList.add('open');
        toggle.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
      function close() {
        overlay.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }

      toggle.addEventListener('click', () => {
        overlay.classList.contains('open') ? close() : open();
      });
      overlay.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('click', close);
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('open')) close();
      });
    })();

    // ニュース：デフォルト（ピン留め＋最新5件）＋カテゴリ絞り込み
    (function() {
      const TOP_LIMIT = 5;
      const newsSection = document.getElementById('news');
      if (!newsSection) return;
      const items = Array.from(newsSection.querySelectorAll('.talk-item'));
      const viewAllLink = newsSection.querySelector('.news-view-all');
      const viewAllLabelJa = viewAllLink ? viewAllLink.querySelector('[data-lang="ja"]') : null;
      const viewAllLabelEn = viewAllLink ? viewAllLink.querySelector('[data-lang="en"]') : null;
      const filterButtons = newsSection.querySelectorAll('.filter-tag');

      // カテゴリのラベル対応表
      const CAT_LABEL_JA = {
        paper: '論文', book: '著書', conf: '学会発表',
        lect: '講演・登壇', media: '寄稿・メディア',
        grant: '助成金・受賞', other: 'その他'
      };
      const CAT_LABEL_EN = {
        paper: 'papers', book: 'books', conf: 'conferences',
        lect: 'talks', media: 'media', grant: 'grants', other: 'other'
      };

      // 「すべて／その他の◯◯を見る」リンクを更新
      function setViewAllLink(cat) {
        if (!viewAllLink) return;
        if (cat === 'all' || !cat) {
          viewAllLink.href = '/news.html';
          if (viewAllLabelJa) viewAllLabelJa.textContent = 'すべてのニュースを見る';
          if (viewAllLabelEn) viewAllLabelEn.textContent = 'See all news';
        } else {
          viewAllLink.href = '/news.html?filter=' + encodeURIComponent(cat);
          if (viewAllLabelJa) viewAllLabelJa.textContent = 'その他の' + (CAT_LABEL_JA[cat] || '') + 'を見る';
          if (viewAllLabelEn) viewAllLabelEn.textContent = 'See other ' + (CAT_LABEL_EN[cat] || 'news');
        }
      }

      // デフォルト表示（ピン留め＋非ピン留め最新N件）
      function applyDefault() {
        newsSection.classList.remove('filtering');
        let nonPinnedShown = 0;
        let hasPins = false;
        items.forEach(item => {
          item.classList.remove('is-filter-hidden', 'is-hidden-top');
          if (item.classList.contains('pinned')) {
            hasPins = true;
            return;
          }
          nonPinnedShown++;
          if (nonPinnedShown > TOP_LIMIT) {
            item.classList.add('is-hidden-top');
          }
        });
        if (hasPins) newsSection.classList.add('has-pins');
        setViewAllLink('all');
        if (viewAllLink) viewAllLink.classList.remove('is-hidden');
      }

      // カテゴリ絞り込み表示（該当カテゴリのうち最新N件）
      function applyFilter(cat) {
        newsSection.classList.add('filtering');
        let shown = 0;
        let matchCount = 0;
        items.forEach(item => {
          item.classList.remove('is-hidden-top');
          const hasTag = item.querySelector(`.tag-${cat}`);
          if (!hasTag) {
            item.classList.add('is-filter-hidden');
            return;
          }
          matchCount++;
          if (shown >= TOP_LIMIT) {
            item.classList.add('is-filter-hidden');
          } else {
            item.classList.remove('is-filter-hidden');
            shown++;
          }
        });
        // 該当カテゴリが5件超なら「その他の◯◯を見る」を表示
        setViewAllLink(cat);
        if (viewAllLink) {
          viewAllLink.classList.toggle('is-hidden', matchCount <= TOP_LIMIT);
        }
      }

      // 初期化
      applyDefault();

      // フィルターボタンのクリック
      filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          filterButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const f = btn.dataset.filter;
          if (f === 'all') applyDefault();
          else applyFilter(f);
        });
      });
    })();
