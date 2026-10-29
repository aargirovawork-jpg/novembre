/* <look-book> — outfits built from the capsule. Contains <outfit-card> (one look: garments on a mini rail + total + add button). */
(() => {
  const css = `
    look-book { padding-top: clamp(72px, 10vw, 150px); }
    .lb-head { display: flex; justify-content: space-between; align-items: end; gap: 24px; flex-wrap: wrap; margin-bottom: clamp(24px, 3vw, 44px); }
    .lb-head h2 { font-family: var(--serif); font-weight: 400; font-size: clamp(34px, 4.4vw, 68px); line-height: 1.02; margin-top: 14px; }
    .lb-head p { max-width: 26em; color: var(--ink-soft); }
    .lb-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: clamp(20px, 2.4vw, 32px); }
    .lb-chip { padding: .6em 1.2em; border-radius: 999px; border: 1px solid var(--line); font-size: 11px; letter-spacing: .14em; text-transform: uppercase; font-weight: 400;
      transition: background .2s, color .2s, border-color .2s; }
    .lb-chip:hover { border-color: var(--ink); }
    .lb-chip[aria-pressed="true"] { background: var(--ink); color: var(--paper); border-color: var(--ink); }
    .lb-chip small { opacity: .55; margin-left: .5em; font-size: inherit; }
    .lb-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr)); gap: clamp(28px, 3vw, 44px) clamp(14px, 1.8vw, 28px); }
    outfit-card { transition: opacity .35s ease, transform .35s ease; }
    outfit-card[hidden] { display: none; }
    outfit-card.fade-in { animation: oc-in .45s ease both; }
    @keyframes oc-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }

    outfit-card { position: relative; }
    .oc-stage { position: relative; border-radius: 22px; overflow: hidden; aspect-ratio: 1 / 1;
      background: radial-gradient(120% 90% at 30% 20%, var(--sand-light) 0%, var(--sand) 60%, var(--sand-dark) 100%);
      display: flex; justify-content: center; align-items: flex-start; gap: 0; isolation: isolate; }
    .oc-stage::before { content: ""; position: absolute; left: 6%; right: 6%; top: 28px; height: 5px; border-radius: 3px; z-index: 0;
      background: linear-gradient(180deg, #4a4540, #151311 55%, #36312c); box-shadow: 0 8px 12px -5px rgba(60,40,10,.35); }
    .oc-stage img { position: relative; z-index: 1; width: auto; flex: none; margin: 0 -2%;
      filter: drop-shadow(6px 12px 10px rgba(70,45,15,.3)); transition: transform .5s cubic-bezier(.2,.8,.2,1); transform-origin: 50% 0; }
    outfit-card:hover .oc-stage img { transform: scale(1.02); }
    .oc-meta { display: flex; justify-content: space-between; gap: 16px; align-items: start; padding: 16px 4px 0; }
    .oc-title { font-family: var(--serif); font-size: clamp(24px, 2.2vw, 32px); line-height: 1.1; }
    .oc-note { font-size: 14px; color: var(--ink-soft); max-width: 24em; margin-top: 6px; }
    .oc-total { text-align: right; white-space: nowrap; }
    .oc-total b { font-variant-numeric: lining-nums; display: block; font-family: var(--serif); font-weight: 500; font-size: 24px; }
    .oc-add { margin-top: 8px; font-size: 11px; letter-spacing: .14em; text-transform: uppercase; font-weight: 400;
      border-bottom: 1px solid currentColor; padding-bottom: 2px; }
    .oc-add.done { opacity: .55; }`;

  class OutfitCard extends HTMLElement {
    connectedCallback() {
      const o = window.OUTFITS[+this.dataset.index];
      const items = o.items.map(window.byId);
      const total = items.reduce((s, p) => s + p.price, 0);
      const tallest = Math.max(...items.map(p => p.cm));
      this.innerHTML = `
        <div class="oc-stage">
          ${items.map(p => `<img src="${window.ASSETS}${p.id}_f.png" alt="${p.name}" style="--cm:${p.cm}" draggable="false">`).join('')}
        </div>
        <div class="oc-meta">
          <div><div class="oc-title">${o.title}</div><p class="oc-note">${o.note}</p></div>
          <div class="oc-total"><b>${window.money(total)}</b><button class="oc-add">Add look to bag</button></div>
        </div>`;
      const stage = this.querySelector('.oc-stage');
      const imgs = [...stage.querySelectorAll('img')];
      // one scale for the whole look (cm -> px) so that it fits the stage in height AND in width
      const fit = () => {
        const W = stage.clientWidth, H = stage.clientHeight;
        if (!W || !H || imgs.some(i => !i.naturalHeight)) return;
        const RAIL = 28, side = W * 0.06;
        const widthCm = imgs.reduce((sum, img) => sum + (+img.style.getPropertyValue('--cm')) * img.naturalWidth / img.naturalHeight, 0) * 0.96;
        // every card has the same square stage; each look is scaled as large as fits it, in width and in height
        const k = Math.min((W - 2 * side) / widthCm, (H - RAIL - 24) / (tallest * 1.02));
        imgs.forEach(img => {
          const ih = (+img.style.getPropertyValue('--cm')) * k;
          img.style.height = ih + 'px';
          // the hook apex sits ~1.5% of the image height below its top edge: lift it above the rail so the hook wraps over it
          img.style.marginTop = (RAIL - 3 - 0.015 * ih) + 'px';
        });
      };
      imgs.forEach(i => i.complete ? 0 : i.addEventListener('load', fit, { once: true }));
      fit(); new ResizeObserver(fit).observe(stage);
      const btn = this.querySelector('.oc-add');
      btn.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('bag:add', { detail: { look: o.title, items: o.items, total } }));
        btn.textContent = 'Added'; btn.classList.add('done');
        setTimeout(() => { btn.textContent = 'Add look to bag'; btn.classList.remove('done'); }, 1800);
      });
    }
  }

  class LookBook extends HTMLElement {
    connectedCallback() {
      if (!document.getElementById('css-look-book')) {
        const s = document.createElement('style'); s.id = 'css-look-book'; s.textContent = css; document.head.appendChild(s);
      }
      this.id = this.id || 'collections';
      const tags = [['all', 'All'], ['everyday', 'Everyday'], ['work', 'Work'], ['evening', 'Evening']];
      const count = t => t === 'all' ? window.OUTFITS.length : window.OUTFITS.filter(o => o.tag === t).length;
      this.innerHTML = `
        <div class="container">
          <div class="lb-head">
            <div><div class="eyebrow">Lookbook</div><h2>${window.OUTFITS.length} ways to<br>wear the capsule</h2></div>
            <p>Every piece goes with every other. These are the combinations we reach for first.</p>
          </div>
          <div class="lb-chips" role="group" aria-label="Filter looks">
            ${tags.map(([t, label], i) => `<button class="lb-chip" data-tag="${t}" aria-pressed="${i === 0}">${label}<small>${count(t)}</small></button>`).join('')}
          </div>
          <div class="lb-grid">${window.OUTFITS.map((_, i) => `<outfit-card data-index="${i}"></outfit-card>`).join('')}</div>
        </div>`;
      const chips = [...this.querySelectorAll('.lb-chip')];
      chips.forEach(c => c.addEventListener('click', () => {
        chips.forEach(x => x.setAttribute('aria-pressed', x === c));
        this.querySelectorAll('outfit-card').forEach(card => {
          const show = c.dataset.tag === 'all' || window.OUTFITS[+card.dataset.index].tag === c.dataset.tag;
          card.hidden = !show;
          card.classList.remove('fade-in');
          if (show) { void card.offsetWidth; card.classList.add('fade-in'); }
        });
      }));
    }
  }
  customElements.define('outfit-card', OutfitCard);
  customElements.define('look-book', LookBook);
})();
