import React from 'react';
import { RichText, SmartLink, SocialLink } from '@/app/components';
import { FooterBlock } from '@/app/types';
import { getSpacingClasses } from '@/app/lib/utils';

interface FooterProps {
  data?: FooterBlock;
}

export function Footer({ data }: FooterProps) {
  if (!data) {
    return null;
  }

  const spacingClasses = getSpacingClasses(
    data.paddingTop,
    data.paddingBottom,
    data.marginTop,
    data.marginBottom
  );

  return (
    <footer className={`bg-neutral-900 text-neutral-400 py-20 px-6 font-sans text-sm ${spacingClasses}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          {data.brandName && (
            <h4 className="font-serif text-2xl text-white mb-6 tracking-widest">
              {data.brandName}
            </h4>
          )}
          {data.description && (
            <div className="leading-relaxed text-xs">
              <RichText content={data.description} className="text-neutral-400" />
            </div>
          )}
        </div>

        {data.shopLinks && data.shopLinks.length > 0 && (
          <div>
            <h5 className="text-white uppercase tracking-widest text-xs mb-6">Shop</h5>
            <ul className="space-y-4 text-xs">
              {data.shopLinks.map((link, index) => (
                <li key={index}>
                  <SmartLink link={link} className="hover:text-white transition-colors">
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.companyLinks && data.companyLinks.length > 0 && (
          <div>
            <h5 className="text-white uppercase tracking-widest text-xs mb-6">Company</h5>
            <ul className="space-y-4 text-xs">
              {data.companyLinks.map((link, index) => (
                <li key={index}>
                  <SmartLink link={link} className="hover:text-white transition-colors">
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.socialLinks && data.socialLinks.length > 0 && (
          <div>
            <h5 className="text-white uppercase tracking-widest text-xs mb-6">Connect</h5>
            <div className="flex space-x-4">
              {data.socialLinks.map((link, index) => (
                <SocialLink key={index} link={link} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600">
        {data.copyrightText && <p>{data.copyrightText}</p>}
        {data.legalLinks && data.legalLinks.length > 0 && (
          <div className="flex space-x-6 mt-4 md:mt-0">
            {data.legalLinks.map((link, index) => (
              <SmartLink key={index} link={link} className="hover:text-white transition-colors">
                {link.label}
              </SmartLink>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
