import React, { useState } from 'react';
import { X, Trash2, MessageSquare, Copy, Check, ShoppingBag, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';
import { CartItem, CustomerOrderDetails, formatWhatsAppOrderMessage } from '../utils/whatsapp';
import { BANSI_BRAND } from '../data/bansiProducts';

interface ConciergeBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearBag: () => void;
  onOrderLogged?: (order: any) => void;
}

export const ConciergeBagDrawer: React.FC<ConciergeBagDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearBag,
  onOrderLogged,
}) => {
  const [formData, setFormData] = useState<CustomerOrderDetails>({
    customerName: '',
    phone: '',
    deliveryCity: '',
    deliveryAddress: '',
    deliveryNotes: '',
    paymentPreference: 'Mobile Money / Bank Transfer',
  });

  const [copied, setCopied] = useState<boolean>(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState<boolean>(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, ci) => acc + ci.unitPrice * ci.quantity, 0);

  const handleWhatsAppCheckout = () => {
    // Validate minimal fields
    if (!formData.customerName.trim() || !formData.phone.trim()) {
      setShowCheckoutForm(true);
      alert('Please enter your Name and Phone Number so our concierge can contact you.');
      return;
    }

    if (onOrderLogged) {
      onOrderLogged({
        id: `ORD-${Date.now().toString().slice(-6)}`,
        customerName: formData.customerName,
        phone: formData.phone,
        deliveryCity: formData.deliveryCity || 'Local Dispatch',
        deliveryAddress: formData.deliveryAddress || 'Pending confirmation',
        itemsSummary: items.map((i) => `${i.quantity}x ${i.product.name}`).join(', '),
        totalAmount: subtotal,
        paymentPreference: formData.paymentPreference,
        createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
        status: 'Pending',
      });
    }

    const { whatsappUrl } = formatWhatsAppOrderMessage(
      items,
      formData,
      BANSI_BRAND.whatsappNumber
    );

    // Open WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyOrderText = () => {
    const { messageText } = formatWhatsAppOrderMessage(
      items,
      formData,
      BANSI_BRAND.whatsappNumber
    );
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#fff8fa] border-l border-pink-200 h-full flex flex-col justify-between shadow-2xl text-[#2c0d1e]">
        {/* Header */}
        <div className="p-5 border-b border-pink-200/90 bg-[#fff0f4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-pink-600" />
            <h3 className="text-lg font-normal text-[#2c0d1e] font-serif-luxury tracking-wide">
              Royal Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-pink-200 text-pink-700 hover:text-pink-950 hover:border-pink-400 bg-white transition-colors cursor-pointer shadow-xs"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Bag Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 border border-pink-200 text-pink-500">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-pink-950 font-serif-luxury text-lg">Your bag is empty</p>
                <p className="text-xs text-pink-900/70 max-w-xs mx-auto">
                  Explore our Cambodian virgin hair, melanin-rich lip kits, and artisanal oud fragrances.
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg bg-pink-600 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-pink-700 transition-colors cursor-pointer shadow-xs"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Item Cards List */}
              <div className="space-y-3">
                {items.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${idx}`}
                    className="flex gap-3 p-3 rounded-xl border border-pink-200 bg-white shadow-xs"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="h-16 w-16 rounded-lg object-cover border border-pink-100 shrink-0"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-pink-950 truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-pink-400 hover:text-red-500 transition-colors cursor-pointer shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Variant and Shade tags */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-pink-800">
                        {item.selectedVariantLabel && (
                          <span className="text-pink-700 bg-pink-50 px-1.5 py-0.5 rounded border border-pink-200 font-medium">
                            {item.selectedVariantLabel}
                          </span>
                        )}
                        {item.selectedShadeName && (
                          <span className="text-pink-800 bg-pink-50 px-1.5 py-0.5 rounded border border-pink-200 font-medium">
                            Shade: {item.selectedShadeName}
                          </span>
                        )}
                      </div>

                      {/* Quantity & Item Subtotal */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center border border-pink-200 rounded bg-pink-50/50">
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-pink-700 hover:text-pink-950 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 font-mono text-xs text-pink-950 font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-pink-700 hover:text-pink-950 cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-mono font-bold text-pink-700">
                          ${item.unitPrice * item.quantity} USD
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Details Form */}
              <div className="rounded-xl border border-pink-200 bg-pink-50/70 p-4 space-y-3">
                <div
                  onClick={() => setShowCheckoutForm(!showCheckoutForm)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-pink-700">
                    Concierge Delivery Details
                  </span>
                  <span className="text-[11px] text-pink-600 underline font-medium">
                    {showCheckoutForm ? 'Hide Form' : 'Fill Details'}
                  </span>
                </div>

                {showCheckoutForm ? (
                  <div className="space-y-3 pt-2 text-xs">
                    <div>
                      <label className="text-[11px] text-pink-900 font-medium block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Princess Mensah"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        className="w-full rounded-lg border border-pink-200 bg-white px-3 py-1.5 text-pink-950 placeholder-pink-400 focus:border-pink-500 focus:outline-none shadow-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-pink-900 font-medium block mb-1">Phone / WhatsApp *</label>
                        <input
                          type="tel"
                          placeholder="+233 55 123 4567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full rounded-lg border border-pink-200 bg-white px-3 py-1.5 text-pink-950 placeholder-pink-400 focus:border-pink-500 focus:outline-none shadow-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-pink-900 font-medium block mb-1">City / Region</label>
                        <input
                          type="text"
                          placeholder="e.g. Accra / East Legon"
                          value={formData.deliveryCity}
                          onChange={(e) => setFormData({ ...formData, deliveryCity: e.target.value })}
                          className="w-full rounded-lg border border-pink-200 bg-white px-3 py-1.5 text-pink-950 placeholder-pink-400 focus:border-pink-500 focus:outline-none shadow-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-pink-900 font-medium block mb-1">Delivery Address</label>
                      <input
                        type="text"
                        placeholder="Street, Landmark, or Apartment"
                        value={formData.deliveryAddress}
                        onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                        className="w-full rounded-lg border border-pink-200 bg-white px-3 py-1.5 text-pink-950 placeholder-pink-400 focus:border-pink-500 focus:outline-none shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-pink-900 font-medium block mb-1">
                        Cap Size or Special Requests
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Medium 22.5 cap, bleached knots, extra fragrance sample"
                        value={formData.deliveryNotes}
                        onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
                        className="w-full rounded-lg border border-pink-200 bg-white px-3 py-1.5 text-pink-950 placeholder-pink-400 focus:border-pink-500 focus:outline-none shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-pink-900 font-medium block mb-1">Payment Preference</label>
                      <select
                        value={formData.paymentPreference}
                        onChange={(e) => setFormData({ ...formData, paymentPreference: e.target.value as any })}
                        className="w-full rounded-lg border border-pink-200 bg-white px-3 py-1.5 text-pink-950 focus:border-pink-500 focus:outline-none cursor-pointer shadow-xs"
                      >
                        <option value="Mobile Money / Bank Transfer">Mobile Money (MoMo) / Bank Transfer</option>
                        <option value="Cash on Delivery (Local)">Cash on Delivery (Local Dispatch)</option>
                        <option value="Card via Concierge Link">International Debit/Credit Card</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-pink-900/80">
                    Quick checkout available! Click above to pre-fill your delivery info, or tap the WhatsApp button below to chat directly with our concierge.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-pink-200 bg-[#fff0f4] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-pink-900 font-medium">Subtotal</span>
              <span className="text-xl font-mono font-bold text-pink-700">${subtotal} USD</span>
            </div>

            <p className="text-[11px] text-pink-900/80 leading-tight">
              Order processing happens directly via WhatsApp with our official stylist team. Cap adjustments &amp; shipping quotes are confirmed instantly.
            </p>

            <div className="space-y-2 pt-1">
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-pink-600 py-3.5 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:bg-pink-700 transition-all cursor-pointer shadow-lg shadow-pink-300/50"
              >
                <MessageSquare className="h-4 w-4 fill-white" />
                <span>Checkout on WhatsApp Concierge</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyOrderText}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-pink-200 bg-white py-2 text-xs text-pink-900 hover:text-pink-950 hover:border-pink-400 transition-colors cursor-pointer shadow-xs"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Order Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Order Receipt</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onClearBag}
                  className="px-3 py-2 rounded-lg border border-pink-200 bg-white text-pink-600 hover:text-red-600 text-xs transition-colors cursor-pointer shadow-xs"
                  title="Empty Cart"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
