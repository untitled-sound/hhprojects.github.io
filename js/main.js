/* Hero drips: a few runs of paint off the last line of the name, once on load. */
(function () {
  var last = document.querySelector('.tag .line:last-child');
  if (!last) return;

  var chars = last.querySelectorAll('.ch');
  var width = last.offsetWidth;
  if (!width) return;

  // [letter index, position across that letter, length in em, delay in s]
  var runs = [
    [0, 0.30, 0.22, 1.1],
    [2, 0.62, 0.34, 1.6],
    [4, 0.40, 0.16, 2.1],
    [5, 0.72, 0.28, 2.5]
  ];

  runs.forEach(function (r) {
    var ch = chars[r[0]];
    if (!ch) return;
    var drip = document.createElement('i');
    drip.className = 'drip';
    drip.setAttribute('aria-hidden', 'true');
    // Percent of the line's width, so the drips stay put when the type rescales.
    drip.style.left = ((ch.offsetLeft + ch.offsetWidth * r[1]) / width * 100) + '%';
    drip.style.setProperty('--len', r[2] + 'em');
    drip.style.setProperty('--d', r[3] + 's');
    last.appendChild(drip);
  });
})();

/* Documentation template: highlight the contents entry for the section in view. */
(function () {
  var links = document.querySelectorAll('.toc a[href^="#"]');
  if (!links.length || !('IntersectionObserver' in window)) return;

  var byTarget = new Map();
  links.forEach(function (a) {
    var target = document.querySelector(a.getAttribute('href'));
    if (target) byTarget.set(target, a);
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (a) { a.removeAttribute('aria-current'); });
      byTarget.get(e.target).setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-15% 0px -70% 0px' });

  byTarget.forEach(function (a, target) { io.observe(target); });
})();
