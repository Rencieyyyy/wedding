/* ============================================================
   SHARED LEAF FIELD GENERATOR
   Used by both index.html (closes the curtain) and home.html
   (reopens it). Leaves are anchored at a random final spot on
   screen, but start off past the LEFT or RIGHT edge — whichever
   is closer to their final spot — so the whole field reads as
   sweeping in from the sides and meeting in the middle, with no
   up/down motion at all.
   ============================================================ */

const LEAF_PATHS = [
  // rounded almond leaf with a center vein
  `<path d="M50 4 C82 22 90 72 50 96 C10 72 18 22 50 4 Z"/>
   <path d="M50 10 L50 90" stroke="rgba(0,0,0,0.14)" stroke-width="2" fill="none"/>`,
  // slimmer, slightly asymmetric leaf
  `<path d="M50 2 C78 24 84 68 52 98 C22 76 16 26 50 2 Z"/>
   <path d="M50 8 Q40 50 50 92" stroke="rgba(0,0,0,0.14)" stroke-width="2" fill="none"/>`
];

const LEAF_COLORS = ['var(--espresso)', 'var(--cocoa)', 'var(--camel)'];
const LEAF_COUNT = 34;

function buildLeafField(containerId) {
  const curtain = document.getElementById(containerId || 'leaf-curtain');
  if (!curtain) return;

  // clear any previously built leaves (safe to call more than once)
  curtain.querySelectorAll('.curtain-leaf').forEach((el) => el.remove());

  for (let i = 0; i < LEAF_COUNT; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'curtain-leaf';

    // final resting spot is spread across the whole screen so the
    // field ends up covering everything with no gaps
    const finalLeft = Math.random() * 100;
    const finalTop = Math.random() * 100;

    // travel in from whichever side is closer to its final spot
    const side = finalLeft < 50 ? 'left' : 'right';
    const txStart = side === 'left' ? '-140vw' : '140vw';

    const size = 55 + Math.random() * 35; // vmax units, big enough to overlap generously
    const rotStart = Math.random() * 360;
    const rotEnd = rotStart + (Math.random() > 0.5 ? 1 : -1) * (15 + Math.random() * 25);

    // leaves nearer the center have less distance to travel, so they
    // get a touch more delay — the two sides arrive together
    const distFromCenter = Math.abs(finalLeft - 50) / 50; // 0 = center, 1 = edge
    const delay = (1 - distFromCenter) * 0.22 + Math.random() * 0.1;

    leaf.style.left = `${finalLeft}%`;
    leaf.style.top = `${finalTop}%`;
    leaf.style.width = `${size}vmax`;
    leaf.style.height = `${size}vmax`;
    leaf.style.color = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];
    leaf.style.setProperty('--tx-start', txStart);
    leaf.style.setProperty('--rot-start', `${rotStart}deg`);
    leaf.style.setProperty('--rot-end', `${rotEnd}deg`);
    leaf.style.setProperty('--delay', `${delay}s`);

    const path = LEAF_PATHS[Math.floor(Math.random() * LEAF_PATHS.length)];
    leaf.innerHTML = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">${path}</svg>`;

    curtain.appendChild(leaf);
  }
}