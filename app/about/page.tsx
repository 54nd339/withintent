import { Metadata } from 'next';
import { hygraphClient, GET_GLOBAL_SETTINGS, GET_PAGE_BY_SLUG } from '@/app/lib/hygraph';
import { GlobalSetting, Page } from '@/app/types';
import AboutPageClient from './AboutPageClient';

async function fetchAboutData() {
  const globalSettingId = process.env.NEXT_PUBLIC_HYGRAPH_GLOBAL_SETTING_ID;

  if (!globalSettingId) {
    throw new Error('HYGRAPH_GLOBAL_SETTING_ID is not defined');
  }

  const [globalSettingsData, pageData] = await Promise.all([
    hygraphClient.request<{ globalSetting: GlobalSetting }>(GET_GLOBAL_SETTINGS, {
      id: globalSettingId,
    }),
    hygraphClient.request<{ page: Page }>(GET_PAGE_BY_SLUG, {
      slug: 'about',
    }),
  ]);

  return {
    globalSettings: globalSettingsData.globalSetting,
    page: pageData.page,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { page, globalSettings } = await fetchAboutData();

    const title = page?.seo?.metaTitle || page?.title || 'About';
    const description = page?.seo?.metaDescription || (globalSettings?.siteName ? `Learn more about ${globalSettings.siteName}` : undefined);

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
    return { title: 'About' };
  }
}

export default async function AboutPage() {
  const { globalSettings, page } = await fetchAboutData();

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-neutral-600 dark:text-neutral-400">Page not found</p>
      </div>
    );
  }

  return (
    <AboutPageClient
      globalSettings={globalSettings}
      page={page}
    />
  );
}
