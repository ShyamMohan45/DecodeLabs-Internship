/**
 * NOVA E-Commerce — Authentication & Account Dashboard Controller
 * Manages demo login/registration simulation, session storage,
 * profile editing, order history display, and logout.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLoginForm();
  initRegisterForm();
  initAccountDashboard();
  initPasswordVisibilityToggles();
});

// -------------------------------------------------------------
// Password Visibility Toggle
// -------------------------------------------------------------
function initPasswordVisibilityToggles() {
  const toggleBtns = document.querySelectorAll('.password-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.password-input-wrap').querySelector('input');
      if (!input) return;
      if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
      } else {
        input.type = 'password';
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;
      }
    });
  });
}

// -------------------------------------------------------------
// Login Page Controller
// -------------------------------------------------------------
function initLoginForm() {
  const loginForm = document.getElementById('nova-login-form');
  const demoFillBtn = document.getElementById('demo-credentials-fill-btn');
  if (!loginForm) return;

  // Auto-fill demo button
  if (demoFillBtn) {
    demoFillBtn.addEventListener('click', () => {
      const emailInput = document.getElementById('login-email');
      const passInput = document.getElementById('login-password');
      if (emailInput) emailInput.value = DEFAULT_DEMO_USER.email;
      if (passInput) passInput.value = 'nova123';
      showToast('Demo credentials autofilled.', 'info');
    });
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    if (!password || password.length < 4) {
      showToast('Please enter your password.', 'error');
      return;
    }

    // Demo simulation login
    const existing = getUser() || DEFAULT_DEMO_USER;
    const sessionUser = {
      ...existing,
      email: email,
      isLoggedIn: true
    };

    saveUser(sessionUser);
    showToast(`Welcome back, ${sessionUser.name || 'Collector'}!`, 'success', 'Login Successful');
    
    setTimeout(() => {
      window.location.href = 'account.html';
    }, 600);
  });
}

// -------------------------------------------------------------
// Registration Page Controller
// -------------------------------------------------------------
function initRegisterForm() {
  const registerForm = document.getElementById('nova-register-form');
  if (!registerForm) return;

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value.trim();
    const confirmPass = document.getElementById('reg-confirm-password').value.trim();

    if (name.length < 2) {
      showToast('Please enter your full name.', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    if (password.length < 6) {
      showToast('Password must be at least 6 characters long.', 'error');
      return;
    }

    if (password !== confirmPass) {
      showToast('Passwords do not match.', 'error');
      return;
    }

    const newUser = {
      name,
      email,
      phone: "+91 98765 00000",
      address: "Suite 100, Modern Boulevard",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400001",
      isLoggedIn: true,
      memberSince: "Just now",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    };

    saveUser(newUser);
    showToast('Your NOVA member account was created.', 'success', 'Welcome!');

    setTimeout(() => {
      window.location.href = 'account.html';
    }, 700);
  });
}

// -------------------------------------------------------------
// User Account Dashboard Controller
// -------------------------------------------------------------
function initAccountDashboard() {
  const accountView = document.getElementById('account-dashboard-view');
  if (!accountView) return;

  // Check login guard
  if (!isUserLoggedIn()) {
    // For demonstration ease, auto-sign in with demo user if requested or redirect
    const user = getUser();
    if (!user) {
      saveUser(DEFAULT_DEMO_USER);
    }
  }

  const user = getUser() || DEFAULT_DEMO_USER;

  // Render profile header
  const welcomeName = document.getElementById('account-welcome-name');
  const profileEmail = document.getElementById('account-profile-email');
  const profileDate = document.getElementById('account-member-since');

  if (welcomeName) welcomeName.textContent = user.name;
  if (profileEmail) profileEmail.textContent = user.email;
  if (profileDate) profileDate.textContent = user.memberSince || 'November 2024';

  // Render edit form fields
  const nameField = document.getElementById('profile-input-name');
  const emailField = document.getElementById('profile-input-email');
  const phoneField = document.getElementById('profile-input-phone');
  const addressField = document.getElementById('profile-input-address');
  const cityField = document.getElementById('profile-input-city');

  if (nameField) nameField.value = user.name || '';
  if (emailField) emailField.value = user.email || '';
  if (phoneField) phoneField.value = user.phone || '';
  if (addressField) addressField.value = user.address || '';
  if (cityField) cityField.value = user.city || '';

  // Profile Save handler
  const profileForm = document.getElementById('account-profile-form');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      user.name = nameField.value.trim();
      user.email = emailField.value.trim();
      user.phone = phoneField.value.trim();
      user.address = addressField.value.trim();
      user.city = cityField.value.trim();

      saveUser(user);
      if (welcomeName) welcomeName.textContent = user.name;
      if (profileEmail) profileEmail.textContent = user.email;
      showToast('Profile information successfully saved.', 'success');
    });
  }

  // Logout button
  const logoutBtn = document.getElementById('account-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      logoutUser();
    });
  }

  // Render Orders List
  renderAccountOrders();
}

function renderAccountOrders() {
  const ordersListContainer = document.getElementById('account-orders-list');
  const emptyOrdersState = document.getElementById('account-orders-empty');
  if (!ordersListContainer) return;

  const orders = getOrders();

  if (orders.length === 0) {
    ordersListContainer.style.display = 'none';
    if (emptyOrdersState) emptyOrdersState.style.display = 'flex';
    return;
  }

  if (emptyOrdersState) emptyOrdersState.style.display = 'none';
  ordersListContainer.style.display = 'flex';

  ordersListContainer.innerHTML = orders.map(order => `
    <article class="order-card">
      <div class="order-card__header">
        <div class="order-meta-col">
          <span class="order-number">${order.id}</span>
          <span class="order-date">${formatDate(order.date)}</span>
        </div>
        <div class="order-status-badge order-status-badge--${order.status.toLowerCase()}">
          ${order.status}
        </div>
      </div>

      <div class="order-card__items-preview">
        ${order.items.map(item => `
          <div class="order-item-chip">
            <img src="${item.image}" alt="${item.name}" class="order-item-chip__thumb" />
            <div class="order-item-chip__info">
              <span class="order-item-chip__name">${item.name}</span>
              <span class="order-item-chip__meta">Qty: ${item.quantity} &bull; ${formatPrice(item.price)}</span>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="order-card__footer">
        <div class="order-card__total">
          <span>Total Paid:</span>
          <strong>${formatPrice(order.total)}</strong>
          <span class="text-muted" style="font-size: 0.775rem;">(${order.paymentMethod})</span>
        </div>
        <div class="order-card__actions">
          <button type="button" class="btn btn--secondary btn--sm view-order-details-btn" data-order-id="${order.id}">
            View Order Receipt
          </button>
        </div>
      </div>
    </article>
  `).join('');

  // Attach order receipt modal listeners
  ordersListContainer.querySelectorAll('.view-order-details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const order = getOrderById(btn.dataset.orderId);
      if (order) openOrderReceiptModal(order);
    });
  });
}

function openOrderReceiptModal(order) {
  let modal = document.getElementById('order-receipt-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'order-receipt-modal';
    modal.className = 'nova-modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="nova-modal-container" style="max-width: 600px; padding: 2rem;">
      <button class="nova-modal-close" id="receipt-modal-close">&times;</button>
      <div class="receipt-header" style="text-align: center; margin-bottom: 1.5rem;">
        <span class="section-tag">Order Receipt</span>
        <h2>${order.id}</h2>
        <p class="text-muted">Placed on ${formatDate(order.date)} &bull; ${order.status}</p>
      </div>

      <div class="receipt-items-table" style="margin-bottom: 1.5rem;">
        ${order.items.map(item => `
          <div style="display: flex; justify-content: space-between; align-items: center; padding-block: 0.75rem; border-bottom: 1px solid var(--border-light);">
            <div>
              <div style="font-weight: 600; font-size: 0.95rem;">${item.name}</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Qty: ${item.quantity} ${item.selectedColor ? `&bull; ${item.selectedColor}` : ''}</div>
            </div>
            <div style="font-weight: 600;">${formatPrice(item.price * item.quantity)}</div>
          </div>
        `).join('')}
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; font-size: 0.9rem;">
        <div style="display: flex; justify-content: space-between;">
          <span>Subtotal</span>
          <span>${formatPrice(order.subtotal)}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>Shipping</span>
          <span>${order.shippingFee === 0 ? 'FREE' : formatPrice(order.shippingFee)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 1.1rem; padding-top: 0.5rem; border-top: 1px solid var(--border-light);">
          <span>Total</span>
          <span style="color: var(--accent);">${formatPrice(order.total)}</span>
        </div>
      </div>

      <div style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-sm); font-size: 0.85rem; margin-bottom: 1.5rem;">
        <strong>Shipping Address:</strong><br>
        ${order.shippingAddress.name}<br>
        ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.postalCode}<br>
        Phone: ${order.shippingAddress.phone}
      </div>

      <button type="button" class="btn btn--primary btn--block" id="receipt-modal-done">Done</button>
    </div>
  `;

  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  const close = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  modal.querySelector('#receipt-modal-close').addEventListener('click', close);
  modal.querySelector('#receipt-modal-done').addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });
}
