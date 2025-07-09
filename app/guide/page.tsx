import { technologies } from '@/lib/data';

export const metadata = {
  title: 'TV Buying Guide | OLED vs QLED vs Mini-LED Explained',
  description: 'Complete guide to choosing the right TV technology. Compare OLED, QLED, Mini-LED and more.',
};

export default function GuidePage() {
  return (
    <div className="py-8">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Complete TV Buying Guide</h1>
        
        {/* Introduction */}
        <div className="prose max-w-none mb-12">
          <p className="text-xl text-gray-600 mb-6">
            Choosing the right TV can be overwhelming with all the different technologies available. 
            This guide breaks down everything you need to know to make an informed decision.
          </p>
        </div>
        
        {/* Quick Decision Tree */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">🎯 Quick Decision Helper</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">For Dark Room Movie Watching</h3>
              <p className="text-gray-600">→ Choose <span className="font-bold text-purple-600">OLED</span> for perfect blacks and infinite contrast</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">For Bright Living Rooms</h3>
              <p className="text-gray-600">→ Choose <span className="font-bold text-orange-600">Mini-LED</span> or <span className="font-bold text-blue-600">QLED</span> for better brightness</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">For Gaming</h3>
              <p className="text-gray-600">→ Choose <span className="font-bold text-purple-600">OLED</span> or <span className="font-bold text-orange-600">Mini-LED</span> with 120Hz+ refresh rate</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">For Budget Conscious</h3>
              <p className="text-gray-600">→ Choose <span className="font-bold text-gray-600">LED</span> or entry-level <span className="font-bold text-blue-600">QLED</span></p>
            </div>
          </div>
        </div>
        
        {/* Detailed Technology Breakdown */}
        <h2 className="text-3xl font-bold mb-8">Technology Deep Dive</h2>
        
        {technologies.map((tech) => (
          <div key={tech.id} className="mb-10 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-4">{tech.name}</h3>
            <p className="text-lg text-gray-600 mb-4">{tech.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-3">✅ Advantages</h4>
                <ul className="space-y-2">
                  {tech.pros.map((pro, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700">{pro}</span>
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
                      <span className="text-gray-700">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm">
                <span className="font-semibold">Best for:</span> {tech.bestFor} | 
                <span className="font-semibold ml-2">Price range:</span> ${tech.priceRange.min} - ${tech.priceRange.max}+
              </p>
            </div>
          </div>
        ))}
        
        {/* Size Guide */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6">📏 TV Size Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-4">Recommended Sizes by Room</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span>Bedroom:</span>
                  <span className="font-semibold">43" - 50"</span>
                </li>
                <li className="flex justify-between">
                  <span>Small Living Room:</span>
                  <span className="font-semibold">55" - 65"</span>
                </li>
                <li className="flex justify-between">
                  <span>Large Living Room:</span>
                  <span className="font-semibold">75" - 85"</span>
                </li>
                <li className="flex justify-between">
                  <span>Home Theater:</span>
                  <span className="font-semibold">85" - 98"</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Viewing Distance Formula</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-mono text-center text-lg mb-2">
                  Viewing Distance ÷ 2 = Ideal TV Size
                </p>
                <p className="text-sm text-gray-600 text-center">
                  Example: 10 feet away = 60" TV ideal
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Final Tips */}
        <div className="mt-12 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">💡 Pro Shopping Tips</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-2xl mr-3">1️⃣</span>
              <span>Check for HDMI 2.1 ports if you're a gamer - essential for 4K/120Hz gaming</span>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">2️⃣</span>
              <span>Don't overpay for 8K - there's almost no 8K content available yet</span>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">3️⃣</span>
              <span>Consider the room lighting - OLED struggles in very bright rooms</span>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">4️⃣</span>
              <span>Buy during sales events like Prime Day for the best deals</span>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">5️⃣</span>
              <span>Factor in a soundbar - most TVs have mediocre built-in speakers</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}