import { gql } from 'graphql-request';

// Get Global Settings
export const GET_GLOBAL_SETTINGS = gql`
  query GetGlobalSettings($id: ID!) {
    globalSetting(where: {id: $id}) {
      siteName
      contactEmail
      contactWhatsApp
      whatsAppNumber
      logo {
        url
        fileName
        width
        height
      }
      defaultSeo {
        metaTitle
        metaDescription
        ogImage {
          url
        }
      }
      mainNavigation {
        label
        url
      }
      footer {
        text {
          heading
          body {
            raw
          }
          textSize
          fontWeight
        }
        shopButtons {
          label
          url
          type
          style
          role
          icon
          openInNewTab
        }
        socialButtons {
          label
          url
          type
          style
          role
          icon
          openInNewTab
        }
        companyButtons {
          label
          url
          type
          style
          role
          icon
          openInNewTab
        }
        copyrightText
        layout {
          paddingTop
          paddingBottom
          paddingLeft
          paddingRight
          marginTop
          marginBottom
          marginLeft
          marginRight
          textAlign
          verticalAlign
          containerWidth
          minHeight
          layoutType
          dividerHeight
        }
        theme {
          backgroundColor {
            hex
          }
          darkBackgroundColor {
            hex
          }
          textColor {
            hex
          }
          darkTextColor {
            hex
          }
          accentColor {
            hex
          }
          darkAccentColor {
            hex
          }
          overlayColor {
            hex
          }
          darkOverlayColor {
            hex
          }
          overlayOpacity
          darkOverlayOpacity
          shadow
        }
      }
    }
  }
`;

// Get Page by Slug (using fragments to reduce query size)
export const GET_PAGE_BY_SLUG = gql`
  fragment LayoutSettingFields on LayoutSetting {
    paddingTop
    paddingBottom
    paddingLeft
    paddingRight
    marginTop
    marginBottom
    marginLeft
    marginRight
    textAlign
    verticalAlign
    containerWidth
    minHeight
    layoutType
    dividerHeight
  }

  fragment ThemeSettingFields on ThemeSetting {
    backgroundColor {
      hex
    }
    darkBackgroundColor {
      hex
    }
    textColor {
      hex
    }
    darkTextColor {
      hex
    }
    accentColor {
      hex
    }
    darkAccentColor {
      hex
    }
    overlayColor {
      hex
    }
    darkOverlayColor {
      hex
    }
    overlayOpacity
    darkOverlayOpacity
    borderRadius
    shadow
  }

  fragment TextGroupFields on TextGroup {
    eyebrow
    heading
    subheading
    body {
      raw
    }
    textSize
    fontWeight
  }

  fragment MediaFields on Media {
    type
    asset {
      url
      fileName
      width
      height
    }
    alt
    thumbnail {
      url
      fileName
      width
      height
    }
  }

  fragment ButtonFields on Button {
    label
    url
    type
    style
    role
    icon
    openInNewTab
  }

  fragment GridFields on Grid {
    kind
    columns
    gapSize
    limit
    showViewAll
    viewAllButton {
      ...ButtonFields
    }
    cardThemeOverride {
      ...ThemeSettingFields
    }
  }

  fragment CardFields on Card {
    media {
      ...MediaFields
    }
    title
    subtitle
    body {
      raw
    }
    buttons {
      ...ButtonFields
    }
    badge
  }

  query PageBySlug($slug: String!) {
    page(where: { slug: $slug }) {
      title
      slug
      showNavigation
      showFooter
      whatsAppLink
      whatsAppEnabled
      seo {
        metaTitle
        metaDescription
        ogImage {
          url
        }
      }
      sections {
        ... on HeroBlock {
          text {
            ...TextGroupFields
          }
          media {
            ...MediaFields
          }
          layout {
            ...LayoutSettingFields
          }
          theme {
            ...ThemeSettingFields
          }
          buttons {
            ...ButtonFields
          }
          showScrollIndicator
          scrollIndicatorText
          emphasisText
        }
        ... on PhilosophyBlock {
          text {
            ...TextGroupFields
          }
          quote
          layout {
            ...LayoutSettingFields
          }
          theme {
            ...ThemeSettingFields
          }
        }
        ... on ProductGridBlock {
          header {
            ...TextGroupFields
          }
          grid {
            ...GridFields
          }
          showPrice
          showStatus
          filterCollection {
            slug
          }
          filterCategory {
            slug
          }
          layout {
            ...LayoutSettingFields
          }
          theme {
            ...ThemeSettingFields
          }
        }
        ... on StoryBlock {
          text {
            ...TextGroupFields
          }
          media {
            ...MediaFields
          }
          layout {
            ...LayoutSettingFields
          }
          theme {
            ...ThemeSettingFields
          }
          primaryButton {
            ...ButtonFields
          }
        }
        ... on BannerBlock {
          text {
            ...TextGroupFields
          }
          backgroundMedia {
            ...MediaFields
          }
          layout {
            ...LayoutSettingFields
          }
          theme {
            ...ThemeSettingFields
          }
          buttons {
            ...ButtonFields
          }
        }
        ... on TextBlock {
          text {
            ...TextGroupFields
          }
          layout {
            ...LayoutSettingFields
          }
          theme {
            ...ThemeSettingFields
          }
        }
        ... on CategoryGridBlock {
          header {
            ...TextGroupFields
          }
          grid {
            ...GridFields
          }
          layout {
            ...LayoutSettingFields
          }
          theme {
            ...ThemeSettingFields
          }
        }
        ... on GalleryBlock {
          header {
            ...TextGroupFields
          }
          grid {
            kind
            columns
            gapSize
            limit
            showViewAll
          }
          cards {
            ...CardFields
          }
          enableLightbox
          layout {
            ...LayoutSettingFields
          }
          theme {
            ...ThemeSettingFields
          }
        }
        ... on TeamBlock {
          header {
            ...TextGroupFields
          }
          grid {
            kind
            columns
            gapSize
            limit
          }
          cards {
            ...CardFields
          }
          layout {
            ...LayoutSettingFields
          }
          theme {
            ...ThemeSettingFields
          }
        }
        ... on FaqBlock {
          header {
            ...TextGroupFields
          }
          accordion {
            style
            items {
              label
              content {
                raw
              }
              defaultOpen
            }
          }
          layout {
            ...LayoutSettingFields
          }
          theme {
            ...ThemeSettingFields
          }
        }
      }
    }
  }
`;

// Get Products by Collection Slug
export const GET_PRODUCTS_BY_COLLECTION = gql`
  query GetProductsByCollection($slug: String!, $limit: Int) {
    collections(where: { slug: $slug }) {
      products(first: $limit) {
        title
        slug
        price
        productStatus
        description {
          raw
        }
        mainImage {
          url
          fileName
          width
          height
        }
        galleryImages {
          url
          fileName
          width
          height
        }
        categories {
          name
          slug
        }
        collections {
          title
          slug
        }
        seo {
          metaTitle
          metaDescription
          ogImage {
            url
          }
        }
      }
    }
  }
`;

// Get All Products
export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts($limit: Int) {
    products(first: $limit) {
      title
      slug
      price
      productStatus
      description {
        raw
      }
      mainImage {
        url
        fileName
        width
        height
      }
      galleryImages {
        url
        fileName
        width
        height
      }
      categories {
        name
        slug
      }
      collections {
        title
        slug
      }
      seo {
        metaTitle
        metaDescription
        ogImage {
          url
        }
      }
    }
  }
`;

// Get Product by Slug
export const GET_PRODUCT_BY_SLUG = gql`
  query GetProduct($slug: String!) {
    product(where: { slug: $slug }) {
      title
      slug
      price
      productStatus
      description {
        raw
      }
      mainImage {
        url
        fileName
        width
        height
      }
      galleryImages {
        url
        fileName
        width
        height
      }
      categories {
        name
        slug
      }
      collections {
        title
        slug
      }
      seo {
        metaTitle
        metaDescription
        ogImage {
          url
        }
      }
      relatedProducts {
        title
        slug
        price
        productStatus
        mainImage {
          url
          fileName
          width
          height
        }
      }
    }
  }
`;

// Get Collection by Slug
export const GET_COLLECTION_BY_SLUG = gql`
  query GetCollection($slug: String!) {
    collection(where: { slug: $slug }) {
      title
      slug
      description {
        raw
      }
      coverImage {
        url
        fileName
        width
        height
      }
      products {
        title
        slug
        price
        productStatus
        description {
          raw
        }
        mainImage {
          url
          fileName
          width
          height
        }
        galleryImages {
          url
          fileName
          width
          height
        }
        categories {
          name
          slug
        }
        collections {
          title
          slug
        }
        seo {
          metaTitle
          metaDescription
          ogImage {
            url
          }
        }
      }
      seo {
        metaTitle
        metaDescription
        ogImage {
          url
        }
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
      coverImage {
        url
        fileName
        width
        height
      }
      products {
        title
        slug
        price
        productStatus
        description {
          raw
        }
        mainImage {
          url
          fileName
          width
          height
        }
        galleryImages {
          url
          fileName
          width
          height
        }
        categories {
          name
          slug
        }
        collections {
          title
          slug
        }
        seo {
          metaTitle
          metaDescription
          ogImage {
            url
          }
        }
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
      description {
        raw
      }
      coverImage {
        url
        fileName
        width
        height
      }
    }
  }
`;

// Get All Categories
export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    categories {
      name
      slug
      coverImage {
        url
        fileName
        width
        height
      }
    }
  }
`;
