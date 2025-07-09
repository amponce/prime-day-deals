import { technologies } from '@/lib/data';
import TechCard from './TechCard';

export default function TechnologyGuide() {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">📺 TV Technology Guide</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Understanding OLED vs QLED vs Mini-LED</p>
        </div>
        
        {/* Technology Timeline */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">Display Technology Evolution</h3>
          <div className="flex justify-between items-center relative px-4">
            <div className="absolute top-4 left-0 right-0 h-1 bg-gradient-to-r from-gray-400 via-blue-500 to-purple-600"></div>
            {technologies.map((tech, index) => (
              <div key={tech.id} className="relative z-10 text-center">
                <div className={`w-4 h-4 rounded-full border-4 border-white shadow-lg mb-2 ${
                  index === 0 ? 'bg-gray-400' :
                  index === 1 ? 'bg-purple-600' :
                  index === 2 ? 'bg-orange-500' :
                  index === 3 ? 'bg-blue-500' :
                  'bg-gray-400'
                }`}></div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Technology Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.slice(0, 5).map((tech) => (
            <TechCard key={tech.id} technology={tech} />
          ))}
        </div>
        
        {/* Quick Comparison */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">⚡ Quick Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-600">
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Technology</th>
                  <th className="text-center py-3 px-4 text-gray-700 dark:text-gray-300">Best For</th>
                  <th className="text-center py-3 px-4 text-gray-700 dark:text-gray-300">Price Range</th>
                  <th className="text-center py-3 px-4 text-gray-700 dark:text-gray-300">Key Strength</th>
                </tr>
              </thead>
              <tbody>
                {technologies.slice(0, 5).map((tech) => (
                  <tr key={tech.id} className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">{tech.name}</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-700 dark:text-gray-300">{tech.bestFor}</td>
                    <td className="py-3 px-4 text-center font-semibold text-gray-900 dark:text-white">
                      ${tech.priceRange.min} - ${tech.priceRange.max}+
                    </td>
                    <td className="py-3 px-4 text-center text-sm text-gray-700 dark:text-gray-300">{tech.pros[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}