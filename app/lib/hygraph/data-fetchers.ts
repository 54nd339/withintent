import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { hygraphClient } from './hygraph';
import {
  GET_GLOBAL_SETTINGS,
  GET_PAGE_BY_SLUG,
  GET_SHOP_DATA,
  GET_HOME_PAGE_DATA,
  GET_COLLECTIONS_BY_SLUGS,
  GET_COLLECTION_BY_SLUG,
  GET_CATEGORY_BY_SLUG,
  GET_ALL_PRODUCTS,
} from './queries';
import {
  GlobalSetting,
  Page,
  Product,
  Category,
  Collection,
  ProductGridBlock,
} from '@/app/types';

const globalSettingId = process.env.NEXT_PUBLIC_HYGRAPH_GLOBAL_SETTING_ID;

if (!globalSettingId) {
  throw new Error('NEXT_PUBLIC_HYGRAPH_GLOBAL_SETTING_ID is not defined');
}

// Cache configuration
const CACHE_TAG_GLOBAL_SETTINGS = 'hygraph:global-settings';
const CACHE_TAG_PAGES = 'hygraph:pages';
const CACHE_TAG_SHOP_DATA = 'hygraph:shop-data';
const CACHE_TAG_COLLECTIONS = 'hygraph:collections';
const CACHE_TAG_CATEGORIES = 'hygraph:categories';
const CACHE_REVALIDATE = 3600; // 1 hour

/**
 * Cached global settings fetcher
 * Uses React cache for request deduplication within a single request
 * and Next.js unstable_cache for persistent caching across requests
 */
const _getGlobalSettingsUncached = async (): Promise<GlobalSetting> => {
  const data = await hygraphClient.request<{ globalSetting: GlobalSetting }>(
    GET_GLOBAL_SETTINGS,
    { id: globalSettingId }
  );
  return data.globalSetting;
};

export const getGlobalSettings = cache(
  unstable_cache(
    _getGlobalSettingsUncached,
    ['global-settings'],
    {
      tags: [CACHE_TAG_GLOBAL_SETTINGS],
      revalidate: CACHE_REVALIDATE,
    }
  )
);

/**
 * Cached page fetcher
 */
const _getPageBySlugUncached = async (slug: string): Promise<Page | null> => {
  const data = await hygraphClient.request<{ page: Page }>(GET_PAGE_BY_SLUG, {
    slug,
  });
  return data.page;
};

export const getPageBySlug = cache(
  (slug: string) =>
    unstable_cache(
      () => _getPageBySlugUncached(slug),
      [`page-${slug}`],
      {
        tags: [CACHE_TAG_PAGES, `page-${slug}`],
        revalidate: CACHE_REVALIDATE,
      }
    )()
);

/**
 * Cached shop data fetcher (products, categories, collections)
 */
const _getShopDataUncached = async (
  productLimit: number = 50
): Promise<{
  products: Product[];
  categories: Category[];
  collections: Collection[];
}> => {
  const data = await hygraphClient.request<{
    products: Product[];
    categories: Category[];
    collections: Collection[];
  }>(GET_SHOP_DATA, { productLimit });

  return {
    products: data.products || [],
    categories: data.categories || [],
    collections: data.collections || [],
  };
};

export const getShopData = cache(
  (productLimit: number = 50) =>
    unstable_cache(
      () => _getShopDataUncached(productLimit),
      [`shop-data-${productLimit}`],
      {
        tags: [CACHE_TAG_SHOP_DATA, CACHE_TAG_COLLECTIONS, CACHE_TAG_CATEGORIES],
        revalidate: CACHE_REVALIDATE,
      }
    )()
);

/**
 * Cached collection fetcher
 */
const _getCollectionBySlugUncached = async (
  slug: string
): Promise<Collection | null> => {
  const data = await hygraphClient.request<{ collection: Collection }>(
    GET_COLLECTION_BY_SLUG,
    { slug }
  );
  return data.collection;
};

export const getCollectionBySlug = cache(
  (slug: string) =>
    unstable_cache(
      () => _getCollectionBySlugUncached(slug),
      [`collection-${slug}`],
      {
        tags: [CACHE_TAG_COLLECTIONS, `collection-${slug}`],
        revalidate: CACHE_REVALIDATE,
      }
    )()
);

/**
 * Cached category fetcher
 */
const _getCategoryBySlugUncached = async (
  slug: string
): Promise<Category | null> => {
  const data = await hygraphClient.request<{ category: Category }>(
    GET_CATEGORY_BY_SLUG,
    { slug }
  );
  return data.category;
};

export const getCategoryBySlug = cache(
  (slug: string) =>
    unstable_cache(
      () => _getCategoryBySlugUncached(slug),
      [`category-${slug}`],
      {
        tags: [CACHE_TAG_CATEGORIES, `category-${slug}`],
        revalidate: CACHE_REVALIDATE,
      }
    )()
);

/**
 * Bulk fetch collections by slugs
 */
const _getCollectionsBySlugsUncached = async (
  slugs: string[]
): Promise<Collection[]> => {
  if (slugs.length === 0) return [];

  const data = await hygraphClient.request<{ collections: Collection[] }>(
    GET_COLLECTIONS_BY_SLUGS,
    { slugs }
  );
  return data.collections || [];
};

export const getCollectionsBySlugs = cache(
  (slugs: string[]) => {
    const sortedSlugs = [...slugs].sort().join(',');
    return unstable_cache(
      () => _getCollectionsBySlugsUncached(slugs),
      [`collections-${sortedSlugs}`],
      {
        tags: [CACHE_TAG_COLLECTIONS, ...slugs.map((s) => `collection-${s}`)],
        revalidate: CACHE_REVALIDATE,
      }
    )();
  }
);

/**
 * Fetch all products with caching
 */
const _getAllProductsUncached = async (
  limit?: number
): Promise<Product[]> => {
  const data = await hygraphClient.request<{ products: Product[] }>(
    GET_ALL_PRODUCTS,
    { limit }
  );
  return data.products || [];
};

export const getAllProducts = cache(
  (limit?: number) =>
    unstable_cache(
      () => _getAllProductsUncached(limit),
      [`products-${limit ?? 'all'}`],
      {
        tags: [CACHE_TAG_SHOP_DATA],
        revalidate: CACHE_REVALIDATE,
      }
    )()
);

/**
 * Fetch home page data with bulk query and caching
 * This fetches global settings, page, products, and categories in one request
 */
const _getHomePageDataUncached = async (
  pageSlug: string = 'home'
): Promise<{
  globalSettings: GlobalSetting;
  page: Page | null;
  allProducts: Product[];
  categories: Category[];
}> => {
  const data = await hygraphClient.request<{
    globalSetting: GlobalSetting;
    page: Page;
    products: Product[];
    categories: Category[];
  }>(GET_HOME_PAGE_DATA, {
    globalSettingId,
    pageSlug,
    productLimit: 100, // Fetch more products upfront for filtering
  });

  return {
    globalSettings: data.globalSetting,
    page: data.page || null,
    allProducts: data.products || [],
    categories: data.categories || [],
  };
};

export const getHomePageData = cache(
  (pageSlug: string = 'home') =>
    unstable_cache(
      () => _getHomePageDataUncached(pageSlug),
      [`home-page-${pageSlug}`],
      {
        tags: [
          CACHE_TAG_GLOBAL_SETTINGS,
          CACHE_TAG_PAGES,
          `page-${pageSlug}`,
          CACHE_TAG_SHOP_DATA,
          CACHE_TAG_CATEGORIES,
        ],
        revalidate: CACHE_REVALIDATE,
      }
    )()
);

/**
 * Process products for ProductGridBlocks from bulk fetched data
 */
export function processProductsForSections(
  sections: any[],
  allProducts: Product[],
  collectionsBySlug: Map<string, Collection>
): Record<string, Product[]> {
  const products: Record<string, Product[]> = {};

  const productGridBlocks = sections.filter(
    (section): section is ProductGridBlock =>
      'filterCollection' in section || 'filterCategory' in section
  );

  for (const section of productGridBlocks) {
    const limit = section.grid?.limit;
    let sectionProducts: Product[] = [];

    if (section.filterCollection?.slug) {
      const collection = collectionsBySlug.get(section.filterCollection.slug);
      sectionProducts = collection?.products || [];
    } else if (section.filterCategory?.slug) {
      sectionProducts = allProducts.filter((product) =>
        product.categories?.some((cat) => cat.slug === section.filterCategory?.slug)
      );
    } else {
      sectionProducts = allProducts;
    }

    // Apply limit
    if (limit && limit > 0) {
      sectionProducts = sectionProducts.slice(0, limit);
    }

    const key =
      section.filterCollection?.slug ||
      section.filterCategory?.slug ||
      'all';
    products[key] = sectionProducts;
  }

  return products;
}

