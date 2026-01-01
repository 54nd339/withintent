import { gql } from 'graphql-request';

// Base fragments
const BUTTON_FIELDS = gql`
  fragment ButtonFields on Button {
    label
    url
    type
    style
    icon
    openInNewTab
  }
`;

const LAYOUT_FIELDS = gql`
  fragment LayoutFields on LayoutSetting {
    paddingTop
    paddingBottom
    paddingLeft
    paddingRight
    marginTop
    marginBottom
    textAlign
    containerWidth
    layoutType
  }
`;

const THEME_FIELDS = gql`
  fragment ThemeFields on ThemeSetting {
    backgroundColor { hex }
    darkBackgroundColor { hex }
    textColor { hex }
    darkTextColor { hex }
    accentColor { hex }
    darkAccentColor { hex }
    overlayOpacity
    darkOverlayOpacity
    shadow
  }
`;

const TEXT_GROUP_FIELDS = gql`
  fragment TextGroupFields on TextGroup {
    eyebrow
    heading
    subheading
    body { raw }
    textSize
    fontWeight
  }
`;

const MEDIA_FIELDS = gql`
  fragment MediaFields on Media {
    type
    asset { url fileName width height }
    alt
  }
`;

const SEO_FIELDS = gql`
  fragment SeoFields on Seo {
    metaTitle
    metaDescription
    ogImage { url fileName width height }
    noIndex
  }
`;

// Product fragments
const PRODUCT_BASE_FIELDS = gql`
  fragment ProductBaseFields on Product {
    title
    slug
    price
    discountPrice
    productStatus
    description { raw }
    mainImage { url }
    galleryImages { url }
    categories { name slug }
    collections { title slug }
  }
`;

const PRODUCT_FULL_FIELDS = gql`
  fragment ProductFullFields on Product {
    ...ProductBaseFields
    createdAt
    updatedAt
    relatedProducts {
      ...ProductBaseFields
    }
  }
`;

// Footer fragment
const FOOTER_FIELDS = gql`
  fragment FooterFields on FooterBlock {
    logo { ...MediaFields }
    text {
      heading
      body { raw }
    }
    shopButtons { label url type icon openInNewTab }
    socialButtons { label url type icon openInNewTab }
    companyButtons { label url type icon openInNewTab }
    copyrightText
    layout {
      paddingTop
      paddingBottom
      textAlign
      containerWidth
    }
    theme {
      backgroundColor { hex }
      darkBackgroundColor { hex }
      textColor { hex }
      darkTextColor { hex }
    }
  }
`;

// Page sections fragment
const PAGE_SECTIONS = gql`
  fragment PageSections on Page {
    sections {
      __typename
      ... on HeroBlock {
        text { ...TextGroupFields }
        media { ...MediaFields }
        layout { ...LayoutFields }
        theme { ...ThemeFields }
        buttons { ...ButtonFields }
        showScrollIndicator
        scrollIndicatorText
        emphasisText
      }
      ... on TextBlock {
        text { ...TextGroupFields }
        quote
        layout { ...LayoutFields }
        theme { ...ThemeFields }
      }
      ... on ProductGridBlock {
        header { ...TextGroupFields }
        grid {
          columns
          gapSize
          limit
          showViewAll
          viewAllButton { ...ButtonFields }
        }
        showPrice
        showStatus
        filterCollection { slug }
        filterCategory { slug }
        layout { ...LayoutFields }
        theme { ...ThemeFields }
      }
      ... on StoryBlock {
        text { ...TextGroupFields }
        media { ...MediaFields }
        layout { ...LayoutFields }
        theme { ...ThemeFields }
        primaryButton { ...ButtonFields }
      }
      ... on BannerBlock {
        text { ...TextGroupFields }
        backgroundMedia { ...MediaFields }
        layout { ...LayoutFields }
        theme { ...ThemeFields }
        buttons { ...ButtonFields }
      }
      ... on CategoryGridBlock {
        header { ...TextGroupFields }
        grid {
          columns
          gapSize
          limit
          showViewAll
          viewAllButton { ...ButtonFields }
        }
        layout { ...LayoutFields }
        theme { ...ThemeFields }
      }
      ... on GalleryBlock {
        header { ...TextGroupFields }
        grid { columns gapSize }
        cards {
          media { ...MediaFields }
          title
          subtitle
          body { raw }
        }
        enableLightbox
        layout { ...LayoutFields }
        theme { ...ThemeFields }
      }
      ... on FaqBlock {
        header { ...TextGroupFields }
        accordion {
          style
          items { label content { raw } defaultOpen }
        }
        layout { ...LayoutFields }
        theme { ...ThemeFields }
      }
      ... on TestimonialBlock {
        header { ...TextGroupFields }
        testimonials {
          review { ...TextGroupFields }
          rating
          image { url fileName width height }
          name
        }
        layout { ...LayoutFields }
        theme { ...ThemeFields }
      }
    }
  }
`;

// Get Global Settings
export const GET_GLOBAL_SETTINGS = gql`
  ${SEO_FIELDS}
  ${THEME_FIELDS}
  ${MEDIA_FIELDS}
  ${FOOTER_FIELDS}
  
  query GetGlobalSettings($id: ID!) {
    globalSetting(where: {id: $id}) {
      siteName
      contactEmail
      contactWhatsApp
      whatsAppNumber
      logo { url fileName width height }
      defaultSeo { ...SeoFields }
      themeSettings { ...ThemeFields }
      mainNavigation { label url }
      footer { ...FooterFields }
    }
  }
`;

// Get Page by Slug
export const GET_PAGE_BY_SLUG = gql`
  ${TEXT_GROUP_FIELDS}
  ${MEDIA_FIELDS}
  ${LAYOUT_FIELDS}
  ${THEME_FIELDS}
  ${BUTTON_FIELDS}
  ${PAGE_SECTIONS}

  query PageBySlug($slug: String!) {
    page(where: { slug: $slug }) {
      title
      slug
      showNavigation
      showFooter
      whatsAppLink
      whatsAppEnabled
      seo { metaTitle metaDescription ogImage { url } }
      ...PageSections
    }
  }
`;

// Get Products by Collection Slug
export const GET_PRODUCTS_BY_COLLECTION = gql`
  ${PRODUCT_BASE_FIELDS}
  ${PRODUCT_FULL_FIELDS}
  
  query GetProductsByCollection($slug: String!, $limit: Int) {
    collections(where: { slug: $slug }) {
      title
      slug
      products(first: $limit) {
        ...ProductFullFields
      }
    }
  }
`;

// Get All Products
export const GET_ALL_PRODUCTS = gql`
  ${PRODUCT_BASE_FIELDS}
  ${PRODUCT_FULL_FIELDS}
  
  query GetAllProducts($limit: Int) {
    products(first: $limit, orderBy: createdAt_DESC) {
      ...ProductFullFields
    }
  }
`;

// Get Product by Slug
export const GET_PRODUCT_BY_SLUG = gql`
  ${PRODUCT_BASE_FIELDS}
  ${PRODUCT_FULL_FIELDS}
  
  query GetProductBySlug($slug: String!) {
    product(where: { slug: $slug }) {
      ...ProductFullFields
    }
  }
`;

// Get Collection by Slug
export const GET_COLLECTION_BY_SLUG = gql`
  ${PRODUCT_BASE_FIELDS}
  ${PRODUCT_FULL_FIELDS}
  
  query GetCollection($slug: String!) {
    collection(where: { slug: $slug }) {
      title
      slug
      description { raw }
      coverImage { url width height }
      showInBanner
      products {
        ...ProductFullFields
      }
    }
  }
`;

// Get Category by Slug
export const GET_CATEGORY_BY_SLUG = gql`
  ${PRODUCT_BASE_FIELDS}
  ${PRODUCT_FULL_FIELDS}
  
  query GetCategory($slug: String!) {
    category(where: { slug: $slug }) {
      name
      slug
      coverImage { url width height }
      products {
        ...ProductFullFields
      }
    }
  }
`;

// Get All Collections
export const GET_ALL_COLLECTIONS = gql`
  query GetAllCollections {
    collections {
      title
      slug
      description { raw }
      coverImage { url }
      showInBanner
    }
  }
`;

// Get All Categories
export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    categories {
      name
      slug
      coverImage { url }
    }
  }
`;

// Bulk query: Get multiple categories by slugs with products
export const GET_CATEGORIES_BY_SLUGS = gql`
  ${PRODUCT_BASE_FIELDS}
  ${PRODUCT_FULL_FIELDS}
  
  query GetCategoriesBySlugs($slugs: [String!]!) {
    categories(where: { slug_in: $slugs }) {
      name
      slug
      coverImage { url }
      products(first: 50) {
        ...ProductFullFields
      }
    }
  }
`;

// Optimized home page query without products
export const GET_HOME_PAGE_DATA_OPTIMIZED = gql`
  ${TEXT_GROUP_FIELDS}
  ${MEDIA_FIELDS}
  ${LAYOUT_FIELDS}
  ${THEME_FIELDS}
  ${BUTTON_FIELDS}
  ${SEO_FIELDS}
  ${FOOTER_FIELDS}
  ${PAGE_SECTIONS}

  query GetHomePageDataOptimized($globalSettingId: ID!, $pageSlug: String!) {
    globalSetting(where: {id: $globalSettingId}) {
      siteName
      contactEmail
      contactWhatsApp
      whatsAppNumber
      logo { url fileName width height }
      defaultSeo { ...SeoFields }
      themeSettings { ...ThemeFields }
      mainNavigation { label url }
      footer { ...FooterFields }
    }
    page(where: { slug: $pageSlug }) {
      title
      slug
      showNavigation
      showFooter
      whatsAppLink
      whatsAppEnabled
      seo { metaTitle metaDescription ogImage { url } }
      ...PageSections
    }
    categories {
      name
      slug
      coverImage { url }
    }
  }
`;

// Bulk query: Get multiple collections by slugs
export const GET_COLLECTIONS_BY_SLUGS = gql`
  ${PRODUCT_BASE_FIELDS}
  ${PRODUCT_FULL_FIELDS}
  
  query GetCollectionsBySlugs($slugs: [String!]!) {
    collections(where: { slug_in: $slugs }) {
      title
      slug
      products(first: 50) {
        ...ProductFullFields
      }
    }
  }
`;

// Bulk query: Get all data needed for shop pages (products, categories, collections)
export const GET_SHOP_DATA = gql`
  ${PRODUCT_BASE_FIELDS}
  ${PRODUCT_FULL_FIELDS}
  
  query GetShopData($productLimit: Int) {
    products(first: $productLimit, orderBy: createdAt_DESC) {
      ...ProductFullFields
    }
    categories {
      name
      slug
      coverImage { url }
    }
    collections {
      title
      slug
      description { raw }
      coverImage { url }
      showInBanner
    }
  }
`;

// Optimized query: Get only categories and collections (for filters, no products)
export const GET_SHOP_FILTERS = gql`
  query GetShopFilters {
    categories {
      name
      slug
      coverImage { url }
    }
    collections {
      title
      slug
      description { raw }
      coverImage { url }
      showInBanner
    }
  }
`;

