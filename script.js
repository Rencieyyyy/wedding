/* ============================================================
   1) FULL-SCREEN LEAF TRANSITION (closing)
   The leaf field itself is built by leaves.js (shared with
   home.html, which uses it to reopen). This file just triggers
   the close when the person taps, then navigates on.
   ============================================================ */

buildLeafField('leaf-curtain');

/* ============================================================
   2) TAP TO CONTINUE
   Leaves sweep in from the sides and cover the screen, then —
   once fully covered — we hand off to home.html, which reopens
   the same leaf curtain on load to reveal itself underneath.
   ============================================================ */

const screen = document.getElementById('screen');
const leafCurtain = document.getElementById('leaf-curtain');

const CLOSE_MS = 950;  // time for leaves + backdrop to fully cover
const HOLD_MS = 200;   // small buffer so the cover is settled before navigating

screen.addEventListener('click', () => {
  sessionStorage.setItem('playRequested', '1');
  sessionStorage.setItem('leafUnveil', '1'); // tells home.html to reopen the curtain on load

  // CLOSE — leaves sweep in from the sides and meet in the middle
  leafCurtain.classList.add('cover-screen');

  // Hand off to home.html while the screen is fully covered
  setTimeout(() => {
    window.location.href = 'home.html?play=1';
  }, CLOSE_MS + HOLD_MS);
});

/* ============================================================
   3) BACKGROUND MUSIC VIA YOUTUBE (autoplay muted, tap to unmute)
   ============================================================ */

const VIDEO_ID = 'd5Zv_PLMP3g';

const soundToggle = document.getElementById('sound-toggle');
let ytPlayer = null;

function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player('yt-player', {
    height: '1',
    width: '1',
    videoId: VIDEO_ID,
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      loop: 1,
      playlist: VIDEO_ID
    },
    events: {
      onReady: onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  // Browsers require muted playback to autoplay; start muted, then
  // offer a tap-to-unmute affordance.
  event.target.mute();
  event.target.playVideo();

  setTimeout(() => {
    if (event.target.isMuted && event.target.isMuted()) {
      soundToggle.style.display = 'flex';
    }
  }, 600);
}

function tryUnmuteOnInteraction() {
  if (!ytPlayer) return;
  ytPlayer.unMute();
  ytPlayer.playVideo();
  soundToggle.style.display = 'none';
  window.removeEventListener('click', tryUnmuteOnInteraction);
  window.removeEventListener('touchstart', tryUnmuteOnInteraction);
}

window.addEventListener('click', tryUnmuteOnInteraction);
window.addEventListener('touchstart', tryUnmuteOnInteraction);

soundToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  tryUnmuteOnInteraction();
});