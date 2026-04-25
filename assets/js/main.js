/* Tazkia Intelligence — site interactions
   Vanilla JS, no dependencies. */

(function () {
  'use strict';

  // --- Sticky nav: shadow on scroll ---
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 8) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // --- Mobile nav toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const navWrapper = document.querySelector('.nav');
  if (toggle && navWrapper) {
    toggle.addEventListener('click', () => {
      navWrapper.classList.toggle('nav-open');
      const expanded = navWrapper.classList.contains('nav-open');
      toggle.setAttribute('aria-expanded', String(expanded));
    });
    // Close menu on link click (mobile)
    document.querySelectorAll('.nav-links a').forEach((a) => {
      a.addEventListener('click', () => {
        navWrapper.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Mark active nav link based on path ---
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a').forEach((a) => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // --- Reveal-on-scroll using IntersectionObserver ---
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // --- Contact form (client-side only demo) ---
  const form = document.querySelector('#contact-form');
  if (form) {
    const status = form.querySelector('.form-status');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      if (!name || !email || !message) {
        if (status) {
          status.textContent = 'Please complete all fields before sending.';
          status.classList.add('visible');
        }
        return;
      }
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        if (status) {
          status.textContent = 'Please enter a valid email address.';
          status.classList.add('visible');
        }
        return;
      }
      if (status) {
        status.textContent = 'Thank you, ' + name + '. We will be in touch within one business day.';
        status.classList.add('visible');
      }
      form.reset();
    });
  }

  // --- Update footer year ---
  const yearEl = document.querySelector('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
