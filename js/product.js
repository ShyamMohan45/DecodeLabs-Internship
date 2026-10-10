/**
 * NOVA E-Commerce — Product Details Controller
 * Handles dynamic product loading, gallery switcher, zoom preview,
 * color & size selection, quantity management, add-to-cart, buy-now,
 * specifications table, and related products rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('product-details-container');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  const product = getProductById(productId);

  if (!product) {
    renderNotFound(container);
    return;
  }

  // Update document title
  document.title = `${product.name} — NOVA`;

  // Render product details
  renderProductDetails(container, product);
  renderRelatedProducts(product);
});

function renderNotFound(container) {
  container.innerHTML = `
    <div class="empty-state" style="padding-block: 6rem;">
      <div class="empty-state-icon">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
      </div>
      <h2 class="empty-state-title">Product Not Found</h2>
      <p class="empty-state-desc">The item you are looking for might have been discontinued, relocated, or does not exist.</p>
      <a href="shop.html" class="btn btn--primary" style="margin-top: 1rem;">Explore Full Collection</a>
    </div>
  `;
}

function renderProductDetails(container, product) {
  const isWishlisted = isInWishlist(product.id);
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  container.innerHTML = `
    <!-- Breadcrumbs -->
    <nav class="breadcrumb-nav" aria-label="Breadcrumb">
      <ol class="breadcrumb-list">
        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
        <li class="breadcrumb-separator">/</li>
        <li class="breadcrumb-item"><a href="shop.html">Shop</a></li>
        <li class="breadcrumb-separator">/</li>
        <li class="breadcrumb-item"><a href="shop.html?category=${product.category}">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</a></li>
        <li class="breadcrumb-separator">/</li>
        <li class="breadcrumb-item is-current" aria-current="page">${product.name}</li>
      </ol>
    </nav>

    <div class="product-details-grid">
      <!-- Media Gallery -->
      <div class="product-gallery">
        <div class="product-gallery__main-wrap">
          <img src="${product.mainImage}" alt="${product.name}" id="main-product-image" class="product-gallery__main-image" />
          ${product.badge ? `<span class="product-card__badge product-card__badge--${product.badge.toLowerCase()}">${product.badge}</span>` : ''}
        </div>

        <div class="product-gallery__thumbnails">
          ${product.images.map((img, i) => `
            <button type="button" class="product-gallery__thumb ${i === 0 ? 'is-active' : ''}" data-thumb-src="${img}" aria-label="View photo ${i + 1}">
              <img src="${img}" alt="${product.name} thumbnail ${i + 1}" />
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Info & Actions -->
      <div class="product-info-column">
        <div class="product-info-meta">
          <span class="product-info-category">${product.category.toUpperCase()}</span>
          <div class="product-info-rating">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#C48B64" stroke="#C48B64"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <strong>${product.rating}</strong>
            <span class="text-muted">(${product.reviewsCount} customer reviews)</span>
          </div>
        </div>

        <h1 class="product-info-title">${product.name}</h1>

        <div class="product-info-price-row">
          <span class="product-info-price">${formatPrice(product.price)}</span>
          ${product.originalPrice > product.price ? `
            <span class="product-info-original-price">${formatPrice(product.originalPrice)}</span>
            <span class="product-info-discount-badge">${discountPercent}% OFF</span>
          ` : ''}
        </div>

        <p class="product-info-desc">${product.description}</p>

        <!-- Variants -->
        <div class="product-variants-form">
          ${product.colors ? `
            <div class="variant-group">
              <div class="variant-label-row">
                <span class="variant-label">Selected Color:</span>
                <span class="variant-selection-text" id="selected-color-label">${product.colors[0].name}</span>
              </div>
              <div class="variant-options-list">
                ${product.colors.map((c, i) => `
                  <button type="button" 
                          class="variant-color-btn ${i === 0 ? 'is-selected' : ''}" 
                          style="background-color: ${c.hex};" 
                          data-color-name="${c.name}"
                          title="${c.name}">
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${product.sizes ? `
            <div class="variant-group">
              <div class="variant-label-row">
                <span class="variant-label">Selected Size / Dimensions:</span>
                <span class="variant-selection-text" id="selected-size-label">${product.sizes[0]}</span>
              </div>
              <div class="variant-options-list">
                ${product.sizes.map((s, i) => `
                  <button type="button" 
                          class="variant-size-btn ${i === 0 ? 'is-selected' : ''}" 
                          data-size-name="${s}">
                    ${s}
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Quantity & CTAs -->
          <div class="product-actions-group">
            <div class="qty-control-wrap">
              <span class="variant-label" style="margin-bottom: 0.35rem; display: block;">Quantity</span>
              <div class="qty-counter">
                <button type="button" class="qty-btn" id="pd-qty-minus" aria-label="Decrease quantity">-</button>
                <input type="number" id="pd-qty-input" value="1" min="1" max="${product.inStock}" readonly />
                <button type="button" class="qty-btn" id="pd-qty-plus" aria-label="Increase quantity">+</button>
              </div>
            </div>

            <div class="buttons-stack">
              <div class="primary-buttons-row">
                <button type="button" class="btn btn--primary btn--lg" id="pd-add-to-cart-btn" style="flex: 1;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                  Add to Cart
                </button>
                
                <button type="button" class="pd-wishlist-toggle-btn ${isWishlisted ? 'is-active' : ''}" id="pd-wishlist-btn" aria-label="Wishlist toggle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </button>
              </div>

              <button type="button" class="btn btn--accent btn--lg" id="pd-buy-now-btn">
                Instant Buy Now &bull; Cash on Delivery
              </button>
            </div>
          </div>
        </div>

        <!-- Trust Badges & Delivery Highlights -->
        <div class="product-perks-box">
          <div class="perk-row">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
            <div>
              <strong>Complimentary Express Shipping</strong>
              <p>Free tracked courier shipping on all orders above ₹5,000</p>
            </div>
          </div>
          <div class="perk-row">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
            <div>
              <strong>30-Day Hassle-Free Exchange</strong>
              <p>Complimentary doorstep reverse pickups nationwide</p>
            </div>
          </div>
          <div class="perk-row">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <div>
              <strong>Certified Authentic & 2-Year Warranty</strong>
              <p>Direct manufacturer guarantee on craftsmanship and materials</p>
            </div>
          </div>
        </div>

        <!-- Specifications & Details Accordion / Tabs -->
        <div class="product-specs-card">
          <h4 style="margin-bottom: 1rem;">Product Specifications</h4>
          <table class="specs-table">
            <tbody>
              ${Object.entries(product.specs).map(([key, val]) => `
                <tr>
                  <th>${key}</th>
                  <td>${val}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div style="margin-top: 1.5rem;">
            <h5 style="margin-bottom: 0.6rem; font-size: 0.95rem;">Highlights & Craftsmanship</h5>
            <ul class="specs-bullet-list">
              ${product.details.map(d => `<li>${d}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach Gallery event listeners
  const mainImage = container.querySelector('#main-product-image');
  const thumbs = container.querySelectorAll('.product-gallery__thumb');
  thumbs.forEach(btn => {
    btn.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('is-active'));
      btn.classList.add('is-active');
      mainImage.src = btn.dataset.thumbSrc;
    });
  });

  // Color selection
  let selectedColor = product.colors ? product.colors[0].name : null;
  const colorBtns = container.querySelectorAll('.variant-color-btn');
  const colorLabel = container.querySelector('#selected-color-label');
  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      colorBtns.forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      selectedColor = btn.dataset.colorName;
      if (colorLabel) colorLabel.textContent = selectedColor;
    });
  });

  // Size selection
  let selectedSize = product.sizes ? product.sizes[0] : null;
  const sizeBtns = container.querySelectorAll('.variant-size-btn');
  const sizeLabel = container.querySelector('#selected-size-label');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      selectedSize = btn.dataset.sizeName;
      if (sizeLabel) sizeLabel.textContent = selectedSize;
    });
  });

  // Quantity controls
  const qtyInput = container.querySelector('#pd-qty-input');
  container.querySelector('#pd-qty-minus').addEventListener('click', () => {
    let q = parseInt(qtyInput.value) || 1;
    if (q > 1) qtyInput.value = q - 1;
  });
  container.querySelector('#pd-qty-plus').addEventListener('click', () => {
    let q = parseInt(qtyInput.value) || 1;
    if (q < product.inStock) qtyInput.value = q + 1;
  });

  // Add to cart
  container.querySelector('#pd-add-to-cart-btn').addEventListener('click', () => {
    const qty = parseInt(qtyInput.value) || 1;
    addToCart(product.id, qty, selectedColor, selectedSize);
  });

  // Buy now
  container.querySelector('#pd-buy-now-btn').addEventListener('click', () => {
    const qty = parseInt(qtyInput.value) || 1;
    addToCart(product.id, qty, selectedColor, selectedSize);
    window.location.href = 'checkout.html';
  });

  // Wishlist toggle
  const wishlistBtn = container.querySelector('#pd-wishlist-btn');
  wishlistBtn.addEventListener('click', () => {
    const isNowWishlisted = toggleWishlist(product.id);
    wishlistBtn.classList.toggle('is-active', isNowWishlisted);
    const svg = wishlistBtn.querySelector('svg');
    if (svg) svg.setAttribute('fill', isNowWishlisted ? 'currentColor' : 'none');
  });
}

function renderRelatedProducts(currentProduct) {
  const relatedGrid = document.getElementById('related-products-grid');
  if (!relatedGrid) return;

  // Find other products in same category or fallback
  let related = getAllProducts()
    .filter(p => p.id !== currentProduct.id && p.category === currentProduct.category)
    .slice(0, 4);

  if (related.length < 4) {
    const others = getAllProducts().filter(p => p.id !== currentProduct.id && !related.includes(p));
    related = [...related, ...others].slice(0, 4);
  }

  relatedGrid.innerHTML = related.map(p => createProductCardHTML(p)).join('');
}
