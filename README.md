# NOVA — Premium E-Commerce Shopping Platform

A high-end, responsive online shopping experience built strictly with **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6+)**.

Inspired by the aesthetic purity and editorial design standards of Apple, Nike, and Zara, **NOVA** delivers modern minimalism, architectural layouts, smooth micro-interactions, and genuine client-side e-commerce functionality with **zero dependencies or frameworks**.

---

## 💎 Design Philosophy & Highlights

- **Palette**: Neutral luxury theme featuring primary warm cream `#FAFAF8`, secondary `#F1F0EC`, dark slate `#181818`, warm bronze accent `#C48B64`, and refined architectural borders `#E7E5E0`.
- **Typography**: Fluid clamp-scaled headings using **Plus Jakarta Sans** paired with clean, legible **Inter** body typography.
- **Editorial Micro-Interactions**: Hardware-accelerated hover effects, animated card badges, slide-out mobile drawer, modal quick-view system, dynamic toast notifications, and `IntersectionObserver` scroll-reveal animations.
- **Realistic Dataset**: 16 curated products across **Fashion**, **Electronics**, **Accessories**, and **Lifestyle**, all with high-resolution imagery, INR (₹) pricing, ratings, specifications, color/size options, and stock levels.

---

## 🛠 Tech Stack

- **Structure**: Semantic HTML5 (W3C standard semantics, ARIA labels, accessible dialogs).
- **Styling**: Vanilla CSS3 (Custom Design Tokens, Flexbox, CSS Grid, `clamp()`, media queries, keyframe animations).
- **Scripting**: Vanilla JavaScript (ES6+ Modules/Classes, DOM manipulation, custom event dispatching).
- **Persistence**: Browser `localStorage` for cart items, wishlist saves, demo user session, and simulated order receipts.
- **Icons**: Clean inline SVGs.
- **Zero Frameworks**: No React, Vue, Tailwind CSS, Bootstrap, jQuery, or external build steps required.

---

## 📁 Project File Structure

```
nova-ecommerce/
│
├── index.html            # Home page (Hero, Categories, Trending Grid, Split Capsule, Value Props, Newsletter)
├── shop.html             # Full Catalog (Search, Category filters, Price slider, Sorting, Mobile drawer)
├── product.html          # Dynamic Product Details (Gallery switcher, Color/Size swatches, Qty, Specs, Related)
├── cart.html             # Shopping Bag (Item list, Qty controls, Shipping threshold bar, Coupon code NOVA10)
├── checkout.html         # Multi-step Checkout (Address validation, Cash on Delivery demo, Order summary)
├── order-success.html    # Order Confirmation (Order ID, Delivery estimate, Receipt breakdown)
├── login.html            # Demo Sign In (Auto-fill credentials, Password reveal toggle, Simulation disclaimer)
├── register.html         # Member Registration (Input validation, Immediate session creation)
├── account.html          # Member Dashboard (Profile editing, Order History list, Order Receipt modal)
├── wishlist.html         # Saved Wishlist (Move to Cart, Bulk Move All to Bag, Remove)
│
├── css/
│   ├── style.css         # Design tokens, base layout, header, footer, cards, modals, form controls
│   ├── animations.css    # Scroll reveal classes, keyframe animations, skeleton loaders
│   └── responsive.css    # Multi-breakpoint media queries (320px, 640px, 900px, 1024px, 1440px)
│
└── js/
    ├── products.js       # Curated 16+ products dataset across 4 departments
    ├── utils.js          # Storage store (Cart, Wishlist, User, Orders), Toasts, Currency formatting (₹)
    ├── main.js           # Sticky header, real-time Search modal, Mobile drawer, Scroll reveal
    ├── shop.js           # Catalog controller (Category, Price slider, Search, Sort, Mobile drawer)
    ├── product.js        # Dynamic product loader, Image gallery switcher, Variant picker, Buy Now
    ├── cart.js           # Cart management, line calculations, Free shipping threshold bar, Promo codes
    ├── checkout.js       # Form validation, unique order generator, localStorage order placement
    ├── auth.js           # Demo login/register simulation, Profile updating, Order receipts
    └── wishlist.js       # Saved wishlist management, direct transfer to cart
```

---

## 🚀 How to Run the Project

1. Since the project uses purely standard web technologies, **no npm install or build step is required**.
2. Open any `.html` file directly in any modern web browser (Chrome, Safari, Firefox, Edge).
3. Alternatively, serve via any local static server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Or using Node http-server or VS Code Live Server
   npx serve .
   ```
4. Access `http://localhost:8000/index.html`.

---

## 🧪 Verified User Journeys

### Journey 1: Home → Shop → Product Details → Add to Cart → Checkout → Order Confirmation
1. Start at `index.html`, click **"Shop Collection"** or browse trending items.
2. Select any product to open `product.html?id=nova-...`.
3. Choose variant color and size, click **"Add to Cart"** or **"Instant Buy Now"**.
4. Review total, apply coupon `NOVA10` in `cart.html`, click **"Proceed to Checkout"**.
5. Fill or prefill shipping details, select **"Cash on Delivery"**, click **"Confirm & Place Order"**.
6. View confirmed unique order ID on `order-success.html`.

### Journey 2: Home → Search → Filter → Sort → Product Details
1. Click the search icon in the navigation bar to open the live search modal.
2. Type "headphones" or "cashmere" to preview instant live results.
3. Open `shop.html`, filter by "Electronics", slide price limit, and sort by "Price: High to Low".
4. Click on a product card or use **Quick View** to preview without leaving the catalog.

### Journey 3: Product → Wishlist → Cart
1. Click the heart icon on any product to save it to your wishlist.
2. Navigate to `wishlist.html` to review saved items.
3. Click **"Move to Cart"** or **"Move All to Bag"** to seamlessly transfer items into the shopping bag.

### Journey 4: Demo Login → Account Dashboard → Order History → Logout
1. Go to `login.html`, click **"Auto-fill Demo Credentials"** (`arjun@example.com` / `nova123`).
2. Submit to access `account.html`.
3. Review recorded order history and click **"View Order Receipt"** to open the order receipt modal.
4. Click **"Log Out"** to end the demo session.

---

## ⚖️ Technology Compliance Notice

- All functionalities execute client-side using Vanilla JavaScript and HTML5 localStorage.
- No real payment credentials or financial transactions are processed.
- Perfect for portfolios, presentations, and technical demonstrations.
