'use client';

import {
  HeroSection,
  ProductGrid,
  StorySection,
  BannerSection,
  TextSection,
  CategoryGridSection,
  GallerySection,
  FaqSection,
  PageWrapper,
} from '@/components';
import {
  GlobalSetting,
  Page,
  Product,
  ProductGridBlock,
  Category,
  SectionType,
} from '@/lib/types';

interface HomePageClientProps {
  page: Page;
  globalSettings: GlobalSetting;
  products: Record<string, Product[]>;
  categories: Category[];
}

export default function HomePageClient({ page, globalSettings, products, categories }: HomePageClientProps) {
  return (
    <PageWrapper 
      globalSettings={globalSettings} 
      showNavigation={page.showNavigation} 
      showFooter={page.showFooter}
    >
      <main>
        {page.sections?.map((section, index) => {
          switch (section.__typename) {
            case SectionType.HeroBlock:
              return <HeroSection key={index} data={section} />;

            case SectionType.ProductGridBlock: {
              const gridSection = section as ProductGridBlock;
              const collectionSlug = gridSection.filterCollection?.slug || gridSection.filterCategory?.slug || 'all';
              const sectionProducts = products[collectionSlug] || [];
              const availableProducts = sectionProducts.filter(
                (product) => product.productStatus === 'available'
              );
              return (
                <ProductGrid
                  key={index}
                  data={section}
                  products={availableProducts}
                />
              );
            }

            case SectionType.StoryBlock:
              return <StorySection key={index} data={section} />;

            case SectionType.BannerBlock:
              return <BannerSection key={index} data={section} />;

            case SectionType.TextBlock:
              return <TextSection id="philosophy" key={index} data={section} />;

            case SectionType.CategoryGridBlock:
              return <CategoryGridSection key={index} data={section} categories={categories} />;

            case SectionType.GalleryBlock:
              return <GallerySection key={index} data={section} />;

            case SectionType.FaqBlock:
              return <FaqSection key={index} data={section} />;

            default:
              return null;
          }
        })}
      </main>
    </PageWrapper>
  );
}
