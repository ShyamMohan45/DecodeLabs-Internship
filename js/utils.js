/**
 * NOVA E-Commerce — Utility Functions & State Store
 * Handles localStorage persistence, currency formatting, toast notifications,
 * cart & wishlist state management, user session simulation, and modal helpers.
 */

// LocalStorage Keys
const STORAGE_KEYS = {
  CART: 'nova_cart_v1',
  WISHLIST: 'nova_wishlist_v1',
  USER: 'nova_user_session_v1',
  ORDERS: 'nova_orders_v1'
};

// -------------------------------------------------------------
// Currency & Formatting Helpers
// -------------------------------------------------------------
function formatPrice(amount) {
  if (typeof amount !== 'number') amount = Number(amount) || 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

function formatDate(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

// -------------------------------------------------------------
// Toast Notification System
// -------------------------------------------------------------
function showToast(message, type = 'info', title = '') {
  let container = document.getElementById('nova-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'nova-toast-container';
    container.className = 'nova-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `nova-toast nova-toast--${type} animate-slide-in-right`;

  const icons = {
    success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
    error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
    info: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
    warning: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`
  };

  const defaultTitles = {
    success: 'Success',
    error: 'Notice',
    info: 'Information',
    warning: 'Warning'
  };

  toast.innerHTML = `
    <div class="toast-icon">${icons[type] || icons.info}</div>
    <div class="toast-body">
      <div class="toast-title">${title || defaultTitles[type]}</div>
      <div class="toast-msg">${message}</div>
    </div>
    <button class="toast-close" aria-label="Close notification">&times;</button>
  `;

  container.appendChild(toast);

  const removeToast = () => {
    toast.classList.remove('animate-slide-in-right');
    toast.classList.add('animate-fade-out');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  };

  toast.querySelector('.toast-close').addEventListener('click', removeToast);

  setTimeout(removeToast, 4000);
}

// -------------------------------------------------------------
// Cart Management
// -------------------------------------------------------------
function getCart() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CART);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading cart from localStorage', e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    updateHeaderCounters();
    window.dispatchEvent(new CustomEvent('nova:cartUpdated', { detail: { cart } }));
  } catch (e) {
    console.error('Error saving cart to localStorage', e);
  }
}

function addToCart(productId, quantity = 1, color = null, size = null) {
  const product = getProductById(productId);
  if (!product) {
    showToast('Product not found', 'error');
    return false;
  }

  const cart = getCart();
  const selectedColor = color || (product.colors && product.colors[0] ? product.colors[0].name : null);
  const selectedSize = size || (product.sizes && product.sizes[0] ? product.sizes[0] : null);

  const existingIndex = cart.findIndex(item => 
    item.productId === productId && 
    item.selectedColor === selectedColor && 
    item.selectedSize === selectedSize
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += Number(quantity);
  } else {
    cart.push({
      productId: product.id,
      quantity: Number(quantity),
      selectedColor,
      selectedSize,
      addedAt: new Date().toISOString()
    });
  }

  saveCart(cart);
  showToast(`"${product.name}" added to your cart.`, 'success', 'Cart Updated');
  return true;
}

function updateCartQuantity(index, quantity) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    if (quantity <= 0) {
      return removeFromCart(index);
    }
    cart[index].quantity = quantity;
    saveCart(cart);
  }
}

function removeFromCart(index) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    const removedItem = cart[index];
    const product = getProductById(removedItem.productId);
    cart.splice(index, 1);
    saveCart(cart);
    showToast(product ? `Removed "${product.name}" from cart.` : 'Item removed from cart.', 'info');
  }
}

function clearCart() {
  saveCart([]);
}

function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (Number(item.quantity) || 1), 0);
}

function getCartCalculation() {
  const cart = getCart();
  let subtotal = 0;

  const populatedItems = cart.map((item, idx) => {
    const product = getProductById(item.productId);
    const itemSubtotal = product ? product.price * item.quantity : 0;
    subtotal += itemSubtotal;
    return {
      index: idx,
      ...item,
      product,
      itemSubtotal
    };
  }).filter(item => item.product !== null);

  // Free shipping above ₹5,000, else ₹499 standard delivery
  const shippingThreshold = 5000;
  const shippingFee = (subtotal === 0 || subtotal >= shippingThreshold) ? 0 : 499;
  const total = subtotal + shippingFee;

  return {
    items: populatedItems,
    count: cart.reduce((acc, i) => acc + i.quantity, 0),
    subtotal,
    shippingThreshold,
    shippingFee,
    total
  };
}

// -------------------------------------------------------------
// Wishlist Management
// -------------------------------------------------------------
function getWishlist() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading wishlist', e);
    return [];
  }
}

function saveWishlist(wishlist) {
  try {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    updateHeaderCounters();
    window.dispatchEvent(new CustomEvent('nova:wishlistUpdated', { detail: { wishlist } }));
  } catch (e) {
    console.error('Error saving wishlist', e);
  }
}

function isInWishlist(productId) {
  const wishlist = getWishlist();
  return wishlist.includes(productId);
}

function toggleWishlist(productId) {
  let wishlist = getWishlist();
  const product = getProductById(productId);
  const exists = wishlist.includes(productId);

  if (exists) {
    wishlist = wishlist.filter(id => id !== productId);
    saveWishlist(wishlist);
    showToast(product ? `Removed "${product.name}" from wishlist.` : 'Removed from wishlist.', 'info');
    return false;
  } else {
    wishlist.push(productId);
    saveWishlist(wishlist);
    showToast(product ? `Added "${product.name}" to your wishlist.` : 'Added to wishlist.', 'success', 'Saved Item');
    return true;
  }
}

function removeFromWishlist(productId) {
  let wishlist = getWishlist();
  wishlist = wishlist.filter(id => id !== productId);
  saveWishlist(wishlist);
}

function getWishlistCount() {
  return getWishlist().length;
}

// -------------------------------------------------------------
// Authentication / Demo User Simulation
// -------------------------------------------------------------
const DEFAULT_DEMO_USER = {
  name: "Arjun Verma",
  email: "arjun@example.com",
  phone: "+91 98765 43210",
  address: "Penthouse 4B, Skyview Avenue, Indiranagar",
  city: "Bengaluru",
  state: "Karnataka",
  postalCode: "560038",
  isLoggedIn: true,
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  memberSince: "November 2024"
};

function getUser() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    if (!data) return null;
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}

function saveUser(user) {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    window.dispatchEvent(new CustomEvent('nova:userUpdated', { detail: { user } }));
  } catch (e) {
    console.error('Error saving user', e);
  }
}

function logoutUser() {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
    showToast('You have been logged out.', 'info');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 600);
  } catch (e) {
    console.error(e);
  }
}

function isUserLoggedIn() {
  const user = getUser();
  return Boolean(user && user.isLoggedIn);
}

// -------------------------------------------------------------
// Demo Orders Management
// -------------------------------------------------------------
const INITIAL_DEMO_ORDERS = [
  {
    id: "NOV-89421",
    date: "2026-09-28T14:32:00.000Z",
    status: "Delivered",
    paymentMethod: "Cash on Delivery",
    subtotal: 18999,
    shippingFee: 0,
    total: 18999,
    shippingAddress: {
      name: "Arjun Verma",
      phone: "+91 98765 43210",
      address: "Penthouse 4B, Skyview Avenue, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      postalCode: "560038"
    },
    items: [
      {
        productId: "nova-201",
        name: "Nova Studio Wireless ANC Headphones",
        price: 18999,
        quantity: 1,
        selectedColor: "Midnight Onyx",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80"
      }
    ]
  },
  {
    id: "NOV-88104",
    date: "2026-08-15T11:15:00.000Z",
    status: "Delivered",
    paymentMethod: "Cash on Delivery",
    subtotal: 10698,
    shippingFee: 0,
    total: 10698,
    shippingAddress: {
      name: "Arjun Verma",
      phone: "+91 98765 43210",
      address: "Penthouse 4B, Skyview Avenue, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      postalCode: "560038"
    },
    items: [
      {
        productId: "nova-102",
        name: "Monochrome Minimalist Wool Blazer",
        price: 8499,
        quantity: 1,
        selectedColor: "Charcoal Ash",
        selectedSize: "L",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=300&q=80"
      },
      {
        productId: "nova-105",
        name: "Heavyweight Structured Cotton Tee",
        price: 2199,
        quantity: 1,
        selectedColor: "Off White",
        selectedSize: "L",
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80"
      }
    ]
  }
];

function getOrders() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!data) {
      // Seed demo orders on first access
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_DEMO_ORDERS));
      return INITIAL_DEMO_ORDERS;
    }
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_DEMO_ORDERS;
  }
}

function saveOrder(order) {
  try {
    const orders = getOrders();
    orders.unshift(order);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    return order;
  } catch (e) {
    console.error('Failed to save order', e);
    return null;
  }
}

function getOrderById(orderId) {
  const orders = getOrders();
  return orders.find(o => o.id === orderId) || null;
}

// -------------------------------------------------------------
// Product Card HTML Generator
// -------------------------------------------------------------
function createProductCardHTML(product) {
  const isWishlisted = isInWishlist(product.id);
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return `
    <article class="product-card" data-id="${product.id}">
      <div class="product-card__image-wrap">
        <a href="product.html?id=${product.id}" class="product-card__link" aria-label="View ${product.name}">
          <img src="${product.mainImage}" alt="${product.name}" class="product-card__image" loading="lazy" />
        </a>
        
        ${product.badge ? `<span class="product-card__badge product-card__badge--${product.badge.toLowerCase()}">${product.badge}</span>` : ''}
        
        <button class="product-card__wishlist-btn ${isWishlisted ? 'is-active' : ''}" 
                data-wishlist-id="${product.id}" 
                aria-label="${isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
          </svg>
        </button>

        <div class="product-card__overlay-actions">
          <button class="btn btn--glass btn--sm quick-view-btn" data-quickview-id="${product.id}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            Quick View
          </button>
          <button class="btn btn--primary btn--sm add-to-cart-quick-btn" data-add-id="${product.id}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            Add
          </button>
        </div>
      </div>

      <div class="product-card__content">
        <div class="product-card__meta">
          <span class="product-card__category">${product.category}</span>
          <div class="product-card__rating">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#C48B64" stroke="#C48B64" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${product.rating}</span>
            <span class="product-card__reviews-count">(${product.reviewsCount})</span>
          </div>
        </div>

        <h3 class="product-card__title">
          <a href="product.html?id=${product.id}">${product.name}</a>
        </h3>

        <div class="product-card__price-row">
          <span class="product-card__price">${formatPrice(product.price)}</span>
          ${product.originalPrice > product.price ? `
            <span class="product-card__original-price">${formatPrice(product.originalPrice)}</span>
            <span class="product-card__discount">${discountPercent}% OFF</span>
          ` : ''}
        </div>
      </div>
    </article>
  `;
}

// -------------------------------------------------------------
// Header Counters Updater
// -------------------------------------------------------------
function updateHeaderCounters() {
  const cartCounters = document.querySelectorAll('.header-cart-count');
  const wishlistCounters = document.querySelectorAll('.header-wishlist-count');
  
  const cCount = getCartCount();
  const wCount = getWishlistCount();

  cartCounters.forEach(el => {
    el.textContent = cCount;
    el.style.display = cCount > 0 ? 'inline-flex' : 'none';
  });

  wishlistCounters.forEach(el => {
    el.textContent = wCount;
    el.style.display = wCount > 0 ? 'inline-flex' : 'none';
  });
}

// -------------------------------------------------------------
// Quick View Modal
// -------------------------------------------------------------
function initQuickViewModal() {
  let modal = document.getElementById('nova-quickview-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'nova-quickview-modal';
    modal.className = 'nova-modal-backdrop';
    modal.innerHTML = `
      <div class="nova-modal-container">
        <button class="nova-modal-close" aria-label="Close modal">&times;</button>
        <div class="nova-modal-content" id="nova-quickview-content"></div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.nova-modal-close').addEventListener('click', () => {
      closeQuickView();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeQuickView();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeQuickView();
      }
    });
  }
}

function openQuickView(productId) {
  const product = getProductById(productId);
  if (!product) return;

  initQuickViewModal();
  const modal = document.getElementById('nova-quickview-modal');
  const content = document.getElementById('nova-quickview-content');

  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  content.innerHTML = `
    <div class="quickview-grid">
      <div class="quickview-media">
        <img src="${product.mainImage}" alt="${product.name}" id="qv-main-img" class="quickview-main-image" />
        <div class="quickview-thumbs">
          ${product.images.map((img, i) => `
            <button class="qv-thumb-btn ${i === 0 ? 'is-active' : ''}" data-src="${img}">
              <img src="${img}" alt="${product.name} view ${i + 1}" />
            </button>
          `).join('')}
        </div>
      </div>

      <div class="quickview-details">
        <span class="qv-category">${product.category.toUpperCase()}</span>
        <h2 class="qv-title">${product.name}</h2>
        
        <div class="qv-rating-row">
          <div class="star-rating">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#C48B64" stroke="#C48B64"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <strong>${product.rating}</strong>
            <span class="text-muted">(${product.reviewsCount} reviews)</span>
          </div>
          <span class="stock-tag stock-tag--in">In Stock (${product.inStock} units)</span>
        </div>

        <div class="qv-price-row">
          <span class="qv-price">${formatPrice(product.price)}</span>
          <span class="qv-original-price">${formatPrice(product.originalPrice)}</span>
          <span class="qv-discount">${discountPercent}% OFF</span>
        </div>

        <p class="qv-description">${product.description}</p>

        ${product.colors ? `
          <div class="qv-option-group">
            <label class="qv-label">Color: <span id="qv-selected-color">${product.colors[0].name}</span></label>
            <div class="color-picker-group">
              ${product.colors.map((c, i) => `
                <button type="button" class="color-swatch-btn ${i === 0 ? 'is-selected' : ''}" 
                        style="background-color: ${c.hex};" 
                        title="${c.name}" 
                        data-color="${c.name}">
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${product.sizes ? `
          <div class="qv-option-group">
            <label class="qv-label">Size: <span id="qv-selected-size">${product.sizes[0]}</span></label>
            <div class="size-picker-group">
              ${product.sizes.map((s, i) => `
                <button type="button" class="size-badge-btn ${i === 0 ? 'is-selected' : ''}" data-size="${s}">
                  ${s}
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div class="qv-actions-row">
          <div class="qty-counter">
            <button type="button" class="qty-btn" id="qv-qty-minus">-</button>
            <input type="number" id="qv-qty-input" value="1" min="1" max="${product.inStock}" readonly />
            <button type="button" class="qty-btn" id="qv-qty-plus">+</button>
          </div>
          <button type="button" class="btn btn--primary btn--block" id="qv-add-btn">
            Add to Cart &bull; ${formatPrice(product.price)}
          </button>
        </div>

        <div class="qv-footer-links">
          <a href="product.html?id=${product.id}" class="view-full-details-link">
            View Complete Specifications & Details &rarr;
          </a>
        </div>
      </div>
    </div>
  `;

  // Bind Quickview interactions
  const mainImg = content.querySelector('#qv-main-img');
  content.querySelectorAll('.qv-thumb-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      content.querySelectorAll('.qv-thumb-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      mainImg.src = btn.dataset.src;
    });
  });

  let chosenColor = product.colors ? product.colors[0].name : null;
  content.querySelectorAll('.color-swatch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      content.querySelectorAll('.color-swatch-btn').forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      chosenColor = btn.dataset.color;
      const label = content.querySelector('#qv-selected-color');
      if (label) label.textContent = chosenColor;
    });
  });

  let chosenSize = product.sizes ? product.sizes[0] : null;
  content.querySelectorAll('.size-badge-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      content.querySelectorAll('.size-badge-btn').forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      chosenSize = btn.dataset.size;
      const label = content.querySelector('#qv-selected-size');
      if (label) label.textContent = chosenSize;
    });
  });

  const qtyInput = content.querySelector('#qv-qty-input');
  content.querySelector('#qv-qty-minus').addEventListener('click', () => {
    let val = parseInt(qtyInput.value) || 1;
    if (val > 1) qtyInput.value = val - 1;
  });
  content.querySelector('#qv-qty-plus').addEventListener('click', () => {
    let val = parseInt(qtyInput.value) || 1;
    if (val < product.inStock) qtyInput.value = val + 1;
  });

  content.querySelector('#qv-add-btn').addEventListener('click', () => {
    const qty = parseInt(qtyInput.value) || 1;
    addToCart(product.id, qty, chosenColor, chosenSize);
    closeQuickView();
  });

  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const modal = document.getElementById('nova-quickview-modal');
  if (modal) {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}

// Global click delegation for Wishlist and Quick View buttons
document.addEventListener('click', (e) => {
  const wishlistBtn = e.target.closest('[data-wishlist-id]');
  if (wishlistBtn) {
    e.preventDefault();
    e.stopPropagation();
    const id = wishlistBtn.dataset.wishlistId;
    const added = toggleWishlist(id);
    wishlistBtn.classList.toggle('is-active', added);
    const svg = wishlistBtn.querySelector('svg');
    if (svg) svg.setAttribute('fill', added ? 'currentColor' : 'none');
    return;
  }

  const qvBtn = e.target.closest('[data-quickview-id]');
  if (qvBtn) {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(qvBtn.dataset.quickviewId);
    return;
  }

  const addQuickBtn = e.target.closest('[data-add-id]');
  if (addQuickBtn) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(addQuickBtn.dataset.addId, 1);
    return;
  }
});
