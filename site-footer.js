/* <site-footer> — delivery info, contacts, small print. */
(() => {
  const css = `
    site-footer { margin-top: clamp(64px, 9vw, 140px); background: var(--ink); color: var(--paper); }
    .sf { padding: clamp(48px, 6vw, 88px) 0 28px; }
    .sf-top { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: clamp(24px, 4vw, 64px); }
    .sf-logo { font-family: var(--serif); font-weight: 500; font-size: clamp(30px, 3.4vw, 48px); line-height: 1; }
    .sf-tag { margin-top: 14px; max-width: 22em; color: rgba(239,232,216,.65); }
    .sf h4 { font-size: 11px; letter-spacing: .18em; text-transform: uppercase; font-weight: 400; color: rgba(239,232,216,.55); margin-bottom: 16px; }
    .sf ul { list-style: none; display: grid; gap: 10px; font-size: 15px; }
    .sf a:hover { text-decoration: underline; text-underline-offset: 3px; }
    .sf-bottom { margin-top: clamp(40px, 6vw, 88px); padding-top: 20px; border-top: 1px solid rgba(239,232,216,.2);
      display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; font-size: 12px; color: rgba(239,232,216,.55); }
    @media (max-width: 860px) { .sf-top { grid-template-columns: 1fr 1fr; } .sf-brand { grid-column: 1 / -1; } }`;

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      if (!document.getElementById('css-site-footer')) {
        const s = document.createElement('style'); s.id = 'css-site-footer'; s.textContent = css; document.head.appendChild(s);
      }
      this.innerHTML = `
        <div class="container sf">
          <div class="sf-top">
            <div class="sf-brand">
              <div class="sf-logo">NOVEMBRE</div>
              <p class="sf-tag">Nine autumn pieces in black, white and sand. Made to be worn for years, not weeks.</p>
            </div>
            <div id="delivery">
              <h4>Delivery</h4>
              <ul><li>Free over €150</li><li>2–4 working days</li><li>30-day returns</li></ul>
            </div>
            <div>
              <h4>Shop</h4>
              <ul><li><a href="#shop">The capsule</a></li><li><a href="#collections">Outfits</a></li><li><a href="#about">About</a></li></ul>
            </div>
            <div id="contact">
              <h4>Contact</h4>
              <ul><li><a href="mailto:hello@novembre.example">hello@novembre.example</a></li><li>Kyiv, Ukraine</li><li>Mon–Fri, 10:00–18:00</li></ul>
            </div>
          </div>
          <div class="sf-bottom"><span>© 2026 NOVEMBRE</span><span>Demo page — products and prices are placeholders</span></div>
        </div>`;
    }
  }
  customElements.define('site-footer', SiteFooter);
})();
