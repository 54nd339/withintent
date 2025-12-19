import { Metadata } from 'next';
import { getGlobalSettings, getShopData } from '@/app/lib/hygraph';
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

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { globalSettings } = await fetchShopData();

    const title = globalSettings?.siteName ? `Shop | ${globalSettings.siteName}` : 'Shop';
    const description = globalSettings?.siteName ? `Browse our collection of products at ${globalSettings.siteName}` : undefined;

    return {
      title,
      description,
      openGraph: { title, description },
    };
  } catch {
    return { title: 'Shop' };
  }
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
