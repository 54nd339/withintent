// Enums (mirroring Hygraph enums in migration script / schemaDef)
export type Alignment = 'left' | 'center' | 'right';
export type VerticalAlignment = 'top' | 'center' | 'bottom';
export type SpacingSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xl2';
export type ContainerWidth = 'narrow' | 'default' | 'wide' | 'full';
export type AspectRatio = 'auto' | 'square' | 'portrait34' | 'landscape169' | 'ultrawide219';
export type LayoutType = 'fullWidth' | 'twoColumn' | 'offsetLeft' | 'offsetRight';

export type TextSize = 'sm' | 'base' | 'lg' | 'xl' | 'xl2' | 'xl3' | 'xl4';
export type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type ShadowSize = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export type MediaType = 'image' | 'video';

export type ButtonType = 'internalLink' | 'externalLink' | 'whatsApp' | 'email' | 'instagram';
export type ButtonStyle = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonRole = 'cta' | 'link' | 'nav' | 'social';

export type GridKind = 'products' | 'categories' | 'collections';
export type GridColumns = 'one' | 'two' | 'three' | 'four';
export type AccordionStyle = 'single' | 'multiple';
export type ProductStatus = 'available' | 'reserved' | 'sold';
export type SocialPlatform = 'instagram' | 'facebook' | 'whatsapp' | 'email' | 'pinterest' | 'tiktok';

// Asset
export interface Asset {
  url: string;
  fileName?: string;
  width?: number;
  height?: number;
}

// LayoutSetting
export interface LayoutSetting {
  paddingTop?: SpacingSize;
  paddingBottom?: SpacingSize;
  paddingLeft?: SpacingSize;
  paddingRight?: SpacingSize;
  marginTop?: SpacingSize;
  marginBottom?: SpacingSize;
  marginLeft?: SpacingSize;
  marginRight?: SpacingSize;
  textAlign?: Alignment;
  verticalAlign?: VerticalAlignment;
  containerWidth?: ContainerWidth;
  minHeight?: string;
  layoutType?: LayoutType;
  dividerHeight?: SpacingSize;
}

// ThemeSetting
export interface ThemeSetting {
  backgroundColor?: { hex: string };
  darkBackgroundColor?: { hex: string };
  textColor?: { hex: string };
  darkTextColor?: { hex: string };
  accentColor?: { hex: string };
  darkAccentColor?: { hex: string };
  overlayColor?: { hex: string };
  darkOverlayColor?: { hex: string };
  overlayOpacity?: number;
  darkOverlayOpacity?: number;
  borderRadius?: BorderRadius;
  shadow?: ShadowSize;
}

// Media
export interface Media {
  type?: MediaType;
  asset?: Asset;
  alt?: string;
  thumbnail?: Asset;
}

// Seo
export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: Asset;
  noIndex?: boolean;
}

// Button
export interface Button {
  label: string;
  url?: string;
  type?: ButtonType;
  style?: ButtonStyle;
  role?: ButtonRole;
  icon?: string;
  openInNewTab?: boolean;
  page?: { slug: string };
  collection?: { slug: string };
  category?: { slug: string };
}

// NavigationItem (extends Button with externalUrl support)
export interface NavigationItem extends Button {
  externalUrl?: string;
}

// Cta (alias for Button)
export type Cta = Button;

// RichText
export interface RichText {
  raw: unknown;
}


// Card
export interface Card {
  media?: Media;
  title?: string;
  subtitle?: string;
  body?: RichText;
  buttons?: Button[];
  badge?: string;
  themeOverride?: ThemeSetting;
}

// AccordionItem
export interface AccordionItem {
  label: string;
  content: RichText;
  defaultOpen?: boolean;
}

// Accordion
export interface Accordion {
  style?: AccordionStyle;
  items?: AccordionItem[];
}

// TextGroup
export interface TextGroup {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  body?: RichText;
  textSize?: TextSize;
  fontWeight?: FontWeight;
}

// Grid config component
export interface Grid {
  kind?: GridKind;
  columns?: GridColumns;
  gapSize?: SpacingSize;
  limit?: number;
  showViewAll?: boolean;
  viewAllButton?: Button;
  cardThemeOverride?: ThemeSetting;
}

// Product
export interface Product {
  title: string;
  slug: string;
  price: number;
  description?: RichText;
  mainImage?: Asset;
  galleryImages?: Asset[];
  categories?: Category[];
  collections?: Collection[];
  productStatus: ProductStatus;
  seo?: Seo;
  relatedProducts?: Product[];
}

// Category
export interface Category {
  name: string;
  slug: string;
  coverImage?: Asset;
  products?: Product[];
}

// Collection
export interface Collection {
  title: string;
  slug: string;
  description?: RichText;
  coverImage?: Asset;
  products?: Product[];
  seo?: Seo;
  showInBanner?: boolean;
}

// HeroBlock
export interface HeroBlock {
  text?: TextGroup;
  media?: Media;
  layout?: LayoutSetting;
  theme?: ThemeSetting;
  buttons?: Button[];
  showScrollIndicator?: boolean;
  scrollIndicatorText?: string;
  emphasisText?: string;
}

// ProductGridBlock
export interface ProductGridBlock {
  header?: TextGroup;
  grid?: Grid;
  showPrice?: boolean;
  showStatus?: boolean;
  filterCollection?: { slug: string };
  filterCategory?: { slug: string };
  layout?: LayoutSetting;
  theme?: ThemeSetting;
}

// StoryBlock
export interface StoryBlock {
  text?: TextGroup;
  media?: Media;
  layout?: LayoutSetting;
  theme?: ThemeSetting;
  primaryButton?: Button;
}

export interface BannerBlock {
  text?: TextGroup;
  backgroundMedia?: Media;
  layout?: LayoutSetting;
  theme?: ThemeSetting;
  buttons?: Button[];
}

export interface TextBlock {
  text?: TextGroup;
  quote?: string;
  layout?: LayoutSetting;
  theme?: ThemeSetting;
}

export interface CategoryGridBlock {
  header?: TextGroup;
  grid?: Grid;
  layout?: LayoutSetting;
  theme?: ThemeSetting;
}

export interface GalleryBlock {
  header?: TextGroup;
  grid?: Grid;
  cards?: Card[];
  enableLightbox?: boolean;
  layout?: LayoutSetting;
  theme?: ThemeSetting;
}

export interface FaqBlock {
  header?: TextGroup;
  accordion?: Accordion;
  layout?: LayoutSetting;
  theme?: ThemeSetting;
}

// FooterBlock model
export interface FooterBlock {
  text?: TextGroup;
  shopButtons?: Button[];
  companyButtons?: Button[];
  socialButtons?: Button[];
  copyrightText?: string;
  layout?: LayoutSetting;
  theme?: ThemeSetting;
}

// GlobalSetting
export interface GlobalSetting {
  siteName?: string;
  contactEmail?: string;
  contactWhatsApp?: boolean;
  whatsAppNumber?: string;
  themeSettings?: ThemeSetting;
  defaultSeo?: Seo;
  mainNavigation?: Button[];
  footer?: FooterBlock;
  logo?: Asset;
}

// Page
export interface Page {
  title: string;
  slug: string;
  showNavigation?: boolean;
  showFooter?: boolean;
  whatsAppLink?: string;
  whatsAppEnabled?: boolean;
  seo?: Seo;
  sections?:
    | HeroBlock[]
    | StoryBlock[]
    | BannerBlock[]
    | TextBlock[]
    | ProductGridBlock[]
    | CategoryGridBlock[]
    | GalleryBlock[]
    | FaqBlock[];
}

