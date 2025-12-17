import { Metadata } from 'next';
import { hygraphClient, GET_GLOBAL_SETTINGS, GET_PAGE_BY_SLUG, GET_PRODUCTS_BY_COLLECTION, GET_ALL_PRODUCTS, GET_ALL_CATEGORIES } from '@/app/lib/hygraph';
import {
  GlobalSetting,
  Page,
  Product,
  ProductGridBlock,
  Category
} from '@/app/types';
import HomePageClient from './HomePageClient';

async function fetchPageData() {
  const globalSettingId = process.env.NEXT_PUBLIC_HYGRAPH_GLOBAL_SETTING_ID;

  if (!globalSettingId) {
    throw new Error('HYGRAPH_GLOBAL_SETTING_ID is not defined');
  }

  const [globalSettingsData, pageData] = await Promise.all([
    hygraphClient.request<{ globalSetting: GlobalSetting }>(GET_GLOBAL_SETTINGS, {
      id: globalSettingId,
    }),
    hygraphClient.request<{ page: Page }>(GET_PAGE_BY_SLUG, {
      slug: 'home',
    }),
  ]);

  const page = pageData.page;
  const globalSettings = globalSettingsData.globalSetting;

  // Fetch products for each ProductGridBlock
  let products: Record<string, Product[]> = {};
  let categories: Category[] = [];

  if (page.sections) {
    const productPromises = page.sections
      .filter((section): section is ProductGridBlock => 'filterCollection' in section || 'filterCategory' in section)
      .map(async (section) => {
        if (section.filterCollection?.slug) {
          const collectionData = await hygraphClient.request<{
            collections: Array<{ products: Product[] }>;
          }>(GET_PRODUCTS_BY_COLLECTION, {
            slug: section.filterCollection.slug,
            limit: section.grid?.limit,
          });

          return {
            key: section.filterCollection.slug,
            products: collectionData.collections[0]?.products || [],
          };
        } else if (section.filterCategory?.slug) {
          const allProductsData = await hygraphClient.request<{
            products: Product[];
          }>(GET_ALL_PRODUCTS, {
            limit: section.grid?.limit,
          });

          return {
            key: section.filterCategory.slug,
            products: allProductsData.products || [],
          };
        } else {
          const allProductsData = await hygraphClient.request<{
            products: Product[];
          }>(GET_ALL_PRODUCTS, {
            limit: section.grid?.limit,
          });

          return {
            key: 'all',
            products: allProductsData.products || [],
          };
        }
      });

    const productResults = await Promise.all(productPromises);
    productResults.forEach((result) => {
      products[result.key] = result.products;
    });

    // Fetch categories if any CategoryGridBlock exists
    const hasCategoryGrid = page.sections.some(
      (section): section is ProductGridBlock => 'grid' in section && (section as ProductGridBlock).grid?.kind === 'categories'
    );

    if (hasCategoryGrid) {
      const categoriesData = await hygraphClient.request<{
        categories: Category[];
      }>(GET_ALL_CATEGORIES);
      categories = categoriesData.categories || [];
    }
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

  return (
    <HomePageClient
      page={page}
      globalSettings={globalSettings}
      products={products}
      categories={categories}
    />
  );
}
