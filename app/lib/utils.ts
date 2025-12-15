import { SpacingType } from '@/app/types';

/**
 * Convert SpacingType enum to Tailwind CSS classes
 */
export function getSpacingClasses(
  paddingTop?: SpacingType,
  paddingBottom?: SpacingType,
  marginTop?: SpacingType,
  marginBottom?: SpacingType
): string {
  const classes: string[] = [];

  // Padding Top
  if (paddingTop && paddingTop !== 'none') {
    const paddingMap: Record<SpacingType, string> = {
      none: '',
      small: 'pt-8',
      medium: 'pt-16',
      large: 'pt-24',
      xlarge: 'pt-32',
    };
    classes.push(paddingMap[paddingTop]);
  }

  // Padding Bottom
  if (paddingBottom && paddingBottom !== 'none') {
    const paddingMap: Record<SpacingType, string> = {
      none: '',
      small: 'pb-8',
      medium: 'pb-16',
      large: 'pb-24',
      xlarge: 'pb-32',
    };
    classes.push(paddingMap[paddingBottom]);
  }

  // Margin Top
  if (marginTop && marginTop !== 'none') {
    const marginMap: Record<SpacingType, string> = {
      none: '',
      small: 'mt-8',
      medium: 'mt-16',
      large: 'mt-24',
      xlarge: 'mt-32',
    };
    classes.push(marginMap[marginTop]);
  }

  // Margin Bottom
  if (marginBottom && marginBottom !== 'none') {
    const marginMap: Record<SpacingType, string> = {
      none: '',
      small: 'mb-8',
      medium: 'mb-16',
      large: 'mb-24',
      xlarge: 'mb-32',
    };
    classes.push(marginMap[marginBottom]);
  }

  return classes.join(' ');
}

/**
 * Format WhatsApp number to URL
 */
export function formatWhatsAppUrl(number: string): string {
  const cleaned = number.replace(/[^\d]/g, '');
  return `https://wa.me/${cleaned}`;
}

/**
 * Format INR currency
 */
export const formatINR = (value: number) => `₹${value.toLocaleString("en-IN")}`;

/**
 * Get alignment classes
 */
export function getAlignmentClasses(alignment?: string): string {
  switch (alignment) {
    case 'left':
      return 'text-left';
    case 'right':
      return 'text-right';
    case 'center':
      return 'text-center';
    default:
      return 'text-center';
  }
}

/**
 * Get grid columns classes
 */
export function getGridColumnsClasses(columns?: number): string {
  switch (columns) {
    case 1:
      return 'grid-cols-1';
    case 2:
      return 'grid-cols-1 md:grid-cols-2';
    case 3:
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    case 4:
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
    default:
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
  }
}

/**
 * Get gap size classes
 */
export function getGapSizeClasses(gapSize?: SpacingType): string {
  switch (gapSize) {
    case 'small':
      return 'gap-4';
    case 'medium':
      return 'gap-6';
    case 'large':
      return 'gap-8';
    case 'xlarge':
      return 'gap-12';
    default:
      return 'gap-8';
  }
}

