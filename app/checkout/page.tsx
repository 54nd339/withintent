import { getGlobalSettings } from '@/lib/hygraph';
import { generateMetadata as generatePageMetadata, generateMetadataWithFallback } from '@/lib/metadata';
import { CheckoutPageClient } from './CheckoutPageClient';

export async function generateMetadata() {
  return generateMetadataWithFallback(
    async () => {
      const globalSettings = await getGlobalSettings();
      return generatePageMetadata({
        title: 'Checkout',
        globalSettings,
      });
    },
    generatePageMetadata({ title: 'Checkout' })
  );
}

export default async function CheckoutPage() {
  const globalSettings = await getGlobalSettings();

  return <CheckoutPageClient globalSettings={globalSettings} />;
}
