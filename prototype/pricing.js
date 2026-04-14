// Shared pricing modal — injected on first use
(function () {
  let injected = false;

  function inject() {
    const html = `
      <div id="pricingModal" class="modal-backdrop hidden" onclick="if (event.target === this) closePricing()">
        <div class="modal pricing-modal">
          <button class="modal__close" onclick="closePricing()">✕</button>
          <div style="text-align:center; margin-bottom:24px;">
            <h2 style="font-size:22px; margin-bottom:6px;">⚡ Top up credits</h2>
            <p class="sub" style="font-size:13px;">Generate more creatives, faster. Credits never expire.</p>
          </div>

          <div class="pricing-grid">
            <div class="pricing-card">
              <div class="pricing-card__name">Starter</div>
              <div class="pricing-card__price">$10</div>
              <div class="pricing-card__credits">100 credits</div>
              <div class="pricing-card__perk">~$0.10 / credit</div>
              <button class="btn btn--ghost pricing-card__cta" onclick="buyPack('Starter')">Buy</button>
            </div>
            <div class="pricing-card pricing-card--popular">
              <div class="pricing-card__badge">Most popular</div>
              <div class="pricing-card__name">Growth</div>
              <div class="pricing-card__price">$45</div>
              <div class="pricing-card__credits">500 credits</div>
              <div class="pricing-card__perk">~$0.09 / credit · Save 10%</div>
              <button class="btn btn--primary pricing-card__cta" onclick="buyPack('Growth')">Buy</button>
            </div>
            <div class="pricing-card">
              <div class="pricing-card__name">Pro</div>
              <div class="pricing-card__price">$80</div>
              <div class="pricing-card__credits">1,000 credits</div>
              <div class="pricing-card__perk">~$0.08 / credit · Save 20%</div>
              <button class="btn btn--ghost pricing-card__cta" onclick="buyPack('Pro')">Buy</button>
            </div>
            <div class="pricing-card">
              <div class="pricing-card__name">Business</div>
              <div class="pricing-card__price">$299</div>
              <div class="pricing-card__credits">5,000 credits</div>
              <div class="pricing-card__perk">~$0.06 / credit · Save 40%</div>
              <button class="btn btn--ghost pricing-card__cta" onclick="buyPack('Business')">Buy</button>
            </div>
          </div>

          <div class="pricing-footer">
            <span>💡 1 image ≈ 4 credits · 1 video ≈ 20 credits</span>
            <span>·</span>
            <a href="#">Enterprise? Talk to sales →</a>
          </div>
        </div>
      </div>
    `;
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    document.body.appendChild(wrap.firstElementChild);
    injected = true;
  }

  window.openPricing = function () {
    if (!injected) inject();
    document.getElementById('pricingModal').classList.remove('hidden');
  };
  window.closePricing = function () {
    const m = document.getElementById('pricingModal');
    if (m) m.classList.add('hidden');
  };
  window.buyPack = function (pack) {
    alert('Purchasing ' + pack + ' pack — coming soon. Redirecting to checkout…');
    window.closePricing();
  };
})();
