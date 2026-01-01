import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: '404 • Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="min-h-[600px] w-full flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] p-12 relative overflow-hidden transition-colors duration-700">
      {/* Background Abstract Diamond/Gem Shape */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[400px] h-[400px] border border-[var(--foreground)]/10 diamond-bg opacity-30" />
        <div className="absolute w-[380px] h-[380px] border border-[var(--foreground)]/5 diamond-bg opacity-20" style={{ animationDelay: '-2s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-md mx-auto">

        {/* Main 404 Display */}
        <div className="mb-10 opacity-0 animate-fade-up relative">
          <div className="font-serif text-8xl md:text-9xl tracking-[0.15em] font-light text-[var(--foreground)] leading-none flex items-center justify-center">
            <span>4</span>
            <span className="relative">
              0
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-8 w-16 h-[1px] bg-[var(--foreground)]" />
            </span>
            <span>4</span>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-8 opacity-0 animate-fade-up delay-100">
          <div className="space-y-3">
            <h2 className="text-xs tracking-[0.3em] uppercase font-sans text-neutral-500 dark:text-neutral-400">
              Page Not Found
            </h2>
            <p className="font-serif text-2xl md:text-3xl font-light italic text-[var(--foreground)]/80">
              &quot;Rare things are often hard to find.&quot;
            </p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 font-light mt-2 max-w-xs mx-auto leading-relaxed">
              The piece you are looking for seems to have been moved or is no longer available in our collection.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 pt-4 opacity-0 animate-fade-up delay-200">
            <Link
              href="/shop"
              className="group relative px-8 py-3 bg-[var(--foreground)] text-[var(--background)] text-[10px] tracking-[0.25em] uppercase transition-all duration-500 hover:opacity-80 min-w-[200px] text-center"
            >
              Browse Shop
            </Link>

            <Link
              href="/"
              className="group relative text-[10px] tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400 hover:text-[var(--foreground)] transition-colors flex items-center gap-2 py-2"
            >
              <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform duration-500" />
              <span className="relative">
                Return Home
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--foreground)] group-hover:w-full transition-all duration-500" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
