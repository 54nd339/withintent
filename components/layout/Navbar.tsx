'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Moon, Sun, Menu, X, ShoppingBag, Heart } from 'lucide-react';
import { useTheme } from '@/providers';
import { useWishlistStore } from '@/store';
import { useCartTotalItems, useStore } from '@/hooks';
import { NavigationItem, Asset } from '@/lib/types';
import { getHrefFromNavigationItem } from '@/lib/utils';
import { RESPONSIVE_PADDING } from '@/lib/constants';

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  navigation?: NavigationItem[];
  logo?: Asset;
};

type NavigationLinksProps = {
  navigation: NavigationItem[];
  variant: 'desktop' | 'mobile';
  onMobileLinkClick?: () => void;
};

function NavigationLinks({ navigation, variant, onMobileLinkClick }: NavigationLinksProps) {
  const items = navigation.map((item, index) => {
    const href = getHrefFromNavigationItem(item);

    if (variant === 'desktop') {
      return (
        <NavLink key={index} href={href}>
          {item.label}
        </NavLink>
      );
    }

    return (
      <Link
        key={index}
        href={href}
        onClick={onMobileLinkClick}
        className="hover:opacity-70 transition-opacity"
      >
        {item.label}
      </Link>
    );
  });

  if (variant === 'desktop') {
    return (
      <div className="hidden md:flex items-center space-x-12 font-sans text-xs tracking-[0.2em] uppercase text-neutral-900 dark:text-neutral-50">
        {items}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-8 font-serif text-3xl">
      {items}
    </div>
  );
}

export function Navbar({ isMenuOpen, setIsMenuOpen, navigation, logo }: Props) {
  const { darkMode, mounted, toggleTheme } = useTheme();
  const totalItems = useCartTotalItems();
  const wishlistItems = useStore(useWishlistStore, (state) => state.items);
  const wishlistCount = wishlistItems?.length ?? 0;

  const logoUrl = logo?.url || '/logo.svg';
  const logoAlt = logo?.fileName || 'WITH INTENT Logo';

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-500 text-neutral-900 dark:text-neutral-50 ${isMenuOpen
        ? 'bg-[var(--background)]/90 dark:bg-neutral-900 shadow-sm'
        : 'backdrop-blur-md border-b border-black/5 dark:border-white/10 bg-[var(--background)]/70 dark:bg-neutral-900/40'
        }`}
    >
      <div className={`max-w-7xl mx-auto ${RESPONSIVE_PADDING} h-20 flex items-center justify-between`}>
        <Link href="/">
          <Image
            src={logoUrl}
            alt={logoAlt}
            width={60}
            height={60}
            className="object-contain"
          />
        </Link>

        {/* Desktop Links */}
        {navigation && navigation.length > 0 && (
          <NavigationLinks navigation={navigation} variant="desktop" />
        )}

        {/* Actions */}
        <div className="flex items-center space-x-6">
          <Link href="/wishlist" className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <Heart size={20} className={wishlistCount > 0 ? 'fill-red-500 text-red-500' : 'text-neutral-900 dark:text-neutral-50'} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistCount > 9 ? '9+' : wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/checkout" className="hidden md:flex relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            {mounted ? (darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />) : <Moon size={20} />}
          </button>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden overflow-hidden bg-white dark:bg-neutral-900 absolute top-20 left-0 w-full z-40">
        <div
          className={`flex flex-col items-center justify-center transition-[height,opacity] duration-300 ${isMenuOpen ? 'opacity-100 h-[80vh]' : 'opacity-0 h-0'
            }`}
        >
          {navigation && navigation.length > 0 && (
            <NavigationLinks
              navigation={navigation}
              variant="mobile"
              onMobileLinkClick={() => setIsMenuOpen(false)}
            />
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="relative group py-2">
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
