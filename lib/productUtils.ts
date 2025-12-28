import { Product, ProductStatus } from '@/lib/types';

const MAX_PRODUCTS = 50;
const DEFAULT_MAX_PRICE = 100000;

/**
 * Calculate the maximum price from a list of products
 */
export function calculateMaxPrice(products: Product[]): number {
  if (products.length === 0) return DEFAULT_MAX_PRICE;
  return Math.max(...products.map((p) => p.price || 0), DEFAULT_MAX_PRICE);
}

/**
 * Sort products by creation date (most recent first) and limit to MAX_PRODUCTS
 */
export function sortProductsByDate(products: Product[]): Product[] {
  return [...products]
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    .slice(0, MAX_PRODUCTS);
}

/**
 * Filter products based on search text, category, collection, status, and price range
 */
export interface ProductFilters {
  searchText?: string;
  selectedCategory?: string;
  selectedCollection?: string;
  selectedStatus?: ProductStatus;
  priceRange: [number, number];
}

export function filterProducts(
  products: Product[],
  filters: ProductFilters
): Product[] {
  return products.filter((product) => {
    const { searchText, selectedCategory, selectedCollection, selectedStatus, priceRange } = filters;

    // Search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      const matchesSearch =
        product.title.toLowerCase().includes(searchLower) ||
        product.categories?.some((cat) => cat.name.toLowerCase().includes(searchLower)) ||
        product.collections?.some((col) => col.title.toLowerCase().includes(searchLower));
      if (!matchesSearch) return false;
    }

    // Category filter
    if (selectedCategory) {
      const hasCategory = product.categories?.some((cat) => cat.slug === selectedCategory);
      if (!hasCategory) return false;
    }

    // Collection filter
    if (selectedCollection) {
      const hasCollection = product.collections?.some((col) => col.slug === selectedCollection);
      if (!hasCollection) return false;
    }

    // Status filter
    if (selectedStatus) {
      if (product.productStatus !== selectedStatus) return false;
    }

    // Price range filter
    const productPrice = product.price || 0;
    if (productPrice < priceRange[0] || productPrice > priceRange[1]) return false;

    return true;
  });
}

/**
 * Get initial price range based on products
 */
export function getInitialPriceRange(products: Product[]): [number, number] {
  if (products.length === 0) return [0, 5000];
  const initialMax = calculateMaxPrice(products);
  return [0, initialMax];
}

/**
 * Get formatted product status (uppercase)
 */
export function getProductStatus(product: { productStatus?: string | null }): string | null {
  return product.productStatus?.toUpperCase() || null;
}

/**
 * Check if product is sold
 */
export function isProductSold(product: { productStatus?: string | null }): boolean {
  return product.productStatus === 'sold';
}