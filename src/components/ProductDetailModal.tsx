import React, { useState, useEffect } from 'react';
import { X, Star, Check, ShoppingBag, MessageSquare, ShieldCheck, Truck, Sparkles, AlertCircle } from 'lucide-react';
import { BansiProduct, ProductVariant, BANSI_BRAND } from '../data/bansiProducts';
import { CartItem } from '../utils/whatsapp';

interface ProductDetailModalProps {
  product: BansiProduct | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  onInstantWhatsApp: (product: BansiProduct, variantLabel?: string, shadeName?: string, price?: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onInstantWhatsApp,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedShade, setSelectedShade] = useState<{ name: string; hex: string } | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Initialize selected options when product opens
  useEffect(() => {
    if (product) {
      if (product.variants && product.variants.length > 0) {
        setSelectedVariant(product.variants[0]);
      } else {
        setSelectedVariant(null);
      }

      if (product.shades && product.shades.length > 0) {
        setSelectedShade(product.shades[0]);
      } else {
        setSelectedShade(null);
      }

      setQuantity(1);
      setAddedSuccess(false);
    }
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const currentUnitPrice = product.basePrice + (selectedVariant ? selectedVariant.priceModifier : 0);
  const totalPrice = currentUnitPrice * quantity;

  const handleAdd = () => {
    onAddToCart({
      product,
      selectedVariantLabel: selectedVariant ? selectedVariant.label : undefined,
      selectedShadeName: selectedShade ? selectedShade.name : undefined,
      unitPrice: currentUnitPrice,
      quantity,
    });
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2400);
  };

  const handleWhatsAppDirect = () => {
    onInstantWhatsApp(
      product,
      selectedVariant?.label,
      selectedShade?.name,
      currentUnitPrice
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md">
      <div className="relative w-full max-w-4xl my-auto rounded-2xl border border-pink-200 bg-[#fff8fa] shadow-2xl shadow-pink-900/20 overflow-hidden animate-fadeIn text-[#2c0d1e]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 border border-pink-200 text-pink-800 hover:text-pink-950 hover:border-pink-400 transition-colors cursor-pointer shadow-xs"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Product Visuals & Trust */}
          <div className="md:col-span-5 bg-pink-50/70 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-pink-200/80">
            <div className="space-y-4">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-pink-200 bg-white shadow-xs">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 rounded bg-pink-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Provenance & Guarantees */}
              <div className="space-y-2 pt-2 text-xs text-pink-900/80">
                <div className="flex items-center gap-2 text-pink-700 font-semibold">
                  <ShieldCheck className="h-4 w-4 text-pink-600 shrink-0" />
                  <span>{product.provenance}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-pink-600 shrink-0" />
                  <span>Express worldwide delivery &amp; local hand-delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-pink-600 shrink-0" />
                  <span>100% Quality Authenticity Guarantee</span>
                </div>
              </div>
            </div>

            {/* Direct Stylist Note */}
            <div className="mt-6 rounded-lg border border-pink-200 bg-pink-100/60 p-3 text-[11px] text-pink-950 leading-relaxed shadow-xs">
              <span className="font-semibold text-pink-700">Stylist Concierge Tip:</span> Need customized lace bleaching, specific bundle grams, or exact foundation shade matching? Order via WhatsApp for personalized guidance.
            </div>
          </div>

          {/* Right Column: Customization & Ordering */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6 bg-white/60">
            {/* Header info */}
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-pink-600 font-semibold mb-1">
                {product.category} · {product.subCategory}
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal text-[#2c0d1e] font-serif-luxury leading-tight">
                {product.name}
              </h2>

              <div className="mt-2 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-pink-500 text-pink-500" />
                  ))}
                  <span className="ml-1 text-xs font-semibold text-pink-950">{product.rating}</span>
                </div>
                <span className="text-pink-300 text-xs">·</span>
                <span className="text-xs text-pink-800/80">{product.reviewsCount} verified royal reviews</span>
              </div>
            </div>

            {/* Price banner */}
            <div className="flex items-baseline gap-3 rounded-lg bg-pink-50/80 border border-pink-200 p-3.5 shadow-xs">
              <span className="text-2xl sm:text-3xl font-bold text-pink-700 font-mono">
                ${currentUnitPrice}
              </span>
              <span className="text-xs text-pink-900/70 font-medium">USD per unit</span>
              {selectedVariant && selectedVariant.priceModifier > 0 && (
                <span className="text-xs text-pink-600 font-medium">
                  (+${selectedVariant.priceModifier} for {selectedVariant.label})
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-pink-900/80 leading-relaxed">
              {product.description}
            </p>

            {/* Variant Selector (e.g. Hair Length or Perfume Size) */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-pink-950 flex justify-between">
                  <span>{product.variantsTitle || 'Select Option'}</span>
                  {selectedVariant && (
                    <span className="text-pink-600 font-medium">{selectedVariant.label}</span>
                  )}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`flex items-center justify-between p-2.5 rounded-lg border text-xs transition-all cursor-pointer ${
                        selectedVariant?.id === v.id
                          ? 'border-pink-500 bg-pink-100 text-pink-950 font-semibold shadow-xs'
                          : 'border-pink-200 bg-white text-pink-900 hover:border-pink-300'
                      }`}
                    >
                      <span>{v.label}</span>
                      <span className="text-pink-600 font-mono text-[11px]">
                        {v.priceModifier > 0 ? `+$${v.priceModifier}` : 'Standard'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Shade Selector (for cosmetics) */}
            {product.shades && product.shades.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-pink-950 flex justify-between">
                  <span>Signature Shade</span>
                  {selectedShade && (
                    <span className="text-pink-600 font-medium">{selectedShade.name}</span>
                  )}
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {product.shades.map((shade) => (
                    <button
                      key={shade.name}
                      onClick={() => setSelectedShade(shade)}
                      title={shade.name}
                      className={`group relative flex items-center gap-2 rounded-lg border p-1.5 pr-3 text-xs transition-all cursor-pointer ${
                        selectedShade?.name === shade.name
                          ? 'border-pink-500 bg-pink-100 text-pink-950 font-semibold shadow-xs'
                          : 'border-pink-200 bg-white text-pink-900 hover:border-pink-300'
                      }`}
                    >
                      <span
                        style={{ backgroundColor: shade.hex }}
                        className="h-5 w-5 rounded-full border border-pink-200 shadow-xs shrink-0 flex items-center justify-center"
                      >
                        {selectedShade?.name === shade.name && (
                          <Check className="h-3 w-3 text-white drop-shadow" />
                        )}
                      </span>
                      <span>{shade.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Specifications */}
            <div className="space-y-2 border-t border-pink-200/80 pt-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-pink-950">
                Product Specifications
              </span>
              <div className="rounded-lg border border-pink-200 bg-pink-50/50 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="space-y-0.5">
                    <span className="text-[11px] text-pink-800/70 uppercase tracking-wider font-semibold">{key}</span>
                    <p className="text-pink-950 font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-pink-200 rounded-lg bg-white shadow-xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-pink-700 hover:text-pink-950 text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-pink-950 font-mono text-xs font-bold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 text-pink-700 hover:text-pink-950 text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <div className="text-xs text-pink-900/80 font-medium">
                  Total: <span className="text-pink-700 font-mono font-bold text-sm">${totalPrice} USD</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAdd}
                  className={`flex items-center justify-center gap-2 rounded-lg py-3 px-4 text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-pink-600 text-white hover:bg-pink-700 shadow-md shadow-pink-300/40'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Added to Royal Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleWhatsAppDirect}
                  className="flex items-center justify-center gap-2 rounded-lg border border-emerald-600/40 bg-emerald-50 py-3 px-4 text-xs font-bold tracking-wider uppercase text-emerald-800 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer shadow-xs"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Order on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
