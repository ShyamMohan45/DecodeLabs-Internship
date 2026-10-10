/**
 * NOVA E-Commerce — Checkout Controller
 * Validates shipping addresses, manages simulated Cash on Delivery,
 * generates unique demo orders, stores orders in localStorage,
 * and clears cart on successful placement.
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkout-form');
  const summaryItems = document.getElementById('checkout-items-summary');
  const emptyGuard = document.getElementById('checkout-empty-guard');
  const checkoutLayout = document.getElementById('checkout-layout');

  if (!form) return;

  const calc = getCartCalculation();

  // Guard against empty cart checkout
  if (calc.items.length === 0) {
    if (checkoutLayout) checkoutLayout.style.display = 'none';
    if (emptyGuard) emptyGuard.style.display = 'flex';
    return;
  }

  if (checkoutLayout) checkoutLayout.style.display = 'grid';
  if (emptyGuard) emptyGuard.style.display = 'none';

  // Pre-fill user data if available
  const user = getUser();
  if (user) {
    if (document.getElementById('checkout-name')) document.getElementById('checkout-name').value = user.name || '';
    if (document.getElementById('checkout-email')) document.getElementById('checkout-email').value = user.email || '';
    if (document.getElementById('checkout-phone')) document.getElementById('checkout-phone').value = user.phone || '';
    if (document.getElementById('checkout-address')) document.getElementById('checkout-address').value = user.address || '';
    if (document.getElementById('checkout-city')) document.getElementById('checkout-city').value = user.city || '';
    if (document.getElementById('checkout-state')) document.getElementById('checkout-state').value = user.state || 'Karnataka';
    if (document.getElementById('checkout-postal')) document.getElementById('checkout-postal').value = user.postalCode || '';
  }

  // Render items in order summary sidebar
  if (summaryItems) {
    summaryItems.innerHTML = calc.items.map(item => `
      <div class="checkout-review-item">
        <div class="checkout-review-thumb-wrap">
          <img src="${item.product.mainImage}" alt="${item.product.name}" class="checkout-review-thumb" />
          <span class="checkout-review-qty">${item.quantity}</span>
        </div>
        <div class="checkout-review-details">
          <h4 class="checkout-review-title">${item.product.name}</h4>
          <span class="checkout-review-variant">
            ${[item.selectedColor, item.selectedSize].filter(Boolean).join(' &bull; ')}
          </span>
        </div>
        <div class="checkout-review-price">
          ${formatPrice(item.itemSubtotal)}
        </div>
      </div>
    `).join('');
  }

  // Render totals in summary
  const subtotalEl = document.getElementById('checkout-subtotal');
  const shippingEl = document.getElementById('checkout-shipping');
  const totalEl = document.getElementById('checkout-total');

  if (subtotalEl) subtotalEl.textContent = formatPrice(calc.subtotal);
  if (shippingEl) shippingEl.textContent = calc.shippingFee === 0 ? 'FREE' : formatPrice(calc.shippingFee);
  if (totalEl) totalEl.textContent = formatPrice(calc.total);

  // Form submission handling
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateCheckoutForm()) {
      showToast('Please correct the highlighted fields.', 'error', 'Validation Error');
      return;
    }

    const name = document.getElementById('checkout-name').value.trim();
    const email = document.getElementById('checkout-email').value.trim();
    const phone = document.getElementById('checkout-phone').value.trim();
    const address = document.getElementById('checkout-address').value.trim();
    const city = document.getElementById('checkout-city').value.trim();
    const state = document.getElementById('checkout-state').value.trim();
    const postalCode = document.getElementById('checkout-postal').value.trim();

    // Generate unique order ID
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `NOV-${randomNum}`;

    const orderData = {
      id: orderId,
      date: new Date().toISOString(),
      status: "Processing",
      paymentMethod: "Cash on Delivery (Demo)",
      subtotal: calc.subtotal,
      shippingFee: calc.shippingFee,
      total: calc.total,
      shippingAddress: {
        name,
        email,
        phone,
        address,
        city,
        state,
        postalCode
      },
      items: calc.items.map(i => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        selectedColor: i.selectedColor,
        selectedSize: i.selectedSize,
        image: i.product.mainImage
      }))
    };

    // Save order and clear cart
    saveOrder(orderData);
    clearCart();

    // Show toast and redirect
    showToast('Your order has been confirmed successfully!', 'success', 'Order Confirmed');
    setTimeout(() => {
      window.location.href = `order-success.html?orderId=${orderId}`;
    }, 600);
  });

  function validateCheckoutForm() {
    let isValid = true;

    const fields = [
      { id: 'checkout-name', validator: val => val.length >= 3 },
      { id: 'checkout-email', validator: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) },
      { id: 'checkout-phone', validator: val => /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(val.replace(/\s+/g, '')) || val.length >= 10 },
      { id: 'checkout-address', validator: val => val.length >= 6 },
      { id: 'checkout-city', validator: val => val.length >= 2 },
      { id: 'checkout-state', validator: val => val.length >= 2 },
      { id: 'checkout-postal', validator: val => /^\d{6}$/.test(val) || val.length >= 5 }
    ];

    fields.forEach(({ id, validator }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const val = el.value.trim();
      const parent = el.closest('.form-group');
      if (!validator(val)) {
        el.classList.add('is-invalid');
        isValid = false;
      } else {
        el.classList.remove('is-invalid');
      }
    });

    return isValid;
  }
});
