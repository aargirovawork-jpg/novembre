/* <leaf-fall> — autumn leaves drifting down over the whole page (fixed to the viewport, never blocks clicks).
   Two layers: small leaves BEHIND the content cards, a few big blurred ones in FRONT, for depth. */
(() => {
  const css = `
    leaf-fall { display: block; }
    .lf { position: fixed; inset: 0; pointer-events: none; overflow: hidden; }
    .lf.back  { z-index: -1; }
    .lf.front { z-index: 60; }
    .lf-leaf { position: absolute; top: 0; left: var(--x); width: var(--s); height: var(--s); opacity: 0;
      animation: lf-fall var(--dur) linear infinite; animation-delay: var(--del); will-change: transform, opacity; }
    .lf-leaf > svg { width: 100%; height: 100%; display: block; overflow: visible;
      animation: lf-flutter var(--flu) ease-in-out infinite alternate; animation-delay: var(--del); }
    .lf.front .lf-leaf > svg { filter: blur(1.4px); }
    @keyframes lf-fall {
      0%   { opacity: 0; transform: translate(0, -12vh) rotate(var(--r0)); }
      6%   { opacity: var(--o); }
      50%  { transform: translate(var(--dx), 50vh) rotate(calc(var(--r0) + var(--spin) * .5)); }
      94%  { opacity: var(--o); }
      100% { opacity: 0; transform: translate(calc(var(--dx) * -.4), 112vh) rotate(calc(var(--r0) + var(--spin))); } }
    @keyframes lf-flutter { from { transform: rotate3d(0, 1, .25, -55deg); } to { transform: rotate3d(0, 1, .25, 55deg); } }
    @media (prefers-reduced-motion: reduce) { .lf { display: none; } }`;

  const COLORS = ['#b5532a', '#c97b2c', '#d9a441', '#8f3b1f', '#7a5a2b', '#a9442a', '#c4622d'];
  const SHAPES = [
    c => `<svg viewBox="-24 -26 48 52"><path d="M0-24C17-14 19 8 0 24C-19 8-17-14 0-24Z" fill="${c}"/><path d="M0-22V24M0-6L9-14M0 4L10-4M0-6L-9-14M0 4L-10-4" stroke="rgba(0,0,0,.28)" stroke-width="1.3" fill="none"/></svg>`,
    c => `<svg viewBox="-26 -26 52 52"><path d="M0-25L6-12L18-16L13-3L25 2L12 8L14 20L2 14L0 25L-2 14L-14 20L-12 8L-25 2L-13-3L-18-16L-6-12Z" fill="${c}"/><path d="M0 24V-18M0-4L11-12M0-4L-11-12M0 6L10 2M0 6L-10 2" stroke="rgba(0,0,0,.28)" stroke-width="1.3" fill="none"/></svg>`,
  ];
  const rnd = (a, b) => a + Math.random() * (b - a);

  class LeafFall extends HTMLElement {
    connectedCallback() {
      if (!document.getElementById('css-leaf-fall')) {
        const s = document.createElement('style'); s.id = 'css-leaf-fall'; s.textContent = css; document.head.appendChild(s);
      }
      const mk = (cls, n, size, opacity) => {
        const layer = document.createElement('div');
        layer.className = 'lf ' + cls; layer.setAttribute('aria-hidden', 'true');
        for (let i = 0; i < n; i++) {
          const el = document.createElement('div');
          el.className = 'lf-leaf';
          el.style.cssText = `--x:${rnd(-2, 98).toFixed(1)}%; --s:${rnd(size[0], size[1]).toFixed(0)}px;`
            + `--dur:${rnd(15, 28).toFixed(1)}s; --del:${(-rnd(0, 28)).toFixed(1)}s; --dx:${rnd(-110, 110).toFixed(0)}px;`
            + `--r0:${rnd(-180, 180).toFixed(0)}deg; --spin:${rnd(-420, 420).toFixed(0)}deg; --flu:${rnd(1.6, 3.4).toFixed(2)}s; --o:${opacity};`;
          el.innerHTML = SHAPES[i % SHAPES.length](COLORS[Math.floor(Math.random() * COLORS.length)]);
          layer.appendChild(el);
        }
        this.appendChild(layer);
      };
      mk('back', 18, [18, 34], .95);
      mk('front', 4, [38, 58], .8);
    }
  }
  customElements.define('leaf-fall', LeafFall);
})();
