import { getGlobalSettings, getShopData } from '@/lib/hygraph';
import { generateMetadata as generatePageMetadata, generateMetadataWithFallback } from '@/lib/metadata';
import { filterProducts, sortProductsByDate, getInitialPriceRange, ProductFilters } from '@/lib/utils';
import { ProductStatus } from '@/lib/types';
import ShopPageClient from './ShopPageClient';

async function fetchShopData() {
  // Use cached bulk query to fetch all shop data in one request
  const [globalSettings, shopData] = await Promise.all([
    getGlobalSettings(),
    getShopData(50),
  ]);

  return {
    globalSettings,
    products: shopData.products,
    categories: shopData.categories,
    collections: shopData.collections,
  };
}

export async function generateMetadata() {
  return generateMetadataWithFallback(
    async () => {
      const { globalSettings } = await fetchShopData();
      return generatePageMetadata({
        title: 'Shop',
        description: globalSettings?.siteName ? `Browse our collection of products at ${globalSettings.siteName}` : undefined,
        globalSettings,
      });
    },
    generatePageMetadata({ title: 'Shop' })
  );
}

interface ShopPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    collection?: string;
    status?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { globalSettings, products, categories, collections } = await fetchShopData();
  const params = await searchParams;

  // Server-side filtering based on URL searchParams
  const sortedProducts = sortProductsByDate(products);
  const initialPriceRange = getInitialPriceRange(products);
  
  // Parse filter values from searchParams
  const searchText = params.q || undefined;
  const selectedCategory = params.category || undefined;
  const selectedCollection = params.collection || undefined;
  const selectedStatus = (params.status === 'available' || params.status === 'reserved' || params.status === 'sold') 
    ? params.status as ProductStatus 
    : undefined;
  const minPrice = params.minPrice ? parseInt(params.minPrice, 10) : initialPriceRange[0];
  const maxPrice = params.maxPrice ? parseInt(params.maxPrice, 10) : initialPriceRange[1];
  const priceRange: [number, number] = [minPrice, maxPrice];

  // Apply server-side filtering
  const filters: ProductFilters = {
    searchText,
    selectedCategory,
    selectedCollection,
    selectedStatus,
    priceRange,
  };

  const filteredProducts = filterProducts(sortedProducts, filters);

  return (
    <ShopPageClient
      globalSettings={globalSettings}
      products={filteredProducts}
      categories={categories}
      collections={collections}
    />
  );
}
