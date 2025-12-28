import {
  getGlobalSettings,
  getCollectionBySlug,
  getShopData,
} from '@/lib/hygraph';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { NotFoundMessage } from '@/components';
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

export async function generateMetadata({ params }: PageProps) {
  try {
    const { slug } = await params;
    const { collection, globalSettings } = await fetchCollectionData(slug);

    if (!collection) return generatePageMetadata({});

    return generatePageMetadata({
      title: collection.title,
      description: globalSettings?.siteName ? `Explore the ${collection.title} at ${globalSettings.siteName}` : undefined,
      ogImage: collection.coverImage?.url,
      globalSettings,
    });
  } catch {
    return generatePageMetadata({});
  }
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const { globalSettings, collection, products, categories, collections } = await fetchCollectionData(slug);

  if (!collection) {
    return <NotFoundMessage message="Collection not found" />;
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
