import { ThemeSetting, LayoutSetting } from '@/lib/types';

/**
 * Animation durations (in ms for JS, class suffix for Tailwind)
 */
export const ANIMATION = {
  DURATION_FAST: 300,
  DURATION_NORMAL: 500,
  DURATION_SLOW: 700,
} as const;

/**
 * API constants
 */
export const API = {
  PRODUCTS_LIMIT: 50,
  DEFAULT_WHATSAPP: '919876543210',
} as const;

/**
 * Scroll animation ranges
 */
export const SCROLL_ANIMATION = {
  PARALLAX_INPUT: [0, 500] as [number, number],
  PARALLAX_OUTPUT: [0, 150] as [number, number],
  OPACITY_INPUT: [0, 300] as [number, number],
  OPACITY_OUTPUT: [1, 0.3] as [number, number],
};

/**
 * Default theme values from globals.css
 */
export const DEFAULT_THEME_LIGHT: ThemeSetting = {
  backgroundColor: { hex: '#ffffff' },
  textColor: { hex: '#171717' },
  accentColor: { hex: '#d4af37' },
  overlayColor: { hex: '#000000' },
  overlayOpacity: 0.2,
  borderRadius: 'none',
  shadow: 'none',
};

export const DEFAULT_THEME_DARK: ThemeSetting = {
  backgroundColor: { hex: '#0a0a0a' },
  textColor: { hex: '#ededed' },
  accentColor: { hex: '#b8961e' },
  overlayColor: { hex: '#000000' },
  overlayOpacity: 0.2,
  borderRadius: 'none',
  shadow: 'none',
};

/**
 * Cache revalidation time (in seconds)
 */
export const CACHE_REVALIDATE = 3600; // 1 hour

/**
 * Default layout values
 */
export const DEFAULT_LAYOUT: LayoutSetting = {
  paddingTop: 'md',
  paddingBottom: 'md',
  paddingLeft: undefined,
  paddingRight: undefined,
  marginTop: 'none',
  marginBottom: 'none',
  marginLeft: undefined,
  marginRight: undefined,
  textAlign: 'center',
  verticalAlign: 'center',
  containerWidth: 'default',
  minHeight: undefined,
  layoutType: 'fullWidth',
  dividerHeight: 'none',
};

/**
 * Common responsive class patterns
 */
export const RESPONSIVE_PADDING = 'px-4 sm:px-5 md:px-6 lg:px-8';
export const SECTION_HEADER_MARGIN = 'mb-6 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20';
