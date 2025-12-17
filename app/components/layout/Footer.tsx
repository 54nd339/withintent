'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Mail, MessageCircle } from 'lucide-react';
import { RichText } from '@/app/components';
import { FooterBlock, Button } from '@/app/types';
import {
  getSpacingClassesFromLayout,
  getContainerWidthClasses,
  getThemeWithDefaults,
  getThemeStyles,
  getLayoutWithDefaults
} from '@/app/lib/utils';
import { useTheme } from '@/app/providers';

interface FooterProps {
  data?: FooterBlock;
}

export function Footer({ data }: FooterProps) {
  const { darkMode } = useTheme();

  if (!data) {
    return null;
  }

  // Get layout and theme with defaults
  const layout = getLayoutWithDefaults(data.layout);
  const theme = getThemeWithDefaults(data.theme, darkMode);
  const themeStyles = getThemeStyles(theme, darkMode);

  const spacingClasses = getSpacingClassesFromLayout(layout);
  const containerWidthClasses = getContainerWidthClasses(layout.containerWidth);

  const text = data.text;

  // Footer link component with hover underline (like NavLink)
  const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    return (
      <Link
        href={href}
        className="relative group text-xs normal-case tracking-normal opacity-70 hover:opacity-100 transition-opacity"
        style={{ color: themeStyles.color || 'inherit' }}
      >
        {children}
        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full" />
      </Link>
    );
  };

  // Get icon for button type
  const getButtonIcon = (button: Button) => {
    if (!button.url) return null;

    switch (button.type) {
      case 'instagram':
        return <Instagram size={18} />;
      case 'email':
        return <Mail size={18} />;
      case 'whatsApp':
        return <MessageCircle size={18} />;
      default:
        return null;
    }
  };

  // Get href for button
  const getButtonHref = (button: Button): string | null => {
    if (!button.url) return null;

    if (button.type === 'whatsApp') {
      const whatsappNumber = button.url.replace(/[^\d]/g, '');
      return `https://wa.me/${whatsappNumber}`;
    }

    if (button.type === 'email') {
      return `mailto:${button.url}`;
    }

    return button.url;
  };

  return (
    <footer
      className={`py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-5 md:px-6 lg:px-8 font-sans text-sm ${spacingClasses} ${containerWidthClasses}`}
      style={themeStyles}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16">
        <div className="md:col-span-1">
          {text?.heading && (
            <h4
              className="font-serif text-2xl mb-6 tracking-widest"
              style={{ color: themeStyles.color || 'inherit' }}
            >
              {text.heading}
            </h4>
          )}
          {text?.body && (
            <div
              className="leading-relaxed text-xs"
              style={{ opacity: 0.7, color: themeStyles.color || 'inherit' }}
            >
              <RichText content={text.body} />
            </div>
          )}
        </div>

        {data.shopButtons && data.shopButtons.length > 0 && (
          <div>
            <h5
              className="uppercase tracking-widest text-xs mb-6"
              style={{ color: themeStyles.color || 'inherit' }}
            >
              Shop
            </h5>
            <ul className="space-y-3 text-xs">
              {data.shopButtons.map((button, index) => {
                const href = button.url ||
                  (button.page?.slug ? `/${button.page.slug}` : '') ||
                  (button.collection?.slug ? `/collection/${button.collection.slug}` : '#');
                return (
                  <li key={index}>
                    <FooterLink href={href}>{button.label}</FooterLink>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {data.companyButtons && data.companyButtons.length > 0 && (
          <div>
            <h5
              className="uppercase tracking-widest text-xs mb-6"
              style={{ color: themeStyles.color || 'inherit' }}
            >
              Company
            </h5>
            <ul className="space-y-3 text-xs">
              {data.companyButtons.map((button, index) => {
                const href = button.url ||
                  (button.page?.slug ? `/${button.page.slug}` : '') ||
                  (button.collection?.slug ? `/collection/${button.collection.slug}` : '#');
                return (
                  <li key={index}>
                    <FooterLink href={href}>{button.label}</FooterLink>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {data.socialButtons && data.socialButtons.length > 0 && (
          <div>
            <h5
              className="uppercase tracking-widest text-xs mb-6"
              style={{ color: themeStyles.color || 'inherit' }}
            >
              Connect
            </h5>
            <div className="flex space-x-4">
              {data.socialButtons.map((button, index) => {
                const href = getButtonHref(button);
                const icon = getButtonIcon(button);

                if (!href || !icon) return null;

                return (
                  <a
                    key={index}
                    href={href}
                    target={button.type === 'externalLink' || button.type === 'instagram' || button.type === 'whatsApp' ? '_blank' : undefined}
                    rel={button.type === 'externalLink' || button.type === 'instagram' || button.type === 'whatsApp' ? 'noopener noreferrer' : undefined}
                    className="opacity-70 hover:opacity-100 transition-opacity"
                    style={{ color: themeStyles.color || 'inherit' }}
                    aria-label={button.label}
                  >
                    {icon}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div
        className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 pt-6 sm:pt-7 md:pt-8 lg:pt-10 border-t flex flex-col md:flex-row justify-between items-center text-xs"
        style={{
          borderColor: themeStyles.color || 'currentColor',
          opacity: 0.1,
          color: themeStyles.color || 'inherit'
        }}
      >
        {data.copyrightText && <p>{data.copyrightText}</p>}
      </div>
    </footer>
  );
}
