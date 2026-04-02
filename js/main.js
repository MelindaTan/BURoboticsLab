/* =============================================
   BU Robotics Lab – main.js
   Handles: week accordion, section nav, back-to-top
   ============================================= */

(function () {
  'use strict';

  /* ---- Week accordion ---- */
  document.querySelectorAll('.week-header').forEach(function (header) {
    header.addEventListener('click', function () {
      var card = this.closest('.week-card');
      var isOpen = card.classList.contains('open');

      // Close all cards
      document.querySelectorAll('.week-card').forEach(function (c) {
        c.classList.remove('open');
        c.querySelector('.week-header').setAttribute('aria-expanded', 'false');
      });

      // Open clicked card if it was closed
      if (!isOpen) {
        card.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
      }
    });

    header.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });

    header.setAttribute('tabindex', '0');
    header.setAttribute('role', 'button');
    header.setAttribute('aria-expanded', 'false');
  });

  /* ---- Section nav pill highlight on scroll ---- */
  var sections = document.querySelectorAll('section[id]');
  var navBtns = document.querySelectorAll('.section-nav-btn');
  var navLinks = document.querySelectorAll('.nav-links a');
  var navHeight = 64;

  function updateActiveNav() {
    var scrollY = window.scrollY;
    var active = null;

    sections.forEach(function (sec) {
      var top = sec.getBoundingClientRect().top + scrollY - navHeight - 20;
      if (scrollY >= top) active = sec.id;
    });

    navBtns.forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.target === active);
    });

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === active);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* ---- Section nav button click ---- */
  navBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.getElementById(this.dataset.target);
      if (target) {
        var top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Back-to-top button ---- */
  var btn = document.getElementById('back-to-top');
  if (btn) {
    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Animate skill bars when visible ---- */
  var bars = document.querySelectorAll('.skill-bar-fill');
  if ('IntersectionObserver' in window) {
    var barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          el.style.width = el.dataset.width;
          barObserver.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(function (bar) {
      var finalWidth = bar.style.width;
      bar.dataset.width = finalWidth;
      bar.style.width = '0%';
      barObserver.observe(bar);
    });
  }

  /* ---- Open first week card by default ---- */
  var firstCard = document.querySelector('.week-card');
  if (firstCard) {
    firstCard.classList.add('open');
    var firstHeader = firstCard.querySelector('.week-header');
    if (firstHeader) firstHeader.setAttribute('aria-expanded', 'true');
  }
})();
