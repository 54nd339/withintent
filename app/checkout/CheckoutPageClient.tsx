'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Trash2, Heart, ShoppingBag, Printer } from 'lucide-react';
import { PriceDisplay, PageHeader, EmptyState, PageWrapper, QuantityCounter } from '@/components';
import { formatINR, createWhatsAppCheckoutLink, getEffectivePrice, getBlurPlaceholder, showToast } from '@/lib/utils';
import { useCartStore, useWishlistStore } from '@/store';
import { useCartTotalPrice, useStore } from '@/hooks';
import { GlobalSetting } from '@/lib/types';
import { API, RESPONSIVE_PADDING } from '@/lib/constants';

interface CheckoutPageClientProps {
  globalSettings: GlobalSetting;
}

export function CheckoutPageClient({ globalSettings }: CheckoutPageClientProps) {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const total = useCartTotalPrice();

  const addToWishlist = useStore(useWishlistStore, (state) => state.addItem);
  const isInWishlist = useStore(useWishlistStore, (state) => state.isInWishlist);

  const whatsAppNumber = globalSettings.whatsAppNumber || API.DEFAULT_WHATSAPP;

  const handleCheckout = () => {
    const checkoutUrl = createWhatsAppCheckoutLink(whatsAppNumber, items);
    window.open(checkoutUrl, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  if (items.length === 0) {
    return (
      <PageWrapper globalSettings={globalSettings}>
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
        />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper globalSettings={globalSettings}>
      <main className="pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16 lg:pb-20 min-h-screen">
        <div className={`max-w-4xl mx-auto ${RESPONSIVE_PADDING} print-invoice`}>
          <div className="flex items-center justify-between mb-6 sm:mb-8 no-print">
          <PageHeader title="Your Cart" />
            {/* <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
              aria-label="Print invoice"
            >
              <Printer size={18} />
              <span className="text-sm uppercase tracking-widest">Print</span>
            </button> */}
          </div>
          <div className="print-visible hidden print:block mb-4">
            <h1 className="font-serif text-2xl text-black">Invoice</h1>
            <p className="text-sm text-black mt-2">
              {globalSettings?.siteName || 'WITH INTENT'} - {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Cart Items */}
          <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
            {items.map((item, index) => {
              const price = getEffectivePrice(item.product);
              const itemTotal = price * item.quantity;

              return (
                <motion.div
                  key={item.product.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="print-cart-item print-section flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 md:p-6 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
                >
                  {/* Product Image */}
                  {item.product.mainImage?.url && (
                    <div className="relative w-full sm:w-24 sm:h-32 md:w-32 md:h-40 h-48 sm:h-auto flex-shrink-0 bg-neutral-100 dark:bg-neutral-800">
                      <Image
                        src={item.product.mainImage.url}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                        placeholder="blur"
                        blurDataURL={item.product.mainImage.blurDataURL || getBlurPlaceholder()}
                      />
                    </div>
                  )}

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between gap-3 sm:gap-0">
                    <div>
                      <h3 className="font-serif text-base sm:text-lg md:text-xl mb-2 text-neutral-900 dark:text-neutral-100">
                        {item.product.title}
                      </h3>
                      <div className="mb-3 sm:mb-4">
                        <PriceDisplay
                          price={item.product.price}
                          discountPrice={item.product.discountPrice}
                          size="base"
                        />
                      </div>
                    </div>

                    {/* Quantity Controls and Actions */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                      <QuantityCounter
                        quantity={item.quantity}
                        onIncrease={(e) => {
                          e.stopPropagation();
                          updateQuantity(item.product.slug, item.quantity + 1);
                        }}
                        onDecrease={(e) => {
                          e.stopPropagation();
                          if (item.quantity > 1) {
                          updateQuantity(item.product.slug, item.quantity - 1);
                          } else {
                            removeItem(item.product.slug);
                            showToast.info('Removed from cart');
                          }
                        }}
                        variant="checkout"
                      />

                      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        <span className="font-serif text-base sm:text-lg font-medium text-neutral-900 dark:text-neutral-100">
                          {formatINR(itemTotal)}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              if (isInWishlist && addToWishlist && !isInWishlist(item.product.slug)) {
                                addToWishlist(item.product);
                                showToast.success('Saved to wishlist');
                              }
                              removeItem(item.product.slug);
                              showToast.info('Removed from cart');
                            }}
                            className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                            aria-label="Save for later"
                            title="Save for later"
                          >
                            <Heart size={18} />
                          </button>
                          <button
                            onClick={() => {
                              removeItem(item.product.slug);
                              showToast.info('Removed from cart');
                            }}
                            className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="print-summary border-t border-neutral-200 dark:border-neutral-800 pt-4 sm:pt-6 mb-6 sm:mb-8">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <span className="font-serif text-lg sm:text-xl text-neutral-900 dark:text-neutral-100">
                Total
              </span>
              <span className="font-serif text-xl sm:text-2xl font-medium text-neutral-900 dark:text-neutral-100">
                {formatINR(total)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="no-print w-full py-3 sm:py-4 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs sm:text-sm uppercase tracking-widest hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              Checkout via WhatsApp
            </button>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}
