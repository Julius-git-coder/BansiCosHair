export interface ProductVariant {
  id: string;
  label: string;
  priceModifier: number; // additional or direct price
  inStock: boolean;
}

export interface BansiProduct {
  id: string;
  name: string;
  category: 'hair' | 'cosmetics' | 'fragrance';
  subCategory: string;
  basePrice: number;
  tagline: string;
  description: string;
  provenance: string;
  specs: { [key: string]: string };
  variantsTitle?: string;
  variants?: ProductVariant[];
  shades?: Array<{ name: string; hex: string }>;
  imageUrl: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  featured?: boolean;
}

export interface SocialReel {
  id: string;
  platform: 'tiktok' | 'instagram';
  creatorName: string;
  handle: string;
  caption: string;
  views: string;
  likes: string;
  featuredProductId: string;
  featuredProductName: string;
  featuredProductPrice: number;
  videoDuration: string;
  thumbnailUrl: string;
  videoUrl?: string; // Direct MP4/WebM video stream or blob URL
  directPostUrl?: string; // Exact link to post or account
}

export const BANSI_BRAND = {
  name: "BANSI COSMETICS & HAIR",
  tagline: "Luxury Raw Virgin Hair, High-Melanin Cosmetics & Artisanal Fragrances",
  description:
    "Born to celebrate timeless royalty and radiant confidence. We curate unprocessed double-drawn virgin hair, second-skin pigmented makeup, and long-lasting Extrait de Parfum blends designed for the modern queen.",
  instagramUrl: "https://www.instagram.com/bansicosmetics_n_hair/",
  instagramHandle: "@bansicosmetics_n_hair",
  tiktokUrl: "https://www.tiktok.com/@bansicosmetics_hair",
  tiktokHandle: "@bansicosmetics_hair",
  whatsappNumber: "+233550000000",
  whatsappFormatted: "+233 55 000 0000",
  heroImage: "/src/assets/images/bansi_hero_model_1794407863815.jpg",
  guarantees: [
    "100% Raw Unprocessed Cuticle-Aligned Human Hair",
    "Hypoallergenic, Cruelty-Free & Melanin-Rich Formulas",
    "30% Extrait de Parfum Concentration for 18hr+ Longevity",
    "Worldwide Express Shipping & Direct Concierge Verification",
  ],
};

export const BANSI_PRODUCTS: BansiProduct[] = [
  // --- HAIR & WIGS ---
  {
    id: 'hair_bone_straight_wig',
    name: 'Raw Bone Straight HD Swiss Lace Frontal Wig',
    category: 'hair',
    subCategory: 'HD Lace Frontal Units',
    basePrice: 280,
    tagline: 'Silky glass hair with an undetectable melt hairline and 200% fullness.',
    description:
      'Crafted from 100% single-donor raw Cambodian hair. The strands remain silky, tangle-free, and maintain a glass-like mirror shine with zero chemical processing. Features ultra-fine transparent HD Swiss film lace that disappears into any skin tone.',
    provenance: '100% Single Donor Raw Hair · Cambodia',
    specs: {
      'Hair Density': '200% Thick Fullness',
      'Lace Type': 'Ultra-Thin Real HD Swiss Film Lace (13x4 / 13x6)',
      'Hairline': 'Pre-Plucked with Micro Natural Baby Hairs',
      'Longevity': '3+ Years with proper care',
      'Bleach / Dye': 'Lifts to #613 Platinum Blonde safely',
    },
    variantsTitle: 'Select Hair Length',
    variants: [
      { id: 'len_20', label: '20 Inches', priceModifier: 0, inStock: true },
      { id: 'len_24', label: '24 Inches', priceModifier: 40, inStock: true },
      { id: 'len_28', label: '28 Inches', priceModifier: 80, inStock: true },
      { id: 'len_32', label: '32 Inches', priceModifier: 130, inStock: true },
    ],
    imageUrl: '/src/assets/images/bansi_wig_product_1794407864446.jpg',
    badge: 'Best Seller',
    rating: 4.9,
    reviewsCount: 318,
    featured: true,
  },
  {
    id: 'hair_deep_wave_bundles',
    name: 'Raw Deep Wave Virgin Bundles (3-Bundle Deal)',
    category: 'hair',
    subCategory: 'Virgin Hair Bundles',
    basePrice: 240,
    tagline: 'Juicy, hydrated spiral waves with unmatched bounce and natural luster.',
    description:
      'Deep, cascading waves that hold moisture effortlessly. Reactivate with just warm water and a dollop of leave-in mousse for red-carpet wet-and-wavy styling, or blow-dry straight for voluminous blowout texture.',
    provenance: 'Raw Vietnamese Double Drawn Hair',
    specs: {
      'Package': '3 Full Bundles (300g total)',
      'Weft Construction': 'Reinforced Double Machine Weft (No Shedding)',
      'Texture': 'Deep Wave (Reversible to Straight & back to Curls)',
      'Styling': 'Can be bleached, curled, and flat-ironed',
    },
    variantsTitle: 'Bundle Length Combination',
    variants: [
      { id: 'dw_18_20_22', label: '18" + 20" + 22"', priceModifier: 0, inStock: true },
      { id: 'dw_22_24_26', label: '22" + 24" + 26"', priceModifier: 50, inStock: true },
      { id: 'dw_26_28_30', label: '26" + 28" + 30"', priceModifier: 95, inStock: true },
    ],
    imageUrl: '/src/assets/images/bansi_curls_bundles_1794407866045.jpg',
    badge: 'Viral on TikTok',
    rating: 4.9,
    reviewsCount: 245,
    featured: true,
  },
  {
    id: 'hair_glueless_bob',
    name: 'Melt Lace Glueless 5x5 Closure Bob Wig',
    category: 'hair',
    subCategory: 'Ready-to-Wear Wigs',
    basePrice: 185,
    tagline: 'Precision sharp blunt-cut bob with zero glue required. Pop on and go.',
    description:
      'The ultimate everyday luxury unit. Fitted with an adjustable silicone security grip band and pre-cut 5x5 HD lace closure. Perfectly aligned straight blunt ends with zero flyaways.',
    provenance: '100% Virgin Hair · Precision Salon Cut',
    specs: {
      'Cap Fit': 'Glueless with adjustable inner security band',
      'Lace Type': '5x5 Pre-Plucked HD Closure',
      'Density': '180% Natural Density',
    },
    variantsTitle: 'Select Bob Length',
    variants: [
      { id: 'bob_10', label: '10 Inches (Jawline)', priceModifier: 0, inStock: true },
      { id: 'bob_12', label: '12 Inches (Collarbone)', priceModifier: 20, inStock: true },
      { id: 'bob_14', label: '14 Inches (Shoulder)', priceModifier: 40, inStock: true },
    ],
    imageUrl: '/src/assets/images/bansi_wig_product_1794407864446.jpg',
    rating: 4.8,
    reviewsCount: 162,
  },
  {
    id: 'hair_lace_melt_duo',
    name: 'Bansi HD Lace Melt Mousse & 24hr Edge Glaze Duo',
    category: 'hair',
    subCategory: 'Hair Care & Accessories',
    basePrice: 34,
    tagline: 'Flawless invisible lace melt without flaking, crusting, or white residue.',
    description:
      'Formulated with olive fruit extract and vitamin B5. Tints and melts HD lace directly into the scalp for a seamless finish that withstands humidity and high sweat, while the Edge Glaze lays baby hairs flat for 24 hours.',
    provenance: 'Organic Botanicals & Clean Styling Chemistry',
    specs: {
      'Includes': '1x Tinted Melt Foam (200ml) + 1x Edge Sculptor (100g)',
      'Finish': 'Non-sticky, matte-dry invisible bond',
    },
    imageUrl: '/src/assets/images/bansi_cosmetics_flatlay_1794407865133.jpg',
    rating: 4.9,
    reviewsCount: 420,
  },

  // --- COSMETICS ---
  {
    id: 'cosm_velvet_lip_kit',
    name: 'Velvet Matte Liquid Lip Kit & Contour Pencil',
    category: 'cosmetics',
    subCategory: 'Lip Essentials',
    basePrice: 28,
    tagline: '16-hour transfer-proof plush velvet color that never cracks or dries your lips.',
    description:
      'Infused with jojoba oil and hyaluronic filling spheres. Glides on like silk and sets into an ultra-comfortable cloud-matte finish. Comes with a matching waterproof precision lip contour pencil.',
    provenance: 'Clean Vegan Luxury Cosmetics',
    specs: {
      'Wear Time': '16 Hours Transfer-Proof',
      'Finish': 'Plush Suede Matte (Non-drying)',
      'Includes': 'Matte Liquid Lipstick + Sculpting Lip Pencil',
    },
    variantsTitle: 'Choose Your Signature Shade',
    shades: [
      { name: 'Cocoa Silk', hex: '#633827' },
      { name: 'Boss Babe', hex: '#8b483e' },
      { name: 'Rich Caramel', hex: '#a66547' },
      { name: 'Berry Noir', hex: '#4c1e28' },
    ],
    imageUrl: '/src/assets/images/bansi_cosmetics_flatlay_1794407865133.jpg',
    badge: 'Customer Favorite',
    rating: 5.0,
    reviewsCount: 512,
    featured: true,
  },
  {
    id: 'cosm_luminous_foundation',
    name: 'Radiant Silk Luminous Filter Foundation',
    category: 'cosmetics',
    subCategory: 'Complexion & Skin',
    basePrice: 38,
    tagline: 'Breathable second-skin coverage tailored for golden, olive, and deep undertones.',
    description:
      'Formulated specifically to eliminate ashy or gray casts on warm and deep skin. Blurs pores, balances sebum, and reflects soft-focus light for an airbrushed red-carpet complexion.',
    provenance: 'Dermatologist-Approved Micro-Pigments',
    specs: {
      'Coverage': 'Medium to Full (Customizable build)',
      'Finish': 'Luminous Soft Matte (Zero flashback in photos)',
      'Volume': '30ml / 1.0 fl oz Dropper',
    },
    variantsTitle: 'Select Complexion Shade',
    shades: [
      { name: 'Golden Honey (Medium-Tan)', hex: '#c58a52' },
      { name: 'Warm Amber (Deep Golden)', hex: '#9d633b' },
      { name: 'Rich Espresso (Deep Dark)', hex: '#583624' },
      { name: 'Ebony Royale (Deep Neutral)', hex: '#3e2417' },
    ],
    imageUrl: '/src/assets/images/bansi_cosmetics_flatlay_1794407865133.jpg',
    rating: 4.9,
    reviewsCount: 380,
  },
  {
    id: 'cosm_liquid_highlighter',
    name: 'Glow Drip Liquid Chrome Highlighter',
    category: 'cosmetics',
    subCategory: 'Cheeks & Radiance',
    basePrice: 26,
    tagline: 'Wet-look glass skin luminosity without chunky glitter particles.',
    description:
      'A multi-use concentrated elixir for cheekbones, collarbones, and shoulders. Melts seamlessly over foundation or mixed directly into skin moisturizers.',
    provenance: 'Crushed Golden Mica Pearls & Squalane',
    specs: {
      'Volume': '25ml Glass Dropper',
      'Formula': 'Weightless Liquid Silk',
    },
    variantsTitle: 'Select Glow Tone',
    shades: [
      { name: 'Sunlit Gold', hex: '#e8bd70' },
      { name: 'Bronze Goddess', hex: '#b57644' },
      { name: 'Rose Radiance', hex: '#d99787' },
    ],
    imageUrl: '/src/assets/images/bansi_cosmetics_flatlay_1794407865133.jpg',
    rating: 4.8,
    reviewsCount: 219,
  },

  // --- FRAGRANCES ---
  {
    id: 'frag_oud_imperial',
    name: 'Oud Impérial Extrait de Parfum',
    category: 'fragrance',
    subCategory: 'Niche Extrait de Parfum',
    basePrice: 95,
    tagline: 'Hypnotic smoky Cambodian agarwood, golden amber resin, and velvety Damask rose.',
    description:
      'A regal, commanding scent with unmatched sillage and silage. The rare aged Cambodian oud is warmed by honeyed amber, cracked cardamom, and dark Madagascar vanilla for an unforgettable trail that turns heads everywhere you step.',
    provenance: 'Grasse, France & Phnom Penh Aged Oud',
    specs: {
      'Concentration': '30% Extrait de Parfum (Pure Perfume Oil)',
      'Longevity': '18+ Hours on skin, 48 hours on clothing',
      'Scent Profile': 'Smoky Wood · Golden Amber · Sweet Spice',
      'Top Notes': 'Saffron, Bergamot, Pink Peppercorn',
      'Heart Notes': 'Aged Cambodian Oud, Damask Rose, Nutmeg',
      'Base Notes': 'Smoked Amber, Tonka Bean, Leather, Musk',
    },
    variantsTitle: 'Bottle Size',
    variants: [
      { id: 'oud_50', label: '50ml Luxury Flacon', priceModifier: 0, inStock: true },
      { id: 'oud_100', label: '100ml Grand Decanter', priceModifier: 55, inStock: true },
    ],
    imageUrl: '/src/assets/images/bansi_perfume_bottle_1794407866806.jpg',
    badge: 'Signature Scent',
    rating: 5.0,
    reviewsCount: 290,
    featured: true,
  },
  {
    id: 'frag_santal_vanilla',
    name: 'Santal & Golden Amber Extrait de Parfum',
    category: 'fragrance',
    subCategory: 'Niche Extrait de Parfum',
    basePrice: 85,
    tagline: 'Creamy Australian sandalwood, warm roasted bourbon vanilla, and cashmere musk.',
    description:
      'Cozy, seductive, and endlessly inviting. The perfect gourmand woody composition that feels like wrapping yourself in an expensive silk robe beside a crackling hearth.',
    provenance: 'Artisanal Blend · Grasse, France',
    specs: {
      'Concentration': '28% Extrait de Parfum',
      'Longevity': '14+ Hours',
      'Scent Profile': 'Creamy Wood · Bourbon Vanilla · Soft Cashmere',
    },
    variantsTitle: 'Bottle Size',
    variants: [
      { id: 'santal_50', label: '50ml Luxury Flacon', priceModifier: 0, inStock: true },
      { id: 'santal_100', label: '100ml Grand Decanter', priceModifier: 50, inStock: true },
    ],
    imageUrl: '/src/assets/images/bansi_perfume_bottle_1794407866806.jpg',
    rating: 4.9,
    reviewsCount: 184,
  },
  {
    id: 'frag_hair_mist_vanilla',
    name: 'Silk Velvet Hair & Body Perfume Mist',
    category: 'fragrance',
    subCategory: 'Hair Fragrance',
    basePrice: 36,
    tagline: 'Alcohol-free hair fragrance infused with Moroccan argan oil for brilliant shine.',
    description:
      'Leaves your virgin hair bundles and wigs smelling divine with every head toss while sealing cuticles with nourishing argan gloss. Zero drying alcohols.',
    provenance: 'Enriched with Pure Moroccan Argan Oil',
    specs: {
      'Volume': '100ml / 3.4 fl oz Fine Atomizer Mist',
      'Formula': 'Alcohol-Free Silk Hydrating Base',
      'Notes': 'Praline Vanilla, Golden Honey, White Orchids',
    },
    imageUrl: '/src/assets/images/bansi_perfume_bottle_1794407866806.jpg',
    badge: 'Viral Hair Must-Have',
    rating: 4.9,
    reviewsCount: 340,
    featured: true,
  },
];

export const BANSI_REELS: SocialReel[] = [
  {
    id: 'reel_1',
    platform: 'tiktok',
    creatorName: 'Bansi Hair Atelier',
    handle: '@bansicosmetics_hair',
    caption: 'Undetectable HD lace melt on our 30" Raw Bone Straight Wig! Look at that scalp illusion ✨😍',
    views: '248.5K',
    likes: '34.2K',
    featuredProductId: 'hair_bone_straight_wig',
    featuredProductName: 'Raw Bone Straight HD Swiss Lace Wig',
    featuredProductPrice: 280,
    videoDuration: '0:28',
    thumbnailUrl: '/src/assets/images/bansi_wig_product_1794407864446.jpg',
    directPostUrl: 'https://www.tiktok.com/@bansicosmetics_hair',
  },
  {
    id: 'reel_2',
    platform: 'instagram',
    creatorName: 'Bansi Cosmetics',
    handle: '@bansicosmetics_n_hair',
    caption: 'Swatching the Velvet Matte Lip Kit in Cocoa Silk on deep melanin skin. Zero transfer, all day comfort 💋💄',
    views: '182.4K',
    likes: '28.9K',
    featuredProductId: 'cosm_velvet_lip_kit',
    featuredProductName: 'Velvet Matte Liquid Lip Kit',
    featuredProductPrice: 28,
    videoDuration: '0:34',
    thumbnailUrl: '/src/assets/images/bansi_cosmetics_flatlay_1794407865133.jpg',
    directPostUrl: 'https://www.instagram.com/bansicosmetics_n_hair/',
  },
  {
    id: 'reel_3',
    platform: 'tiktok',
    creatorName: 'Bansi Fragrance',
    handle: '@bansicosmetics_hair',
    caption: 'The compliment-getter that lasts 24 hours on your wigs & clothes. Oud Impérial Extrait is pure royalty 👑🍯',
    views: '312.0K',
    likes: '49.1K',
    featuredProductId: 'frag_oud_imperial',
    featuredProductName: 'Oud Impérial Extrait de Parfum',
    featuredProductPrice: 95,
    videoDuration: '0:22',
    thumbnailUrl: '/src/assets/images/bansi_perfume_bottle_1794407866806.jpg',
    directPostUrl: 'https://www.tiktok.com/@bansicosmetics_hair',
  },
  {
    id: 'reel_4',
    platform: 'instagram',
    creatorName: 'Bansi Hair Atelier',
    handle: '@bansicosmetics_n_hair',
    caption: 'Reviving our Deep Wave bundles with warm water and Bansi Melt Mousse. Natural, juicy curls every time 🌊',
    views: '145.8K',
    likes: '21.4K',
    featuredProductId: 'hair_deep_wave_bundles',
    featuredProductName: 'Raw Deep Wave Virgin Bundles',
    featuredProductPrice: 240,
    videoDuration: '0:41',
    thumbnailUrl: '/src/assets/images/bansi_curls_bundles_1794407866045.jpg',
    directPostUrl: 'https://www.instagram.com/bansicosmetics_n_hair/',
  },
];

export const BANSI_TESTIMONIALS = [
  {
    id: 'test_1',
    name: 'Akosua Mensah',
    location: 'Accra, Ghana',
    verifiedProduct: '30" Raw Bone Straight HD Wig',
    rating: 5,
    comment:
      'I wore this hair for my wedding weekend and it did not tangle ONCE. The HD lace literally melted into my scalp like my own hair. Worth every single penny!',
  },
  {
    id: 'test_2',
    name: 'Zainab Al-Hassan',
    location: 'London, UK',
    verifiedProduct: 'Oud Impérial Extrait & Lip Kit',
    rating: 5,
    comment:
      'The fragrance is breathtaking—I have niche perfumes 3x the price that do not project like Oud Impérial. And Cocoa Silk is my new holy grail nude lip.',
  },
  {
    id: 'test_3',
    name: 'Chidinma Okafor',
    location: 'Lagos, Nigeria',
    verifiedProduct: 'Raw Deep Wave 3-Bundle Deal',
    rating: 5,
    comment:
      'The thickness of these bundles from weft to tip is incredible. No thin ends, no shedding. Bansi customer service on WhatsApp was so sweet and fast with delivery!',
  },
];
