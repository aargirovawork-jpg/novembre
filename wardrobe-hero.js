<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>NOVEMBRE — Wardrobe</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Inter:wght@300;400&display=swap" rel="stylesheet">
<style>
  :root {
    --sand: #d3bf98;
    --sand-light: #e6d6b4;
    --sand-dark: #b99f73;
    --ink: #2a1d12;
    --serif: "Cormorant Garamond", "Playfair Display", Georgia, serif;
    --sans: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; }
  body {
    background: linear-gradient(180deg, #e4dcc8 0%, #d2c7a6 100%);
    color: var(--ink);
    font-family: var(--sans);
    display: grid;
    place-items: center;
    overflow: hidden;
  }

  /* ---------- card / wall ---------- */
  .card {
    position: relative;
    width: min(92vw, calc(88vh * 1.6));
    aspect-ratio: 16 / 10;
    border-radius: 28px;
    overflow: hidden;
    background: radial-gradient(120% 90% at 30% 20%, var(--sand-light) 0%, var(--sand) 55%, var(--sand-dark) 100%);
    box-shadow: 0 30px 80px -30px rgba(70, 50, 20, .45);
    isolation: isolate;
  }
  .card::before {                       /* plaster texture */
    content: "";
    position: absolute; inset: 0; z-index: 0;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.012 .02' numOctaves='5' seed='7'/><feColorMatrix values='0 0 0 0 .35  0 0 0 0 .25  0 0 0 0 .1  0 0 0 .9 -.25'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
    background-size: 600px 600px;
    opacity: .28;
    mix-blend-mode: multiply;
  }
  .light {                              /* diagonal window light */
    position: absolute; inset: 0; z-index: 4; pointer-events: none;
    background:
      linear-gradient(115deg, rgba(70,45,15,0) 38%, rgba(70,45,15,.16) 44%, rgba(70,45,15,.16) 56%, rgba(70,45,15,0) 63%),
      linear-gradient(115deg, rgba(255,238,200,0) 60%, rgba(255,238,200,.38) 72%, rgba(255,238,200,.38) 86%, rgba(255,238,200,0) 100%);
    mix-blend-mode: soft-light;
  }
  .card::after {                        /* vignette */
    content: ""; position: absolute; inset: 0; z-index: 5; pointer-events: none;
    background: radial-gradient(120% 100% at 50% 40%, transparent 55%, rgba(60,40,15,.22) 100%);
  }

  /* ---------- top bar ---------- */
  header {
    position: absolute; z-index: 6; left: 4.2%; right: 4.2%; top: 0; height: 14%;
    display: flex; align-items: center;
    border-bottom: 1px solid rgba(42,29,18,.28);
  }
  .logo { font-family: var(--serif); font-weight: 500; font-size: clamp(22px, 2.9vw, 42px); letter-spacing: .02em; line-height: 1; }

  /* ---------- rail ---------- */
  .rail {
    position: absolute; z-index: 1;
    top: var(--railY, 21%);
    height: 6px; border-radius: 3px;
    background: linear-gradient(180deg, #4a4540 0%, #151311 55%, #36312c 100%);
    box-shadow: 0 10px 14px -6px rgba(60,40,10,.35);
  }
  .rail::before, .rail::after {
    content: ""; position: absolute; top: -9px; width: 12px; height: 24px; border-radius: 3px;
    background: linear-gradient(90deg, #2a2623, #55504a 45%, #1c1a18);
    box-shadow: 0 6px 10px -3px rgba(60,40,10,.4);
  }
  .rail::before { left: -6px; }
  .rail::after  { right: -6px; }

  /* ---------- garments: seen in profile, hangers are pushed aside on hover ---------- */
  .items { position: absolute; z-index: 3; inset: 0; }
  .item {
    position: absolute;
    top: calc(var(--railY, 21%) - 10px);
    left: var(--x); width: var(--W); height: var(--H);
    pointer-events: none;                /* only the hit area below reacts, boxes of neighbours overlap */
    transform: translateX(var(--shift, 0px));
    transition: transform .6s cubic-bezier(.2,.8,.2,1);
    animation: drop .9s cubic-bezier(.3,1.2,.5,1) both;
    animation-delay: calc(var(--i) * 70ms);
  }
  .item:hover, .item:focus-visible { z-index: 10; outline: none; }
  .item .sway {
    position: absolute; inset: 0;
    transform-origin: var(--hx) 0;
    animation: sway var(--dur, 6s) ease-in-out infinite;
    animation-delay: var(--del, 0s);
    filter: drop-shadow(6px 14px 12px rgba(70,45,15,.34));
  }
  .item img, .item video {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: contain; display: block; pointer-events: none; user-select: none;
  }
  .item video { opacity: 0; }
  .item.live video { opacity: 1; }
  .item.live img   { opacity: 0; }
  .item::before {                       /* narrow hit area around the hanger, as wide as the garment when it is open */
    content: ""; position: absolute; top: 0; bottom: 0;
    left: calc(var(--hx) - var(--hit) / 2); width: var(--hit);
    pointer-events: auto; cursor: pointer;
    transition: width .3s ease, left .3s ease;
  }
  .item.open::before { left: calc(var(--hx) - var(--hitW) / 2); width: var(--hitW); }
  @keyframes drop {
    from { opacity: 0; margin-top: -40px; }
    to   { opacity: 1; margin-top: 0; }
  }
  @keyframes sway {
    0%, 100% { transform: rotate(-.7deg); }
    50%      { transform: rotate( .7deg); }
  }

  /* ---------- text ---------- */
  .headline {
    position: absolute; z-index: 6; left: 4.2%; bottom: 9%;
    font-size: clamp(16px, 2.1vw, 30px); font-weight: 300; letter-spacing: .02em;
    line-height: 1.5; text-transform: uppercase; max-width: 14em;
  }
  .info { position: absolute; z-index: 6; right: 4.2%; bottom: 9%; text-align: right; }
  .info .name { font-family: var(--serif); font-size: clamp(20px, 2.6vw, 38px); line-height: 1.1;
    transition: opacity .25s ease, transform .25s ease; }
  .info .price { margin-top: .5em; font-size: clamp(12px, 1.1vw, 16px); letter-spacing: .08em; transition: opacity .25s ease; }
  .info .hint { margin-top: 1.1em; font-size: clamp(10px, .85vw, 12px); letter-spacing: .14em; text-transform: uppercase; opacity: .6; }
  .info.swap .name { opacity: 0; transform: translateY(6px); }
  .info.swap .price { opacity: 0; }

  @media (max-width: 700px) {
    .card { width: 96vw; aspect-ratio: 9 / 16; max-height: 94vh; border-radius: 20px; }
    .headline { bottom: 22%; }
    .info { left: 4.2%; right: 4.2%; bottom: 7%; text-align: left; }
  }
  @media (prefers-reduced-motion: reduce) { .item, .item .sway { animation: none; } .item { transition: none; } }
</style>
</head>
<body>
  <main class="card" id="card">
    <div class="light"></div>
    <header><div class="logo">NOVEMBRE</div></header>
    <div class="rail" id="rail"></div>
    <div class="items" id="items"></div>

    <p class="headline">Pieces that<br>outlast<br>the season</p>
    <div class="info" id="info">
      <div class="name" id="name"></div>
      <div class="price" id="price"></div>
      <div class="hint">Hover to open</div>
    </div>
  </main>

<script>
/* cm = real garment height incl. hanger (relative scale). w/h = asset size in px.
   p = frame (of N per direction of the ping-pong video) where the garment stands in profile; that frame is assets/<id>_p.png.
   hx = x of the hanger hook (0..1), pl/pr = left/right edge of the profile, front = width seen from the front. */
const ITEMS = [
  { id:'trench',     name:'Le Trench — Sand',         price:'€189', cm:125, w:420, h:800, N:95, p:24, hx:.4952, pl:94,  pr:294, front:405 },
  { id:'blazer',     name:'Double-Breasted Blazer',   price:'€149', cm:84,  w:572, h:800, N:95, p:33, hx:.4921, pl:219, pr:345, front:560 },
  { id:'shirt',      name:'Poplin Shirt — White',     price:'€69',  cm:84,  w:530, h:800, N:95, p:23, hx:.4943, pl:208, pr:310, front:529 },
  { id:'sweater',    name:'Half-Zip Knit — Noir',     price:'€99',  cm:70,  w:468, h:800, N:95, p:26, hx:.4904, pl:180, pr:276, front:467 },
  { id:'bomber',     name:'Bomber Cuir — Noir',       price:'€229', cm:66,  w:548, h:800, N:95, p:74, hx:.4918, pl:195, pr:348, front:547 },
  { id:'longsleeve', name:'Long Sleeve — White',      price:'€35',  cm:72,  w:504, h:800, N:95, p:29, hx:.496,  pl:202, pr:289, front:489 },
  { id:'jeans',      name:'Straight Jean — Mid Blue', price:'€79',  cm:104, w:300, h:800, N:95, p:63, hx:.5,    pl:119, pr:174, front:286 },
  { id:'dress',      name:'Petite Robe Noire',        price:'€95',  cm:94,  w:464, h:800, N:95, p:23, hx:.4946, pl:181, pr:268, front:444 },
  { id:'trousers',   name:'Pleated Wide Trouser',     price:'€89',  cm:108, w:374, h:800, N:96, p:27, hx:.5,    pl:148, pr:232, front:353 },
];
const DEFAULT_ID = 'bomber';
const FPS = 24, CLOSE_RATE = 2.2, GAP = 9, MIN_SLOT = 30;

const card = document.getElementById('card');
const wrap = document.getElementById('items');
const rail = document.getElementById('rail');
const info = document.getElementById('info');
const nameEl = document.getElementById('name');
const priceEl = document.getElementById('price');

function setInfo(it, instant) {
  if (nameEl.textContent === it.name) return;
  if (instant) { nameEl.textContent = it.name; priceEl.textContent = it.price; return; }
  info.classList.add('swap');
  setTimeout(() => { nameEl.textContent = it.name; priceEl.textContent = it.price; info.classList.remove('swap'); }, 220);
}
setInfo(ITEMS.find(i => i.id === DEFAULT_ID), true);

let hovered = -1;
function spread() {
  ITEMS.forEach((it, i) => {
    let sh = 0;
    if (hovered >= 0 && i !== hovered) sh = (i < hovered ? -1 : 1) * ITEMS[hovered].d;
    it.el.style.setProperty('--shift', sh + 'px');
  });
}

ITEMS.forEach((it, i) => {
  const el = document.createElement('div');
  el.className = 'item';
  el.tabIndex = 0;
  el.setAttribute('aria-label', `${it.name}, ${it.price}`);
  el.style.setProperty('--i', i);
  el.style.setProperty('--hx', (it.hx * 100) + '%');
  el.innerHTML = `
    <div class="sway" style="--dur:${(5 + Math.random() * 3).toFixed(1)}s; --del:${(-Math.random() * 6).toFixed(1)}s">
      <img src="assets/${it.id}_p.png" alt="${it.name}" draggable="false">
      <video src="assets/${it.id}.webm" muted playsinline preload="auto" tabindex="-1"></video>
    </div>`;
  wrap.appendChild(el);
  it.el = el;
  const v = el.querySelector('video');
  const D = () => v.duration;                 // 2N frames: front -> turned -> front (ping-pong)
  const tp = (it.p + 0.5) / FPS;              // the profile frame on the way out
  let token = 0;

  const open = () => {
    const my = ++token;
    el.classList.add('open');
    hovered = i; spread(); setInfo(it);
    v.playbackRate = 1; v.loop = false;
    // the way back of the ping-pong shows the same frame as the profile, but heads to the front
    let t = el.classList.contains('live') ? v.currentTime : D() - tp;
    if (t < D() / 2) t = D() - t;
    const go = () => { if (my !== token) return; el.classList.add('live'); v.play().catch(() => {}); };
    if (Math.abs(v.currentTime - t) < 0.005) go();
    else { v.addEventListener('seeked', go, { once: true }); v.currentTime = t; setTimeout(go, 250); }
  };
  const close = () => {
    const my = ++token;
    el.classList.remove('open');
    if (hovered === i) { hovered = -1; spread(); }
    if (!el.classList.contains('live')) return;
    let t = v.currentTime;
    if (t > D() / 2) t = D() - t;             // mirror to the outward leg (identical picture) and run it back to the profile
    v.pause(); v.loop = false;
    if (t >= tp) { el.classList.remove('live'); return; }
    const run = () => {
      if (my !== token) return;
      v.playbackRate = CLOSE_RATE; v.play().catch(() => {});
      const tick = () => {
        if (my !== token) return;
        if (v.currentTime >= tp - 0.02) {
          v.pause();
          const done = () => { if (my === token) el.classList.remove('live'); };
          v.addEventListener('seeked', done, { once: true });
          v.currentTime = tp;                  // land exactly on the profile frame, it is the same picture as the poster
          setTimeout(done, 250);
        } else requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    v.addEventListener('seeked', run, { once: true }); v.currentTime = t; setTimeout(run, 250);
  };
  el.addEventListener('pointerenter', open);
  el.addEventListener('pointerleave', close);
  el.addEventListener('focus', open);
  el.addEventListener('blur', close);
});

/* layout: each slot is as narrow as the garment's profile, like hangers packed in a wardrobe */
function layout() {
  const cw = card.clientWidth, ch = card.clientHeight;
  const mobile = window.matchMedia('(max-width: 700px)').matches;
  const maxCm = Math.max(...ITEMS.map(i => i.cm));
  let k = (ch * (mobile ? 0.42 : 0.64)) / maxCm;
  const measure = kk => {
    let total = 0, dmax = 0;
    ITEMS.forEach(it => {
      const s = it.cm * kk / it.h;
      it.slot = Math.max((it.pr - it.pl) * s * 0.95, MIN_SLOT) + GAP;
      it.d = Math.max(((it.front * s) - it.slot) / 2 + GAP + 14, 0);
      total += it.slot; dmax = Math.max(dmax, it.d);
    });
    return total + 2 * dmax;
  };
  const need = measure(k), avail = cw * 0.86;
  if (need > avail) { k *= avail / need; measure(k); }
  const total = ITEMS.reduce((s, it) => s + it.slot, 0);
  let x = (cw - total) / 2;
  ITEMS.forEach(it => {
    const s = it.cm * k / it.h;
    const H = it.cm * k, W = it.w * s;
    const cx = x + it.slot / 2;
    it.el.style.setProperty('--H', H + 'px');
    it.el.style.setProperty('--W', W + 'px');
    it.el.style.setProperty('--x', (cx - it.hx * W) + 'px');
    it.el.style.setProperty('--hit', it.slot + 'px');
    it.el.style.setProperty('--hitW', (it.front * s) + 'px');
    x += it.slot;
  });
  const maxD = Math.max(...ITEMS.map(i => i.d));
  const railW = Math.min(cw * 0.92, total + 2 * maxD + cw * 0.08);
  rail.style.left = (cw - railW) / 2 + 'px';
  rail.style.width = railW + 'px';
  card.style.setProperty('--railY', (mobile ? 20 : 21) + '%');
}
layout();
addEventListener('resize', layout);
</script>
</body>
</html>
