import { getGlobalSettings, getPageBySlug } from '@/lib/hygraph';
import { generatePageMetadata } from '@/lib/metadata';
import { NotFoundMessage } from '@/components';
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

export async function generateMetadata() {
  try {
    const { page, globalSettings } = await fetchAboutData();
    return generatePageMetadata(page, globalSettings);
  } catch {
    return generatePageMetadata(null, undefined);
  }
}

export default async function AboutPage() {
  const { globalSettings, page } = await fetchAboutData();

  if (!page) {
    return <NotFoundMessage message="Page not found" />;
  }

  return (
    <AboutPageClient
      globalSettings={globalSettings}
      page={page}
    />
  );
}
