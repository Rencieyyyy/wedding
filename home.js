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