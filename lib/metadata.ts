import { Metadata } from 'next';
import { GlobalSetting, Page, Seo } from './types';

const DEFAULT_SITE_NAME = 'WITH INTENT';
const DEFAULT_DESCRIPTION = 'Thoughtful goods designed with intent.';

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  ogImage?: string;
  globalSettings?: GlobalSetting;
  page?: Page;
}

export function generateMetadata({
  title,
  description,
  ogImage,
  globalSettings,
  page,
}: GenerateMetadataOptions): Metadata {
  // Priority: page SEO > explicit params > page title > default
  const pageSeo: Seo | undefined = page?.seo;
  const siteName = globalSettings?.siteName || DEFAULT_SITE_NAME;

  const metaTitle = pageSeo?.metaTitle || title || page?.title || DEFAULT_SITE_NAME;
  const metaDescription =
    pageSeo?.metaDescription ||
    description ||
    (page?.title && globalSettings?.siteName
      ? `${page.title} at ${globalSettings.siteName}`
      : DEFAULT_DESCRIPTION);

  const ogImageUrl = pageSeo?.ogImage?.url || ogImage;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      ...(ogImageUrl && { images: [ogImageUrl] }),
      siteName,
    },
  };
}

export function generatePageMetadata(
  page: Page | null,
  globalSettings?: GlobalSetting
): Metadata {
  return generateMetadata({
    page: page || undefined,
    globalSettings,
  });
}
