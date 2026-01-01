/**
 * URL generation and manipulation utilities
 */

export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://withintent.in';
}

export function formatWhatsAppUrl(number: string): string {
  const cleaned = number.replace(/[^\d]/g, '');
  return `https://wa.me/${cleaned}`;
}

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

export function getProductUrl(slug: string, baseUrl?: string): string {
  const url = baseUrl || getBaseUrl();
  return `${url}/shop/product/${slug}`;
}

/**
 * Generate href from NavigationItem or Button
 * Priority: externalUrl > url > page slug > collection slug > category slug > '#'
 */
export function getHrefFromNavigationItem(
  item: { 
    externalUrl?: string | null;
    url?: string | null;
    page?: { slug?: string | null } | null;
    collection?: { slug?: string | null } | null;
    category?: { slug?: string | null } | null;
  }
): string {
  if (item.externalUrl) {
    return item.externalUrl;
  }
  if (item.url) {
    return item.url;
  }
  if (item.page?.slug) {
    return `/${item.page.slug}`;
  }
  if (item.collection?.slug) {
    return `/collection/${item.collection.slug}`;
  }
  if (item.category?.slug) {
    return `/category/${item.category.slug}`;
  }
  return '#';
}

/**
 * Get href for button based on type
 */
export function getButtonHref(button: { 
  url?: string | null;
  type?: string | null;
}): string | null {
  if (!button.url) return null;

  if (button.type === 'whatsApp') {
    const whatsappNumber = button.url.replace(/[^\d]/g, '');
    return `https://wa.me/${whatsappNumber}`;
  }

  if (button.type === 'email') {
    return `mailto:${button.url}`;
  }

  return button.url;
}
