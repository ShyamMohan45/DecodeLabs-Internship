/**
 * NOVA E-Commerce — Premium Product Dataset
 * Realistic curated products across Fashion, Electronics, Accessories, and Lifestyle.
 */

const PRODUCTS_DATA = [
  // FASHION
  {
    id: "nova-101",
    name: "Aura Oversized Cashmere Overcoat",
    category: "fashion",
    price: 12999,
    originalPrice: 16999,
    rating: 4.9,
    reviewsCount: 142,
    badge: "Bestseller",
    description: "An architectural silhouette sculpted from ultra-fine Mongolian cashmere and virgin wool blend. Features hand-stitched lapels, horn buttons, and relaxed raglan sleeves for an effortless draped profile.",
    details: [
      "90% Virgin Wool, 10% Cashmere blend",
      "Silk-cupro breathable lining",
      "Concealed double-breasted horn closure",
      "Dry clean only. Crafted in Portugal."
    ],
    specs: {
      "Material": "Virgin Wool & Mongolian Cashmere",
      "Fit": "Relaxed Oversized Fit",
      "Care": "Specialist Dry Clean Only",
      "Origin": "Porto, Portugal",
      "SKU": "NOV-FAS-101"
    },
    mainImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=80"
    ],
    inStock: 18,
    colors: [
      { name: "Oatmeal Camel", hex: "#C2A88F" },
      { name: "Obsidian Black", hex: "#1C1C1C" },
      { name: "Heather Slate", hex: "#6E727A" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "nova-102",
    name: "Monochrome Minimalist Wool Blazer",
    category: "fashion",
    price: 8499,
    originalPrice: 10999,
    rating: 4.8,
    reviewsCount: 88,
    badge: "New",
    description: "Tailored precision meets modern comfort. Constructed with structured Italian tropical wool and a clean single-button front that moves seamlessly from boardroom to evening gallery receptions.",
    details: [
      "100% Breathable Italian Wool",
      "Soft padded shoulders for clean drape",
      "Twin back vents and internal passport pocket",
      "Mother-of-pearl accent buttons"
    ],
    specs: {
      "Material": "100% Italian Tropical Wool",
      "Fit": "Structured Modern Tailored",
      "Lining": "100% Viscose",
      "Origin": "Biella, Italy",
      "SKU": "NOV-FAS-102"
    },
    mainImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=80"
    ],
    inStock: 14,
    colors: [
      { name: "Charcoal Ash", hex: "#2B2D2F" },
      { name: "Chalk Off-White", hex: "#EBE7DF" }
    ],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "nova-103",
    name: "Architectural Pleated Midi Dress",
    category: "fashion",
    price: 6299,
    originalPrice: 7999,
    rating: 4.7,
    reviewsCount: 64,
    badge: "Sale",
    description: "Permanent heat-set micro pleating creates continuous dynamic movement. Designed with a high funnel collar and an understated asymmetrical hemline that flatters every silhouette.",
    details: [
      "High-density micro-pleated technical crepe",
      "Crease-resistant travel-ready fabric",
      "Invisible rear zipper with silk pull",
      "Machine washable delicate cycle"
    ],
    specs: {
      "Material": "Engineered Technical Crepe",
      "Fit": "Flowing Column Fit",
      "Length": "Midi (Calf length)",
      "Origin": "Kyoto, Japan",
      "SKU": "NOV-FAS-103"
    },
    mainImage: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80"
    ],
    inStock: 9,
    colors: [
      { name: "Olive Moss", hex: "#555B49" },
      { name: "Pure Onyx", hex: "#1F1F1F" },
      { name: "Terracotta Sand", hex: "#B86B53" }
    ],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: "nova-104",
    name: "Japanese Selvedge Denim Overshirt",
    category: "fashion",
    price: 7499,
    originalPrice: 8999,
    rating: 4.9,
    reviewsCount: 95,
    badge: "Bestseller",
    description: "Milled on vintage shuttle looms in Okayama. 13.5oz red-line selvedge denim pre-rinsed with sea water for softened drape without compromising raw character.",
    details: [
      "13.5oz Kurabo Mills Raw Selvedge Cotton",
      "Custom matte-black brass rivets",
      "Dual gusseted utility chest pockets",
      "Reinforced felled double seams"
    ],
    specs: {
      "Material": "100% Japanese Kurabo Cotton",
      "Fit": "Boxy Overshirt Fit",
      "Weight": "13.5 oz Raw Denim",
      "Origin": "Okayama, Japan",
      "SKU": "NOV-FAS-104"
    },
    mainImage: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80"
    ],
    inStock: 22,
    colors: [
      { name: "Indigo Deep", hex: "#1B2A47" },
      { name: "Washed Stonewear", hex: "#526379" }
    ],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "nova-105",
    name: "Heavyweight Structured Cotton Tee",
    category: "fashion",
    price: 2199,
    originalPrice: 2799,
    rating: 4.6,
    reviewsCount: 210,
    badge: "New",
    description: "The definitive everyday foundation. Milled from 280 GSM long-staple combed organic cotton with a ribbed collar that maintains shape after hundreds of washes.",
    details: [
      "280 GSM heavyweight combed organic jersey",
      "Pre-shrunk enzyme washed finish",
      "Seamless tubular body construction",
      "Slightly dropped shoulder drape"
    ],
    specs: {
      "Material": "100% GOTS Certified Organic Cotton",
      "Fit": "Relaxed Boxy Fit",
      "Weight": "280 GSM Heavyweight",
      "Origin": "Coimbatore, India",
      "SKU": "NOV-FAS-105"
    },
    mainImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80"
    ],
    inStock: 45,
    colors: [
      { name: "Off White", hex: "#F5F3ED" },
      { name: "Warm Sage", hex: "#8A9482" },
      { name: "Raven Black", hex: "#151515" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  },

  // ELECTRONICS
  {
    id: "nova-201",
    name: "Nova Studio Wireless ANC Headphones",
    category: "electronics",
    price: 18999,
    originalPrice: 24999,
    rating: 4.9,
    reviewsCount: 312,
    badge: "Bestseller",
    description: "Flagship acoustic tuning paired with aerospace-grade anodized aluminum and memory foam lambskin earcups. Features custom 40mm beryllium drivers, active hybrid noise cancellation, and 42-hour playtime.",
    details: [
      "Custom 40mm custom Beryllium acoustic drivers",
      "Hybrid Active Noise Cancellation with Transparency Mode",
      "42 hours continuous battery life (USB-C Fast Charge: 15m for 6hrs)",
      "Lossless Bluetooth 5.3 with LDAC, aptX Adaptive and AAC"
    ],
    specs: {
      "Driver": "40mm Beryllium dynamic transducer",
      "Battery Life": "Up to 42 hours (ANC on)",
      "Connectivity": "Bluetooth 5.3 + 3.5mm Hi-Res Audio jack",
      "Weight": "268g",
      "SKU": "NOV-ELE-201"
    },
    mainImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80"
    ],
    inStock: 16,
    colors: [
      { name: "Matte Titanium", hex: "#8B8D8F" },
      { name: "Midnight Onyx", hex: "#1B1C1E" },
      { name: "Starlight Silver", hex: "#D6D7DC" }
    ],
    sizes: null
  },
  {
    id: "nova-202",
    name: "Aero Hi-Fi Walnut Bluetooth Speaker",
    category: "electronics",
    price: 14499,
    originalPrice: 17999,
    rating: 4.8,
    reviewsCount: 120,
    badge: "New",
    description: "An artisan acoustic sculpture engineered with a solid American Walnut timber enclosure and tactile brass dial controls. Produces deep, room-filling stereo sound with audiophile warmth.",
    details: [
      "Solid sustainably harvested American Walnut cabinet",
      "60W RMS Class-D bi-amplification",
      "Dual passive radiators for deep linear bass extension",
      "Multi-room Wi-Fi streaming and Bluetooth 5.2"
    ],
    specs: {
      "Output": "60 Watts RMS (92dB SPL)",
      "Cabinet Material": "Solid American Black Walnut",
      "Inputs": "Wi-Fi, Bluetooth 5.2, Optical & AUX 3.5mm",
      "Dimensions": "260 x 140 x 120 mm",
      "SKU": "NOV-ELE-202"
    },
    mainImage: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80"
    ],
    inStock: 11,
    colors: [
      { name: "Natural Walnut", hex: "#5C3A21" },
      { name: "Smoked Oak", hex: "#2E241E" }
    ],
    sizes: null
  },
  {
    id: "nova-203",
    name: "Horizon Smart OLED Timepiece",
    category: "electronics",
    price: 16299,
    originalPrice: 19999,
    rating: 4.9,
    reviewsCount: 178,
    badge: "Bestseller",
    description: "Seamless blend of high horology and bio-sensing intelligence. Features sapphire crystal glass, continuous ECG & SpO2 tracking, and a micro-curved Always-On OLED display enclosed in Grade-4 titanium.",
    details: [
      "Grade 4 Aerospace Titanium case with diamond-like carbon coat",
      "Sapphire crystal touchscreen resistant to scratching",
      "7-day active battery life with magnetic quick dock",
      "50m water resistance (5 ATM rated)"
    ],
    specs: {
      "Display": "1.43-inch AMOLED (466x466, 1000 nits)",
      "Battery Life": "7 days normal use / 14 days power save",
      "Water Resistance": "5 ATM (50 meters)",
      "Sensors": "Optical Heart Rate, ECG, Pulse Oximeter, Barometer",
      "SKU": "NOV-ELE-203"
    },
    mainImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=900&q=80"
    ],
    inStock: 19,
    colors: [
      { name: "Titanium Silver", hex: "#C7C9CC" },
      { name: "Space Slate", hex: "#2A2D34" }
    ],
    sizes: ["40mm", "44mm"]
  },
  {
    id: "nova-204",
    name: "Vapour Precision Ergonomic Mechanical Keyboard",
    category: "electronics",
    price: 9899,
    originalPrice: 12499,
    rating: 4.8,
    reviewsCount: 92,
    badge: "New",
    description: "CNC machined solid 6063 aluminum chassis with gasket mounting for pillowy, resonant keystrokes. Equipped with factory-lubricated linear switches, dye-sub PBT keycaps, and tri-mode connectivity.",
    details: [
      "Gasket mounted architecture with Poron sound dampeners",
      "Pre-lubed custom tuned Nova Linear Coral switches",
      "Dye-sublimated thick 1.5mm PBT keycaps in cherry profile",
      "Tri-mode: Bluetooth 5.1, 2.4GHz ultra-low latency, and Type-C"
    ],
    specs: {
      "Layout": "75% Compact (82 Keys + Rotary Dial)",
      "Switch Type": "Nova Coral Linear (Factory Lubed)",
      "Battery": "4,000 mAh rechargeable Li-ion",
      "Weight": "1,350g solid aluminum base",
      "SKU": "NOV-ELE-204"
    },
    mainImage: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=900&q=80"
    ],
    inStock: 8,
    colors: [
      { name: "Lunar White", hex: "#EAEAEA" },
      { name: "Graphite Grey", hex: "#353839" }
    ],
    sizes: null
  },
  {
    id: "nova-205",
    name: "Lumen Ambient LED Smart Desk Lamp",
    category: "electronics",
    price: 4999,
    originalPrice: 6499,
    rating: 4.7,
    reviewsCount: 104,
    badge: "Sale",
    description: "Minimalist counterbalance architect lamp crafted in matte-coated spun aluminum. Offers step-less gesture dimming, circadian auto-color matching, and integrated 15W MagSafe wireless charging base.",
    details: [
      "CRI 98 museum-grade true color rendering index",
      "Touchless infrared hand gesture controls for brightness & kelvin",
      "15W fast wireless Qi charger integrated in base plate",
      "Full 360-degree precision articulation joints"
    ],
    specs: {
      "Illumination": "Up to 1,200 Lumens (2700K - 6500K)",
      "CRI Rating": "Ra > 98 (Eye-comfort flicker-free)",
      "Wireless Output": "15W Qi Fast Charging",
      "Finish": "Anodized Sandblasted Aluminum",
      "SKU": "NOV-ELE-205"
    },
    mainImage: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=900&q=80"
    ],
    inStock: 15,
    colors: [
      { name: "Brushed Brass", hex: "#D4AF37" },
      { name: "Matte Raven", hex: "#232323" }
    ],
    sizes: null
  },

  // ACCESSORIES
  {
    id: "nova-301",
    name: "Sylvan Handcrafted Italian Leather Tote",
    category: "accessories",
    price: 11999,
    originalPrice: 14500,
    rating: 4.9,
    reviewsCount: 203,
    badge: "Bestseller",
    description: "Hand-finished vegetable-tanned Tuscan leather that patinates gloriously with time. Features magnetic closure, dedicated 16-inch padded laptop partition, and hand-beveled edge finishing.",
    details: [
      "Full-grain vegetable-tanned certified Tuscan leather",
      "Reinforced saddlery stitching with German bonded thread",
      "Internal 16\" laptop sleeve + water-resistant phone pocket",
      "Protective brass base studs"
    ],
    specs: {
      "Material": "Tuscan Full-Grain Vegetable Leather",
      "Capacity": "22 Liters",
      "Laptop Compatibility": "Up to 16-inch MacBook Pro",
      "Origin": "Florence, Italy",
      "SKU": "NOV-ACC-301"
    },
    mainImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80"
    ],
    inStock: 12,
    colors: [
      { name: "Cognac Amber", hex: "#8A4924" },
      { name: "Noir Black", hex: "#1D1E1F" },
      { name: "Forest Moss", hex: "#354238" }
    ],
    sizes: null
  },
  {
    id: "nova-302",
    name: "Veritas Polarized Acetate Sunglasses",
    category: "accessories",
    price: 5499,
    originalPrice: 6999,
    rating: 4.8,
    reviewsCount: 79,
    badge: "New",
    description: "Hand-carved Italian Mazzucchelli cellulose acetate frame with 7-barrel German hinges. Equipped with mineral glass category 3 polarized lenses with anti-reflective interior coating.",
    details: [
      "Custom milled Mazzucchelli acetate from Varese, Italy",
      "UV400 Category 3 polarization with 100% UVA/B shield",
      "Embedded wire core temples for micro-adjustments",
      "Includes hard case and silk microfiber cleaning pouch"
    ],
    specs: {
      "Frame": "Mazzucchelli Bio-based Acetate",
      "Lens": "Scratch-resistant Polarized Mineral Glass",
      "Hinge": "7-Barrel riveted stainless steel",
      "Bridge Width": "21 mm",
      "SKU": "NOV-ACC-302"
    },
    mainImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=900&q=80"
    ],
    inStock: 25,
    colors: [
      { name: "Honey Tortoise", hex: "#8E5E35" },
      { name: "Midnight Glass", hex: "#1F2124" }
    ],
    sizes: null
  },
  {
    id: "nova-303",
    name: "Kanso Minimalist Slim Cardholder",
    category: "accessories",
    price: 1899,
    originalPrice: 2499,
    rating: 4.7,
    reviewsCount: 165,
    badge: "Sale",
    description: "Engineered for maximum utility with zero bulk. Milled from Buttero vegetable-tanned leather with 4 card slots, a central folded cash compartment, and RFID blocking mesh.",
    details: [
      "Holds 6-8 cards plus folded currency",
      "RFID signal blocking woven lining",
      "Hand burnished and beeswax sealed edges",
      "Only 4mm thickness when empty"
    ],
    specs: {
      "Material": "Italian Walpier Buttero Leather",
      "Dimensions": "100 x 70 x 4 mm",
      "Weight": "28 grams",
      "Origin": "Tuscany, Italy",
      "SKU": "NOV-ACC-303"
    },
    mainImage: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1606503829098-900570b55239?auto=format&fit=crop&w=900&q=80"
    ],
    inStock: 30,
    colors: [
      { name: "Caramel Tan", hex: "#A76E43" },
      { name: "Espresso", hex: "#3B2820" },
      { name: "Matte Olive", hex: "#4B5344" }
    ],
    sizes: null
  },
  {
    id: "nova-304",
    name: "Chronos Ceramic & Mesh Hybrid Watch",
    category: "accessories",
    price: 13799,
    originalPrice: 17500,
    rating: 4.9,
    reviewsCount: 116,
    badge: "Bestseller",
    description: "An understated statement of architectural minimalism. Driven by a Swiss quartz movement within a high-gloss zirconium ceramic bezel and surgical 316L Milanese mesh band.",
    details: [
      "Swiss Ronda 715 High-Precision Quartz movement",
      "Ultra-hard scratch-proof Zirconium oxide ceramic bezel",
      "Sapphire crystal with triple internal anti-reflective coating",
      "Quick-release magnetic Milanese loop strap"
    ],
    specs: {
      "Case Diameter": "38 mm (7.2 mm ultra-slim profile)",
      "Movement": "Swiss Ronda 715 Quartz",
      "Water Resistance": "50 meters (5 ATM)",
      "Case Material": "316L Surgical Stainless Steel",
      "SKU": "NOV-ACC-304"
    },
    mainImage: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80"
    ],
    inStock: 14,
    colors: [
      { name: "Rose Gold Slate", hex: "#B76E79" },
      { name: "Stealth Obsidian", hex: "#1E1E20" }
    ],
    sizes: null
  },

  // LIFESTYLE
  {
    id: "nova-401",
    name: "Serene Ceramic Ultrasonic Diffuser",
    category: "lifestyle",
    price: 3999,
    originalPrice: 4999,
    rating: 4.8,
    reviewsCount: 138,
    badge: "New",
    description: "Turn your living space into a mindful sanctuary. Sculpted from matte textured porcelain with whisper-quiet ultrasonic vibrations that disperse essential oils without burning delicate aromatic compounds.",
    details: [
      "Handcrafted bisque porcelain stone cover",
      "Covers up to 500 sq ft with steady 9-hour continuous mist",
      "Warm ambient candle-like glow with independent switch",
      "Safety auto-shutoff when reservoir runs empty"
    ],
    specs: {
      "Capacity": "180 mL water reservoir",
      "Coverage": "Up to 500 square feet",
      "Run Time": "9 hours continuous / 16 hours interval",
      "Power": "USB-C low energy consumption",
      "SKU": "NOV-LIF-401"
    },
    mainImage: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=900&q=80"
    ],
    inStock: 20,
    colors: [
      { name: "Terracotta Earth", hex: "#B56D55" },
      { name: "Stone Alabaster", hex: "#E8E4DC" }
    ],
    sizes: null
  },
  {
    id: "nova-402",
    name: "Nordic Cast Iron Teapot & Cup Set",
    category: "lifestyle",
    price: 4499,
    originalPrice: 5499,
    rating: 4.9,
    reviewsCount: 84,
    badge: "Bestseller",
    description: "Inspired by traditional Nanbu Tekki craftsmanship with modern Scandinavian ergonomics. Enameled interior prevents oxidation and retains tea heat evenly for protracted slow afternoon rituals.",
    details: [
      "Heavy-gauge solid cast iron with porcelain enamel lining",
      "Includes ultra-fine stainless steel mesh infuser basket",
      "Matching dual insulated cast iron tasting cups included",
      "Stovetop and induction friendly"
    ],
    specs: {
      "Teapot Volume": "900 mL (serves 3-4 cups)",
      "Set Includes": "1 Teapot, 1 Infuser, 2 Cups, 1 Trivet",
      "Weight": "1.95 kg total solid iron",
      "Coating": "Food-grade vitreous enamel interior",
      "SKU": "NOV-LIF-402"
    },
    mainImage: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=900&q=80"
    ],
    inStock: 17,
    colors: [
      { name: "Cast Iron Black", hex: "#222326" },
      { name: "Forest Moss", hex: "#3A463B" }
    ],
    sizes: null
  },
  {
    id: "nova-403",
    name: "Botanical Scented Soy Candle Duo",
    category: "lifestyle",
    price: 2499,
    originalPrice: 3200,
    rating: 4.7,
    reviewsCount: 156,
    badge: "Sale",
    description: "Hand-poured 100% biodegradable natural soy wax infused with wild botanicals, cedarwood, and cold-pressed bergamot. Double wooden wicks emit a soothing fireside crackle.",
    details: [
      "100% Midwestern soy wax with pure botanical essential oils",
      "Cruelty-free, paraben-free, phthalate-free clean burn",
      "FSC-certified dual cedar crackling wooden wicks",
      "65+ hours burn time per vessel (130 hours total)"
    ],
    specs: {
      "Weight": "2x 280g / 10oz vessels",
      "Notes": "Fig Leaf, Smoked Cedar, Sicilian Bergamot, Amber",
      "Vessel": "Reusable hand-blown tinted amber glass",
      "SKU": "NOV-LIF-403"
    },
    mainImage: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=900&q=80"
    ],
    inStock: 35,
    colors: [
      { name: "Amber Glass", hex: "#7D4E24" },
      { name: "Smoked Grey", hex: "#47494E" }
    ],
    sizes: null
  },
  {
    id: "nova-404",
    name: "Artisan Hand-Carved Travertine Catchall",
    category: "lifestyle",
    price: 3299,
    originalPrice: 3999,
    rating: 4.8,
    reviewsCount: 71,
    badge: "New",
    description: "Carved from a solid block of beige Italian travertine stone. Each piece exhibits unique geological veining and organic voids, creating a sculptural presence for jewellery, keys, or desk essentials.",
    details: [
      "Cut from raw Italian porous travertine limestone",
      "Hand-polished soft bowl contour with non-slip cork base",
      "Unique mineral pores and natural color variation in every piece",
      "Weighty heirloom quality desktop accessory"
    ],
    specs: {
      "Dimensions": "220 mm diameter x 35 mm height",
      "Material": "100% Natural Italian Travertine",
      "Weight": "1.4 kg",
      "Origin": "Tivoli, Italy",
      "SKU": "NOV-LIF-404"
    },
    mainImage: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80"
    ],
    inStock: 13,
    colors: [
      { name: "Natural Ivory", hex: "#E7DFD4" },
      { name: "Warm Walnut Stone", hex: "#C2B29D" }
    ],
    sizes: null
  }
];

// Provide helper to get products
function getAllProducts() {
  return PRODUCTS_DATA;
}

function getProductById(id) {
  if (!id) return null;
  return PRODUCTS_DATA.find(p => p.id === id) || null;
}

function getProductsByCategory(category) {
  if (!category || category === "all") return PRODUCTS_DATA;
  return PRODUCTS_DATA.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

function getFeaturedProducts(limit = 4) {
  return PRODUCTS_DATA.slice(0, limit);
}

function getTrendingProducts(limit = 8) {
  return PRODUCTS_DATA.filter(p => p.badge === "Bestseller" || p.rating >= 4.8).slice(0, limit);
}
