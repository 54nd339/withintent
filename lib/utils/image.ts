/**
 * Image utilities for handling blur placeholders and image optimization
 */

// Fallback blur placeholder - 1x1 transparent PNG
const FALLBACK_BLUR_DATA_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

/**
 * Generate blur placeholder from Hygraph image URL (Server-side only)
 */
export async function generateBlurPlaceholder(imageUrl: string | null | undefined): Promise<string> {
  if (!imageUrl) {
    return FALLBACK_BLUR_DATA_URL;
  }

  try {
    const url = new URL(imageUrl);
    const pathSegments = url.pathname.split('/').filter(Boolean);
    
    if (pathSegments.length < 2) {
      console.warn('Invalid Hygraph asset URL structure:', imageUrl);
      return FALLBACK_BLUR_DATA_URL;
    }

    const envId = pathSegments[0];
    const handle = pathSegments[pathSegments.length - 1];
    const transformations = 'resize=width:16,height:16/blur=amount:20/quality=value:10/output=format:webp';
    
    const blurUrl = `${url.origin}/${envId}/${transformations}/${handle}`;
    
    const response = await fetch(blurUrl);
    if (!response.ok) {
      console.warn(`Blur fetch failed for ${imageUrl}: ${response.status}`);
      return FALLBACK_BLUR_DATA_URL;
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = response.headers.get('content-type') || 'image/webp';

    return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    console.warn('Failed to generate blur placeholder:', error);
    return FALLBACK_BLUR_DATA_URL;
  }
}

/**
 * Get blur placeholder synchronously (for client-side use)
 */
export function getBlurPlaceholder(): string {
  return FALLBACK_BLUR_DATA_URL;
}

/**
 * Export fallback constant for direct use
 */
export const BLUR_DATA_URL = FALLBACK_BLUR_DATA_URL;
