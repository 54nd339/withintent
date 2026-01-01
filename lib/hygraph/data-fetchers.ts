import { hygraphClient } from './hygraph';
import { createCachedFetcher } from './cache-wrapper';
import { CACHE_REVALIDATE } from '@/lib/constants';
import {
  GET_GLOBAL_SETTINGS,
  GET_PAGE_BY_SLUG,
  GET_SHOP_DATA,
  GET_SHOP_FILTERS,
  GET_HOME_PAGE_DATA_OPTIMIZED,
  GET_COLLECTIONS_BY_SLUGS,
  GET_CATEGORIES_BY_SLUGS,
  GET_COLLECTION_BY_SLUG,
  GET_CATEGORY_BY_SLUG,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_SLUG,
  GET_ALL_COLLECTIONS,
  GET_ALL_CATEGORIES,
} from './queries';
import {
  GlobalSetting,
  Page,
  Product,
  Category,
  Collection,
  ProductGridBlock,
  BaseSection,
  Asset,
} from '@/lib/types';
import { generateBlurPlaceholder } from '@/lib/utils';

// -------- Blur helpers --------
const blurCache = new Map<string, Promise<string>>();

async function getBlur(url: string): Promise<string> {
  if (blurCache.has(url)) return blurCache.get(url)!;
  const promise = generateBlurPlaceholder(url);
  blurCache.set(url, promise);
  return promise;
}

async function addBlurToAsset(asset?: Asset | null): Promise<Asset | undefined> {
  if (!asset?.url) return asset ?? undefined;
  if (asset.blurDataURL) return asset;
  const blurDataURL = await getBlur(asset.url);
  return { ...asset, blurDataURL };
}

async function addBlurToAssets(
  assets?: (Asset | null)[] | null,
  options?: { firstOnly?: boolean }
): Promise<Asset[] | undefined> {
  if (!assets) return undefined;
  const filtered = assets.filter((a): a is Asset => Boolean(a?.url));
  if (filtered.length === 0) return [];

  if (options?.firstOnly) {
    const [first, ...rest] = filtered;
    const firstWithBlur = (await addBlurToAsset(first)) ?? first;
    return [firstWithBlur, ...rest];
  }

  return Promise.all(filtered.map(async (asset) => (await addBlurToAsset(asset)) ?? asset));
}

async function addBlurToProduct(product: Product | null): Promise<Product | null> {
  if (!product) return null;
  const mainImage = await addBlurToAsset(product.mainImage);
  const galleryImages = await addBlurToAssets(product.galleryImages, { firstOnly: true });

  const relatedProducts = product.relatedProducts
    ? await Promise.all(
        product.relatedProducts.map(async (p) => ({
          ...p,
          mainImage: await addBlurToAsset(p.mainImage),
          galleryImages: await addBlurToAssets(p.galleryImages, { firstOnly: true }),
        }))
      )
    : undefined;

  return {
    ...product,
    mainImage,
    galleryImages,
    relatedProducts,
  };
}

async function addBlurToProducts(products: Product[]): Promise<Product[]> {
  return Promise.all(products.map((p) => addBlurToProduct(p))) as Promise<Product[]>;
}

async function addBlurToCategories(categories: Category[]): Promise<Category[]> {
  return Promise.all(
    categories.map(async (category) => ({
      ...category,
      coverImage: await addBlurToAsset(category.coverImage),
      products: category.products ? await addBlurToProducts(category.products) : undefined,
    }))
  );
}

async function addBlurToCollections(collections: Collection[]): Promise<Collection[]> {
  return Promise.all(
    collections.map(async (collection) => ({
      ...collection,
      coverImage: await addBlurToAsset(collection.coverImage),
      products: collection.products ? await addBlurToProducts(collection.products) : undefined,
    }))
  );
}

const globalSettingId = process.env.HYGRAPH_GLOBAL_SETTING_ID;

if (!globalSettingId) {
  throw new Error('HYGRAPH_GLOBAL_SETTING_ID is not defined');
}

// Cache configuration
const CACHE_TAG_GLOBAL_SETTINGS = 'hygraph:global-settings';
const CACHE_TAG_PAGES = 'hygraph:pages';
const CACHE_TAG_SHOP_DATA = 'hygraph:shop-data';
const CACHE_TAG_COLLECTIONS = 'hygraph:collections';
const CACHE_TAG_CATEGORIES = 'hygraph:categories';

/**
 * Cached global settings fetcher
 */
const _getGlobalSettingsUncached = async (): Promise<GlobalSetting> => {
  const data = await hygraphClient.request<{ globalSetting: GlobalSetting }>(
    GET_GLOBAL_SETTINGS,
    { id: globalSettingId }
  );
  return data.globalSetting;
};

export const getGlobalSettings = createCachedFetcher(
  _getGlobalSettingsUncached,
  () => ({
    key: 'global-settings',
    tags: [CACHE_TAG_GLOBAL_SETTINGS],
    revalidate: CACHE_REVALIDATE.GLOBAL_SETTINGS,
  })
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

export const getPageBySlug = createCachedFetcher(
  _getPageBySlugUncached,
  (slug: string) => ({
    key: `page-${slug}`,
    tags: [CACHE_TAG_PAGES, `page-${slug}`],
    revalidate: CACHE_REVALIDATE.PAGES,
  })
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
    products: await addBlurToProducts(data.products || []),
    categories: await addBlurToCategories(data.categories || []),
    collections: await addBlurToCollections(data.collections || []),
  };
};

export const getShopData = createCachedFetcher(
  _getShopDataUncached,
  (productLimit: number = 50) => ({
    key: `shop-data-${productLimit}`,
    tags: [CACHE_TAG_SHOP_DATA, CACHE_TAG_COLLECTIONS, CACHE_TAG_CATEGORIES],
    revalidate: CACHE_REVALIDATE.PRODUCTS,
  })
);

/**
 * Optimized shop filters fetcher - only categories and collections, no products
 * Use this when you only need filter options, not product data
 */
const _getShopFiltersUncached = async (): Promise<{
  categories: Category[];
  collections: Collection[];
}> => {
  const data = await hygraphClient.request<{
    categories: Category[];
    collections: Collection[];
  }>(GET_SHOP_FILTERS);

  return {
    categories: data.categories || [],
    collections: data.collections || [],
  };
};

export const getShopFilters = createCachedFetcher(
  _getShopFiltersUncached,
  () => ({
    key: 'shop-filters',
    tags: [CACHE_TAG_COLLECTIONS, CACHE_TAG_CATEGORIES],
    revalidate: CACHE_REVALIDATE.CATEGORIES, // Categories/collections rarely change
  })
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
  const collection = data.collection;
  if (!collection) return collection;
  return {
    ...collection,
    coverImage: await addBlurToAsset(collection.coverImage),
    products: collection.products ? await addBlurToProducts(collection.products) : undefined,
  };
};

export const getCollectionBySlug = createCachedFetcher(
  _getCollectionBySlugUncached,
  (slug: string) => ({
    key: `collection-${slug}`,
    tags: [CACHE_TAG_COLLECTIONS, `collection-${slug}`],
    revalidate: CACHE_REVALIDATE.COLLECTIONS,
  })
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
  const category = data.category;
  if (!category) return category;
  return {
    ...category,
    coverImage: await addBlurToAsset(category.coverImage),
    products: category.products ? await addBlurToProducts(category.products) : undefined,
  };
};

export const getCategoryBySlug = createCachedFetcher(
  _getCategoryBySlugUncached,
  (slug: string) => ({
    key: `category-${slug}`,
    tags: [CACHE_TAG_CATEGORIES, `category-${slug}`],
    revalidate: CACHE_REVALIDATE.CATEGORIES,
  })
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
  return addBlurToCollections(data.collections || []);
};

export const getCollectionsBySlugs = createCachedFetcher(
  _getCollectionsBySlugsUncached,
  (slugs: string[]) => {
    const sortedSlugs = [...slugs].sort().join(',');
    return {
      key: `collections-${sortedSlugs}`,
      tags: [CACHE_TAG_COLLECTIONS, ...slugs.map((s) => `collection-${s}`)],
      revalidate: CACHE_REVALIDATE.COLLECTIONS,
    };
  }
);

/**
 * Bulk fetch categories by slugs with products
 */
const _getCategoriesBySlugsUncached = async (
  slugs: string[]
): Promise<Category[]> => {
  if (slugs.length === 0) return [];

  const data = await hygraphClient.request<{ categories: Category[] }>(
    GET_CATEGORIES_BY_SLUGS,
    { slugs }
  );
  return addBlurToCategories(data.categories || []);
};

export const getCategoriesBySlugs = createCachedFetcher(
  _getCategoriesBySlugsUncached,
  (slugs: string[]) => {
    const sortedSlugs = [...slugs].sort().join(',');
    return {
      key: `categories-${sortedSlugs}`,
      tags: [CACHE_TAG_CATEGORIES, ...slugs.map((s) => `category-${s}`)],
      revalidate: CACHE_REVALIDATE.CATEGORIES,
    };
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
  return addBlurToProducts(data.products || []);
};

export const getAllProducts = createCachedFetcher(
  _getAllProductsUncached,
  (limit?: number) => ({
    key: `products-${limit ?? 'all'}`,
    tags: [CACHE_TAG_SHOP_DATA],
    revalidate: CACHE_REVALIDATE.PRODUCTS,
  })
);

/**
 * Fetch product by slug with caching
 */
const _getProductBySlugUncached = async (slug: string): Promise<Product | null> => {
  const data = await hygraphClient.request<{ product: Product | null }>(
    GET_PRODUCT_BY_SLUG,
    { slug }
  );
  return addBlurToProduct(data.product);
};

export const getProductBySlug = createCachedFetcher(
  _getProductBySlugUncached,
  (slug: string) => ({
    key: `product-${slug}`,
    tags: [CACHE_TAG_SHOP_DATA],
    revalidate: CACHE_REVALIDATE.PRODUCTS,
  })
);

/**
 * Fetch all collections with caching
 */
const _getAllCollectionsUncached = async (): Promise<Collection[]> => {
  const data = await hygraphClient.request<{ collections: Collection[] }>(
    GET_ALL_COLLECTIONS
  );
  return data.collections || [];
};

export const getAllCollections = createCachedFetcher(
  _getAllCollectionsUncached,
  () => ({
    key: 'all-collections',
    tags: [CACHE_TAG_COLLECTIONS],
    revalidate: CACHE_REVALIDATE.COLLECTIONS,
  })
);

/**
 * Fetch all categories with caching
 */
const _getAllCategoriesUncached = async (): Promise<Category[]> => {
  const data = await hygraphClient.request<{ categories: Category[] }>(
    GET_ALL_CATEGORIES
  );
  return data.categories || [];
};

export const getAllCategories = createCachedFetcher(
  _getAllCategoriesUncached,
  () => ({
    key: 'all-categories',
    tags: [CACHE_TAG_CATEGORIES],
    revalidate: CACHE_REVALIDATE.CATEGORIES,
  })
);


/**
 * Optimized home page data fetcher - only fetches products for specific sections
 * This avoids fetching all products upfront, improving performance as inventory grows
 */
const _getHomePageDataOptimizedUncached = async (
  pageSlug: string = 'home'
): Promise<{
  globalSettings: GlobalSetting;
  page: Page | null;
  categories: Category[];
}> => {
  const data = await hygraphClient.request<{
    globalSetting: GlobalSetting;
    page: Page;
    categories: Category[];
  }>(GET_HOME_PAGE_DATA_OPTIMIZED, {
    globalSettingId,
    pageSlug,
  });

  return {
    globalSettings: data.globalSetting,
    page: data.page || null,
    categories: data.categories || [],
  };
};

export const getHomePageDataOptimized = createCachedFetcher(
  _getHomePageDataOptimizedUncached,
  (pageSlug: string = 'home') => ({
    key: `home-page-optimized-${pageSlug}`,
    tags: [
      CACHE_TAG_GLOBAL_SETTINGS,
      CACHE_TAG_PAGES,
      `page-${pageSlug}`,
      CACHE_TAG_CATEGORIES,
    ],
    revalidate: CACHE_REVALIDATE.PAGES,
  })
);


/**
 * Get products for a ProductGridBlock section from collections/categories maps
 */
function getProductsForSection(
  section: ProductGridBlock,
  collectionsBySlug: Map<string, Collection>,
  categoriesBySlug: Map<string, Category>
): Product[] {
  if (section.filterCollection?.slug) {
    const collection = collectionsBySlug.get(section.filterCollection.slug);
    return collection?.products || [];
  }

  if (section.filterCategory?.slug) {
    const category = categoriesBySlug.get(section.filterCategory.slug);
    return category?.products || [];
  }

  // For "all products" sections, we'd need to fetch products separately
  // For now, return empty array - can be enhanced if needed
  return [];
}

/**
 * Apply product limit if specified
 */
function applyProductLimit(products: Product[], limit?: number | null): Product[] {
  if (limit && limit > 0) {
    return products.slice(0, limit);
  }
  return products;
}

/**
 * Generate cache key for products based on section filters
 */
function getProductSectionKey(section: ProductGridBlock): string {
  return section.filterCollection?.slug ||
    section.filterCategory?.slug ||
    'all';
}

/**
 * Process products for ProductGridBlocks from on-demand fetched data
 * Only fetches products for specific collections/categories, not all products
 */
export function processProductsForSectionsOptimized(
  sections: BaseSection[],
  collectionsBySlug: Map<string, Collection>,
  categoriesBySlug: Map<string, Category>
): Record<string, Product[]> {
  const products: Record<string, Product[]> = {};

  const productGridBlocks = sections.filter(
    (section): section is ProductGridBlock =>
      'filterCollection' in section || 'filterCategory' in section
  );

  for (const section of productGridBlocks) {
    const sectionProducts = getProductsForSection(section, collectionsBySlug, categoriesBySlug);
    const limitedProducts = applyProductLimit(sectionProducts, section.grid?.limit);
    const key = getProductSectionKey(section);
    products[key] = limitedProducts;
  }

  return products;
}
