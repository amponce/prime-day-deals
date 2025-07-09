import { tvDeals, roomDesigns } from '@/lib/data';
import PinterestCard from '@/components/PinterestCard';

export const metadata = {
  title: 'Pinterest Gallery | Pin Your Favorite TV Deals & Rooms',
  description: 'Browse our Pinterest-optimized gallery of TV deals and room designs. Save your favorites to Pinterest!',
};

export default function PinterestPage() {
  return (
    <div className="py-8 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">📌 Pinterest Gallery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our curated collection designed for Pinterest. Hover over any image to save it to your boards!
          </p>
        </div>
        
        {/* Pinterest Style Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {/* Mix TV deals and room designs for variety */}
          {tvDeals.slice(0, 3).map((tv) => (
            <PinterestCard
              key={tv.id}
              type="deal"
              title={`${tv.name} ${tv.size}" ${tv.technology}`}
              subtitle={`Only $${tv.currentPrice} (${tv.discount}% OFF)`}
              price={tv.currentPrice}
              originalPrice={tv.originalPrice}
              image="tv"
              pinDescription={`${tv.name} ${tv.size}" TV deal - Save ${tv.discount}% at $${tv.currentPrice}!`}
            />
          ))}
          
          {roomDesigns.slice(0, 2).map((room) => (
            <PinterestCard
              key={room.id}
              type="room"
              title={room.name}
              subtitle={`${room.style} style with ${room.featuredTV.name}`}
              price={room.totalBudget}
              image="room"
              pinDescription={`${room.name} - Complete shoppable room design for ~$${room.totalBudget}`}
            />
          ))}
          
          {/* Technology Guide Cards */}
          <PinterestCard
            type="guide"
            title="OLED vs QLED vs Mini-LED"
            subtitle="Complete TV Technology Guide"
            image="guide"
            pinDescription="TV Buying Guide: Compare OLED, QLED, and Mini-LED technologies"
          />
          
          {tvDeals.slice(3, 6).map((tv) => (
            <PinterestCard
              key={tv.id}
              type="deal"
              title={`${tv.name} ${tv.size}" ${tv.technology}`}
              subtitle={`Only $${tv.currentPrice} (${tv.discount}% OFF)`}
              price={tv.currentPrice}
              originalPrice={tv.originalPrice}
              image="tv"
              pinDescription={`${tv.name} ${tv.size}" TV deal - Save ${tv.discount}% at $${tv.currentPrice}!`}
            />
          ))}
          
          {/* Size Guide Card */}
          <PinterestCard
            type="guide"
            title="TV Size Guide"
            subtitle="Find the perfect size for your room"
            image="size-guide"
            pinDescription="TV Size Guide: How to choose the right TV size for any room"
          />
          
          {roomDesigns.slice(2).map((room) => (
            <PinterestCard
              key={room.id}
              type="room"
              title={room.name}
              subtitle={`${room.style} style with ${room.featuredTV.name}`}
              price={room.totalBudget}
              image="room"
              pinDescription={`${room.name} - Complete shoppable room design for ~$${room.totalBudget}`}
            />
          ))}
        </div>
        
        {/* Pinterest Board Ideas */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">📌 Popular Pinterest Board Ideas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">🏠 Living Room Boards</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Modern Living Room Ideas</li>
                <li>• Cozy Living Room Decor</li>
                <li>• Minimalist Apartment Living</li>
                <li>• Small Space Living Room</li>
                <li>• Luxury Home Theater</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">🎮 Lifestyle Boards</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Gaming Room Setup</li>
                <li>• Man Cave Ideas</li>
                <li>• Movie Night Room</li>
                <li>• Home Entertainment Center</li>
                <li>• Tech Home Decor</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <h4 className="font-bold mb-3">💡 Pro Tip: Pinterest SEO</h4>
            <p className="text-gray-700">
              Our room designs are optimized for these popular Pinterest searches. Each pin includes 
              room style, budget, and shoppable furniture list to maximize saves and clicks!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}