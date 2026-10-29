/* <brand-story> — "About" block: statement, short text and three facts. */
(() => {
  const css = `
    brand-story { padding-top: clamp(72px, 10vw, 150px); }
    .bs { display: grid; grid-template-columns: 1.1fr 1fr; gap: clamp(32px, 6vw, 110px); align-items: start; }
    .bs h2 { font-family: var(--serif); font-weight: 400; font-size: clamp(38px, 5.4vw, 84px); line-height: 1.02; letter-spacing: -.01em; margin-top: 18px; }
    .bs h2 em { font-style: italic; color: var(--sand-dark); }
    .bs p { font-size: clamp(15px, 1.25vw, 18px); max-width: 34em; color: var(--ink-soft); }
    .bs p + p { margin-top: 1.1em; }
    .bs-facts { margin-top: clamp(28px, 3.4vw, 48px); display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--line); }
    .bs-fact { padding: 20px 16px 0 0; }
    .bs-fact b { font-variant-numeric: lining-nums; display: block; font-family: var(--serif); font-weight: 400; font-size: clamp(34px, 3.8vw, 56px); line-height: 1; color: var(--ink); }
    .bs-fact span { display: block; margin-top: 8px; font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: var(--ink-soft); font-weight: 400; }
    @media (max-width: 800px) { .bs { grid-template-columns: 1fr; } }`;

  class BrandStory extends HTMLElement {
    connectedCallback() {
      if (!document.getElementById('css-brand-story')) {
        const s = document.createElement('style'); s.id = 'css-brand-story'; s.textContent = css; document.head.appendChild(s);
      }
      this.id = this.id || 'about';
      const n = window.PRODUCTS.length;
      this.innerHTML = `
        <div class="container bs">
          <div>
            <div class="eyebrow">About the brand</div>
            <h2>${n} pieces.<br><em>One palette.</em></h2>
          </div>
          <div>
            <p>NOVEMBRE is a small autumn capsule: a trench, a blazer, a leather bomber and the quiet basics that go underneath. Everything is black, white, sand or denim, so every piece works with every other.</p>
            <p>We would rather make fewer things that last than many that do not. Open the wardrobe, pick a hanger, and you have the season sorted.</p>
            <div class="bs-facts">
              <div class="bs-fact"><b>${n}</b><span>Pieces</span></div>
              <div class="bs-fact"><b>4</b><span>Colours</span></div>
              <div class="bs-fact"><b>1</b><span>Season</span></div>
            </div>
          </div>
        </div>`;
    }
  }
  customElements.define('brand-story', BrandStory);
})();
