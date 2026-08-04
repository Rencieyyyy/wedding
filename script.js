const VIDEO_ID = "d5Zv_PLMP3g";

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
  event.target.playVideo();

  setTimeout(() => {
    if (event.target.isMuted && event.target.isMuted()) {
      soundToggle.style.display = 'block';
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