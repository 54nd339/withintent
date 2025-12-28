import { RichText as RichTextRenderer } from '@graphcms/rich-text-react-renderer';
import type { RichTextContent } from '@graphcms/rich-text-types';
import { RichText as RichTextType } from '@/lib/types';
import Link from 'next/link';

interface RichTextProps {
  content?: RichTextType;
  className?: string;
}

export function RichText({ content, className }: RichTextProps) {
  if (!content?.raw) {
    return null;
  }

  return (
    <div className={className}>
      <RichTextRenderer
        content={content.raw as RichTextContent}
        renderers={{
          p: ({ children }) => {
            return <p className="mb-2 last:mb-0">{children}</p>;
          },
          a: ({ children, href, openInNewTab }) => {
            if (href?.startsWith('/')) {
              return (
                <Link href={href} className="hover:opacity-60 transition-opacity">
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={href}
                target={openInNewTab ? '_blank' : undefined}
                rel={openInNewTab ? 'noopener noreferrer' : undefined}
                className="hover:opacity-60 transition-opacity"
              >
                {children}
              </a>
            );
          },
        }}
      />
    </div>
  );
}
