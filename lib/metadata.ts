import { Metadata } from 'next';
import { GlobalSetting, Page, Seo } from './types';

const DEFAULT_SITE_NAME = 'WITH INTENT';
const DEFAULT_DESCRIPTION = 'Thoughtful goods designed with intent.';
const DEFAULT_OG_IMAGE = '/og.png';

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
  // Priority: page SEO > explicit params > default SEO > page title > defaults
  const pageSeo: Seo | undefined = page?.seo;
  const defaultSeo: Seo | undefined = globalSettings?.defaultSeo;
  const siteName = globalSettings?.siteName || DEFAULT_SITE_NAME;

  const metaTitle = 
    pageSeo?.metaTitle || 
    title || 
    defaultSeo?.metaTitle ||
    page?.title || 
    DEFAULT_SITE_NAME;
    
  const metaDescription =
    pageSeo?.metaDescription ||
    description ||
    defaultSeo?.metaDescription ||
    (page?.title && globalSettings?.siteName
      ? `${page.title} at ${globalSettings.siteName}`
      : DEFAULT_DESCRIPTION);

  // Priority: page SEO > explicit param > default SEO > fallback to default og:image
  const ogImageUrl = 
    pageSeo?.ogImage?.url || 
    ogImage || 
    defaultSeo?.ogImage?.url ||
    DEFAULT_OG_IMAGE;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: [{ url: ogImageUrl }],
      siteName,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [ogImageUrl],
    },
    ...(defaultSeo?.noIndex && { robots: { index: false, follow: false } }),
  };
}

export function generatePageMetadata(
  pageOrOptions: Page | null | GenerateMetadataOptions,
  globalSettings?: GlobalSetting
): Metadata {
  if (pageOrOptions && typeof pageOrOptions === 'object' && 'title' in pageOrOptions) {
    return generateMetadata(pageOrOptions as GenerateMetadataOptions);
  }
  
  return generateMetadata({
    page: (pageOrOptions as Page | null) || undefined,
    globalSettings,
  });
}

/**
 * Helper function to generate metadata with error handling
 * Wraps metadata generation in try-catch and provides fallback
 */
export async function generateMetadataWithFallback(
  generator: () => Promise<Metadata>,
  fallback: Metadata
): Promise<Metadata> {
  try {
    return await generator();
  } catch {
    return fallback;
  }
}
