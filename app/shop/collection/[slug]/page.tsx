import { Metadata } from 'next';
import { hygraphClient, GET_GLOBAL_SETTINGS, GET_COLLECTION_BY_SLUG, GET_ALL_CATEGORIES, GET_ALL_COLLECTIONS } from '@/app/lib/hygraph';
import { GlobalSetting, Collection, Category } from '@/app/types';
import CollectionPageClient from './CollectionPageClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function fetchCollectionData(slug: string) {
  const globalSettingId = process.env.NEXT_PUBLIC_HYGRAPH_GLOBAL_SETTING_ID;

  if (!globalSettingId) {
    throw new Error('HYGRAPH_GLOBAL_SETTING_ID is not defined');
  }

  const [globalSettingsData, collectionData, categoriesData, collectionsData] = await Promise.all([
    hygraphClient.request<{ globalSetting: GlobalSetting }>(GET_GLOBAL_SETTINGS, {
      id: globalSettingId,
    }),
    hygraphClient.request<{ collection: Collection }>(GET_COLLECTION_BY_SLUG, {
      slug,
    }),
    hygraphClient.request<{ categories: Category[] }>(GET_ALL_CATEGORIES),
    hygraphClient.request<{ collections: Collection[] }>(GET_ALL_COLLECTIONS),
  ]);

  return {
    globalSettings: globalSettingsData.globalSetting,
    collection: collectionData.collection,
    products: collectionData.collection?.products || [],
    categories: categoriesData.categories || [],
    collections: collectionsData.collections || [],
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const { collection, globalSettings } = await fetchCollectionData(slug);

    if (!collection) return {};

    const title = collection.title;
    const description = globalSettings?.siteName ? `Explore the ${collection.title} at ${globalSettings.siteName}` : undefined;

    return {
      title,
      description,
      openGraph: collection.coverImage?.url ? {
        title,
        description,
        images: [collection.coverImage.url],
      } : undefined,
    };
  } catch {
    return {};
  }
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const { globalSettings, collection, products, categories, collections } = await fetchCollectionData(slug);

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-neutral-600 dark:text-neutral-400">Collection not found</p>
      </div>
    );
  }

  return (
    <CollectionPageClient
      globalSettings={globalSettings}
      collection={collection}
      products={products}
      categories={categories}
      collections={collections}
    />
  );
}
