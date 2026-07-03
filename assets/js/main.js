/* =========================================================================
   TAZKIA INTELLIGENCE — interactions v2
   Vanilla JS, no dependencies. Modules:
   nav · cursor glow · neural-net hero canvas · scroll reveal · count-up ·
   spotlight cards · journey timeline · service accordion · contact form
   ========================================================================= */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  /* ------------------------------------------------------------- nav --- */
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');

  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (toggle && nav) {
    var setMenu = function (open) {
      nav.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', function () {
      setMenu(!nav.classList.contains('nav-open'));
    });
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) setMenu(false);
    });
  }

  // Highlight the current page in the nav.
  var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path) a.classList.add('active');
  });

  /* ----------------------------------------------------- cursor glow --- */
  if (finePointer && !reduceMotion) {
    var glowRaf = null;
    var gx = 0, gy = 0;
    document.addEventListener('pointermove', function (e) {
      gx = e.clientX; gy = e.clientY;
      if (!document.body.classList.contains('has-pointer')) {
        document.body.classList.add('has-pointer');
      }
      if (glowRaf) return;
      glowRaf = requestAnimationFrame(function () {
        document.documentElement.style.setProperty('--cx', gx + 'px');
        document.documentElement.style.setProperty('--cy', gy + 'px');
        glowRaf = null;
      });
    }, { passive: true });
  }

  /* ------------------------------------------- neural network canvas --- */
  var canvas = document.getElementById('hero-net');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var hero = canvas.parentElement;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0;
    var nodes = [];
    var mouse = { x: -9999, y: -9999 };
    var running = false;
    var rafId = null;

    var COLORS = [
      { r: 62, g: 166, b: 255 },   // electric blue
      { r: 34, g: 227, b: 203 },   // teal
      { r: 229, g: 201, b: 137 }   // gold (rare)
    ];

    var sizeCanvas = function () {
      var rect = hero.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    var seedNodes = function () {
      var target = Math.max(26, Math.min(72, Math.round((W * H) / 24000)));
      nodes = [];
      for (var i = 0; i < target; i++) {
        var tint = Math.random() < 0.09 ? 2 : (Math.random() < 0.5 ? 0 : 1);
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: 1.2 + Math.random() * 1.9,
          c: COLORS[tint],
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    var LINK_DIST = 135;
    var MOUSE_DIST = 190;

    var step = function (t) {
      ctx.clearRect(0, 0, W, H);

      var i, j, n, m, dx, dy, dist, alpha;

      for (i = 0; i < nodes.length; i++) {
        n = nodes[i];

        // Gentle drift plus a slow shimmer on radius.
        n.x += n.vx;
        n.y += n.vy;

        // Mouse influence: nodes lean softly toward the cursor.
        dx = mouse.x - n.x;
        dy = mouse.y - n.y;
        dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST && dist > 0.001) {
          n.x += (dx / dist) * 0.32;
          n.y += (dy / dist) * 0.32;
        }

        // Soft wrap at the edges.
        if (n.x < -12) n.x = W + 12; else if (n.x > W + 12) n.x = -12;
        if (n.y < -12) n.y = H + 12; else if (n.y > H + 12) n.y = -12;
      }

      // Links between neighbours.
      ctx.lineWidth = 0.7;
      for (i = 0; i < nodes.length; i++) {
        n = nodes[i];
        for (j = i + 1; j < nodes.length; j++) {
          m = nodes[j];
          dx = n.x - m.x;
          dy = n.y - m.y;
          if (Math.abs(dx) > LINK_DIST || Math.abs(dy) > LINK_DIST) continue;
          dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            alpha = (1 - dist / LINK_DIST) * 0.34;
            ctx.strokeStyle = 'rgba(62, 166, 255, ' + alpha.toFixed(3) + ')';
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }

        // Link to the cursor for the interactive feel.
        dx = n.x - mouse.x;
        dy = n.y - mouse.y;
        dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST) {
          alpha = (1 - dist / MOUSE_DIST) * 0.4;
          ctx.strokeStyle = 'rgba(34, 227, 203, ' + alpha.toFixed(3) + ')';
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Nodes on top.
      for (i = 0; i < nodes.length; i++) {
        n = nodes[i];
        var shimmer = 0.55 + 0.45 * Math.sin(t / 900 + n.phase);
        ctx.fillStyle = 'rgba(' + n.c.r + ',' + n.c.g + ',' + n.c.b + ',' + (0.5 + 0.4 * shimmer).toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (0.85 + 0.3 * shimmer), 0, Math.PI * 2);
        ctx.fill();
      }

      if (running) rafId = requestAnimationFrame(step);
    };

    var start = function () {
      if (running || reduceMotion) return;
      running = true;
      rafId = requestAnimationFrame(step);
    };

    var stop = function () {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    };

    sizeCanvas();
    seedNodes();

    if (reduceMotion) {
      // One elegant static frame instead of animation.
      step(0);
    } else {
      start();
    }

    // Pause when the hero scrolls out of view or the tab is hidden.
    if ('IntersectionObserver' in window && !reduceMotion) {
      new IntersectionObserver(function (entries) {
        entries[0].isIntersecting ? start() : stop();
      }, { threshold: 0.02 }).observe(hero);
    }

    document.addEventListener('visibilitychange', function () {
      if (reduceMotion) return;
      document.hidden ? stop() : start();
    });

    hero.addEventListener('pointermove', function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }, { passive: true });

    hero.addEventListener('pointerleave', function () {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        sizeCanvas();
        seedNodes();
        if (reduceMotion) step(0);
      }, 160);
    });
  }

  /* --------------------------------------------------- scroll reveal --- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    if ('IntersectionObserver' in window && !reduceMotion) {
      var revealIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealIO.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });
      revealEls.forEach(function (el) { revealIO.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  /* -------------------------------------------------------- count-up --- */
  var counters = document.querySelectorAll('[data-countup]');
  if (counters.length) {
    var animateCount = function (el) {
      var target = parseFloat(el.getAttribute('data-countup'));
      var decimals = (el.getAttribute('data-decimals') || '0') * 1;
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      var dur = 1500;
      var t0 = null;

      var frame = function (t) {
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
        var val = (target * eased).toFixed(decimals);
        el.textContent = prefix + val + suffix;
        if (p < 1) requestAnimationFrame(frame);
      };

      requestAnimationFrame(frame);
    };

    if ('IntersectionObserver' in window && !reduceMotion) {
      var countIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countIO.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { countIO.observe(el); });
    } else {
      counters.forEach(function (el) {
        var d = (el.getAttribute('data-decimals') || '0') * 1;
        el.textContent =
          (el.getAttribute('data-prefix') || '') +
          parseFloat(el.getAttribute('data-countup')).toFixed(d) +
          (el.getAttribute('data-suffix') || '');
      });
    }
  }

  /* ------------------------------------------------- spotlight cards --- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll('.sl-card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
      }, { passive: true });
    });
  }

  /* ------------------------------------------------ journey timeline --- */
  var journey = document.querySelector('.journey');
  if (journey) {
    if ('IntersectionObserver' in window && !reduceMotion) {
      new IntersectionObserver(function (entries, obs) {
        if (entries[0].isIntersecting) {
          journey.classList.add('is-visible');
          obs.disconnect();
        }
      }, { threshold: 0.25 }).observe(journey);
    } else {
      journey.classList.add('is-visible');
    }
  }

  /* ---------------------------------------------- service accordion --- */
  document.querySelectorAll('.svc-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var svc = btn.closest('.svc');
      var open = svc.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* ------------------------------------- contact form via Web3Forms --- */
  var form = document.querySelector('#contact-form');
  if (form) {
    var status = form.querySelector('.form-status');
    var submitBtn = form.querySelector('button[type="submit"]');

    var setStatus = function (msg, kind) {
      if (!status) return;
      status.textContent = msg;
      status.classList.remove('visible', 'is-error', 'is-success');
      status.classList.add('visible');
      if (kind) status.classList.add('is-' + kind);
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get('name') || '').toString().trim();
      var email = (data.get('email') || '').toString().trim();
      var message = (data.get('message') || '').toString().trim();

      if (!name || !email || !message) {
        setStatus('Please complete all required fields before sending.', 'error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus('Please enter a valid email address.', 'error');
        return;
      }
      // Honeypot: bots tick the hidden checkbox; humans never see it.
      if (data.get('botcheck')) {
        setStatus('Thank you, ' + name + '.', 'success');
        form.reset();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.label = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
      }
      setStatus('Sending your message...', null);

      var payload = {};
      data.forEach(function (value, key) { payload[key] = value; });

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          return res.json().then(function (body) { return { ok: res.ok, body: body }; });
        })
        .then(function (r) {
          if (r.ok && r.body && r.body.success) {
            setStatus('Thank you, ' + name + '. Your message has reached us and we will be in touch within one business day.', 'success');
            form.reset();
          } else {
            var reason = (r.body && (r.body.message || r.body.error)) || 'Please try again, or email info@tazkiaintelligence.com directly.';
            setStatus('Sorry, your message could not be sent. ' + reason, 'error');
          }
        })
        .catch(function () {
          setStatus('Sorry, your message could not be sent. Please check your connection and try again, or email info@tazkiaintelligence.com directly.', 'error');
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.label || 'Send message';
          }
        });
    });
  }

  /* ------------------------------------------------------------ year --- */
  var yearEl = document.querySelector('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
