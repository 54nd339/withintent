import {
  getHomePageData,
  getCollectionsBySlugs,
  processProductsForSections,
} from '@/lib/hygraph';
import { generatePageMetadata } from '@/lib/metadata';
import { Product, ProductGridBlock } from '@/lib/types';
import { NotFoundMessage } from '@/components';
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

export async function generateMetadata() {
  try {
    const { page, globalSettings } = await fetchPageData();
    return generatePageMetadata(page, globalSettings);
  } catch {
    return generatePageMetadata(null);
  }
}

export default async function HomePage() {
  const { page, globalSettings, products, categories } = await fetchPageData();

  if (!page) {
    return <NotFoundMessage message="Page not found" />;
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
