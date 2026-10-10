/**
 * NOVA E-Commerce — Shopping Cart Controller
 * Handles cart item rendering, dynamic quantity increment/decrement,
 * line removal, promotional discount codes, shipping tier calculation,
 * and localStorage sync.
 */

document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.getElementById('cart-items-container');
  const summaryContainer = document.getElementById('cart-summary-container');
  const emptyState = document.getElementById('cart-empty-state');
  const fullCartView = document.getElementById('cart-full-view');

  if (!cartContainer) return;

  // Promo code state
  let appliedDiscountRate = 0; // 0.10 for 10%
  let appliedPromoCode = '';

  function renderCart() {
    const calc = getCartCalculation();

    if (calc.items.length === 0) {
      if (fullCartView) fullCartView.style.display = 'none';
      if (emptyState) emptyState.style.display = 'flex';
      return;
    }

    if (fullCartView) fullCartView.style.display = 'grid';
    if (emptyState) emptyState.style.display = 'none';

    // 1. Render items list
    cartContainer.innerHTML = calc.items.map((item) => {
      return `
        <article class="cart-item" data-cart-index="${item.index}">
          <a href="product.html?id=${item.product.id}" class="cart-item__media">
            <img src="${item.product.mainImage}" alt="${item.product.name}" />
          </a>

          <div class="cart-item__info">
            <div class="cart-item__header">
              <span class="cart-item__category">${item.product.category}</span>
              <h3 class="cart-item__title">
                <a href="product.html?id=${item.product.id}">${item.product.name}</a>
              </h3>
            </div>

            <div class="cart-item__variants">
              ${item.selectedColor ? `<span class="cart-variant-pill">Color: <strong>${item.selectedColor}</strong></span>` : ''}
              ${item.selectedSize ? `<span class="cart-variant-pill">Size: <strong>${item.selectedSize}</strong></span>` : ''}
            </div>

            <div class="cart-item__price-mobile">
              ${formatPrice(item.product.price)}
            </div>

            <div class="cart-item__actions-row">
              <div class="qty-counter">
                <button type="button" class="qty-btn cart-qty-minus" data-idx="${item.index}" aria-label="Decrease quantity">-</button>
                <input type="number" value="${item.quantity}" min="1" max="${item.product.inStock}" readonly />
                <button type="button" class="qty-btn cart-qty-plus" data-idx="${item.index}" aria-label="Increase quantity">+</button>
              </div>

              <button type="button" class="cart-item__remove-btn" data-remove-idx="${item.index}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x1="11" x2="10" y2="17"/><line x1="14" x1="11" x2="14" y2="17"/></svg>
                Remove
              </button>
            </div>
          </div>

          <div class="cart-item__total-col">
            <div class="cart-item__total-price">${formatPrice(item.itemSubtotal)}</div>
            <div class="cart-item__unit-price">${formatPrice(item.product.price)} each</div>
          </div>
        </article>
      `;
    }).join('');

    // 2. Render Order Summary
    const discountAmount = Math.round(calc.subtotal * appliedDiscountRate);
    const finalTotal = calc.subtotal - discountAmount + calc.shippingFee;
    const amountToFreeShipping = Math.max(0, calc.shippingThreshold - calc.subtotal);
    const shippingProgress = Math.min(100, Math.round((calc.subtotal / calc.shippingThreshold) * 100));

    if (summaryContainer) {
      summaryContainer.innerHTML = `
        <div class="order-summary-card">
          <h3 class="summary-title">Order Summary</h3>

          <!-- Free Shipping Progress -->
          <div class="shipping-threshold-box">
            <div class="shipping-progress-text">
              ${amountToFreeShipping > 0 
                ? `Add <strong>${formatPrice(amountToFreeShipping)}</strong> more to get <strong>Free Express Shipping</strong>` 
                : `<span style="color: var(--color-success); font-weight: 600;">You unlocked Complimentary Express Shipping!</span>`}
            </div>
            <div class="shipping-progress-bar">
              <div class="shipping-progress-fill" style="width: ${shippingProgress}%;"></div>
            </div>
          </div>

          <!-- Promo Code Input -->
          <div class="promo-box">
            <label class="form-label" style="font-size: 0.775rem;">Discount Code</label>
            <div class="promo-input-group">
              <input type="text" id="promo-input" class="form-input" placeholder="e.g. NOVA10" value="${appliedPromoCode}" ${appliedDiscountRate > 0 ? 'disabled' : ''} />
              ${appliedDiscountRate > 0 ? `
                <button type="button" class="btn btn--secondary btn--sm" id="promo-remove-btn">Remove</button>
              ` : `
                <button type="button" class="btn btn--primary btn--sm" id="promo-apply-btn">Apply</button>
              `}
            </div>
            ${appliedDiscountRate > 0 ? `
              <span style="font-size: 0.775rem; color: var(--color-success); margin-top: 0.35rem; display: block;">10% promotional discount applied.</span>
            ` : `
              <span style="font-size: 0.725rem; color: var(--text-muted); margin-top: 0.25rem; display: block;">Use coupon code <strong>NOVA10</strong> for 10% off.</span>
            `}
          </div>

          <!-- Line totals -->
          <div class="summary-lines">
            <div class="summary-line">
              <span>Subtotal (${calc.count} items)</span>
              <span>${formatPrice(calc.subtotal)}</span>
            </div>

            ${appliedDiscountRate > 0 ? `
              <div class="summary-line text-accent">
                <span>Promotional Discount (10%)</span>
                <span>-${formatPrice(discountAmount)}</span>
              </div>
            ` : ''}

            <div class="summary-line">
              <span>Estimated Shipping</span>
              <span>${calc.shippingFee === 0 ? '<strong style="color: var(--color-success);">FREE</strong>' : formatPrice(calc.shippingFee)}</span>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-line summary-line--total">
              <span>Total Amount</span>
              <span class="summary-total-price">${formatPrice(finalTotal)}</span>
            </div>
            <div style="font-size: 0.75rem; color: var(--text-muted); text-align: right; margin-top: -0.25rem;">Includes all applicable taxes</div>
          </div>

          <!-- Checkout Button -->
          <a href="checkout.html" class="btn btn--primary btn--lg btn--block" style="margin-top: 1.5rem;">
            Proceed to Checkout &bull; ${formatPrice(finalTotal)}
          </a>

          <a href="shop.html" class="btn btn--secondary btn--block" style="margin-top: 0.75rem;">
            Continue Shopping
          </a>

          <!-- Payment methods notice -->
          <div class="summary-guarantee-note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
            <span>Secured Cash on Delivery & Express Courier Delivery</span>
          </div>
        </div>
      `;

      // Bind Promo code button
      const promoBtn = summaryContainer.querySelector('#promo-apply-btn');
      const promoRemoveBtn = summaryContainer.querySelector('#promo-remove-btn');
      const promoInput = summaryContainer.querySelector('#promo-input');

      if (promoBtn && promoInput) {
        promoBtn.addEventListener('click', () => {
          const code = promoInput.value.trim().toUpperCase();
          if (code === 'NOVA10') {
            appliedDiscountRate = 0.10;
            appliedPromoCode = 'NOVA10';
            showToast('Coupon NOVA10 applied! 10% discount added.', 'success', 'Discount Applied');
            renderCart();
          } else if (!code) {
            showToast('Please enter a coupon code.', 'warning');
          } else {
            showToast('Invalid coupon code. Try "NOVA10"', 'error');
          }
        });
      }

      if (promoRemoveBtn) {
        promoRemoveBtn.addEventListener('click', () => {
          appliedDiscountRate = 0;
          appliedPromoCode = '';
          showToast('Coupon removed.', 'info');
          renderCart();
        });
      }
    }

    // Attach listeners for Qty +/- and Remove
    cartContainer.querySelectorAll('.cart-qty-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx);
        const cart = getCart();
        if (cart[idx]) {
          updateCartQuantity(idx, cart[idx].quantity - 1);
          renderCart();
        }
      });
    });

    cartContainer.querySelectorAll('.cart-qty-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx);
        const cart = getCart();
        if (cart[idx]) {
          const product = getProductById(cart[idx].productId);
          if (cart[idx].quantity < (product ? product.inStock : 99)) {
            updateCartQuantity(idx, cart[idx].quantity + 1);
            renderCart();
          } else {
            showToast('Maximum available stock reached for this item.', 'warning');
          }
        }
      });
    });

    cartContainer.querySelectorAll('.cart-item__remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.removeIdx);
        removeFromCart(idx);
        renderCart();
      });
    });
  }

  // Initial render
  renderCart();

  // Listen for global cart updates
  window.addEventListener('nova:cartUpdated', renderCart);
});
