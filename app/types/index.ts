// Enums
export type Alignment = 'left' | 'right' | 'center';
export type SpacingType = 'none' | 'small' | 'medium' | 'large' | 'xlarge';
export type ProductStatus = 'available' | 'reserved' | 'sold';
export type CtaType = 'internalLink' | 'externalLink' | 'whatsApp' | 'email';
export type Style = 'primary' | 'secondary';
export type Social = 'instagram' | 'email' | 'whatsapp' | 'facebook';

// Asset
export interface Asset {
  url: string;
  fileName?: string;
  width?: number;
  height?: number;
}

// Color
export interface Color {
  hex: string;
}

// RichText
export interface RichText {
  raw: any; // JSON structure from Hygraph
}

// SEO
export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: Asset;
  noIndex?: boolean;
}

// CTA
export interface Cta {
  label: string;
  url: string;
  type: CtaType;
  style: Style;
}

// NavigationItem
export interface NavigationItem {
  label: string;
  externalUrl?: string;
  page?: {
    slug: string;
  };
  collection?: {
    slug: string;
  };
}

// Link (for footer)
export interface Link {
  label: string;
  externalUrl?: string;
  page?: {
    slug: string;
  };
  collection?: {
    slug: string;
  };
}

// SocialLink
export interface SocialLink {
  url: string;
  platform: Social;
  icon?: string;
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
}

// HeroBlock
export interface HeroBlock {
  headline?: string;
  subHeadline?: RichText;
  eyebrow?: string;
  backgroundImage?: Asset;
  overlayColor?: Color;
  overlayOpacity?: number;
  minHeight?: string;
  showScrollIndicator?: boolean;
  scrollIndicatorText?: string;
  textAlignment?: Alignment;
  buttons?: Cta[];
  paddingTop?: SpacingType;
  paddingBottom?: SpacingType;
  marginTop?: SpacingType;
  marginBottom?: SpacingType;
}

// PhilosophyBlock
export interface PhilosophyBlock {
  eyebrow?: string;
  quote?: string;
  description?: RichText;
  textAlignment?: Alignment;
  paddingTop?: SpacingType;
  paddingBottom?: SpacingType;
  marginTop?: SpacingType;
  marginBottom?: SpacingType;
}

// ProductGridBlock
export interface ProductGridBlock {
  headline?: string;
  subhead?: string;
  eyebrow?: string;
  limit?: number;
  columns?: number;
  showViewAllLink?: boolean;
  viewAllLink?: Cta;
  gapSize?: SpacingType;
  product?: Product;
  filterCollection?: {
    slug: string;
  };
  paddingTop?: SpacingType;
  paddingBottom?: SpacingType;
  marginTop?: SpacingType;
  marginBottom?: SpacingType;
}

// StoryBlock
export interface StoryBlock {
  eyebrow?: string;
  heading?: string;
  content?: RichText;
  backgroundColor?: Color;
  image?: Asset;
  imagePosition?: Alignment;
  cta?: Cta;
  paddingTop?: SpacingType;
  paddingBottom?: SpacingType;
  marginTop?: SpacingType;
  marginBottom?: SpacingType;
}

// FooterBlock
export interface FooterBlock {
  brandName?: string;
  description?: RichText;
  copyrightText?: string;
  shopLinks?: Link[];
  companyLinks?: Link[];
  socialLinks?: SocialLink[];
  legalLinks?: Link[];
  paddingTop?: SpacingType;
  paddingBottom?: SpacingType;
  marginTop?: SpacingType;
  marginBottom?: SpacingType;
}

// GlobalSetting
export interface GlobalSetting {
  siteName?: string;
  contactEmail?: string;
  contactWhatsApp?: boolean;
  whatsAppNumber?: string;
  themeSettings?: any;
  defaultSeo?: Seo;
  mainNavigation?: NavigationItem[];
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
  sections?: (HeroBlock | PhilosophyBlock | ProductGridBlock | StoryBlock)[];
}

