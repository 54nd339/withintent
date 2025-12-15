import Link from 'next/link';
import { Link as LinkType } from '@/app/types';

interface SmartLinkProps {
  link: LinkType;
  className?: string;
  children?: React.ReactNode;
}

export function SmartLink({ link, className = '', children }: SmartLinkProps) {
  if (!link) {
    return null;
  }

  // Internal page link
  if (link.page?.slug) {
    return (
      <Link href={`/${link.page.slug}`} className={className}>
        {children || link.label}
      </Link>
    );
  }

  // Internal collection link
  if (link.collection?.slug) {
    return (
      <Link href={`/collection/${link.collection.slug}`} className={className}>
        {children || link.label}
      </Link>
    );
  }

  // External URL
  if (link.externalUrl) {
    return (
      <a
        href={link.externalUrl}
        target={link.externalUrl.startsWith('http') ? '_blank' : undefined}
        rel={link.externalUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={className}
      >
        {children || link.label}
      </a>
    );
  }

  // Fallback
  return <span className={className}>{children || link.label}</span>;
}

