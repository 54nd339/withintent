import { useState, useEffect, useRef, startTransition } from 'react';
import { Asset } from '@/lib/types';

export function useImageCarousel(
  mainImage: Asset | null | undefined,
  galleryImages: (Asset | null | undefined)[] | null | undefined,
  productSlug: string
) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const prevSlugRef = useRef<string>(productSlug);

  const allImages = [mainImage, ...(galleryImages || [])].filter(Boolean) as Asset[];

  useEffect(() => {
    if (prevSlugRef.current !== productSlug) {
      prevSlugRef.current = productSlug;
      startTransition(() => {
        setCurrentImageIndex(0);
      });
    }
  }, [productSlug]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return {
    allImages,
    currentImage: allImages[currentImageIndex],
    currentImageIndex,
    nextImage,
    prevImage,
    goToImage,
  };
}
