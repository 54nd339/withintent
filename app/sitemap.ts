import { MetadataRoute } from 'next';
import { getAllProducts, getAllCollections, getAllCategories } from '@/lib/hygraph';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://withintent.in';
  
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/checkout`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/wishlist`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Dynamic routes from Hygraph - fetch in parallel for better performance
  const dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    // Fetch all data in parallel
    const [products, collections, categories] = await Promise.all([
      getAllProducts(1000),
      getAllCollections(),
      getAllCategories(),
    ]);

    // Add product routes
    products.forEach((product) => {
      dynamicRoutes.push({
        url: `${baseUrl}/shop/product/${product.slug}`,
        lastModified: product.updatedAt ? new Date(product.updatedAt) : product.createdAt ? new Date(product.createdAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });

    // Add collection routes
    collections.forEach((collection) => {
      dynamicRoutes.push({
        url: `${baseUrl}/shop/collection/${collection.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });

    // Add category routes
    categories.forEach((category) => {
      dynamicRoutes.push({
        url: `${baseUrl}/shop/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
