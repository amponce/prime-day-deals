import { technologies } from '@/lib/data';

export const metadata = {
  title: 'TV Buying Guide | OLED vs QLED vs Mini-LED Explained',
  description: 'Complete guide to choosing the right TV technology. Compare OLED, QLED, Mini-LED and more.',
};

export default function GuidePage() {
  return (
    <div className="py-8">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Complete TV Buying Guide</h1>
        
        {/* Introduction */}
        <div className="prose max-w-none mb-12">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            Choosing the right TV can be overwhelming with all the different technologies available. 
            This guide breaks down everything you need to know to make an informed decision.
          </p>
        </div>
        
        {/* Quick Decision Tree */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">🎯 Quick Decision Helper</h2>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">For Dark Room Movie Watching</h3>
              <p className="text-gray-600 dark:text-gray-400">→ Choose <span className="font-bold text-purple-600 dark:text-purple-400">OLED</span> for perfect blacks and infinite contrast</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">For Bright Living Rooms</h3>
              <p className="text-gray-600 dark:text-gray-400">→ Choose <span className="font-bold text-orange-600 dark:text-orange-400">Mini-LED</span> or <span className="font-bold text-blue-600 dark:text-blue-400">QLED</span> for better brightness</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">For Gaming</h3>
              <p className="text-gray-600 dark:text-gray-400">→ Choose <span className="font-bold text-purple-600 dark:text-purple-400">OLED</span> or <span className="font-bold text-orange-600 dark:text-orange-400">Mini-LED</span> with 120Hz+ refresh rate</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">For Budget Conscious</h3>
              <p className="text-gray-600 dark:text-gray-400">→ Choose <span className="font-bold text-gray-600 dark:text-gray-400">LED</span> or entry-level <span className="font-bold text-blue-600 dark:text-blue-400">QLED</span></p>
            </div>
          </div>
        </div>
        
        {/* Detailed Technology Breakdown */}
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Technology Deep Dive</h2>
        
        {technologies.map((tech) => (
          <div key={tech.id} className="mb-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{tech.name}</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{tech.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-3">✅ Advantages</h4>
                <ul className="space-y-2">
                  {tech.pros.map((pro, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-600 mb-3">❌ Disadvantages</h4>
                <ul className="space-y-2">
                  {tech.cons.map((con, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                <span className="font-semibold">Best for:</span> {tech.bestFor} | 
                <span className="font-semibold ml-2">Price range:</span> ${tech.priceRange.min} - ${tech.priceRange.max}+
              </p>
            </div>
          </div>
        ))}
        
        {/* Size Guide */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">📏 TV Size Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Recommended Sizes by Room</h3>
              <ul className="space-y-3">
                <li className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Bedroom:</span>
                  <span className="font-semibold">43" - 50"</span>
                </li>
                <li className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Small Living Room:</span>
                  <span className="font-semibold">55" - 65"</span>
                </li>
                <li className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Large Living Room:</span>
                  <span className="font-semibold">75" - 85"</span>
                </li>
                <li className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Home Theater:</span>
                  <span className="font-semibold">85" - 98"</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Viewing Distance Formula</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="font-mono text-center text-lg mb-2 text-gray-900 dark:text-white">
                  Viewing Distance ÷ 2 = Ideal TV Size
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Example: 10 feet away = 60" TV ideal
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Final Tips */}
        <div className="mt-12 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">💡 Pro Shopping Tips</h2>
          <ul className="space-y-3">
            <li className="flex items-start text-gray-700 dark:text-gray-300">
              <span className="text-2xl mr-3">1️⃣</span>
              <span>Check for HDMI 2.1 ports if you're a gamer - essential for 4K/120Hz gaming</span>
            </li>
            <li className="flex items-start text-gray-700 dark:text-gray-300">
              <span className="text-2xl mr-3">2️⃣</span>
              <span>Don't overpay for 8K - there's almost no 8K content available yet</span>
            </li>
            <li className="flex items-start text-gray-700 dark:text-gray-300">
              <span className="text-2xl mr-3">3️⃣</span>
              <span>Consider the room lighting - OLED struggles in very bright rooms</span>
            </li>
            <li className="flex items-start text-gray-700 dark:text-gray-300">
              <span className="text-2xl mr-3">4️⃣</span>
              <span>Buy during sales events like Prime Day for the best deals</span>
            </li>
            <li className="flex items-start text-gray-700 dark:text-gray-300">
              <span className="text-2xl mr-3">5️⃣</span>
              <span>Factor in a soundbar - most TVs have mediocre built-in speakers</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}