/**
 * Format WhatsApp number to URL
 */
export function formatWhatsAppUrl(number: string): string {
  const cleaned = number.replace(/[^\d]/g, '');
  return `https://wa.me/${cleaned}`;
}

/**
 * Create WhatsApp checkout link with cart items
 */
export function createWhatsAppCheckoutLink(
  whatsAppNumber: string,
  items: Array<{
    product: { title: string; price: number; discountPrice?: number };
    quantity: number;
  }>
): string {
  const url = formatWhatsAppUrl(whatsAppNumber);

  let message = 'Hi! I\'d like to place an order:\n\n';

  let total = 0;
  items.forEach((item) => {
    const price = item.product.discountPrice || item.product.price;
    const itemTotal = price * item.quantity;
    total += itemTotal;
    message += `*${item.product.title}* - Quantity: ${item.quantity} - ₹${itemTotal.toLocaleString("en-IN")}\n`;
  });

  message += `\nTotal: ₹${total.toLocaleString("en-IN")}`;

  return `${url}?text=${encodeURIComponent(message)}`;
}

/**
 * Format INR currency
 */
export const formatINR = (value: number) => `₹${value.toLocaleString("en-IN")}`;
