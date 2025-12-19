import { Metadata } from 'next';
import { getGlobalSettings, getPageBySlug } from '@/app/lib/hygraph';
import AboutPageClient from './AboutPageClient';

async function fetchAboutData() {
  // Use cached fetchers - React cache will deduplicate requests
  const [globalSettings, page] = await Promise.all([
    getGlobalSettings(),
    getPageBySlug('about'),
  ]);

  return {
    globalSettings,
    page,
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
