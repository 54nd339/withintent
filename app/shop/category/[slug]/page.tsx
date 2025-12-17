import { Metadata } from 'next';
import { hygraphClient, GET_GLOBAL_SETTINGS, GET_CATEGORY_BY_SLUG, GET_ALL_CATEGORIES, GET_ALL_COLLECTIONS } from '@/app/lib/hygraph';
import { GlobalSetting, Category, Collection } from '@/app/types';
import CategoryPageClient from './CategoryPageClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function fetchCategoryData(slug: string) {
  const globalSettingId = process.env.NEXT_PUBLIC_HYGRAPH_GLOBAL_SETTING_ID;

  if (!globalSettingId) {
    throw new Error('HYGRAPH_GLOBAL_SETTING_ID is not defined');
  }

  const [globalSettingsData, categoryData, categoriesData, collectionsData] = await Promise.all([
    hygraphClient.request<{ globalSetting: GlobalSetting }>(GET_GLOBAL_SETTINGS, {
      id: globalSettingId,
    }),
    hygraphClient.request<{ category: Category }>(GET_CATEGORY_BY_SLUG, {
      slug,
    }),
    hygraphClient.request<{ categories: Category[] }>(GET_ALL_CATEGORIES),
    hygraphClient.request<{ collections: Collection[] }>(GET_ALL_COLLECTIONS),
  ]);

  return {
    globalSettings: globalSettingsData.globalSetting,
    category: categoryData.category,
    products: categoryData.category?.products || [],
    categories: categoriesData.categories || [],
    collections: collectionsData.collections || [],
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
