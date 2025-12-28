import Link from 'next/link';
import { Cta as ButtonType } from '@/lib/types';
import { getButtonHref } from '@/lib/utils';

interface ButtonProps {
  cta: ButtonType;
  className?: string;
}

export function Button({ cta, className = '' }: ButtonProps) {
  if (!cta?.label) {
    return null;
  }

  const baseClasses = 'inline-block border-b border-black dark:border-white pb-1 font-sans text-xs tracking-widest uppercase hover:opacity-60 transition-opacity text-neutral-900 dark:text-white';
  const combinedClasses = `${baseClasses} ${className}`;

  // Get href using utility function
  const href = getButtonHref(cta);

  // Handle Internal Link
  if (cta.type === 'internalLink' && cta.url?.startsWith('/')) {
    return (
      <Link href={cta.url} className={combinedClasses}>
        {cta.label}
      </Link>
    );
  }

  // Handle links with href (WhatsApp, Email, External)
  if (href) {
    const isExternal = cta.type === 'whatsApp' || cta.type === 'email' || (cta.type === 'externalLink' && href.startsWith('http'));
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={combinedClasses}
      >
        {cta.label}
      </a>
    );
  }

  // Fallback if no URL is provided
  return null;
}
