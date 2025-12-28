import { getGlobalSettings } from '@/lib/hygraph';
import { generateMetadata as generatePageMetadata, generateMetadataWithFallback } from '@/lib/metadata';
import { WishlistPageClient } from './WishlistPageClient';

export async function generateMetadata() {
  return generateMetadataWithFallback(
    async () => {
      const globalSettings = await getGlobalSettings();
      return generatePageMetadata({
        title: 'Wishlist',
        description: 'Your saved items',
        globalSettings,
      });
    },
    generatePageMetadata({ title: 'Wishlist', description: 'Your saved items' })
  );
}

export default async function WishlistPage() {
  const globalSettings = await getGlobalSettings();

  return <WishlistPageClient globalSettings={globalSettings} />;
}
