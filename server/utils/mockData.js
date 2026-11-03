export const mockProducts = [
  {
    _id: "prod_1",
    name: "Aura Silk Sculpted Blazer",
    brand: "VOGUEX Atelier",
    description: "An architectural masterpiece tailored from bespoke Italian Mulberry silk and fine merino wool blend. Features sharp peak lapels, interior silk lining with gold jacquard stitch, and hand-polished horn buttons.",
    details: [
      "70% Italian Mulberry Silk, 30% Virgin Wool",
      "Hand-finished floating canvas construction",
      "Gold-embroidered interior pocket monogram",
      "Double back vents with horn button cuffs",
      "Dry clean only by luxury garment specialist"
    ],
    category: "Men",
    subcategory: "Jackets",
    gender: "Men",
    price: 495,
    originalPrice: 620,
    discount: 20,
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=85",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&q=85",
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=1200&q=85"
    ],
    colors: [
      { name: "Obsidian Noir", hex: "#111111" },
      { name: "Champagne Gold", hex: "#C6A76B" },
      { name: "Slate Mist", hex: "#7E8287" }
    ],
    sizes: [
      { size: "38R", stock: 8 },
      { size: "40R", stock: 12 },
      { size: "42R", stock: 5 },
      { size: "44R", stock: 3 }
    ],
    rating: 4.9,
    numReviews: 28,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    isFeatured: true,
    isLimitedEdition: true,
    inStock: true,
    stockCount: 28,
    model3dType: "blazer",
    materials: "70% Mulberry Silk, 30% Virgin Wool",
    careInstructions: "Specialist dry clean only"
  },
  {
    _id: "prod_2",
    name: "Elysian Silk Draped Evening Gown",
    brand: "VOGUEX Privé",
    description: "Cascading bias-cut silk gown designed to float gracefully with every movement. Features an asymmetrical backless silhouette, delicate gold chain shoulder accents, and an elongated fluid train.",
    details: [
      "100% Organic Mulberry Charmeuse Silk",
      "Bias-cut fluid drape with thigh-high slit",
      "18K gold-plated delicate back chain",
      "Concealed side zipper with French seams",
      "Made in Como, Italy"
    ],
    category: "Women",
    subcategory: "Dresses",
    gender: "Women",
    price: 680,
    originalPrice: 850,
    discount: 20,
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1200&q=85",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200&q=85",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1200&q=85"
    ],
    colors: [
      { name: "Champagne Lumina", hex: "#C6A76B" },
      { name: "Midnight Onyx", hex: "#0A0A0A" },
      { name: "Emerald Royale", hex: "#0E3A2F" }
    ],
    sizes: [
      { size: "XS", stock: 6 },
      { size: "S", stock: 10 },
      { size: "M", stock: 8 },
      { size: "L", stock: 4 }
    ],
    rating: 5.0,
    numReviews: 42,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    isFeatured: true,
    isLimitedEdition: true,
    inStock: true,
    stockCount: 28,
    model3dType: "dress",
    materials: "100% Pure Mulberry Silk Charmeuse",
    careInstructions: "Delicate silk dry clean only"
  },
  {
    _id: "prod_3",
    name: "Vortex Kinetic Low-Top Sneaker",
    brand: "VOGUEX Lab",
    description: "An avant-garde runner handcrafted with supple Italian calf leather and sculptural aerodynamic soles. Combines futuristic silhouette with ergonomic day-to-night cushioning.",
    details: [
      "Hand-buffed Italian Napa leather & technical mesh",
      "Ultralight sculpted EVA midsole with golden TPU shank",
      "Orthopedic memory foam footbed with calfskin lining",
      "Waxed cotton laces with engraved gold aglets",
      "Reflective piping accents"
    ],
    category: "Men",
    subcategory: "Sneakers",
    gender: "Men",
    price: 320,
    originalPrice: 380,
    discount: 15,
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1200&q=85",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=85"
    ],
    colors: [
      { name: "Pure White & Gold", hex: "#EAEAEA" },
      { name: "Stealth Black", hex: "#151515" },
      { name: "Desert Sand", hex: "#D2B48C" }
    ],
    sizes: [
      { size: "US 8", stock: 7 },
      { size: "US 9", stock: 15 },
      { size: "US 10", stock: 12 },
      { size: "US 11", stock: 9 },
      { size: "US 12", stock: 4 }
    ],
    rating: 4.8,
    numReviews: 64,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    isFeatured: true,
    inStock: true,
    stockCount: 47,
    model3dType: "sneaker",
    materials: "Full-grain Italian Calfskin & Engineered Mesh",
    careInstructions: "Wipe with damp cloth and leather conditioner"
  },
  {
    _id: "prod_4",
    name: "Monolith Structured Cashmere Trench",
    brand: "VOGUEX Atelier",
    description: "Double-breasted trench crafted from double-faced brushed Mongolian cashmere. Sculpted storm flaps, oversized lapels, and a belted waist exuding effortless high-fashion authority.",
    details: [
      "100% Grade-A Mongolian Cashmere (620 GSM)",
      "Detachable shearling collar accent",
      "Custom gunmetal & champagne hardware",
      "Deep storm pockets with hand-warmer fleece",
      "Water-repellent nano-coat treatment"
    ],
    category: "Women",
    subcategory: "Jackets",
    gender: "Women",
    price: 890,
    originalPrice: 1150,
    discount: 22,
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=1200&q=85",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=1200&q=85",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=1200&q=85"
    ],
    colors: [
      { name: "Camel Cashmere", hex: "#C19A6B" },
      { name: "Raven Black", hex: "#111111" },
      { name: "Oatmeal Melange", hex: "#E3DAC9" }
    ],
    sizes: [
      { size: "XS", stock: 4 },
      { size: "S", stock: 9 },
      { size: "M", stock: 11 },
      { size: "L", stock: 5 }
    ],
    rating: 4.9,
    numReviews: 31,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    isFeatured: true,
    inStock: true,
    stockCount: 29,
    model3dType: "mannequin",
    materials: "100% Mongolian Cashmere",
    careInstructions: "Specialist dry clean only"
  },
  {
    _id: "prod_5",
    name: "Chronos Minimalist Skeleton Watch",
    brand: "VOGUEX Horlogerie",
    description: "Swiss automatic movement framed in brushed aerospace-grade titanium with sapphire crystal front and exhibition caseback. An expression of mechanical poetry on the wrist.",
    details: [
      "Swiss ETA 2824 automatic movement, 42h power reserve",
      "Grade 5 Titanium casing (41mm diameter, 9.8mm thickness)",
      "Double anti-reflective scratchproof sapphire crystal",
      "Interchangeable quick-release alligator & vulcanized rubber strap",
      "5 ATM / 50 meters water resistance"
    ],
    category: "Men",
    subcategory: "Accessories",
    gender: "Men",
    price: 750,
    originalPrice: 950,
    discount: 21,
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=85",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1200&q=85",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=1200&q=85"
    ],
    colors: [
      { name: "Titanium & Champagne Gold", hex: "#C6A76B" },
      { name: "All-Black DLC", hex: "#1E1E1E" },
      { name: "Silver Chrono", hex: "#D6D6D6" }
    ],
    sizes: [
      { size: "One Size (41mm)", stock: 15 }
    ],
    rating: 5.0,
    numReviews: 19,
    isNewArrival: false,
    isBestSeller: true,
    isTrending: true,
    isFeatured: true,
    inStock: true,
    stockCount: 15,
    model3dType: "watch",
    materials: "Grade 5 Titanium & Sapphire Crystal",
    careInstructions: "Rinse with fresh water after salt exposure"
  },
  {
    _id: "prod_6",
    name: "Solstice Boxy Heavyweight Hoodie",
    brand: "VOGUEX Street",
    description: "Constructed with 500 GSM loopback French terry cotton. Ultra-clean drop shoulder cut, double-layered hood without drawstrings, and subtle tonal 3D silicone branding.",
    details: [
      "500 GSM 100% Organic Cotton French Terry",
      "Pre-shrunk custom garment dye wash",
      "Boxy oversized silhouette with reinforced ribbing",
      "Hidden side seam kangaroo pockets",
      "Made in Portugal"
    ],
    category: "Men",
    subcategory: "Hoodies",
    gender: "Unisex",
    price: 185,
    originalPrice: 220,
    discount: 15,
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&q=85",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&q=85",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1200&q=85"
    ],
    colors: [
      { name: "Bone White", hex: "#F3F1EC" },
      { name: "Washed Carbon", hex: "#2C2C2E" },
      { name: "Deep Olive", hex: "#3B4237" }
    ],
    sizes: [
      { size: "S", stock: 12 },
      { size: "M", stock: 25 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 10 }
    ],
    rating: 4.8,
    numReviews: 88,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: false,
    isFeatured: true,
    inStock: true,
    stockCount: 67,
    model3dType: "hoodie",
    materials: "100% French Terry Organic Cotton",
    careInstructions: "Machine wash cold inside out, hang dry"
  },
  {
    _id: "prod_7",
    name: "Palais Pleated High-Rise Trousers",
    brand: "VOGUEX Studio",
    description: "Flowing wide-leg trousers boasting deep double forward pleats, an extended waistband tab, and adjustable side buckles. Tailored to elongate the profile effortlessly.",
    details: [
      "Italian Tropical Virgin Wool with light stretch",
      "Curved high-rise waistband with side buckled adjusters",
      "Unfinished hems ready for custom tailoring",
      "Double besom rear pockets"
    ],
    category: "Women",
    subcategory: "Trousers",
    gender: "Women",
    price: 260,
    originalPrice: 320,
    discount: 18,
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=85",
      "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=1200&q=85",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1200&q=85"
    ],
    colors: [
      { name: "Ecru Ivory", hex: "#F5F3ED" },
      { name: "Espresso Mocha", hex: "#362B28" },
      { name: "Noir Black", hex: "#111111" }
    ],
    sizes: [
      { size: "US 2", stock: 5 },
      { size: "US 4", stock: 12 },
      { size: "US 6", stock: 15 },
      { size: "US 8", stock: 8 }
    ],
    rating: 4.7,
    numReviews: 24,
    isNewArrival: false,
    isBestSeller: false,
    isTrending: true,
    isFeatured: false,
    inStock: true,
    stockCount: 40,
    model3dType: "mannequin",
    materials: "98% Virgin Wool, 2% Elastane",
    careInstructions: "Dry clean only"
  },
  {
    _id: "prod_8",
    name: "Starlight Mini Leather Shoulder Bag",
    brand: "VOGUEX Atelier",
    description: "Sculptural handbag cut from smooth box calf leather with champagne gold bevelled hardware and signature magnetic turn-lock clasp.",
    details: [
      "Structured box calf leather with lambskin lining",
      "Custom milled champagne gold lock and protective feet",
      "Detachable adjustable crossbody leather strap",
      "Interior card slot and zip divider compartment"
    ],
    category: "Women",
    subcategory: "Accessories",
    gender: "Women",
    price: 440,
    originalPrice: 550,
    discount: 20,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=85",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=85",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=1200&q=85"
    ],
    colors: [
      { name: "Champagne Metallic", hex: "#C6A76B" },
      { name: "Crimson Dahlia", hex: "#7E1925" },
      { name: "Piano Black", hex: "#111111" }
    ],
    sizes: [
      { size: "One Size", stock: 18 }
    ],
    rating: 4.9,
    numReviews: 53,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    isFeatured: true,
    inStock: true,
    stockCount: 18,
    model3dType: "bag",
    materials: "100% Italian Box Calfskin & Lambskin",
    careInstructions: "Store in protective dust bag with filler"
  },
  {
    _id: "prod_9",
    name: "Junior Heritage Wool Knit Cardigan",
    brand: "VOGUEX Junior",
    description: "Ultra-soft Merino wool knit cardigan for kids with tortoiseshell buttons and rib-knit trim. Hypoallergenic, breathable, and timeless.",
    details: [
      "100% Superfine Extra Merino Wool",
      "Hypoallergenic and ultra-gentle on delicate skin",
      "Engraved natural faux-tortoiseshell buttons",
      "Pre-washed to resist pilling"
    ],
    category: "Kids",
    subcategory: "Boys' clothing",
    gender: "Kids",
    price: 110,
    originalPrice: 135,
    discount: 18,
    images: [
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=1200&q=85",
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=1200&q=85"
    ],
    colors: [
      { name: "Heather Cream", hex: "#ECE9E2" },
      { name: "Navy Blue", hex: "#1B2838" }
    ],
    sizes: [
      { size: "4Y", stock: 8 },
      { size: "6Y", stock: 12 },
      { size: "8Y", stock: 10 },
      { size: "10Y", stock: 6 }
    ],
    rating: 4.9,
    numReviews: 16,
    isNewArrival: true,
    isBestSeller: false,
    isTrending: false,
    isFeatured: true,
    inStock: true,
    stockCount: 36,
    model3dType: "mannequin",
    materials: "100% Extra-Fine Merino Wool",
    careInstructions: "Hand wash cold, dry flat"
  },
  {
    _id: "prod_10",
    name: "Petite Fleur Embroidered Holiday Dress",
    brand: "VOGUEX Junior",
    description: "Crafted with pure organic cotton batiste, hand-embroidered floral motifs, and a scalloped Peter Pan collar with delicate pearl buttons.",
    details: [
      "100% GOTS Certified Organic Cotton",
      "Hand-smocked chest panel with gold thread accents",
      "Lined with soft breathable cotton voile",
      "Back sash tie bow"
    ],
    category: "Kids",
    subcategory: "Girls' clothing",
    gender: "Kids",
    price: 125,
    originalPrice: 150,
    discount: 16,
    images: [
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=1200&q=85",
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=1200&q=85"
    ],
    colors: [
      { name: "Powder Blush", hex: "#E8C5C8" },
      { name: "Snow White", hex: "#FFFFFF" }
    ],
    sizes: [
      { size: "3Y", stock: 6 },
      { size: "5Y", stock: 10 },
      { size: "7Y", stock: 8 }
    ],
    rating: 4.8,
    numReviews: 14,
    isNewArrival: false,
    isBestSeller: true,
    isTrending: false,
    isFeatured: true,
    inStock: true,
    stockCount: 24,
    model3dType: "dress",
    materials: "100% Organic Cotton Voile",
    careInstructions: "Gentle cycle cold, delicate iron"
  },
  {
    _id: "prod_11",
    name: "Kuro Japanese Selvedge Raw Denim",
    brand: "VOGUEX Denim",
    description: "14.5 oz shuttle-loom woven denim from Okayama, Japan. Features pink selvedge ID line, hidden copper rivets, and deep indigo rope-dyed yarn that fades with unique character.",
    details: [
      "14.5 oz Okayama Kuroki Mills 100% Cotton Selvedge",
      "Classic tapered silhouette with mid-rise",
      "Solid brass donut buttons with button fly",
      "Vegetable-tanned leather waistband patch"
    ],
    category: "Men",
    subcategory: "Jeans",
    gender: "Men",
    price: 240,
    originalPrice: 285,
    discount: 15,
    images: [
      "https://images.unsplash.com/photo-1542272604-780c96856592?w=1200&q=85",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&q=85"
    ],
    colors: [
      { name: "Deep Indigo", hex: "#1C273A" },
      { name: "Shadow Black", hex: "#161616" }
    ],
    sizes: [
      { size: "30x32", stock: 7 },
      { size: "32x32", stock: 15 },
      { size: "34x32", stock: 12 },
      { size: "36x32", stock: 6 }
    ],
    rating: 4.9,
    numReviews: 57,
    isNewArrival: false,
    isBestSeller: true,
    isTrending: false,
    isFeatured: false,
    inStock: true,
    stockCount: 40,
    model3dType: "mannequin",
    materials: "100% Japanese Selvedge Cotton",
    careInstructions: "Wash inside out in cold water after 6 months wear"
  },
  {
    _id: "prod_12",
    name: "Venezia Chelsea Ankle Boot",
    brand: "VOGUEX Atelier",
    description: "Hand-lasted in Tuscany from vegetable-tanned full-grain calfskin. Features Goodyear welted Dainite studded rubber soles, bevelled heel breast, and elasticized side gussets.",
    details: [
      "Full-grain Tuscan French Calf Leather",
      "Goodyear Welted construction (fully resoleable)",
      "Supple full calfskin glove leather lining",
      "Woven pull tabs with gold contrast stitch"
    ],
    category: "Men",
    subcategory: "Footwear",
    gender: "Men",
    price: 390,
    originalPrice: 480,
    discount: 18,
    images: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=1200&q=85",
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=1200&q=85"
    ],
    colors: [
      { name: "Midnight Noir", hex: "#111111" },
      { name: "Cognac Brown", hex: "#5C3A21" }
    ],
    sizes: [
      { size: "US 8", stock: 6 },
      { size: "US 9", stock: 11 },
      { size: "US 10", stock: 14 },
      { size: "US 11", stock: 8 }
    ],
    rating: 4.9,
    numReviews: 39,
    isNewArrival: false,
    isBestSeller: false,
    isTrending: true,
    isFeatured: true,
    inStock: true,
    stockCount: 39,
    model3dType: "sneaker",
    materials: "100% Full Grain Tuscan Calfskin",
    careInstructions: "Use cedar shoe trees and beeswax cream"
  }
];

export const mockCoupons = [
  {
    _id: "cpn_1",
    code: "VOGUE10",
    description: "10% off sitewide on luxury collections",
    discountPercentage: 10,
    discountAmount: 0,
    minOrderValue: 100,
    maxDiscount: 200,
    isActive: true,
    usageCount: 142
  },
  {
    _id: "cpn_2",
    code: "GOLD20",
    description: "20% off on orders above $300",
    discountPercentage: 20,
    discountAmount: 0,
    minOrderValue: 300,
    maxDiscount: 500,
    isActive: true,
    usageCount: 89
  },
  {
    _id: "cpn_3",
    code: "FIRST50",
    description: "$50 off welcoming gift on orders above $250",
    discountPercentage: 0,
    discountAmount: 50,
    minOrderValue: 250,
    maxDiscount: 50,
    isActive: true,
    usageCount: 215
  }
];

export const mockUsers = [
  {
    _id: "usr_admin",
    name: "Alexander Vance",
    email: "admin@voguex.com",
    role: "admin",
    phone: "+1 (555) 019-2834",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    addresses: [
      {
        _id: "addr_1",
        street: "742 Fifth Avenue, Suite 14B",
        city: "New York",
        state: "NY",
        postalCode: "10019",
        country: "United States",
        type: "Work",
        isDefault: true
      }
    ],
    wishlist: ["prod_1", "prod_5"]
  },
  {
    _id: "usr_demo",
    name: "Elena Rostova",
    email: "customer@voguex.com",
    role: "customer",
    phone: "+1 (555) 438-9201",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    addresses: [
      {
        _id: "addr_2",
        street: "128 Rue du Faubourg Saint-Honoré",
        city: "Paris",
        state: "Île-de-France",
        postalCode: "75008",
        country: "France",
        type: "Home",
        isDefault: true
      }
    ],
    wishlist: ["prod_2", "prod_8"]
  }
];

export const mockOrders = [
  {
    _id: "ord_1001",
    orderId: "VGX-98214",
    user: "usr_demo",
    orderItems: [
      {
        product: "prod_2",
        name: "Elysian Silk Draped Evening Gown",
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1200&q=85",
        price: 680,
        size: "S",
        color: "Champagne Lumina",
        quantity: 1
      },
      {
        product: "prod_8",
        name: "Starlight Mini Leather Shoulder Bag",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=85",
        price: 440,
        size: "One Size",
        color: "Champagne Metallic",
        quantity: 1
      }
    ],
    shippingAddress: {
      fullName: "Elena Rostova",
      street: "128 Rue du Faubourg Saint-Honoré",
      city: "Paris",
      state: "Île-de-France",
      postalCode: "75008",
      country: "France",
      phone: "+1 (555) 438-9201"
    },
    paymentMethod: "Razorpay",
    paymentResult: {
      id: "pay_test_998124",
      status: "captured",
      update_time: "2026-11-02T14:32:00.000Z",
      email_address: "customer@voguex.com"
    },
    itemsPrice: 1120,
    taxPrice: 112,
    shippingPrice: 0,
    discountPrice: 112,
    couponApplied: "VOGUE10",
    totalPrice: 1120,
    isPaid: true,
    paidAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    status: "Shipped",
    trackingNumber: "VGX-EXP-890214",
    courierPartner: "DHL Express VIP Worldwide",
    estimatedDelivery: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
    trackingHistory: [
      {
        status: "Order Placed",
        timestamp: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
        location: "VOGUEX Digital Flagship",
        notes: "Order verified and reserved in Milan Atelier vault."
      },
      {
        status: "Payment Confirmed",
        timestamp: new Date(Date.now() - 35 * 3600 * 1000).toISOString(),
        location: "Razorpay / Stripe Gateway",
        notes: "Payment captured securely with 3D Secure verification."
      },
      {
        status: "Processing",
        timestamp: new Date(Date.now() - 28 * 3600 * 1000).toISOString(),
        location: "Milan Atelier Quality Control",
        notes: "Garment inspected by master tailor, steamed and hand-folded."
      },
      {
        status: "Packed",
        timestamp: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
        location: "Packaging Center",
        notes: "Packed in custom gold-embossed matte black magnetic gift box."
      },
      {
        status: "Shipped",
        timestamp: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
        location: "Charles de Gaulle Air Cargo Hub",
        notes: "En route via dedicated express courier."
      }
    ],
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString()
  }
];

export const mockReviews = [
  {
    _id: "rev_1",
    product: "prod_1",
    user: "usr_demo",
    userName: "Elena Rostova",
    rating: 5,
    title: "Incredible tailoring and fabric weight",
    comment: "The mulberry silk blend has an astonishing hand feel. Under evening lights the subtle gold jacquard stitch catches reflections beautifully. Worth every penny.",
    verifiedPurchase: true,
    helpfulCount: 24,
    images: ["https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80"],
    createdAt: "2026-10-25T10:15:00.000Z"
  },
  {
    _id: "rev_2",
    product: "prod_2",
    user: "usr_admin",
    userName: "Charlotte Beaumont",
    rating: 5,
    title: "Pure red-carpet elegance",
    comment: "Wore this to an opera gala in Vienna. Received endless compliments. The drape is liquid perfection and the 3D viewer on this site showed the exact cut before ordering!",
    verifiedPurchase: true,
    helpfulCount: 38,
    images: ["https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80"],
    createdAt: "2026-10-28T18:40:00.000Z"
  }
];

