import { getGlobalSettings, getShopData } from '@/lib/hygraph';
import { generateMetadata as generatePageMetadata, generateMetadataWithFallback } from '@/lib/metadata';
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

export default async function ShopPage() {
  const { globalSettings, products, categories, collections } = await fetchShopData();

  return (
    <ShopPageClient
      globalSettings={globalSettings}
      products={products}
      categories={categories}
      collections={collections}
    />
  );
}
