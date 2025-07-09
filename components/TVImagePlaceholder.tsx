import { TV } from '@/types';

interface TVImagePlaceholderProps {
  tv: TV;
}

export default function TVImagePlaceholder({ tv }: TVImagePlaceholderProps) {
  const getGradient = (technology: string) => {
    const gradients: Record<string, string> = {
      'OLED': 'from-purple-600 to-purple-800',
      'QLED': 'from-blue-600 to-blue-800',
      'Mini-LED': 'from-orange-600 to-orange-800',
      'LED': 'from-gray-600 to-gray-800',
      'QD-OLED': 'from-red-600 to-red-800',
      'Micro-LED': 'from-yellow-600 to-yellow-800',
    };
    return gradients[technology] || 'from-gray-600 to-gray-800';
  };

  return (
    <div className={`relative h-64 bg-gradient-to-br ${getGradient(tv.technology)} flex items-center justify-center overflow-hidden`}>
      {/* TV Frame Illustration */}
      <div className="absolute inset-4 bg-black rounded-lg opacity-20"></div>
      <div className="absolute inset-6 bg-gray-900 dark:bg-black rounded">
        <div className="w-full h-full flex items-center justify-center text-white/80">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">{tv.size}"</div>
            <div className="text-2xl font-semibold">{tv.brand}</div>
            <div className="text-lg opacity-80">{tv.model}</div>
            <div className="mt-4 text-sm opacity-70">{tv.technology}</div>
          </div>
        </div>
      </div>
      
      {/* Stand */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gray-700 dark:bg-gray-600 rounded-full"></div>
      
      {/* Discount Badge */}
      <div className="absolute top-4 right-4 bg-red-500 dark:bg-red-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
        {tv.discount}% OFF
      </div>
      
      {/* Rating */}
      {tv.rating && (
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-dark-surface/90 text-gray-800 dark:text-dark-text px-3 py-1 rounded-full text-sm font-semibold">
          ⭐ {tv.rating}
        </div>
      )}
    </div>
  );
}