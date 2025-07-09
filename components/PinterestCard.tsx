'use client';

import Link from 'next/link';

interface PinterestCardProps {
  type: 'deal' | 'room' | 'guide' | 'featured';
  title: string;
  subtitle: string;
  price?: number;
  originalPrice?: number;
  image: string;
  pinDescription: string;
  href?: string;
}

export default function PinterestCard({
  type,
  title,
  subtitle,
  price,
  originalPrice,
  image,
  pinDescription,
  href,
}: PinterestCardProps) {
  const handlePin = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = encodeURIComponent(window.location.href);
    const desc = encodeURIComponent(pinDescription);
    window.open(`https://pinterest.com/pin/create/button/?url=${url}&description=${desc}`, '_blank');
  };

  // Map guide images to blog post URLs
  const getGuideUrl = () => {
    const guideUrls: Record<string, string> = {
      'small-space': '/blog/small-space-tv-solutions',
      'cable-management': '/blog/hide-tv-cables',
      'lighting-guide': '/blog/tv-room-lighting-guide',
    };
    return guideUrls[image] || '/blog';
  };

  // Guide placeholder images with better styling
  const getGuideContent = () => {
    const guideStyles: Record<string, { bg: string; icon: string; color: string }> = {
      'small-space': { bg: 'bg-blue-50', icon: '📐', color: 'text-blue-900' },
      'cable-management': { bg: 'bg-green-50', icon: '🔌', color: 'text-green-900' },
      'lighting-guide': { bg: 'bg-amber-50', icon: '💡', color: 'text-amber-900' },
      'guide': { bg: 'bg-purple-50', icon: '📚', color: 'text-purple-900' },
    };
    const style = guideStyles[image] || guideStyles.guide;
    
    return (
      <div className={`h-full ${style.bg} flex flex-col items-center justify-center p-8`}>
        <span className="text-6xl mb-4">{style.icon}</span>
        <h3 className={`text-xl font-bold text-center ${style.color}`}>{title}</h3>
      </div>
    );
  };

  const cardContent = (
    <>
      <div className="relative bg-white dark:bg-dark-surface rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
        {/* Pinterest-style save button */}
        <button
          onClick={handlePin}
          className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-medium text-sm z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
        >
          Save
        </button>
        
        {/* Image Area */}
        <div className={`relative overflow-hidden ${
          type === 'guide' ? 'h-80' : 
          type === 'room' ? 'h-96' : 
          type === 'featured' ? 'h-72' : 
          'h-64'
        }`}>
          {image.startsWith('http') ? (
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : image.includes('guide') ? (
            getGuideContent()
          ) : (
            <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800" />
          )}
          
          {/* Subtle price overlay for deals */}
          {type === 'featured' && price && originalPrice && originalPrice > price && (
            <div className="absolute bottom-3 left-3">
              <div className="bg-white/95 dark:bg-black/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
                <span className="text-sm font-bold text-red-600 dark:text-red-400">
                  {Math.round((1 - price / originalPrice) * 100)}% off
                </span>
              </div>
            </div>
          )}
        </div>
        
        {/* Content Area - Pinterest style */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
            {title}
          </h3>
          
          {subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {subtitle}
            </p>
          )}
          
          {/* Subtle action hint */}
          {type === 'room' && (
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 font-medium">
              Get the look →
            </p>
          )}
          
          {type === 'guide' && (
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 font-medium">
              Read guide →
            </p>
          )}
          
          {type === 'featured' && price && (
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                ${price.toLocaleString()}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="text-sm text-gray-500 line-through">
                  ${originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );

  // Wrap in Link for guide cards, otherwise just return the card
  if (type === 'guide') {
    return (
      <Link href={href || getGuideUrl()} className="break-inside-avoid group cursor-pointer block">
        {cardContent}
      </Link>
    );
  }

  return (
    <div className="break-inside-avoid group cursor-pointer">
      {cardContent}
    </div>
  );
}