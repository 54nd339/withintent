import { gql } from 'graphql-request';

// Get Global Settings
export const GET_GLOBAL_SETTINGS = gql`
  query GetGlobalSettings($id: ID!) {
    globalSetting(where: { id: $id }) {
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
        externalUrl
        page {
          slug
        }
        collection {
          slug
        }
      }
      footer {
        brandName
        description {
          raw
        }
        copyrightText
        shopLinks {
          label
          externalUrl
          page {
            slug
          }
          collection {
            slug
          }
        }
        companyLinks {
          label
          externalUrl
          page {
            slug
          }
          collection {
            slug
          }
        }
        socialLinks {
          url
          platform
          icon
        }
        legalLinks {
          label
          externalUrl
          page {
            slug
          }
          collection {
            slug
          }
        }
        paddingTop
        paddingBottom
        marginTop
        marginBottom
      }
    }
  }
`;

// Get Page by Slug
export const GET_PAGE_BY_SLUG = gql`
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
          heroHeadline: headline
          subHeadline {
            raw
          }
          eyebrow
          backgroundImage {
            url
            fileName
            width
            height
          }
          overlayColor {
            hex
          }
          overlayOpacity
          minHeight
          showScrollIndicator
          scrollIndicatorText
          textAlignment
          buttons {
            label
            url
            type
            style
          }
          paddingTop
          paddingBottom
          marginTop
          marginBottom
        }
        ... on PhilosophyBlock {
          eyebrow
          quote
          description {
            raw
          }
          textAlignment
          paddingTop
          paddingBottom
          marginTop
          marginBottom
        }
        ... on ProductGridBlock {
          gridHeadline: headline
          subhead
          eyebrow
          limit
          columns
          showViewAllLink
          viewAllLink {
            label
            url
            type
            style
          }
          gapSize
          product {
            title
            slug
            price
            productStatus
          }
          filterCollection {
            slug
          }
          paddingTop
          paddingBottom
          marginTop
          marginBottom
        }
        ... on StoryBlock {
          eyebrow
          heading
          content {
            raw
          }
          image {
            url
            fileName
            width
            height
          }
          imagePosition
          cta {
            label
            url
            type
            style
          }
          paddingTop
          paddingBottom
          marginTop
          marginBottom
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
