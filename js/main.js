/**
 * NOVA E-Commerce — Main Global Script
 * Manages sticky navigation, search modal, mobile drawer, newsletter,
 * scroll reveal animations, and global event listeners.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initSearchModal();
  initNewsletterForms();
  initScrollReveal();
  updateHeaderCounters();
  checkUserAuthStatus();

  // Listen for storage changes across tabs or window events
  window.addEventListener('storage', () => {
    updateHeaderCounters();
    checkUserAuthStatus();
  });
});

// -------------------------------------------------------------
// Sticky Header
// -------------------------------------------------------------
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// -------------------------------------------------------------
// Mobile Drawer Menu
// -------------------------------------------------------------
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const drawerBackdrop = document.querySelector('.mobile-drawer-backdrop');
  const closeBtn = document.querySelector('.mobile-drawer-close');

  if (!toggleBtn || !drawerBackdrop) return;

  const openDrawer = () => {
    drawerBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawerBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawerBackdrop.addEventListener('click', (e) => {
    if (e.target === drawerBackdrop) closeDrawer();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawerBackdrop.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

// -------------------------------------------------------------
// Search Modal & Live Search Filter
// -------------------------------------------------------------
function initSearchModal() {
  const searchTriggers = document.querySelectorAll('.header-search-trigger, .mobile-search-trigger');
  const searchBackdrop = document.querySelector('.search-modal-backdrop');
  const searchClose = document.querySelector('.search-modal-close');
  const searchInput = document.querySelector('.search-bar-input');
  const searchResults = document.querySelector('.search-results-list');

  if (!searchBackdrop || !searchInput || !searchResults) return;

  const openSearch = () => {
    searchBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput.focus(), 150);
    renderInitialSearchSuggestions();
  };

  const closeSearch = () => {
    searchBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
    searchInput.value = '';
    searchResults.innerHTML = '';
  };

  searchTriggers.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openSearch();
  }));

  if (searchClose) searchClose.addEventListener('click', closeSearch);

  searchBackdrop.addEventListener('click', (e) => {
    if (e.target === searchBackdrop) closeSearch();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchBackdrop.classList.contains('is-open')) {
      closeSearch();
    }
  });

  // Real-time search handler with debouncing
  let debounceTimer;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const query = e.target.value.trim().toLowerCase();
      performSearch(query);
    }, 180);
  });

  // Enter key press triggers shop page search
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const q = searchInput.value.trim();
      if (q) {
        window.location.href = `shop.html?search=${encodeURIComponent(q)}`;
      }
    }
  });

  function renderInitialSearchSuggestions() {
    const products = getAllProducts().slice(0, 4);
    searchResults.innerHTML = `
      <div style="padding: 0.5rem 0.75rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.08em;">
        Popular Curations
      </div>
      ${products.map(p => `
        <a href="product.html?id=${p.id}" class="search-result-item">
          <img src="${p.mainImage}" alt="${p.name}" class="search-result-thumb" />
          <div class="search-result-info">
            <div class="search-result-title">${p.name}</div>
            <div class="search-result-category">${p.category}</div>
          </div>
          <div class="search-result-price">${formatPrice(p.price)}</div>
        </a>
      `).join('')}
    `;
  }

  function performSearch(query) {
    if (!query) {
      renderInitialSearchSuggestions();
      return;
    }

    const matches = getAllProducts().filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      searchResults.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: var(--text-secondary);">
          <p style="font-weight: 600; margin-bottom: 0.5rem;">No products found for "${query}"</p>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Try searching for "cashmere", "headphones", "blazer", or "diffuser"</p>
        </div>
      `;
      return;
    }

    searchResults.innerHTML = `
      <div style="padding: 0.5rem 0.75rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.08em; display: flex; justify-content: space-between;">
        <span>Search Results (${matches.length})</span>
        <a href="shop.html?search=${encodeURIComponent(query)}" style="color: var(--accent); text-transform: none;">View all in shop &rarr;</a>
      </div>
      ${matches.map(p => `
        <a href="product.html?id=${p.id}" class="search-result-item">
          <img src="${p.mainImage}" alt="${p.name}" class="search-result-thumb" />
          <div class="search-result-info">
            <div class="search-result-title">${p.name}</div>
            <div class="search-result-category">${p.category}</div>
          </div>
          <div class="search-result-price">${formatPrice(p.price)}</div>
        </a>
      `).join('')}
    `;
  }
}

// -------------------------------------------------------------
// Newsletter Subscription
// -------------------------------------------------------------
function initNewsletterForms() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      const email = input ? input.value.trim() : '';

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        showToast('Please enter a valid email address.', 'error', 'Invalid Email');
        return;
      }

      showToast('Thank you for subscribing to NOVA Collective. Check your inbox for 10% off.', 'success', 'Subscribed!');
      if (input) input.value = '';
    });
  });
}

// -------------------------------------------------------------
// Scroll Reveal Observer
// -------------------------------------------------------------
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }
}

// -------------------------------------------------------------
// Auth State Header Link
// -------------------------------------------------------------
function checkUserAuthStatus() {
  const accountLinks = document.querySelectorAll('.header-account-link');
  const loggedIn = isUserLoggedIn();

  accountLinks.forEach(link => {
    if (loggedIn) {
      link.setAttribute('href', 'account.html');
      link.setAttribute('title', 'My Account & Orders');
    } else {
      link.setAttribute('href', 'login.html');
      link.setAttribute('title', 'Sign In');
    }
  });
}
