import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 • Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] dark:bg-[#121212] px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 SVG */}
        <div className="mb-8 sm:mb-12 flex justify-center px-2">
          <svg
            viewBox="0 0 320 200"
            className="w-full max-w-[280px] sm:max-w-[320px] h-auto text-neutral-900 dark:text-neutral-100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Number 4 - First */}
            <g opacity="0.8">
              <path
                d="M 50 30 L 50 80 L 80 80 L 110 30 L 110 130"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="0,300"
              >
                <animate
                  attributeName="stroke-dasharray"
                  values="0,300;150,150;300,0"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;-150;-300"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </path>
            </g>

            {/* Number 0 */}
            <g opacity="0.8">
              <circle
                cx="160"
                cy="80"
                r="35"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeDasharray="0,220"
              >
                <animate
                  attributeName="stroke-dasharray"
                  values="0,220;110,110;220,0"
                  dur="2.5s"
                  begin="0.4s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;-110;-220"
                  dur="2.5s"
                  begin="0.4s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            {/* Number 4 - Second */}
            <g opacity="0.8">
              <path
                d="M 230 30 L 230 80 L 260 80 L 290 30 L 290 130"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="0,300"
              >
                <animate
                  attributeName="stroke-dasharray"
                  values="0,300;150,150;300,0"
                  dur="2.5s"
                  begin="0.8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;-150;-300"
                  dur="2.5s"
                  begin="0.8s"
                  repeatCount="indefinite"
                />
              </path>
            </g>

            {/* Decorative gold accent circles */}
            <circle cx="20" cy="40" r="2" fill="#d4af37" opacity="0.6" className="dark:fill-[#b8961e]">
              <animate
                attributeName="cy"
                values="40;25;40"
                dur="3s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="300" cy="40" r="2" fill="#d4af37" opacity="0.6" className="dark:fill-[#b8961e]">
              <animate
                attributeName="cy"
                values="40;25;40"
                dur="3s"
                begin="0.8s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur="3s"
                begin="0.8s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="160" cy="170" r="2" fill="#d4af37" opacity="0.6" className="dark:fill-[#b8961e]">
              <animate
                attributeName="cy"
                values="170;155;170"
                dur="3s"
                begin="1.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur="3s"
                begin="1.6s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        {/* Text content */}
        <div className="space-y-4 sm:space-y-6">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl text-neutral-900 dark:text-neutral-100 mb-2 sm:mb-4">
            Page Not Found
          </h1>
          <p className="font-sans text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-md mx-auto px-4">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <Link
              href="/"
              className="inline-block border-b border-neutral-900 dark:border-neutral-100 pb-1 font-sans text-xs tracking-widest uppercase hover:opacity-60 transition-opacity text-neutral-900 dark:text-neutral-100"
            >
              Return Home
            </Link>
            <span className="text-neutral-400 dark:text-neutral-600">•</span>
            <Link
              href="/shop"
              className="inline-block border-b border-neutral-900 dark:border-neutral-100 pb-1 font-sans text-xs tracking-widest uppercase hover:opacity-60 transition-opacity text-neutral-900 dark:text-neutral-100"
            >
              Browse Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
