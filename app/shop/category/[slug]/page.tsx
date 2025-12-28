import {
  getGlobalSettings,
  getCategoryBySlug,
  getShopData,
} from '@/lib/hygraph';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { NotFoundMessage } from '@/components';
import CategoryPageClient from './CategoryPageClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function fetchCategoryData(slug: string) {
  // Use cached fetchers - React cache will deduplicate requests
  const [globalSettings, category, shopData] = await Promise.all([
    getGlobalSettings(),
    getCategoryBySlug(slug),
    getShopData(50),
  ]);

  return {
    globalSettings,
    category,
    products: category?.products || [],
    categories: shopData.categories,
    collections: shopData.collections,
  };
}

export async function generateMetadata({ params }: PageProps) {
  try {
    const { slug } = await params;
    const { category, globalSettings } = await fetchCategoryData(slug);

    if (!category) return generatePageMetadata({});

    return generatePageMetadata({
      title: category.name,
      description: globalSettings?.siteName ? `Browse ${category.name} at ${globalSettings.siteName}` : undefined,
      ogImage: category.coverImage?.url,
      globalSettings,
    });
  } catch {
    return generatePageMetadata({});
  }
}

export default async function CategoryPage({ params }: PageProps) {
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
