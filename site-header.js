/* <site-header> — sticky top bar: logo, navigation, search, bag. Mobile: nav folds into a Menu button. */
(() => {
  const css = `
    site-header { position: sticky; top: 0; z-index: 100;
      background: color-mix(in srgb, #e8e0cc 78%, transparent); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }
    .sh { height: var(--header-h); display: flex; align-items: center; justify-content: space-between; gap: 24px;
      border-bottom: 1px solid var(--line); }
    .sh-logo { font-family: var(--serif); font-weight: 500; font-size: clamp(24px, 2.4vw, 34px); letter-spacing: .02em; line-height: 1; }
    .sh-nav { display: flex; gap: clamp(18px, 2.6vw, 40px); font-size: 12px; letter-spacing: .1em; text-transform: uppercase; font-weight: 400; }
    .sh-nav a { position: relative; padding: 6px 0; }
    .sh-nav a::after { content: ""; position: absolute; left: 0; right: 100%; bottom: 0; height: 1px; background: currentColor; transition: right .3s ease; }
    .sh-nav a:hover::after { right: 0; }
    .sh-tools { display: flex; gap: 6px; align-items: center; }
    .sh-icon { width: 40px; height: 40px; display: grid; place-items: center; border-radius: 50%; transition: background .2s; position: relative; }
    .sh-icon:hover { background: rgba(42,29,18,.08); }
    .sh-icon svg { width: 20px; height: 20px; stroke: currentColor; fill: none; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }
    .sh-count { position: absolute; top: 4px; right: 3px; min-width: 16px; height: 16px; padding: 0 4px; border-radius: 8px;
      background: var(--ink); color: var(--paper); font-size: 10px; line-height: 16px; text-align: center; font-weight: 400; }
    .sh-count[hidden] { display: none; }
    .sh-menu { display: none; font-size: 12px; letter-spacing: .1em; text-transform: uppercase; font-weight: 400; }
    @media (max-width: 760px) {
      .sh-menu { display: block; }
      .sh-nav { position: absolute; top: var(--header-h); left: 0; right: 0; flex-direction: column; gap: 0;
        background: #e8e0cc; border-bottom: 1px solid var(--line); padding: 8px var(--gutter) 16px;
        display: none; }
      .sh-nav a { padding: 14px 0; border-bottom: 1px solid var(--line); }
      site-header.open .sh-nav { display: flex; }
    }`;

  class SiteHeader extends HTMLElement {
    connectedCallback() {
      if (!document.getElementById('css-site-header')) {
        const s = document.createElement('style'); s.id = 'css-site-header'; s.textContent = css; document.head.appendChild(s);
      }
      this.innerHTML = `
        <div class="container sh">
          <button class="sh-menu" aria-label="Menu" aria-expanded="false">Menu</button>
          <a class="sh-logo" href="#top" aria-label="NOVEMBRE">NOVEMBRE</a>
          <nav class="sh-nav" aria-label="Main">
            <a href="#shop">Shop</a>
            <a href="#collections">Collections</a>
            <a href="#about">About</a>
            <a href="#delivery">Delivery</a>
            <a href="#contact">Contact</a>
          </nav>
          <div class="sh-tools">
            <button class="sh-icon" aria-label="Search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg></button>
            <button class="sh-icon" aria-label="Bag"><svg viewBox="0 0 24 24"><path d="M5.5 8.5h13l-1 11h-11z"/><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5"/></svg><span class="sh-count" hidden>0</span></button>
          </div>
        </div>`;
      const btn = this.querySelector('.sh-menu');
      btn.addEventListener('click', () => { const o = this.classList.toggle('open'); btn.setAttribute('aria-expanded', o); });
      this.querySelectorAll('.sh-nav a').forEach(a => a.addEventListener('click', () => this.classList.remove('open')));
      // other components can tell the header that something was added to the bag
      this._count = 0;
      document.addEventListener('bag:add', () => {
        const c = this.querySelector('.sh-count'); c.hidden = false; c.textContent = ++this._count;
      });
    }
  }
  customElements.define('site-header', SiteHeader);
})();
