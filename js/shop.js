/**
 * NOVA E-Commerce — Shop Catalog Controller
 * Handles filtering by category, search queries, price range slider,
 * sorting, mobile filter drawer, active filter badges, and responsive rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
  const shopGrid = document.getElementById('shop-product-grid');
  if (!shopGrid) return;

  // State
  const state = {
    category: 'all',
    search: '',
    maxPrice: 25000,
    sortBy: 'featured',
    badge: 'all'
  };

  // DOM Elements
  const countEl = document.getElementById('shop-results-count');
  const searchInput = document.getElementById('shop-search-input');
  const categoryFilters = document.querySelectorAll('[data-filter-category]');
  const priceSlider = document.getElementById('shop-price-slider');
  const priceDisplay = document.getElementById('shop-price-display');
  const sortSelect = document.getElementById('shop-sort-select');
  const clearBtn = document.getElementById('shop-clear-filters');
  const emptyState = document.getElementById('shop-empty-state');
  
  // Mobile drawer elements
  const filterDrawerBtn = document.getElementById('shop-filter-drawer-btn');
  const filterDrawer = document.getElementById('shop-filter-drawer');
  const filterDrawerClose = document.getElementById('shop-filter-drawer-close');
  const filterDrawerApply = document.getElementById('shop-filter-drawer-apply');

  // Parse URL search parameters on initial load
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('category')) {
    state.category = urlParams.get('category').toLowerCase();
  }
  if (urlParams.has('search')) {
    state.search = urlParams.get('search');
    if (searchInput) searchInput.value = state.search;
  }
  if (urlParams.has('badge')) {
    state.badge = urlParams.get('badge').toLowerCase();
  }

  // Sync category active state in UI
  syncCategoryUI();

  // Price slider setup
  if (priceSlider && priceDisplay) {
    priceSlider.addEventListener('input', (e) => {
      state.maxPrice = Number(e.target.value);
      priceDisplay.textContent = formatPrice(state.maxPrice);
      renderProducts();
    });
  }

  // Search input handler
  if (searchInput) {
    let searchDebounce;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        state.search = e.target.value.trim();
        renderProducts();
      }, 200);
    });
  }

  // Category filter handlers
  categoryFilters.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = btn.dataset.filterCategory;
      state.category = cat;
      syncCategoryUI();
      renderProducts();
      // Update URL without refresh
      updateUrlState();
    });
  });

  // Sort selector handler
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }

  // Clear filters handler
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      state.category = 'all';
      state.search = '';
      state.maxPrice = 25000;
      state.sortBy = 'featured';
      state.badge = 'all';

      if (searchInput) searchInput.value = '';
      if (priceSlider) priceSlider.value = 25000;
      if (priceDisplay) priceDisplay.textContent = formatPrice(25000);
      if (sortSelect) sortSelect.value = 'featured';

      syncCategoryUI();
      updateUrlState();
      renderProducts();
    });
  }

  // Mobile Filter Drawer toggle
  if (filterDrawerBtn && filterDrawer) {
    filterDrawerBtn.addEventListener('click', () => {
      filterDrawer.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });

    if (filterDrawerClose) {
      filterDrawerClose.addEventListener('click', () => {
        filterDrawer.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    }

    if (filterDrawerApply) {
      filterDrawerApply.addEventListener('click', () => {
        filterDrawer.classList.remove('is-open');
        document.body.style.overflow = '';
        renderProducts();
      });
    }

    filterDrawer.addEventListener('click', (e) => {
      if (e.target === filterDrawer) {
        filterDrawer.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

  function syncCategoryUI() {
    categoryFilters.forEach(btn => {
      if (btn.dataset.filterCategory === state.category) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    });
  }

  function updateUrlState() {
    const params = new URLSearchParams();
    if (state.category !== 'all') params.set('category', state.category);
    if (state.search) params.set('search', state.search);
    const newRelativePathQuery = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    history.replaceState(null, '', newRelativePathQuery);
  }

  // Main filter & sort logic
  function renderProducts() {
    let items = getAllProducts();

    // 1. Filter by category
    if (state.category && state.category !== 'all') {
      items = items.filter(p => p.category.toLowerCase() === state.category.toLowerCase());
    }

    // 2. Filter by search query
    if (state.search) {
      const q = state.search.toLowerCase();
      items = items.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // 3. Filter by price slider
    if (state.maxPrice) {
      items = items.filter(p => p.price <= state.maxPrice);
    }

    // 4. Filter by badge if specified
    if (state.badge && state.badge !== 'all') {
      items = items.filter(p => p.badge && p.badge.toLowerCase() === state.badge.toLowerCase());
    }

    // 5. Sorting
    switch (state.sortBy) {
      case 'price-low':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        items.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        // Default curated order
        break;
    }

    // Update count display
    if (countEl) {
      countEl.textContent = `Showing ${items.length} ${items.length === 1 ? 'item' : 'items'}`;
    }

    // Render results or empty state
    if (items.length === 0) {
      shopGrid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'flex';
    } else {
      if (emptyState) emptyState.style.display = 'none';
      shopGrid.innerHTML = items.map(p => createProductCardHTML(p)).join('');
    }
  }

  // Initial render
  renderProducts();
});
