import { ThemeSetting, LayoutSetting, SpacingSize, Alignment, ContainerWidth, VerticalAlignment, LayoutType, BorderRadius, ShadowSize } from '@/app/types';

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

