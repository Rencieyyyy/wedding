/* ============================================================
   REOPEN THE LEAF CURTAIN ON LOAD
   If the person arrived here from the splash screen's tap
   (sessionStorage flag set in script.js), the page loads with
   the leaf curtain instantly snapped to its fully-covered state
   (no transition), then a beat later it reopens — the leaves
   sweep back out to the sides, revealing this page underneath.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const leafCurtain = document.getElementById('leaf-curtain');
  const shouldUnveil = sessionStorage.getItem('leafUnveil') === '1';

  if (!shouldUnveil) return; // arrived directly, nothing to reopen

  buildLeafField('leaf-curtain');

  // snap instantly to "covered" with no transition
  leafCurtain.classList.add('no-anim');
  leafCurtain.classList.add('cover-screen');

  // force layout so the browser commits the instant state above
  // before we re-enable transitions
  void leafCurtain.offsetWidth;

  leafCurtain.classList.remove('no-anim');

  // brief pause, then reopen — leaves sweep back out to the sides
  setTimeout(() => {
    leafCurtain.classList.remove('cover-screen');
  }, 180);

  // don't replay on refresh / back-navigation
  sessionStorage.removeItem('leafUnveil');
});