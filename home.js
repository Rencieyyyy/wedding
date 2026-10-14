window.addEventListener('DOMContentLoaded', () => {
  // Mobile Hamburger Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking any section link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Envelope & Audio Controls
  const envelope = document.getElementById('envelope');
  const envelopeHint = document.getElementById('envelopeHint');
  const bgMusic = document.getElementById('bgMusic');

  const urlParams = new URLSearchParams(window.location.search);
  const playRequested = sessionStorage.getItem('playRequested') === '1' || urlParams.get('play') === '1';

  if (playRequested) {
    sessionStorage.removeItem('playRequested');
  }

  function tryPlayMusic() {
    if (!bgMusic || !bgMusic.paused) return;

    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const startOnInteraction = () => {
          bgMusic.play().catch(() => {});
        };

        document.addEventListener('click', startOnInteraction, { once: true });
        document.addEventListener('touchstart', startOnInteraction, { once: true });
      });
    }
  }

  let isOpen = false;
  if (envelope) {
    envelope.addEventListener('click', () => {
      isOpen = !isOpen;
      envelope.classList.toggle('open', isOpen);

      if (envelopeHint) {
        envelopeHint.classList.toggle('hidden', isOpen);
      }

      tryPlayMusic();
    });
  }

  tryPlayMusic();
});
// ===== Wedding Eve countdown + popup =====
(function () {
  // Philippine time (UTC+8). Change the date/time here if needed.
  var EVE_TARGET = new Date('2026-10-16T18:00:00+08:00').getTime();

  function tick() {
    var diff = EVE_TARGET - Date.now();
    if (diff < 0) diff = 0;

    var vals = {
      days:  Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      mins:  Math.floor((diff % 3600000) / 60000),
      secs:  Math.floor((diff % 60000) / 1000)
    };

    document.querySelectorAll('[data-eve]').forEach(function (el) {
      el.textContent = String(vals[el.dataset.eve]).padStart(2, '0');
    });
  }
  tick();
  setInterval(tick, 1000);

  var popup    = document.getElementById('evePopup');
  var closeBtn = document.getElementById('evePopupClose');
  if (!popup) return;

  function openPopup() {
    popup.classList.add('show');
    popup.setAttribute('aria-hidden', 'false');
  }
  function closePopup() {
    popup.classList.remove('show');
    popup.setAttribute('aria-hidden', 'true');
  }

  // Pops out shortly after the website opens
  window.addEventListener('load', function () {
    setTimeout(openPopup, 800);
  });

  closeBtn.addEventListener('click', closePopup);   // the X button
  popup.addEventListener('click', function (e) {    // click outside the box
    if (e.target === popup) closePopup();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePopup();
  });
})();