import {
  getGlobalSettings,
  getCollectionBySlug,
  getShopFilters,
} from '@/lib/hygraph';
import { generateMetadata as generatePageMetadata, generateMetadataWithFallback } from '@/lib/metadata';
import { NotFoundMessage } from '@/components';
import { SlugPageProps } from '@/lib/types';
import CollectionPageClient from './CollectionPageClient';

async function fetchCollectionData(slug: string) {
  // Use cached fetchers - React cache will deduplicate requests
  // Optimized: Only fetch filters (categories/collections), not all products
  const [globalSettings, collection, shopFilters] = await Promise.all([
    getGlobalSettings(),
    getCollectionBySlug(slug),
    getShopFilters(),
  ]);

  return {
    globalSettings,
    collection,
    products: collection?.products || [],
    categories: shopFilters.categories,
    collections: shopFilters.collections,
  };
}

export async function generateMetadata({ params }: SlugPageProps) {
  return generateMetadataWithFallback(
    async () => {
      const { slug } = await params;
      const { collection, globalSettings } = await fetchCollectionData(slug);

      if (!collection) return generatePageMetadata({});

      return generatePageMetadata({
        title: collection.title,
        description: globalSettings?.siteName ? `Explore the ${collection.title} at ${globalSettings.siteName}` : undefined,
        ogImage: collection.coverImage?.url,
        globalSettings,
      });
    },
    generatePageMetadata({})
  );
}

export default async function CollectionPage({ params }: SlugPageProps) {
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
