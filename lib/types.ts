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

// Section types enum for page sections
export enum SectionType {
  HeroBlock = 'HeroBlock',
  ProductGridBlock = 'ProductGridBlock',
  StoryBlock = 'StoryBlock',
  BannerBlock = 'BannerBlock',
  TextBlock = 'TextBlock',
  CategoryGridBlock = 'CategoryGridBlock',
  GalleryBlock = 'GalleryBlock',
  FaqBlock = 'FaqBlock',
  TestimonialBlock = 'TestimonialBlock',
}

// Base interface for all sections with __typename
export interface BaseSection {
  __typename: SectionType;
}

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
  discountPrice?: number;
  description?: RichText;
  mainImage?: Asset;
  galleryImages?: Asset[];
  categories?: Category[];
  collections?: Collection[];
  productStatus: ProductStatus;
  seo?: Seo;
  relatedProducts?: Product[];
  createdAt?: string;
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
export interface HeroBlock extends BaseSection {
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
export interface ProductGridBlock extends BaseSection {
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
export interface StoryBlock extends BaseSection {
  text?: TextGroup;
  media?: Media;
  layout?: LayoutSetting;
  theme?: ThemeSetting;
  primaryButton?: Button;
}

export interface BannerBlock extends BaseSection {
  text?: TextGroup;
  backgroundMedia?: Media;
  layout?: LayoutSetting;
  theme?: ThemeSetting;
  buttons?: Button[];
}

export interface TextBlock extends BaseSection {
  text?: TextGroup;
  quote?: string;
  layout?: LayoutSetting;
  theme?: ThemeSetting;
}

export interface CategoryGridBlock extends BaseSection {
  header?: TextGroup;
  grid?: Grid;
  layout?: LayoutSetting;
  theme?: ThemeSetting;
}

export interface GalleryBlock extends BaseSection {
  header?: TextGroup;
  grid?: Grid;
  cards?: Card[];
  enableLightbox?: boolean;
  layout?: LayoutSetting;
  theme?: ThemeSetting;
}

export interface FaqBlock extends BaseSection {
  header?: TextGroup;
  accordion?: Accordion;
  layout?: LayoutSetting;
  theme?: ThemeSetting;
}

// Testimonial
export interface Testimonial {
  review: TextGroup;
  rating: number;
  image?: Asset;
  name: string;
}

// TestimonialBlock
export interface TestimonialBlock extends BaseSection {
  header?: TextGroup;
  testimonials?: Testimonial[];
  layout?: LayoutSetting;
  theme?: ThemeSetting;
}

// Union type for all page sections
export type PageSection =
  | HeroBlock
  | ProductGridBlock
  | StoryBlock
  | BannerBlock
  | TextBlock
  | CategoryGridBlock
  | GalleryBlock
  | FaqBlock
  | TestimonialBlock;

// FooterBlock model
export interface FooterBlock {
  logo?: Media;
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
  sections?: PageSection[];
}

// Next.js page props types
export interface SlugPageProps {
  params: Promise<{ slug: string }>;
}