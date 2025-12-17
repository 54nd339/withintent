import { Metadata } from 'next';
import { hygraphClient, GET_GLOBAL_SETTINGS, GET_ALL_PRODUCTS, GET_ALL_CATEGORIES, GET_ALL_COLLECTIONS } from '@/app/lib/hygraph';
import { GlobalSetting, Product, Category, Collection } from '@/app/types';
import ShopPageClient from './ShopPageClient';

async function fetchShopData() {
  const globalSettingId = process.env.NEXT_PUBLIC_HYGRAPH_GLOBAL_SETTING_ID;

  if (!globalSettingId) {
    throw new Error('HYGRAPH_GLOBAL_SETTING_ID is not defined');
  }

  const [globalSettingsData, productsData, categoriesData, collectionsData] = await Promise.all([
    hygraphClient.request<{ globalSetting: GlobalSetting }>(GET_GLOBAL_SETTINGS, {
      id: globalSettingId,
    }),
    hygraphClient.request<{ products: Product[] }>(GET_ALL_PRODUCTS, { limit: 50, orderBy: 'createdAt_DESC' }),
    hygraphClient.request<{ categories: Category[] }>(GET_ALL_CATEGORIES),
    hygraphClient.request<{ collections: Collection[] }>(GET_ALL_COLLECTIONS),
  ]);

  return {
    globalSettings: globalSettingsData.globalSetting,
    products: productsData.products || [],
    categories: categoriesData.categories || [],
    collections: collectionsData.collections || [],
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
