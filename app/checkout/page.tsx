import { getGlobalSettings } from '@/lib/hygraph';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { CheckoutPageClient } from './CheckoutPageClient';

export async function generateMetadata() {
  try {
    const globalSettings = await getGlobalSettings();
    return generatePageMetadata({
      title: 'Checkout',
      globalSettings,
    });
  } catch {
    return generatePageMetadata({ title: 'Checkout' });
  }
}

export default async function CheckoutPage() {
  const globalSettings = await getGlobalSettings();

  return <CheckoutPageClient globalSettings={globalSettings} />;
}
