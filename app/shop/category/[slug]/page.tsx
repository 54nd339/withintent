import {
  getGlobalSettings,
  getCategoryBySlug,
  getShopFilters,
} from '@/lib/hygraph';
import { generateMetadata as generatePageMetadata, generateMetadataWithFallback } from '@/lib/metadata';
import { NotFoundMessage } from '@/components';
import { SlugPageProps } from '@/lib/types';
import CategoryPageClient from './CategoryPageClient';

async function fetchCategoryData(slug: string) {
  // Use cached fetchers - React cache will deduplicate requests
  // Optimized: Only fetch filters (categories/collections), not all products
  const [globalSettings, category, shopFilters] = await Promise.all([
    getGlobalSettings(),
    getCategoryBySlug(slug),
    getShopFilters(),
  ]);

  return {
    globalSettings,
    category,
    products: category?.products || [],
    categories: shopFilters.categories,
    collections: shopFilters.collections,
  };
}

export async function generateMetadata({ params }: SlugPageProps) {
  return generateMetadataWithFallback(
    async () => {
      const { slug } = await params;
      const { category, globalSettings } = await fetchCategoryData(slug);

      if (!category) return generatePageMetadata({});

      return generatePageMetadata({
        title: category.name,
        description: globalSettings?.siteName ? `Browse ${category.name} at ${globalSettings.siteName}` : undefined,
        ogImage: category.coverImage?.url,
        globalSettings,
      });
    },
    generatePageMetadata({})
  );
}

export default async function CategoryPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const { globalSettings, category, products, categories, collections } = await fetchCategoryData(slug);

  if (!category) {
    return <NotFoundMessage message="Category not found" />;
  }

  return (
    <CategoryPageClient
      globalSettings={globalSettings}
      category={category}
      products={products}
      categories={categories}
      collections={collections}
    />
  );
}
