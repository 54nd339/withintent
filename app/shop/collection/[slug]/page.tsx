import { Metadata } from 'next';
import {
  getGlobalSettings,
  getCollectionBySlug,
  getShopData,
} from '@/app/lib/hygraph';
import CollectionPageClient from './CollectionPageClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function fetchCollectionData(slug: string) {
  // Use cached fetchers - React cache will deduplicate requests
  const [globalSettings, collection, shopData] = await Promise.all([
    getGlobalSettings(),
    getCollectionBySlug(slug),
    getShopData(50),
  ]);

  return {
    globalSettings,
    collection,
    products: collection?.products || [],
    categories: shopData.categories,
    collections: shopData.collections,
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
