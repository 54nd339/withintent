import {
  getHomePageDataOptimized,
  getCollectionsBySlugs,
  getCategoriesBySlugs,
  processProductsForSectionsOptimized,
} from '@/lib/hygraph';
import { generatePageMetadata, generateMetadataWithFallback } from '@/lib/metadata';
import { Product, ProductGridBlock } from '@/lib/types';
import { createMapByKey } from '@/lib/utils';
import { NotFoundMessage } from '@/components';
import HomePageClient from './HomePageClient';

async function fetchPageData() {
  // Optimized: Fetch page and global settings without all products
  const { globalSettings, page, categories } = await getHomePageDataOptimized('home');

  let products: Record<string, Product[]> = {};

  if (page?.sections) {
    // Collect all unique collection and category slugs that need to be fetched
    const collectionSlugs = page.sections
      .filter((section): section is ProductGridBlock => 'filterCollection' in section)
      .map((section) => section.filterCollection?.slug)
      .filter((slug): slug is string => !!slug);

    const categorySlugs = page.sections
      .filter((section): section is ProductGridBlock => 'filterCategory' in section)
      .map((section) => section.filterCategory?.slug)
      .filter((slug): slug is string => !!slug);

    // Bulk fetch only the collections and categories needed for ProductGridBlocks
    const [collections, categoriesWithProducts] = await Promise.all([
      getCollectionsBySlugs(collectionSlugs),
      getCategoriesBySlugs(categorySlugs),
    ]);

    const collectionsBySlug = createMapByKey(collections, (col) => col.slug);
    const categoriesBySlug = createMapByKey(categoriesWithProducts, (cat) => cat.slug);

    // Process products for each section using the on-demand fetched data
    products = processProductsForSectionsOptimized(
      page.sections,
      collectionsBySlug,
      categoriesBySlug
    );
  }

  return { page, globalSettings, products, categories };
}

export async function generateMetadata() {
  return generateMetadataWithFallback(
    async () => {
      const { page, globalSettings } = await fetchPageData();
      return generatePageMetadata(page, globalSettings);
    },
    generatePageMetadata(null)
  );
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
