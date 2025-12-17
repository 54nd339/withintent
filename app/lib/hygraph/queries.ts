import { gql } from 'graphql-request';


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

// Get Global Settings
export const GET_GLOBAL_SETTINGS = gql`
  query GetGlobalSettings($id: ID!) {
    globalSetting(where: {id: $id}) {
      siteName
      whatsAppNumber
      logo { url fileName width height }
      mainNavigation { label url }
      footer {
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

  query PageBySlug($slug: String!) {
    page(where: { slug: $slug }) {
      title
      slug
      showNavigation
      showFooter
      whatsAppLink
      whatsAppEnabled
      seo { metaTitle metaDescription ogImage { url } }
      sections {
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
      }
    }
  }
`;

// Get Products by Collection Slug
export const GET_PRODUCTS_BY_COLLECTION = gql`
  query GetProductsByCollection($slug: String!, $limit: Int) {
    collections(where: { slug: $slug }) {
      title
      slug
      products(first: $limit) {
        title
        slug
        price
        productStatus
        mainImage { url }
        galleryImages { url }
        categories { name slug }
        collections { title slug }
      }
    }
  }
`;

// Get All Products
export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts($limit: Int) {
    products(first: $limit, orderBy: createdAt_DESC) {
      title
      slug
      price
      productStatus
      createdAt
      description { raw }
      mainImage { url }
      galleryImages { url }
      categories { name slug }
      collections { title slug }
    }
  }
`;

// Get Collection by Slug
export const GET_COLLECTION_BY_SLUG = gql`
  query GetCollection($slug: String!) {
    collection(where: { slug: $slug }) {
      title
      slug
      description { raw }
      coverImage { url width height }
      showInBanner
      products {
        title
        slug
        price
        productStatus
        mainImage { url }
        galleryImages { url }
        categories { name slug }
        collections { title slug }
      }
    }
  }
`;

// Get Category by Slug
export const GET_CATEGORY_BY_SLUG = gql`
  query GetCategory($slug: String!) {
    category(where: { slug: $slug }) {
      name
      slug
      coverImage { url width height }
      products {
        title
        slug
        price
        productStatus
        mainImage { url }
        galleryImages { url }
        categories { name slug }
        collections { title slug }
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
