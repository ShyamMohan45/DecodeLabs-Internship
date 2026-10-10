/**
 * NOVA E-Commerce — Wishlist Controller
 * Renders saved items, allows direct move-to-cart, remove-from-wishlist,
 * and bulk move-all-to-cart.
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('wishlist-grid');
  const countEl = document.getElementById('wishlist-count-header');
  const emptyState = document.getElementById('wishlist-empty-state');
  const fullView = document.getElementById('wishlist-full-view');
  const moveAllBtn = document.getElementById('wishlist-move-all-btn');

  if (!container) return;

  function renderWishlist() {
    const itemIds = getWishlist();
    const products = itemIds.map(id => getProductById(id)).filter(Boolean);

    if (countEl) {
      countEl.textContent = `${products.length} ${products.length === 1 ? 'saved item' : 'saved items'}`;
    }

    if (products.length === 0) {
      if (fullView) fullView.style.display = 'none';
      if (emptyState) emptyState.style.display = 'flex';
      return;
    }

    if (fullView) fullView.style.display = 'block';
    if (emptyState) emptyState.style.display = 'none';

    container.innerHTML = products.map(product => {
      const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

      return `
        <article class="wishlist-item-card" data-id="${product.id}">
          <div class="wishlist-item-media">
            <a href="product.html?id=${product.id}">
              <img src="${product.mainImage}" alt="${product.name}" />
            </a>
            <button type="button" class="wishlist-remove-icon-btn" data-remove-wishlist="${product.id}" title="Remove from wishlist" aria-label="Remove from wishlist">
              &times;
            </button>
          </div>

          <div class="wishlist-item-body">
            <span class="product-card__category">${product.category}</span>
            <h3 class="wishlist-item-title">
              <a href="product.html?id=${product.id}">${product.name}</a>
            </h3>

            <div class="product-card__price-row" style="margin-bottom: 1rem;">
              <span class="product-card__price">${formatPrice(product.price)}</span>
              ${product.originalPrice > product.price ? `
                <span class="product-card__original-price">${formatPrice(product.originalPrice)}</span>
                <span class="product-card__discount">${discountPercent}% OFF</span>
              ` : ''}
            </div>

            <div class="wishlist-card-actions">
              <button type="button" class="btn btn--primary btn--sm btn--block wishlist-move-to-cart-btn" data-move-id="${product.id}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                Move to Cart
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach button listeners
    container.querySelectorAll('[data-remove-wishlist]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.removeWishlist;
        removeFromWishlist(id);
        renderWishlist();
        showToast('Item removed from wishlist.', 'info');
      });
    });

    container.querySelectorAll('.wishlist-move-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.moveId;
        addToCart(id, 1);
        removeFromWishlist(id);
        renderWishlist();
      });
    });
  }

  // Move all to cart
  if (moveAllBtn) {
    moveAllBtn.addEventListener('click', () => {
      const itemIds = getWishlist();
      if (itemIds.length === 0) return;

      itemIds.forEach(id => {
        addToCart(id, 1);
      });
      saveWishlist([]);
      renderWishlist();
      showToast('All items moved to your shopping cart.', 'success', 'Cart Updated');
    });
  }

  renderWishlist();

  // Listen for external updates
  window.addEventListener('nova:wishlistUpdated', renderWishlist);
});
