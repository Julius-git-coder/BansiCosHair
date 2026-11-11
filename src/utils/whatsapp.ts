import { BansiProduct } from '../data/bansiProducts';

export interface CartItem {
  product: BansiProduct;
  selectedVariantLabel?: string;
  selectedShadeName?: string;
  unitPrice: number;
  quantity: number;
}

export interface CustomerOrderDetails {
  customerName: string;
  phone: string;
  deliveryCity: string;
  deliveryAddress: string;
  deliveryNotes?: string;
  paymentPreference: 'Mobile Money / Bank Transfer' | 'Cash on Delivery (Local)' | 'Card via Concierge Link';
}

export function formatWhatsAppOrderMessage(
  items: CartItem[],
  orderDetails: CustomerOrderDetails,
  whatsappNumber: string
): { messageText: string; whatsappUrl: string } {
  const subtotal = items.reduce((acc, ci) => acc + ci.unitPrice * ci.quantity, 0);

  let message = `👑 *NEW ORDER — BANSI COSMETICS & HAIR*\n\n`;
  message += `Hello Bansi Concierge! I would like to place an order from your online store:\n\n`;

  message += `🛍️ *ORDER ITEMS:*\n`;
  items.forEach((ci, idx) => {
    message += `${idx + 1}. *${ci.product.name}*\n`;
    if (ci.selectedVariantLabel) {
      message += `   • Option: ${ci.selectedVariantLabel}\n`;
    }
    if (ci.selectedShadeName) {
      message += `   • Shade: ${ci.selectedShadeName}\n`;
    }
    message += `   • Qty: ${ci.quantity}x ($${ci.unitPrice} each = $${ci.unitPrice * ci.quantity})\n`;
  });

  message += `\n💰 *ORDER ESTIMATE: $${subtotal} USD*\n\n`;
  message += `📋 *CUSTOMER DETAILS:*\n`;
  message += `• Name: ${orderDetails.customerName}\n`;
  message += `• Phone: ${orderDetails.phone}\n`;
  message += `• Delivery City: ${orderDetails.deliveryCity}\n`;
  message += `• Address: ${orderDetails.deliveryAddress}\n`;
  if (orderDetails.deliveryNotes) {
    message += `• Notes: ${orderDetails.deliveryNotes}\n`;
  }
  message += `• Preferred Payment: ${orderDetails.paymentPreference}\n\n`;
  message += `Please confirm item availability and send payment / tracking details. Thank you! ✨`;

  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedText}`;

  return { messageText: message, whatsappUrl };
}
