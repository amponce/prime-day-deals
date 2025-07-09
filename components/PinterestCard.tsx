'use client';

interface PinterestCardProps {
  type: 'deal' | 'room' | 'guide';
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
      <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Pin Button */}
        <button
          onClick={handlePin}
          className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full font-semibold text-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          📌 Save
        </button>
        
        {/* Image Area */}
        <div className={`relative bg-gradient-to-br ${getImageBackground()} text-white p-8 ${
          type === 'guide' ? 'h-96' : type === 'room' ? 'h-80' : 'h-72'
        }`}>
          {price && originalPrice && (
            <div className="absolute top-4 right-4 bg-white text-red-600 px-4 py-2 rounded-full font-bold">
              {Math.round((1 - price / originalPrice) * 100)}% OFF
            </div>
          )}
          
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="text-3xl font-bold mb-2">{title}</div>
            <div className="text-lg opacity-90 mb-4">{subtitle}</div>
            
            {price && (
              <div>
                <div className="text-4xl font-bold">${price}</div>
                {originalPrice && (
                  <div className="text-lg line-through opacity-70">${originalPrice}</div>
                )}
              </div>
            )}
            
            {type === 'guide' && (
              <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm">Expert comparison & buying tips</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Content Area */}
        <div className="p-4">
          {type === 'deal' && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-600">Prime Day Deal</span>
              <button className="text-primary font-semibold hover:underline">
                Shop Now →
              </button>
            </div>
          )}
          
          {type === 'room' && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-600">Shoppable Room</span>
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