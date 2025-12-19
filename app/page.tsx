import { Metadata } from 'next';
import {
  getHomePageData,
  getCollectionsBySlugs,
  processProductsForSections,
} from '@/app/lib/hygraph';
import { Product, ProductGridBlock } from '@/app/types';
import HomePageClient from './HomePageClient';

async function fetchPageData() {
  // Use bulk query to fetch global settings, page, products, and categories in one request
  const { globalSettings, page, allProducts, categories } = await getHomePageData('home');

  let products: Record<string, Product[]> = {};

  if (page?.sections) {
    // Collect all unique collection slugs that need to be fetched
    const collectionSlugs = page.sections
      .filter((section): section is ProductGridBlock => 'filterCollection' in section)
      .map((section) => section.filterCollection?.slug)
      .filter((slug): slug is string => !!slug);

    // Bulk fetch all needed collections in one request
    const collections = await getCollectionsBySlugs(collectionSlugs);
    const collectionsBySlug = new Map(
      collections.map((col) => [col.slug, col])
    );

    // Process products for each section using the bulk fetched data
    products = processProductsForSections(
      page.sections,
      allProducts,
      collectionsBySlug
    );
  }

  return { page, globalSettings, products, categories };
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { page, globalSettings } = await fetchPageData();

    const title = page?.seo?.metaTitle || page?.title || undefined;
    const description = page?.seo?.metaDescription || (globalSettings?.siteName ? `Welcome to ${globalSettings.siteName}` : undefined);

    return {
      title,
      description,
      openGraph: page?.seo?.ogImage?.url ? {
        title,
        description,
        images: [page.seo.ogImage.url],
      } : undefined,
    };
  } catch {
    return {};
  }
}

export default async function HomePage() {
  const { page, globalSettings, products, categories } = await fetchPageData();

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-neutral-600 dark:text-neutral-400">Page not found</p>
      </div>
    );
  }

  return (
    <HomePageClient
      page={page}
      globalSettings={globalSettings}
      products={products}
      categories={categories}
    />
  );
}
