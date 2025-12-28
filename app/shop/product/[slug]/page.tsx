import { getGlobalSettings, getProductBySlug } from '@/lib/hygraph';
import { generatePageMetadata, generateMetadataWithFallback } from '@/lib/metadata';
import { NotFoundMessage } from '@/components';
import { SlugPageProps } from '@/lib/types';
import ProductPageClient from './ProductPageClient';

async function fetchProductData(slug: string) {
  const [globalSettings, product] = await Promise.all([
    getGlobalSettings(),
    getProductBySlug(slug),
  ]);

  return {
    globalSettings,
    product,
  };
}

export async function generateMetadata({ params }: SlugPageProps) {
  return generateMetadataWithFallback(
    async () => {
      const { slug } = await params;
      const { globalSettings, product } = await fetchProductData(slug);

      if (!product) {
        return generatePageMetadata({ title: 'Product Not Found', globalSettings });
      }

      return generatePageMetadata({
        title: product.title,
        description: product.description ? undefined : `View ${product.title} at ${globalSettings?.siteName || ''}`,
        globalSettings,
      });
    },
    generatePageMetadata({ title: 'Product' })
  );
}

export default async function ProductPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const { globalSettings, product } = await fetchProductData(slug);

  if (!product) {
    return <NotFoundMessage />;
  }

  return (
    <ProductPageClient
      globalSettings={globalSettings}
      product={product}
    />
  );
}
