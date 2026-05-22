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

  // --- Contact form: validate, then submit via FormSubmit AJAX ---
  // The form's `action` attribute (https://formsubmit.co/<email>) is used as
  // the destination. We POST to the matching AJAX endpoint so the user stays
  // on the page; if anything fails we fall back to a native form submit.
  const form = document.querySelector('#contact-form');
  if (form) {
    const status = form.querySelector('.form-status');
    const submitBtn = form.querySelector('button[type="submit"]');

    const setStatus = (msg, kind) => {
      if (!status) return;
      status.textContent = msg;
      status.classList.remove('visible', 'is-error', 'is-success');
      status.classList.add('visible');
      if (kind) status.classList.add('is-' + kind);
    };

    // Auto-show success when redirected back from FormSubmit (?sent=1).
    if (location.search.indexOf('sent=1') !== -1) {
      setStatus('Thank you. Your message has reached us and we will be in touch within one business day.', 'success');
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      if (!name || !email || !message) {
        setStatus('Please complete all required fields before sending.', 'error');
        return;
      }
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        setStatus('Please enter a valid email address.', 'error');
        return;
      }
      // Honeypot: silently drop bot submissions.
      if ((data.get('_honey') || '').toString().trim()) {
        setStatus('Thank you, ' + name + '.', 'success');
        form.reset();
        return;
      }

      // FormSubmit AJAX endpoint: same URL with /ajax/ inserted after host.
      const action = form.getAttribute('action') || '';
      const ajaxUrl = action.replace('formsubmit.co/', 'formsubmit.co/ajax/');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.label = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
      }
      setStatus('Sending your message...', null);

      // Use JSON for the AJAX endpoint - FormSubmit accepts either.
      const payload = {};
      data.forEach((value, key) => { payload[key] = value; });

      fetch(ajaxUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then((res) => {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.json();
        })
        .then(() => {
          setStatus('Thank you, ' + name + '. Your message has reached us and we will be in touch within one business day.', 'success');
          form.reset();
        })
        .catch(() => {
          // AJAX blocked or activation pending: fall back to a native submit
          // so the message still reaches info@tazkiaintelligence.com.
          setStatus('Submitting your message...', null);
          form.submit();
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.label || 'Send message';
          }
        });
    });
  }

  // --- Update footer year ---
  const yearEl = document.querySelector('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
