'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ChevronLeft, ChevronRight, Share2, Check } from 'lucide-react';
import { RichText, PriceDisplay, PageWrapper } from '@/components';
import { getProductStatus, isProductSold, getBlurPlaceholder, getProductUrl, showToast, getBaseUrl } from '@/lib/utils';
import { generateProductStructuredData } from '@/lib/metadata';
import { GlobalSetting, Product } from '@/lib/types';
import { RESPONSIVE_PADDING } from '@/lib/constants'
import { useCartStore } from '@/store';
import { useShare } from '@/hooks';

function ProductStructuredData({ product, baseUrl, globalSettings }: { product: Product; baseUrl: string; globalSettings: GlobalSetting }) {
  const siteName = globalSettings?.siteName || 'WITH INTENT';
  const productUrl = `${baseUrl}/shop/product/${product.slug}`;
  const productImage = product.mainImage?.url || product.galleryImages?.[0]?.url;
  const price = product.discountPrice || product.price;
  const currency = 'INR';
  const availability = product.productStatus === 'available' ? 'in stock' :
    product.productStatus === 'sold' ? 'out of stock' :
      'preorder';
  const description = product.title;

  const structuredData = generateProductStructuredData({
    product,
    siteName,
    productUrl,
    productImage,
    description,
    price,
    currency,
    availability,
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface ProductPageClientProps {
  globalSettings: GlobalSetting;
  product: Product;
}

export default function ProductPageClient({ globalSettings, product }: ProductPageClientProps) {
  const { share, copied } = useShare();
  const addItem = useCartStore((state) => state.addItem);

  const allImages = [product.mainImage, ...(product.galleryImages || [])].filter(Boolean);
  const prevSlugRef = useRef<string>(product.slug);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: allImages.length > 1,
  });

  useEffect(() => {
    if (prevSlugRef.current !== product.slug && emblaApi) {
      prevSlugRef.current = product.slug;
      emblaApi.scrollTo(0, true);
    }
  }, [product.slug, emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') emblaApi.scrollPrev();
      else if (e.key === 'ArrowRight') emblaApi.scrollNext();
    };

    const updateIndex = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    
    updateIndex();
    emblaApi.on('select', updateIndex);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      emblaApi.off('select', updateIndex);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [emblaApi]);

  const status = getProductStatus(product);
  const isSold = isProductSold(product);

  const handleShare = async () => {
    const shareUrl = getProductUrl(product.slug);
    await share(shareUrl, product.title);
  };

  const handleAddToCart = () => {
    if (!isSold) {
      addItem(product);
      showToast.success('Added to cart');
    }
  };

  const baseUrl = getBaseUrl();

  return (
    <>
      <ProductStructuredData product={product} baseUrl={baseUrl} globalSettings={globalSettings} />
      <PageWrapper
        globalSettings={globalSettings}
        showNavigation={true}
        showFooter={true}
      >
        <div className="min-h-screen pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-10 md:pb-12 lg:pb-16">
          <div className={`${RESPONSIVE_PADDING} max-w-7xl mx-auto`}>
            {/* Back Button */}
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 mb-6 sm:mb-8 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Shop
            </Link>

            <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16">
              {/* Image Section */}
              <div className="flex-1 relative w-full lg:sticky lg:top-28 lg:self-start">
                <div className="relative w-full bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden aspect-square">
                  <div ref={emblaRef} className="overflow-hidden h-full w-full">
                    <div className="flex h-full touch-pan-y">
                      {allImages.map((image, index) => {
                        if (!image?.url) return null;
                        return (
                          <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full">
                            <Image
                              src={image.url}
                              alt={`${product.title} - Image ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              priority={index === 0}
                              placeholder="blur"
                              blurDataURL={image.blurDataURL || getBlurPlaceholder()}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={() => emblaApi?.scrollPrev()}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-neutral-800 transition-colors shadow-lg"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} className="text-neutral-900 dark:text-neutral-100" />
                      </button>
                      <button
                        onClick={() => emblaApi?.scrollNext()}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-neutral-800 transition-colors shadow-lg"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} className="text-neutral-900 dark:text-neutral-100" />
                      </button>

                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                        {allImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => emblaApi?.scrollTo(index)}
                            className={`h-2 rounded-full transition-all ${index === selectedIndex
                                ? 'bg-white w-8'
                                : 'bg-white/50 w-2'
                              }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 lg:max-w-2xl">
                {/* Status Badge */}
                {status && (
                  <span className="inline-block mb-4 px-3 py-1 bg-neutral-200 dark:bg-neutral-700 text-xs uppercase tracking-widest">
                    {status}
                  </span>
                )}

                {/* Title */}
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-4 text-neutral-900 dark:text-neutral-100">
                  {product.title}
                </h1>

                {/* Categories */}
                {product.categories && product.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.categories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/shop/category/${category.slug}`}
                        className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Price */}
                {product.price && (
                  <div className="mb-6">
                    <PriceDisplay
                      price={product.price}
                      discountPrice={product.discountPrice}
                      size="xl"
                    />
                  </div>
                )}

                {/* Description */}
                {product.description && (
                  <div className="mb-8 prose prose-sm dark:prose-invert max-w-none">
                    <RichText content={product.description} />
                  </div>
                )}

                {/* Collections */}
                {product.collections && product.collections.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xs uppercase tracking-widest mb-2 text-neutral-600 dark:text-neutral-400">
                      Collections
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.collections.map((collection) => (
                        <Link
                          key={collection.slug}
                          href={`/shop/collection/${collection.slug}`}
                          className="text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                        >
                          {collection.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <button
                    onClick={handleAddToCart}
                    disabled={isSold}
                    className={`flex-1 px-8 py-3 text-sm uppercase tracking-widest transition-colors text-center ${isSold
                      ? 'bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-500 cursor-not-allowed opacity-50'
                      : 'bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900'
                      }`}
                  >
                    {isSold ? 'Sold Out' : 'Add to Cart'}
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 px-6 py-3 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 text-sm uppercase tracking-widest hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check size={16} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Share2 size={16} />
                        Share
                      </>
                    )}
                  </button>
                </div>

                {/* Related Products */}
                {product.relatedProducts && product.relatedProducts.length > 0 && (
                  <div>
                    <h3 className="text-xs uppercase tracking-widest mb-4 text-neutral-600 dark:text-neutral-400">
                      Related Products
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {product.relatedProducts.map((relatedProduct) => (
                        <Link
                          key={relatedProduct.slug}
                          href={`/shop/product/${relatedProduct.slug}`}
                          className="group relative aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-800 hover:opacity-80 transition-opacity rounded-lg"
                        >
                          {relatedProduct.mainImage?.url && (
                            <Image
                              src={relatedProduct.mainImage.url}
                              alt={relatedProduct.title}
                              fill
                              className="object-cover"
                              placeholder="blur"
                              blurDataURL={relatedProduct.mainImage.blurDataURL || getBlurPlaceholder()}
                            />
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                            <p className="text-white text-xs font-serif truncate">
                              {relatedProduct.title}
                            </p>
                            {relatedProduct.price && (
                              <div className="mt-1">
                                <PriceDisplay
                                  price={relatedProduct.price}
                                  discountPrice={relatedProduct.discountPrice}
                                  size="sm"
                                  className="text-white [&_span]:text-white"
                                />
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
