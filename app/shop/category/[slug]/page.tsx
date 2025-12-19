import { Metadata } from 'next';
import {
  getGlobalSettings,
  getCategoryBySlug,
  getShopData,
} from '@/app/lib/hygraph';
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const { category, globalSettings } = await fetchCategoryData(slug);

    if (!category) return {};

    const title = category.name;
    const description = globalSettings?.siteName ? `Browse ${category.name} at ${globalSettings.siteName}` : undefined;

    return {
      title,
      description,
      openGraph: category.coverImage?.url ? {
        title,
        description,
        images: [category.coverImage.url],
      } : undefined,
    };
  } catch {
    return {};
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const { globalSettings, category, products, categories, collections } = await fetchCategoryData(slug);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-neutral-600 dark:text-neutral-400">Category not found</p>
      </div>
    );
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
