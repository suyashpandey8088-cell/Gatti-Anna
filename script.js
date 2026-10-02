/* ==========================================================================
   GATTI ANNA — scroll behaviour
   One rAF ticker + IntersectionObservers. No libraries.
   Everything is disabled cleanly under prefers-reduced-motion.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  /* ---------- progress bar + sticky-nav state -------------------------- */

  var progressSpan = document.querySelector('.progress span');

  function updateProgress() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    if (progressSpan) progressSpan.style.setProperty('--prog', p.toFixed(4));
    document.body.classList.toggle('scrolled', window.scrollY > 40);
  }
  updateProgress();

  /* ---------- reveal on scroll ------------------------------------------ */

  var revealEls = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  revealEls.forEach(function (el) { el.classList.add('reveal'); });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { revealIO.observe(el); });
  }

  /* ---------- parallax + scroll-driven spin (one ticker) ---------------- */

  var pxEls = Array.prototype.slice.call(document.querySelectorAll('[data-px]')).map(function (el) {
    return { el: el, speed: parseFloat(el.getAttribute('data-px')) || 0 };
  });
  var pxxEls = Array.prototype.slice.call(document.querySelectorAll('[data-pxx]')).map(function (el) {
    return { el: el, speed: parseFloat(el.getAttribute('data-pxx')) || 0 };
  });
  var spinEls = Array.prototype.slice.call(document.querySelectorAll('[data-spin]')).map(function (el) {
    return { svg: el.querySelector('svg'), speed: parseFloat(el.getAttribute('data-spin')) || 0.02 };
  });

  var ticking = false;

  function applyScrollFx() {
    ticking = false;
    updateProgress();
    if (reduceMotion) return;

    var vh = window.innerHeight;
    var mid = vh / 2;

    for (var i = 0; i < pxEls.length; i++) {
      var it = pxEls[i];
      var r = it.el.getBoundingClientRect();
      if (r.bottom < -120 || r.top > vh + 120) continue;
      var delta = (r.top + r.height / 2) - mid;
      it.el.style.translate = '0 ' + (-delta * it.speed).toFixed(1) + 'px';
    }
    for (var j = 0; j < pxxEls.length; j++) {
      var gx = pxxEls[j];
      var gr = gx.el.getBoundingClientRect();
      if (gr.bottom < -200 || gr.top > vh + 200) continue;
      var gdelta = (gr.top + gr.height / 2) - mid;
      gx.el.style.translate = (gdelta * gx.speed).toFixed(1) + 'px 0';
    }
    var sy = window.scrollY;
    for (var k = 0; k < spinEls.length; k++) {
      var sp = spinEls[k];
      if (sp.svg) sp.svg.style.rotate = (sy * sp.speed).toFixed(2) + 'deg';
    }
  }

  function requestFx() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(applyScrollFx);
    }
  }

  window.addEventListener('scroll', requestFx, { passive: true });
  window.addEventListener('resize', requestFx, { passive: true });
  applyScrollFx();

  /* ---------- nav scroll-spy -------------------------------------------- */

  var spyLinks = {};
  document.querySelectorAll('[data-spy]').forEach(function (a) {
    spyLinks[a.getAttribute('data-spy')] = a;
  });

  function setCurrent(map, id) {
    Object.keys(map).forEach(function (key) {
      if (key === id) map[key].setAttribute('aria-current', 'true');
      else map[key].removeAttribute('aria-current');
    });
  }

  if ('IntersectionObserver' in window) {
    var spyIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setCurrent(spyLinks, entry.target.id);
      });
    }, { rootMargin: '-38% 0px -55% 0px', threshold: 0 });
    Object.keys(spyLinks).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) spyIO.observe(sec);
    });

    /* ---------- menu category rail spy ---------------------------------- */
    var catLinks = {};
    document.querySelectorAll('[data-catlink]').forEach(function (a) {
      catLinks[a.getAttribute('data-catlink')] = a;
    });
    var catIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setCurrent(catLinks, entry.target.id);
          var link = catLinks[entry.target.id];
          if (link && link.scrollIntoView) {
            /* keep the active chip visible inside the horizontal rail */
            var rail = link.closest('.rail');
            if (rail) {
              var lr = link.getBoundingClientRect();
              var rr = rail.getBoundingClientRect();
              if (lr.left < rr.left || lr.right > rr.right) {
                rail.scrollBy({ left: lr.left - rr.left - 24, behavior: reduceMotion ? 'auto' : 'smooth' });
              }
            }
          }
        }
      });
    }, { rootMargin: '-30% 0px -62% 0px', threshold: 0 });
    Object.keys(catLinks).forEach(function (id) {
      var band = document.getElementById(id);
      if (band) catIO.observe(band);
    });
  }

  /* ---------- 4.7 count-up + hand-drawn circle --------------------------- */

  var ratingNum = document.getElementById('rating-num');
  var ratingCircle = document.getElementById('rating-circle');
  var TARGET = 4.7;

  function drawRating(t) {
    var eased = 1 - Math.pow(1 - t, 3);
    if (ratingNum) ratingNum.textContent = (TARGET * eased).toFixed(1);
    if (ratingCircle) ratingCircle.style.setProperty('--draw', eased.toFixed(4));
  }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    drawRating(1);
  } else {
    var ratingIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        ratingIO.disconnect();
        var start = null;
        var DUR = 1500;
        function step(ts) {
          if (start === null) start = ts;
          var t = Math.min(1, (ts - start) / DUR);
          drawRating(t);
          if (t < 1) window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    var ratingSection = document.getElementById('rating');
    if (ratingSection) ratingIO.observe(ratingSection);
  }

  /* ---------- floating dish preview in menu ------------------------------ */

  var preview = document.getElementById('dish-preview');
  var menuZone = document.getElementById('menu');

  if (preview && menuZone && finePointer && !reduceMotion) {
    var previewImg = preview.querySelector('img');
    var previewCap = preview.querySelector('figcaption');

    menuZone.addEventListener('pointerenter', function (e) {
      var band = e.target.closest ? e.target.closest('.band') : null;
      if (band && band.getAttribute('data-img')) {
        previewImg.src = band.getAttribute('data-img');
        var h = band.querySelector('h3');
        previewCap.textContent = (h ? h.textContent : 'at Gatti Anna') + ' — at Gatti Anna';
      }
    }, true);

    menuZone.addEventListener('pointermove', function (e) {
      var overItem = e.target.closest && e.target.closest('.mi, .fcard');
      if (!overItem) { preview.classList.remove('on'); return; }
      var band = e.target.closest('.band');
      if (band && band.getAttribute('data-img')) {
        var src = band.getAttribute('data-img');
        if (previewImg.getAttribute('src') !== src) {
          previewImg.src = src;
          var h = band.querySelector('h3');
          previewCap.textContent = (h ? h.textContent : 'at Gatti Anna') + ' — at Gatti Anna';
        }
      }
      preview.style.left = e.clientX + 'px';
      preview.style.top = (e.clientY - 14) + 'px';
      preview.classList.add('on');
    }, { passive: true });

    menuZone.addEventListener('pointerleave', function () {
      preview.classList.remove('on');
    });
    window.addEventListener('scroll', function () {
      preview.classList.remove('on');
    }, { passive: true });
  }
})();
