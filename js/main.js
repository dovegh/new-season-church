/* ============================================
   NEW SEASON CHURCH — Interactions
   ============================================ */

(function () {
  'use strict';

  // ---------- Intro Loader ----------
  const loader = document.querySelector('.loader');
  if (loader) {
    const LOADER_DURATION = 3400;
    const SESSION_KEY = 'nsc_loader_seen';

    const seen = sessionStorage.getItem(SESSION_KEY);
    if (seen) {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
    } else {
      document.body.classList.add('loading');
      const dismiss = () => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
        try { sessionStorage.setItem(SESSION_KEY, '1'); } catch (e) {}
      };
      const timer = setTimeout(dismiss, LOADER_DURATION);
      loader.addEventListener('click', () => { clearTimeout(timer); dismiss(); });
      document.addEventListener('keydown', () => { clearTimeout(timer); dismiss(); }, { once: true });
    }
  }

  // ---------- Sticky header style on scroll ----------
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 16) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  if (header) {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---------- Mobile menu toggle ----------
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ---------- Reveal on scroll ----------
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  // ---------- Sermons tabs ----------
  const tabs = document.querySelectorAll('.tab');
  if (tabs.length) {
    tabs.forEach(t => {
      t.addEventListener('click', () => {
        tabs.forEach(o => o.classList.remove('active'));
        t.classList.add('active');
      });
    });
  }

  // ---------- Grainy noise background ----------
  const grainTargets = document.querySelectorAll('.hero-grain, .loader-grain');
  if (grainTargets.length) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity="0.55"/></svg>`;
    grainTargets.forEach(t => t.innerHTML = svg);
  }

  // ---------- Hero carousel ----------
  const carousel = document.querySelector('.hero-carousel');
  if (carousel) {
    const slides = carousel.querySelectorAll('.hero-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const counter = carousel.querySelector('.carousel-counter-current');
    let current = 0;
    let timer = null;
    const INTERVAL = 6000;

    const goTo = (idx) => {
      current = (idx + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('active', i === current));
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
      if (counter) counter.textContent = String(current + 1).padStart(2, '0');
    };
    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);
    const restart = () => { clearInterval(timer); timer = setInterval(next, INTERVAL); };

    dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); restart(); }));
    const nextBtn = carousel.querySelector('.carousel-next');
    const prevBtn = carousel.querySelector('.carousel-prev');
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); restart(); });

    carousel.addEventListener('mouseenter', () => clearInterval(timer));
    carousel.addEventListener('mouseleave', restart);

    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { next(); restart(); }
      if (e.key === 'ArrowLeft') { prev(); restart(); }
    });

    restart();
  }

  // ---------- Dropdown menus ----------
  document.querySelectorAll('.nav-links > li').forEach(li => {
    const dropdown = li.querySelector('.nav-dropdown');
    if (!dropdown) return;
    const trigger = li.querySelector('a');
    let openByClick = false;
    trigger.addEventListener('click', (e) => {
      if (window.matchMedia('(hover: none)').matches && !openByClick) {
        e.preventDefault();
        li.classList.add('is-open');
        openByClick = true;
      }
    });
    document.addEventListener('click', (e) => {
      if (!li.contains(e.target)) {
        li.classList.remove('is-open');
        openByClick = false;
      }
    });
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        li.classList.remove('is-open');
        openByClick = false;
        trigger.focus();
      }
    });
  });

  // ---------- Theme toggle (light / dark) ----------
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const STORAGE_KEY = 'nsc-theme';

    const applyTheme = (theme) => {
      if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.setAttribute('aria-label', 'Switch to dark theme');
      } else {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.setAttribute('aria-label', 'Switch to light theme');
      }
    };

    // Determine initial state (matches the pre-paint script in <head>)
    const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    applyTheme(current);

    themeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const next = isLight ? 'dark' : 'light';
      applyTheme(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
    });
  }

  // ---------- Lite YouTube embed (thumbnail → iframe on click) ----------
  document.querySelectorAll('.lite-yt[data-video-id]').forEach(card => {
    const videoId = card.dataset.videoId;
    if (!videoId) return;

    const activate = () => {
      if (card.classList.contains('is-playing')) return;
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`);
      iframe.setAttribute('title', 'YouTube video player');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      iframe.setAttribute('allowfullscreen', '');
      card.appendChild(iframe);
      card.classList.add('is-playing');
    };

    card.addEventListener('click', activate);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate();
      }
    });
  });

  // ---------- Smooth anchor scroll ----------
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

})();
