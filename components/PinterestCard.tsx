'use client';

interface PinterestCardProps {
  type: 'deal' | 'room' | 'guide' | 'featured';
  title: string;
  subtitle: string;
  price?: number;
  originalPrice?: number;
  image: string;
  pinDescription: string;
}

export default function PinterestCard({
  type,
  title,
  subtitle,
  price,
  originalPrice,
  image,
  pinDescription,
}: PinterestCardProps) {
  const handlePin = () => {
    const url = encodeURIComponent(window.location.href);
    const desc = encodeURIComponent(pinDescription);
    window.open(`https://pinterest.com/pin/create/button/?url=${url}&description=${desc}`, '_blank');
  };

  const getImageBackground = () => {
    const backgrounds: Record<string, string> = {
      'tv': 'from-purple-500 to-purple-700',
      'room': 'from-blue-500 to-blue-700',
      'guide': 'from-green-500 to-green-700',
      'size-guide': 'from-orange-500 to-orange-700',
    };
    return backgrounds[image] || 'from-gray-500 to-gray-700';
  };

  return (
    <div className="break-inside-avoid group">
      <div className="relative bg-white dark:bg-dark-surface rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-border-light dark:border-dark-border">
        {/* Pin Button */}
        <button
          onClick={handlePin}
          className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full font-semibold text-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          📌 Save
        </button>
        
        {/* Image Area */}
        <div className={`relative overflow-hidden ${
          type === 'guide' ? 'h-96' : type === 'featured' ? 'h-80' : 'h-64'
        }`}>
          {/* Display actual image if URL provided */}
          {image.startsWith('http') ? (
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`h-full bg-gradient-to-br ${getImageBackground()}`} />
          )}
          
          {/* Overlay content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            {price && originalPrice && (
              <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-md font-bold shadow-lg">
                {Math.round((1 - price / originalPrice) * 100)}% OFF
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2 line-clamp-2">{title}</h3>
              <p className="text-lg opacity-90 mb-3 line-clamp-1">{subtitle}</p>
              
              {price && (
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold">${price}</span>
                  {originalPrice && (
                    <span className="text-lg line-through opacity-70">${originalPrice}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="p-4 bg-white dark:bg-dark-surface">
          {(type === 'deal' || type === 'featured') && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-text-gray dark:text-dark-text-secondary">Prime Day Deal</span>
              <button className="text-primary font-semibold hover:underline">
                Shop Now →
              </button>
            </div>
          )}
          
          {type === 'room' && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-text-gray dark:text-dark-text-secondary">Shoppable Room</span>
              <button className="text-primary font-semibold hover:underline">
                View Room →
              </button>
            </div>
          )}
          
          {type === 'guide' && (
            <div className="text-center">
              <button className="text-primary font-semibold hover:underline">
                Read Full Guide →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}