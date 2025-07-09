import { Technology } from '@/types';

interface TechCardProps {
  technology: Technology;
}

export default function TechCard({ technology }: TechCardProps) {
  const getColorClass = (id: string) => {
    const colors: Record<string, string> = {
      'oled': 'from-purple-500 to-purple-700',
      'qd-oled': 'from-red-500 to-red-700',
      'mini-led': 'from-orange-500 to-orange-700',
      'qled': 'from-blue-500 to-blue-700',
      'led': 'from-gray-500 to-gray-700',
    };
    return colors[id] || 'from-gray-500 to-gray-700';
  };

  return (
    <div className="card p-6">
      <div className={`h-2 rounded-full bg-gradient-to-r ${getColorClass(technology.id)} mb-4`}></div>
      
      <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{technology.name}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{technology.description}</p>
      
      <div className="text-xl font-bold text-primary mb-4">
        ${technology.priceRange.min} - ${technology.priceRange.max}+
      </div>
      
      {/* Metrics */}
      <div className="space-y-3 mb-6">
        <div>
          <div className="flex justify-between text-sm mb-1 text-gray-700 dark:text-gray-300">
            <span>Contrast</span>
            <span>{technology.metrics.contrast}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
              style={{ width: `${technology.metrics.contrast}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1 text-gray-700 dark:text-gray-300">
            <span>Brightness</span>
            <span>{technology.metrics.brightness}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
              style={{ width: `${technology.metrics.brightness}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1 text-gray-700 dark:text-gray-300">
            <span>Color</span>
            <span>{technology.metrics.color}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
              style={{ width: `${technology.metrics.color}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Pros & Cons */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <h4 className="font-semibold text-green-600 mb-2">Pros</h4>
          <ul className="space-y-1">
            {technology.pros.slice(0, 2).map((pro, index) => (
              <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                <span className="text-green-500 mr-1">✓</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-red-600 mb-2">Cons</h4>
          <ul className="space-y-1">
            {technology.cons.slice(0, 2).map((con, index) => (
              <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                <span className="text-red-500 mr-1">✗</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Best for: {technology.bestFor}</p>
      </div>
    </div>
  );
}