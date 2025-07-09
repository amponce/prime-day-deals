'use client';

import { TV } from '@/types';
import TVDealCard from './TVDealCard';

interface BlogPostProps {
  title: string;
  subtitle: string;
  heroImage: string;
  heroAlt: string;
  publishDate: string;
  readTime: string;
  content: React.ReactNode;
  recommendedProducts?: TV[];
}

export default function BlogPost({
  title,
  subtitle,
  heroImage,
  heroAlt,
  publishDate,
  readTime,
  content,
  recommendedProducts
}: BlogPostProps) {
  const handlePin = () => {
    const url = encodeURIComponent(window.location.href);
    const desc = encodeURIComponent(`${title} - ${subtitle}`);
    window.open(`https://pinterest.com/pin/create/button/?url=${url}&description=${desc}&media=${encodeURIComponent(heroImage)}`, '_blank');
  };

  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <img
          src={heroImage}
          alt={heroAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Pinterest Save Button */}
        <button
          onClick={handlePin}
          className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-medium text-xs sm:text-sm transition-colors shadow-lg flex items-center gap-2"
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-.998 2.352-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
          </svg>
          <span className="hidden sm:inline">Save</span>
        </button>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-12">
          <div className="container mx-auto max-w-7xl px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 max-w-4xl leading-tight">
              {title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
            <div className="flex items-center gap-3 sm:gap-4 mt-4 sm:mt-6 text-white/80 text-xs sm:text-sm">
              <span>{publishDate}</span>
              <span>•</span>
              <span>{readTime} read</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-dark-surface rounded-xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-12 blog-content">
            {content}
          </div>

          {/* Recommended Products */}
          {recommendedProducts && recommendedProducts.length > 0 && (
            <div className="mt-8 sm:mt-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
                Recommended TV Deals
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {recommendedProducts.map((tv) => (
                  <TVDealCard key={tv.id} tv={tv} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        /* Base Typography */
        .blog-content {
          font-size: 1rem;
          line-height: 1.75;
        }
        
        @media (min-width: 768px) {
          .blog-content {
            font-size: 1.125rem;
            line-height: 1.875;
          }
        }
        
        /* Headings */
        .blog-content h2 {
          @apply text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 mt-8 sm:mt-12 text-gray-900 dark:text-white;
          letter-spacing: -0.025em;
        }
        
        .blog-content h3 {
          @apply text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 mt-6 sm:mt-8 text-gray-800 dark:text-gray-100;
          letter-spacing: -0.02em;
        }
        
        .blog-content h4 {
          @apply text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 mt-4 sm:mt-6 text-gray-800 dark:text-gray-100;
        }
        
        /* Paragraphs */
        .blog-content p {
          @apply text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed;
        }
        
        /* Lists */
        .blog-content ul {
          @apply list-disc pl-5 sm:pl-6 mb-4 sm:mb-6 space-y-2;
        }
        
        .blog-content ul li {
          @apply text-gray-700 dark:text-gray-300 leading-relaxed;
          padding-left: 0.375rem;
        }
        
        .blog-content ul li strong {
          @apply text-gray-900 dark:text-gray-100;
        }
        
        .blog-content ol {
          @apply list-decimal pl-5 sm:pl-6 mb-4 sm:mb-6 space-y-2 sm:space-y-3;
        }
        
        .blog-content ol li {
          @apply text-gray-700 dark:text-gray-300 leading-relaxed;
          padding-left: 0.375rem;
        }
        
        /* Strong Text */
        .blog-content strong {
          @apply font-semibold text-gray-900 dark:text-white;
        }
        
        /* Tip Boxes */
        .blog-content .tip-box {
          @apply bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 rounded-r-lg;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        
        .blog-content .tip-box p {
          @apply mb-0 text-blue-900 dark:text-blue-100;
          font-size: 0.95em;
        }
        
        @media (min-width: 768px) {
          .blog-content .tip-box p {
            font-size: 1em;
          }
        }
        
        /* Warning Boxes */
        .blog-content .warning-box {
          @apply bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 rounded-r-lg;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        
        .blog-content .warning-box p {
          @apply mb-0 text-amber-900 dark:text-amber-100;
          font-size: 0.95em;
        }
        
        @media (min-width: 768px) {
          .blog-content .warning-box p {
            font-size: 1em;
          }
        }
        
        /* Quick Summary */
        .blog-content .quick-summary {
          @apply bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 p-4 sm:p-5 md:p-6 rounded-lg mb-6 sm:mb-8 border border-gray-200 dark:border-gray-600;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .blog-content .quick-summary h4 {
          @apply text-base sm:text-lg font-semibold mb-3 text-gray-900 dark:text-white;
          margin-top: 0;
        }
        
        .blog-content .quick-summary ul {
          @apply mb-0 space-y-1.5;
        }
        
        .blog-content .quick-summary ul li {
          @apply text-sm sm:text-base text-gray-700 dark:text-gray-300;
        }
        
        /* Improve readability with max-width for text blocks */
        .blog-content > p,
        .blog-content > ul,
        .blog-content > ol {
          max-width: 65ch;
        }
        
        /* Better spacing between sections */
        .blog-content > *:first-child {
          margin-top: 0;
        }
        
        .blog-content > *:last-child {
          margin-bottom: 0;
        }
        
        /* Responsive adjustments for very small screens */
        @media (max-width: 640px) {
          .blog-content h2 {
            line-height: 1.3;
          }
          
          .blog-content h3 {
            line-height: 1.35;
          }
          
          .blog-content ul,
          .blog-content ol {
            padding-left: 1.25rem;
          }
        }
      `}</style>
    </article>
  );
}