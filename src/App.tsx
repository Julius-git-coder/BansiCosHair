import React, { useState, useEffect } from 'react';
import { BansiNavigation, BansiNavCategory } from './components/BansiNavigation';
import { BansiHero } from './components/BansiHero';
import { ProductCatalog } from './components/ProductCatalog';
import { ShoppableReels } from './components/ShoppableReels';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ConciergeBagDrawer } from './components/ConciergeBagDrawer';
import { BansiFooter } from './components/BansiFooter';
import { AdminDashboard, ConciergeOrderLog } from './components/AdminDashboard';
import {
  BansiProduct,
  SocialReel,
  BANSI_BRAND,
  BANSI_PRODUCTS,
  BANSI_REELS,
  BANSI_TESTIMONIALS
} from './data/bansiProducts';
import { CartItem } from './utils/whatsapp';
import { Star, ShieldCheck, Sparkles, MessageCircle, ArrowRight, Heart } from 'lucide-react';

export default function App() {
  const [currentCategory, setCurrentCategory] = useState<BansiNavCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<BansiProduct | null>(null);
  const [isBagOpen, setIsBagOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);

  // Live Products State with LocalStorage Sync
  const [products, setProducts] = useState<BansiProduct[]>(() => {
    try {
      const saved = localStorage.getItem('bansi_custom_products');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return BANSI_PRODUCTS;
  });

  const handleUpdateProducts = (newProducts: BansiProduct[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem('bansi_custom_products', JSON.stringify(newProducts));
    } catch {
      // Ignore
    }
  };

  // Live Reels State with LocalStorage Sync
  const [reels, setReels] = useState<SocialReel[]>(() => {
    try {
      const saved = localStorage.getItem('bansi_custom_reels');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return BANSI_REELS;
  });

  const handleUpdateReels = (newReels: SocialReel[]) => {
    setReels(newReels);
    try {
      localStorage.setItem('bansi_custom_reels', JSON.stringify(newReels));
    } catch {
      // Ignore
    }
  };

  // Concierge Order Logs with LocalStorage Sync
  const [orderLogs, setOrderLogs] = useState<ConciergeOrderLog[]>(() => {
    try {
      const saved = localStorage.getItem('bansi_concierge_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return [
      {
        id: 'ORD-894102',
        customerName: 'Adwoa Sarfo',
        phone: '+233 55 889 1234',
        deliveryCity: 'Accra (Airport Hills)',
        deliveryAddress: 'Block 4, Palm Crest Lane',
        itemsSummary: '1x Raw Bone Straight HD Swiss Lace Frontal Wig (28 Inches)',
        totalAmount: 360,
        paymentPreference: 'Mobile Money / Bank Transfer',
        createdAt: '11 Nov, 14:20',
        status: 'Confirmed',
      },
      {
        id: 'ORD-761290',
        customerName: 'Fatima Bello',
        phone: '+44 7700 900123',
        deliveryCity: 'London',
        deliveryAddress: '24 Kensington Church St',
        itemsSummary: '2x Velvet Matte Liquid Lip Kit (Cocoa Silk), 1x Oud Impérial (50ml)',
        totalAmount: 151,
        paymentPreference: 'Card via Concierge Link',
        createdAt: '11 Nov, 11:05',
        status: 'Pending',
      },
    ];
  });

  const handleUpdateOrderLogs = (newLogs: ConciergeOrderLog[]) => {
    setOrderLogs(newLogs);
    try {
      localStorage.setItem('bansi_concierge_orders', JSON.stringify(newLogs));
    } catch {
      // Ignore
    }
  };

  const handleOrderLogged = (newOrder: ConciergeOrderLog) => {
    handleUpdateOrderLogs([newOrder, ...orderLogs]);
  };

  // Brand Settings State
  const [brandSettings, setBrandSettings] = useState(BANSI_BRAND);

  // Cart state with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bansi_royal_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bansi_royal_cart', JSON.stringify(cartItems));
    } catch {
      // Ignore
    }
  }, [cartItems]);

  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      // Check if identical item (same product, variant, shade)
      const existingIdx = prev.findIndex(
        (ci) =>
          ci.product.id === newItem.product.id &&
          ci.selectedVariantLabel === newItem.selectedVariantLabel &&
          ci.selectedShadeName === newItem.selectedShadeName
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleClearBag = () => {
    setCartItems([]);
  };

  // Instant direct single-item WhatsApp concierge order
  const handleInstantWhatsApp = (
    product: BansiProduct,
    variantLabel?: string,
    shadeName?: string,
    price?: number
  ) => {
    const unitPrice = price || product.basePrice;
    let message = `👑 *DIRECT CONCIERGE ORDER — BANSI COSMETICS & HAIR*\n\n`;
    message += `Hello Bansi Concierge! I would like to order this item immediately:\n\n`;
    message += `✨ *${product.name}*\n`;
    if (variantLabel) message += `• Selected Option: ${variantLabel}\n`;
    if (shadeName) message += `• Signature Shade: ${shadeName}\n`;
    message += `• Estimated Price: $${unitPrice} USD\n\n`;
    message += `Please confirm availability, cap customization options, and delivery timelines. Thank you! 👑`;

    const cleanNum = brandSettings.whatsappNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNum}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const totalBagCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleCategoryChange = (cat: BansiNavCategory) => {
    setIsAdminView(false);
    setCurrentCategory(cat);
    if (cat === 'reels') {
      const reelsElem = document.getElementById('social-reels-section');
      if (reelsElem) {
        reelsElem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const catElem = document.getElementById('catalog-section');
      if (catElem) {
        catElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf2f4] text-[#2c0d1e] flex flex-col font-sans selection:bg-pink-200 selection:text-pink-900">
      {/* 3-Zone Luxury Top Bar */}
      <BansiNavigation
        currentCategory={currentCategory}
        onSelectCategory={handleCategoryChange}
        cartCount={totalBagCount}
        onOpenCart={() => setIsBagOpen(true)}
        onOpenAdmin={() => setIsAdminView(!isAdminView)}
        isAdminActive={isAdminView}
        onOpenSearch={() => {
          setIsAdminView(false);
          setIsSearchOpen(true);
          const catElem = document.getElementById('catalog-section');
          if (catElem) catElem.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main className="flex-1">
        {/* Conditional Rendering: Admin Dashboard vs Storefront */}
        {isAdminView ? (
          <AdminDashboard
            products={products}
            onUpdateProducts={handleUpdateProducts}
            reels={reels}
            onUpdateReels={handleUpdateReels}
            onCloseAdmin={() => setIsAdminView(false)}
            onPreviewProduct={(prod) => setSelectedProduct(prod)}
            orderLogs={orderLogs}
            onUpdateOrderLogs={handleUpdateOrderLogs}
            brandSettings={brandSettings}
            onUpdateBrandSettings={setBrandSettings}
          />
        ) : (
          <>
            {/* Editorial Hero Section */}
            <BansiHero
              onSelectCategory={handleCategoryChange}
              onOpenReels={() => handleCategoryChange('reels')}
            />

            {/* Shoppable Social Reels Showcase (TikTok & Instagram) */}
            <ShoppableReels
              reels={reels}
              onUpdateReels={handleUpdateReels}
              onSelectProduct={(product) => setSelectedProduct(product)}
            />

            {/* Main Product Catalog (Filtered by Category & Search) */}
            <ProductCatalog
              products={products}
              activeCategory={currentCategory}
              onSelectCategory={setCurrentCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSelectProduct={(product) => setSelectedProduct(product)}
            />

            {/* Client Love & Royal Testimonials */}
            <section className="py-16 px-6 border-t border-pink-200/80 bg-[#fff5f7]">
              <div className="max-w-7xl mx-auto space-y-10">
                <div className="text-center space-y-2 max-w-2xl mx-auto">
                  <div className="text-xs uppercase tracking-[0.25em] text-pink-600 font-semibold">
                    Client Loyalty &amp; Scalp Melts
                  </div>
                  <h2 className="text-3xl md:text-4xl font-normal text-[#2c0d1e] font-serif-luxury">
                    Loved by Modern Royalty Worldwide
                  </h2>
                  <p className="text-pink-900/80 text-xs sm:text-sm">
                    From luxury brides in Accra and Lagos to high-glam photo shoots in London and New York.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {BANSI_TESTIMONIALS.map((t) => (
                    <div
                      key={t.id}
                      className="rounded-2xl border border-pink-200 bg-white p-6 space-y-4 flex flex-col justify-between shadow-xs hover:border-pink-300 hover:shadow-md transition-all"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-1">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-pink-500 text-pink-500" />
                          ))}
                        </div>
                        <p className="text-pink-950 text-xs sm:text-sm leading-relaxed italic">
                          &ldquo;{t.comment}&rdquo;
                        </p>
                      </div>

                      <div className="border-t border-pink-100 pt-4 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-semibold text-pink-950">{t.name}</div>
                          <div className="text-[11px] text-pink-800/70">{t.location}</div>
                        </div>
                        <div className="text-[10px] text-pink-700 bg-pink-50 border border-pink-200 px-2 py-0.5 rounded font-medium">
                          Verified Purchase
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Direct WhatsApp Concierge Invitation Banner */}
                <div className="rounded-2xl border border-pink-300 bg-gradient-to-r from-pink-100 via-rose-50 to-pink-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-xs">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-center md:justify-start gap-2 text-xs uppercase tracking-wider text-pink-700 font-semibold">
                      <Sparkles className="h-4 w-4" />
                      <span>Personal Stylist Available Now</span>
                    </div>
                    <h3 className="text-2xl font-normal text-[#2c0d1e] font-serif-luxury">
                      Need Help Choosing Your Cap Size or Foundation Shade?
                    </h3>
                    <p className="text-xs text-pink-900/80 max-w-xl">
                      Send photos of your desired style or skin tone. Our lead hair specialist will match your custom bundle length and lace tint directly via WhatsApp.
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/${brandSettings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Bansi Stylist! I would like personal advice on choosing the best wig length and cosmetics shade.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-pink-600 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:bg-pink-700 transition-all cursor-pointer shadow-lg shadow-pink-300/50 whitespace-nowrap"
                  >
                    <MessageCircle className="h-4 w-4 fill-white" />
                    <span>Chat with Stylist on WhatsApp</span>
                  </a>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Royal Footer */}
      <BansiFooter
        onSelectCategory={handleCategoryChange}
        onOpenCart={() => setIsBagOpen(true)}
      />

      {/* Interactive PDP Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onInstantWhatsApp={handleInstantWhatsApp}
      />

      {/* Slide-out Royal Shopping Bag & WhatsApp Concierge Checkout */}
      <ConciergeBagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearBag={handleClearBag}
        onOrderLogged={handleOrderLogged}
      />
    </div>
  );
}
