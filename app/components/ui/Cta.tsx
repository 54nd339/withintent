import Link from 'next/link';
import { Cta as CtaType } from '@/app/types';

interface CtaProps {
  cta: CtaType;
  className?: string;
}

export function Cta({ cta, className = '' }: CtaProps) {
  if (!cta?.label) {
    return null;
  }

  const baseClasses = 'inline-block border-b border-black dark:border-white pb-1 font-sans text-xs tracking-widest uppercase hover:opacity-60 transition-opacity text-neutral-900 dark:text-white';
  const combinedClasses = `${baseClasses} ${className}`;

  // Handle WhatsApp
  if (cta.type === 'whatsApp' && cta.url) {
    const whatsappNumber = cta.url.replace(/[^\d]/g, '');
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClasses}
      >
        {cta.label}
      </a>
    );
  }

  // Handle Email
  if (cta.type === 'email' && cta.url) {
    return (
      <a
        href={`mailto:${cta.url}`}
        className={combinedClasses}
      >
        {cta.label}
      </a>
    );
  }

  // Handle Internal Link
  if (cta.type === 'internalLink' && cta.url?.startsWith('/')) {
    return (
      <Link href={cta.url} className={combinedClasses}>
        {cta.label}
      </Link>
    );
  }

  // Handle External Link
  if (cta.url) {
    return (
      <a
        href={cta.url}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClasses}
      >
        {cta.label}
      </a>
    );
  }

  // Fallback if no URL is provided
  return null;
}

