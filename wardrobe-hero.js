/* <wardrobe-hero> — the first screen. Garments hang in profile like in a wardrobe;
   on hover the hanger turns to the front and its neighbours slide apart. Data: window.PRODUCTS. */
(() => {
  const css = `
    wardrobe-hero { padding: 20px 0 0; }
    .wh { position: relative; margin-inline: auto; border-radius: var(--radius); overflow: hidden; isolation: isolate;
      width: min(100%, calc((100vh - var(--header-h) - 44px) * 1.6)); aspect-ratio: 16 / 10; min-height: 420px;
      background: radial-gradient(120% 90% at 30% 20%, var(--sand-light) 0%, var(--sand) 55%, var(--sand-dark) 100%);
      box-shadow: 0 30px 80px -30px rgba(70,50,20,.45); }
    .wh::before { content: ""; position: absolute; inset: 0; opacity: .28; mix-blend-mode: multiply;
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.012 .02' numOctaves='5' seed='7' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .35  0 0 0 0 .25  0 0 0 0 .1  0 0 0 .9 -.25'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
      background-size: 600px 600px; }
    .wh::after { content: ""; position: absolute; inset: 0; z-index: 5; pointer-events: none;
      background: radial-gradient(120% 100% at 50% 40%, transparent 55%, rgba(60,40,15,.22) 100%); }
    .wh-light { position: absolute; inset: 0; z-index: 4; pointer-events: none; mix-blend-mode: soft-light;
      background:
        linear-gradient(115deg, rgba(70,45,15,0) 38%, rgba(70,45,15,.16) 44%, rgba(70,45,15,.16) 56%, rgba(70,45,15,0) 63%),
        linear-gradient(115deg, rgba(255,238,200,0) 60%, rgba(255,238,200,.38) 72%, rgba(255,238,200,.38) 86%, rgba(255,238,200,0) 100%); }

    .wh-rail { position: absolute; z-index: 1; top: var(--railY, 15%); height: 6px; border-radius: 3px;
      background: linear-gradient(180deg, #4a4540 0%, #151311 55%, #36312c 100%); box-shadow: 0 10px 14px -6px rgba(60,40,10,.35); }
    .wh-rail::before, .wh-rail::after { content: ""; position: absolute; top: -9px; width: 12px; height: 24px; border-radius: 3px;
      background: linear-gradient(90deg, #2a2623, #55504a 45%, #1c1a18); box-shadow: 0 6px 10px -3px rgba(60,40,10,.4); }
    .wh-rail::before { left: -6px; } .wh-rail::after { right: -6px; }

    .wh-items { position: absolute; z-index: 3; inset: 0; }
    .wh-item { position: absolute; top: calc(var(--railY, 15%) - 10px); left: var(--x); width: var(--W); height: var(--H);
      pointer-events: none; transform: translateX(var(--shift, 0px));
      transition: transform .6s cubic-bezier(.2,.8,.2,1);
      animation: wh-drop .9s cubic-bezier(.3,1.2,.5,1) both; animation-delay: calc(var(--i) * 70ms); }
    .wh-item:hover, .wh-item:focus-visible { z-index: 10; outline: none; }
    .wh-sway { position: absolute; inset: 0; transform-origin: var(--hx) 0;
      animation: wh-sway var(--dur, 6s) ease-in-out infinite; animation-delay: var(--del, 0s);
      filter: drop-shadow(6px 14px 12px rgba(70,45,15,.34)); }
    .wh-item img, .wh-item video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; display: block; pointer-events: none; user-select: none; }
    .wh-item video { opacity: 0; }
    .wh-item.live video { opacity: 1; }
    .wh-item.live img { opacity: 0; }
    /* Safari / iOS cannot play alpha WebM: an opaque green mp4 plays hidden and is keyed into the canvas on top */
    .wh-item canvas { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; display: block; pointer-events: none; opacity: 0; }
    .wh-item.live canvas { opacity: 1; }
    .wh-item.keyed video, .wh-item.live.keyed video { inset: auto; left: 0; top: 0; width: 2px; height: 2px; opacity: .01; }
    .wh-item::before { content: ""; position: absolute; top: -14px; bottom: -26px; left: calc(var(--hx) - var(--hit) / 2); width: var(--hit);
      pointer-events: auto; cursor: pointer; transition: width .3s ease, left .3s ease; }
    .wh-item.open::before { left: calc(var(--hx) - var(--hitW) / 2); width: var(--hitW); }
    @keyframes wh-drop { from { opacity: 0; margin-top: -40px; } to { opacity: 1; margin-top: 0; } }
    @keyframes wh-sway { 0%, 100% { transform: rotate(-.7deg); } 50% { transform: rotate(.7deg); } }

    .wh-head { position: absolute; z-index: 6; left: 4.2%; bottom: 9%; max-width: 14em;
      font-size: clamp(16px, 2.1vw, 30px); font-weight: 300; letter-spacing: .02em; line-height: 1.5; text-transform: uppercase; }
    .wh-info { position: absolute; z-index: 6; right: 4.2%; bottom: 9%; text-align: right; }
    .wh-name { font-family: var(--serif); font-size: clamp(20px, 2.6vw, 38px); line-height: 1.1; transition: opacity .25s ease, transform .25s ease; }
    .wh-price { margin-top: .5em; font-size: clamp(12px, 1.1vw, 16px); letter-spacing: .08em; transition: opacity .25s ease; }
    .wh-hint { margin-top: 1.1em; font-size: clamp(10px, .85vw, 12px); letter-spacing: .14em; text-transform: uppercase; opacity: .6; }
    .wh-info.swap .wh-name { opacity: 0; transform: translateY(6px); }
    .wh-info.swap .wh-price { opacity: 0; }


    /* ---------- a closed umbrella hangs on the rail ---------- */
    .wh-umb { position: absolute; z-index: 3; left: var(--ux); top: var(--ut); width: var(--uw); height: var(--uh);
      pointer-events: none; transform: translateX(var(--shift, 0px)); transition: transform .6s cubic-bezier(.2,.8,.2,1);
      animation: wh-drop .9s cubic-bezier(.3,1.2,.5,1) both; animation-delay: .75s; }
    .wh-umb-swing { position: absolute; inset: 0; transform-origin: 50% 5%; animation: wh-umb 6.5s ease-in-out infinite;
      filter: drop-shadow(8px 16px 12px rgba(70,45,15,.28)); }
    .wh-umb svg { width: 100%; height: 100%; display: block; overflow: visible; }
    @keyframes wh-umb { 0%, 100% { transform: rotate(-2.4deg); } 50% { transform: rotate(2.4deg); } }
    .umb-drip { fill: rgba(255,255,255,.85); transform-box: fill-box; transform-origin: 50% 0;
      animation: umb-drip 4.2s cubic-bezier(.5,0,.9,.6) infinite; opacity: 0; }
    @keyframes umb-drip { 0% { opacity: 0; transform: translateY(0) scaleY(.4); } 12% { opacity: .95; transform: translateY(2px) scaleY(1); }
      85% { opacity: .8; } 100% { opacity: 0; transform: translateY(170px) scaleY(1.5); } }
    .umb-glint { animation: umb-glint 6s ease-in-out infinite; }
    @keyframes umb-glint { 0%, 100% { opacity: .3; } 50% { opacity: .8; } }

    /* compact mode (narrow container, set from JS so it follows the real width, not the window): taller card, text stacked under the rail */
    .wh.compact { aspect-ratio: 3 / 4; width: 100%; min-height: 0; border-radius: 20px; }
    .wh.compact .wh-head { left: 6%; bottom: 25%; max-width: 14em; font-size: 15px; line-height: 1.4; }
    .wh.compact .wh-head br { display: none; }
    .wh.compact .wh-info { left: 6%; right: 6%; bottom: 6%; text-align: left; }
    .wh.compact .wh-name { font-size: 24px; }
    .wh.compact .wh-hint { margin-top: .7em; }
    @media (prefers-reduced-motion: reduce) { .wh-item, .wh-sway, .wh-umb, .wh-umb-swing, .umb-drip, .umb-glint { animation: none; } .wh-item { transition: none; } }`;


  /* closed transparent umbrella that hangs on the rail by its crook. viewBox 120x800; the rail passes through the crook at y = RAIL_U */
  const RAIL_U = 40;
  const UMBRELLA = `
    <svg viewBox="0 0 120 800" aria-hidden="true">
      <defs><linearGradient id="umbFill" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".5" stop-color="#fff" stop-opacity=".16"/><stop offset="1" stop-color="#fff" stop-opacity=".36"/></linearGradient></defs>
      <path d="M54 150C52 230 30 300 28 360C26 440 40 560 56 690L60 718L64 690C80 560 94 440 92 360C90 300 68 230 66 150Z" fill="url(#umbFill)" stroke="rgba(40,28,16,.55)" stroke-width="2" stroke-linejoin="round"/>
      <g fill="none" stroke="rgba(40,28,16,.4)" stroke-width="1.6" stroke-linecap="round">
        <path d="M56 205C48 300 40 420 54 640"/><path d="M64 205C72 300 84 420 70 640"/><path d="M60 152C58 330 58 520 60 705"/>
      </g>
      <path class="umb-glint" d="M44 250C40 330 38 400 44 470" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
      <path d="M30 330Q60 344 90 330V346Q60 360 30 346Z" fill="rgba(40,28,16,.6)"/><circle cx="82" cy="341" r="4" fill="#d6c299"/>
      <path d="M60 716V765" stroke="rgba(40,28,16,.8)" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M60 150V66Q60 28 34 28Q8 28 8 62V86" stroke="rgba(40,28,16,.85)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <ellipse class="umb-drip" cx="60" cy="768" rx="3.4" ry="6"/>
      <ellipse class="umb-drip" cx="60" cy="768" rx="3" ry="5.2" style="animation-delay:2.1s"/>
    </svg>`;

  /* browsers that cannot play alpha WebM (Safari, every iOS browser) get an opaque green mp4 keyed in a canvas. ?key=1 forces it for testing */
  const UA = navigator.userAgent;
  const IS_IOS = /iP(hone|ad|od)/.test(UA) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const IS_SAFARI = /Safari/.test(UA) && !/Chrome|Chromium|CriOS|FxiOS|Edg|OPR|Android/.test(UA);
  const KEYED = IS_IOS || IS_SAFARI || /[?&]key=1/.test(location.search);
  const smooth = (x, a, b) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

  const UMB_CM = 88;   // closed umbrella, crook to tip, relative to the garments' real lengths
  const FPS = 24, OPEN_RATE = 2.2, CLOSE_RATE = 3, GAP = 9, MIN_SLOT = 46, DEFAULT_ID = 'bomber';

  class WardrobeHero extends HTMLElement {
    connectedCallback() {
      if (!document.getElementById('css-wardrobe-hero')) {
        const s = document.createElement('style'); s.id = 'css-wardrobe-hero'; s.textContent = css; document.head.appendChild(s);
      }
      this.id = this.id || 'shop';
      this.items = window.PRODUCTS.map(p => ({ ...p }));
      this.hovered = -1;
      this.innerHTML = `
        <div class="container">
          <div class="wh">
            <div class="wh-light"></div>
            <div class="wh-rail"></div>
            <div class="wh-items"></div>
            <h1 class="wh-head">Pieces that<br> outlast<br> the season</h1>
            <div class="wh-info"><div class="wh-name"></div><div class="wh-price"></div><div class="wh-hint">Hover to open</div></div>
          </div>
        </div>`;
      this.card = this.querySelector('.wh');
      this.rail = this.querySelector('.wh-rail');
      this.info = this.querySelector('.wh-info');
      this.nameEl = this.querySelector('.wh-name');
      this.priceEl = this.querySelector('.wh-price');
      this.setInfo(this.items.find(i => i.id === DEFAULT_ID), true);
      this.items.forEach((it, i) => this.build(it, i));
      this.umb = { el: document.createElement('div'), d: 0 };
      this.umb.el.className = 'wh-umb';
      this.umb.el.innerHTML = `<div class="wh-umb-swing">${UMBRELLA}</div>`;
      this.querySelector('.wh-items').appendChild(this.umb.el);
      this.layout();
      this.ro = new ResizeObserver(() => this.layout());
      this.ro.observe(this.card);
    }
    disconnectedCallback() { this.ro && this.ro.disconnect(); }

    setInfo(it, instant) {
      const price = window.money(it.price);
      if (this.nameEl.textContent === it.name) return;
      if (instant) { this.nameEl.textContent = it.name; this.priceEl.textContent = price; return; }
      this.info.classList.add('swap');
      setTimeout(() => { this.nameEl.textContent = it.name; this.priceEl.textContent = price; this.info.classList.remove('swap'); }, 220);
    }
    spread() {
      this.items.forEach((it, i) => {
        const sh = this.hovered >= 0 && i !== this.hovered ? (i < this.hovered ? -1 : 1) * this.items[this.hovered].d : 0;
        it.el.style.setProperty('--shift', sh + 'px');
      });
      this.umb.el.style.setProperty('--shift', (this.hovered >= 0 ? this.items[this.hovered].d + 18 : 0) + 'px');
    }

    build(it, i) {
      const el = document.createElement('div');
      el.className = 'wh-item';
      el.tabIndex = 0;
      el.setAttribute('aria-label', `${it.name}, ${window.money(it.price)}`);
      el.style.setProperty('--i', i);
      el.style.setProperty('--hx', (it.hx * 100) + '%');
      el.innerHTML = `
        <div class="wh-sway" style="--dur:${(5 + Math.random() * 3).toFixed(1)}s; --del:${(-Math.random() * 6).toFixed(1)}s">
          <img src="${window.ASSETS}${it.id}_p.png" alt="${it.name}" draggable="false">
          ${KEYED
            ? `<video src="${window.ASSETS}${it.id}_k.mp4" muted playsinline webkit-playsinline preload="auto" tabindex="-1"></video><canvas></canvas>`
            : `<video src="${window.ASSETS}${it.id}.webm" muted playsinline preload="auto" tabindex="-1"></video>`}
        </div>`;
      if (KEYED) el.classList.add('keyed');
      this.querySelector('.wh-items').appendChild(el);
      it.el = el;

      const v = el.querySelector('video');
      const D = () => v.duration;              // 2N frames: front -> turned -> front (ping-pong)
      const tp = (it.p + 0.5) / FPS;           // the profile frame on the way out
      let token = 0;

      // opaque green frame -> transparent garment (same rule as the alpha WebM was made with), drawn into the canvas
      const cv = el.querySelector('canvas'), ctx = cv && cv.getContext('2d', { willReadFrequently: true });
      const paint = () => {
        if (!ctx || v.readyState < 2 || !v.videoWidth) return;
        const sc = Math.min(1, 640 / v.videoHeight), w = Math.round(v.videoWidth * sc), h = Math.round(v.videoHeight * sc);
        if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
        ctx.drawImage(v, 0, 0, w, h);
        const im = ctx.getImageData(0, 0, w, h), d = im.data, gb = it.gb || 72;
        for (let k = 0; k < d.length; k += 4) {
          const r = d[k], g = d[k + 1], b = d[k + 2], m = r > b ? r : b;
          d[k + 3] = 255 * (1 - smooth((g - m) / gb, 0.38, 0.76));
          if (g > m + 4) d[k + 1] = m + 4;               // despill
        }
        ctx.putImageData(im, 0, 0);
      };
      let raf = 0;
      const loop = () => { if (!el.classList.contains('live')) { raf = 0; return; } paint(); raf = requestAnimationFrame(loop); };
      const ready = cb => { if (v.readyState >= 1) cb(); else { v.addEventListener('loadedmetadata', cb, { once: true }); v.load(); } };

      const open = () => {
        const my = ++token;
        el.classList.add('open');
        this.hovered = i; this.spread(); this.setInfo(it);
        v.playbackRate = OPEN_RATE; v.loop = false;
        ready(() => {
          if (my !== token) return;
          // the way back of the ping-pong shows the same picture as the profile, but heads to the front
          let t = el.classList.contains('live') ? v.currentTime : D() - tp;
          if (t < D() / 2) t = D() - t;
          const go = () => {
            if (my !== token) return;
            if (KEYED) paint();                 // first keyed frame is ready before the canvas is shown
            el.classList.add('live');
            if (KEYED && !raf) raf = requestAnimationFrame(loop);
            v.play().catch(() => {});
          };
          if (Math.abs(v.currentTime - t) < 0.005) go();
          else { v.addEventListener('seeked', go, { once: true }); v.currentTime = t; setTimeout(go, 250); }
        });
      };
      const close = () => {
        const my = ++token;
        el.classList.remove('open');
        if (this.hovered === i) { this.hovered = -1; this.spread(); }
        if (!el.classList.contains('live')) return;
        let t = v.currentTime;
        if (t > D() / 2) t = D() - t;          // mirror to the outward leg (identical picture) and run it back to the profile
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
              v.currentTime = tp;              // land exactly on the profile frame = the poster
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
    }


    /* each slot is as narrow as the garment's profile, like hangers packed in a wardrobe */
    layout() {
      const box = this.querySelector('.container').clientWidth;
      if (!box) return;
      const mobile = box < 560;
      this.card.classList.toggle('compact', mobile);
      const cw = this.card.clientWidth, ch = this.card.clientHeight;
      if (!cw) return;
      const items = this.items;
      const gap = mobile ? 3 : GAP, minSlot = mobile ? 22 : MIN_SLOT;
      const maxCm = Math.max(...items.map(i => i.cm));
      let k = (ch * (mobile ? 0.5 : 0.64)) / maxCm;
      const measure = kk => {
        let total = 0, dmax = 0;
        items.forEach(it => {
          const s = it.cm * kk / it.h;
          it.slot = Math.max((it.pr - it.pl) * s * 0.95, minSlot) + gap;
          it.d = Math.max(((it.front * s) - it.slot) / 2 + gap + (mobile ? 4 : 14), 0);
          total += it.slot; dmax = Math.max(dmax, it.d);
        });
        const uh = UMB_CM * kk, uw = uh * 0.15;
        this.umb.uh = uh; this.umb.uw = uw; this.umb.slot = uw + gap + (mobile ? 2 : 8);
        total += this.umb.slot;
        return total + (mobile ? 0 : 2 * dmax);
      };
      const need = measure(k), avail = cw * (mobile ? 0.94 : 0.9);
      if (need > avail) { k *= avail / need; measure(k); }
      const total = items.reduce((s, it) => s + it.slot, 0) + this.umb.slot;
      const f0 = items[0], s0 = f0.cm * k / f0.h;
      const overhang = Math.max(0, (f0.hx * f0.w - f0.pl) * s0 - f0.slot / 2) + 4;   // body of the first hanger reaching left of its slot
      let x = Math.max((cw - total) / 2, overhang);
      items.forEach(it => {
        const s = it.cm * k / it.h, H = it.cm * k, W = it.w * s;
        it.el.style.setProperty('--H', H + 'px');
        it.el.style.setProperty('--W', W + 'px');
        it.el.style.setProperty('--x', (x + it.slot / 2 - it.hx * W) + 'px');
        it.el.style.setProperty('--hit', it.slot + 'px');
        it.el.style.setProperty('--hitW', (2 * it.d + it.slot) + 'px');
        x += it.slot;
      });
      const railCenter = ch * (mobile ? 0.12 : 0.15) + 3;
      const u = this.umb.uh / 800;
      this.umb.el.style.setProperty('--ux', (x + (this.umb.slot - this.umb.uw) / 2) + 'px');
      this.umb.el.style.setProperty('--ut', (railCenter - RAIL_U * u) + 'px');
      this.umb.el.style.setProperty('--uw', this.umb.uw + 'px');
      this.umb.el.style.setProperty('--uh', this.umb.uh + 'px');
      const maxD = Math.max(...items.map(i => i.d));
      const railW = mobile ? cw * 0.96 : Math.min(cw * 0.94, total + 2 * maxD + cw * 0.08);
      this.rail.style.left = (cw - railW) / 2 + 'px';
      this.rail.style.width = railW + 'px';
      this.card.style.setProperty('--railY', (mobile ? 12 : 15) + '%');
    }
  }
  customElements.define('wardrobe-hero', WardrobeHero);
})();
