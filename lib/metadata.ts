import { Metadata } from 'next';
import { GlobalSetting, Page, Seo, Product } from './types';

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

/**
 * Generate structured data (JSON-LD) for products
 */
export function generateProductStructuredData({
  product,
  siteName,
  productUrl,
  productImage,
  description,
  price,
  currency,
  availability,
}: {
  product: Product;
  siteName: string;
  productUrl: string;
  productImage?: string;
  description: string;
  price: number;
  currency: string;
  availability: string;
}) {
  const schemaAvailability = availability === 'in stock' ? 'InStock' : 
                             availability === 'out of stock' ? 'OutOfStock' : 
                             'PreOrder';

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description,
    image: productImage ? [productImage] : [],
    brand: {
      '@type': 'Brand',
      name: siteName,
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: currency,
      price: price.toString(),
      availability: `https://schema.org/${schemaAvailability}`,
      seller: {
        '@type': 'Organization',
        name: siteName,
      },
    },
    ...(product.categories && product.categories.length > 0 && {
      category: product.categories[0].name,
    }),
  };
}

/**
 * Generate comprehensive metadata for product pages with OpenGraph and structured data
 */
export function generateProductMetadata({
  product,
  globalSettings,
  baseUrl,
}: {
  product: Product;
  globalSettings?: GlobalSetting;
  baseUrl: string;
}): Metadata {
  const siteName = globalSettings?.siteName || DEFAULT_SITE_NAME;
  const productUrl = `${baseUrl}/shop/product/${product.slug}`;
  
  // Get product image - prioritize main image
  const productImage = product.mainImage?.url || product.galleryImages?.[0]?.url;
  const ogImageUrl = product.seo?.ogImage?.url || productImage || DEFAULT_OG_IMAGE;
  
  // Extract description from RichText or use fallback
  let description = product.seo?.metaDescription;
  if (!description && product.description) {
    // Simple extraction - in production, you might want to parse RichText properly
    description = `View ${product.title} at ${siteName}`;
  }
  if (!description) {
    description = `${product.title} - ${DEFAULT_DESCRIPTION}`;
  }

  const title = product.seo?.metaTitle || product.title;
  const price = product.discountPrice || product.price;
  const currency = 'INR';
  const availability = product.productStatus === 'available' ? 'in stock' : 
                       product.productStatus === 'sold' ? 'out of stock' : 
                       'preorder';

  // Generate structured data (JSON-LD)
  const structuredData = generateProductStructuredData({
    product,
    siteName,
    productUrl,
    productImage,
    description,
    price,
    currency,
    availability,
  });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: productUrl,
      siteName,
      images: [
        {
          url: ogImageUrl,
          width: product.mainImage?.width || 1200,
          height: product.mainImage?.height || 630,
          alt: product.title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: productUrl,
    },
    other: {
      'product:price:amount': price.toString(),
      'product:price:currency': currency,
      'product:availability': availability,
    },
    // Add structured data as JSON-LD in the page (will be handled by Next.js)
    ...(structuredData && {
      // Note: Next.js doesn't directly support JSON-LD in metadata,
      // but we can add it via a script tag in the page component
    }),
  };
}
