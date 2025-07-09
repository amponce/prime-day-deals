import { tvDeals } from '@/lib/data';
import PinterestCard from '@/components/PinterestCard';

export const metadata = {
  title: 'Pinterest Gallery | Pin Your Favorite TV Deals',
  description: 'Browse our Pinterest-optimized gallery of TV deals. Save your favorites to Pinterest!',
};

export default function PinterestPage() {
  // Featured Canvas TV
  const canvasTV = {
    id: 'B0F363GQZF',
    name: 'Hisense 75" CanvasTV',
    size: 75,
    technology: 'QLED',
    currentPrice: 1999.99,
    originalPrice: 2999.99,
    discount: 33,
    imageUrl: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/d9fb3504-0ff9-4f8b-a7a3-9f7c540f9cf6.__CR0,0,1464,600_PT0_SX1464_V1___.jpg',
  };

  return (
    <div className="py-8 bg-white dark:bg-dark-bg">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-text-dark dark:text-white">📌 Pinterest Gallery</h1>
          <p className="text-xl text-text-gray dark:text-dark-text-secondary max-w-3xl mx-auto">
            Pin these TV deals and guides to your boards. Perfect for home decor and tech shopping inspiration!
          </p>
        </div>
        
        {/* Pinterest Style Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {/* Featured Canvas TV */}
          <PinterestCard
            key={canvasTV.id}
            type="featured"
            title={`${canvasTV.name} - Art Mode TV`}
            subtitle={`Transform your space • $${canvasTV.currentPrice}`}
            price={canvasTV.currentPrice}
            originalPrice={canvasTV.originalPrice}
            image={canvasTV.imageUrl}
            pinDescription={`Hisense 75" CanvasTV with Art Mode - Save ${canvasTV.discount}% at $${canvasTV.currentPrice}! Perfect for modern living rooms.`}
          />
          
          {/* TV Deals */}
          {tvDeals.slice(0, 3).map((tv) => (
            <PinterestCard
              key={tv.id}
              type="deal"
              title={tv.name}
              subtitle={`${tv.size}" ${tv.technology} • Save ${tv.discount}%`}
              price={tv.currentPrice}
              originalPrice={tv.originalPrice}
              image={tv.imageUrl || 'tv'}
              pinDescription={`${tv.name} ${tv.size}" TV deal - Save ${tv.discount}% at $${tv.currentPrice}!`}
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
          
          {tvDeals.slice(4, 8).map((tv) => (
            <PinterestCard
              key={tv.id}
              type="deal"
              title={tv.name}
              subtitle={`${tv.size}" ${tv.technology} • Save ${tv.discount}%`}
              price={tv.currentPrice}
              originalPrice={tv.originalPrice}
              image={tv.imageUrl || 'tv'}
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
          
          {/* Budget Guide Card */}
          <PinterestCard
            type="guide"
            title="Best TVs by Budget"
            subtitle="Find the perfect TV for your price range"
            image="budget-guide"
            pinDescription="TV Budget Guide: Best TVs under $500, $1000, and $1500"
          />
          
          {tvDeals.slice(8).map((tv) => (
            <PinterestCard
              key={tv.id}
              type="deal"
              title={tv.name}
              subtitle={`${tv.size}" ${tv.technology} • Save ${tv.discount}%`}
              price={tv.currentPrice}
              originalPrice={tv.originalPrice}
              image={tv.imageUrl || 'tv'}
              pinDescription={`${tv.name} ${tv.size}" TV deal - Save ${tv.discount}% at $${tv.currentPrice}!`}
            />
          ))}
        </div>
        
        {/* Pinterest Tips */}
        <div className="mt-16 bg-white dark:bg-dark-surface rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-text-dark dark:text-white">Pin to These Board Ideas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">📺 TV Shopping Boards</h3>
              <ul className="space-y-2 text-text-gray dark:text-dark-text-secondary">
                <li>• Prime Day TV Deals</li>
                <li>• Modern Living Room TVs</li>
                <li>• Art Mode TVs</li>
                <li>• Gaming Setup Ideas</li>
                <li>• Home Theater Inspiration</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">💡 Tech Guide Boards</h3>
              <ul className="space-y-2 text-text-gray dark:text-dark-text-secondary">
                <li>• TV Technology Guides</li>
                <li>• Living Room Design</li>
                <li>• Minimalist Tech</li>
                <li>• Smart Home Ideas</li>
                <li>• Budget Home Theater</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-bg-light dark:bg-dark-surface-2 rounded-xl">
            <h4 className="font-bold mb-3 text-text-dark dark:text-white">💡 Pin Like a Pro</h4>
            <p className="text-text-gray dark:text-dark-text-secondary">
              Each card is optimized for Pinterest with real prices and discount info. 
              Pin to boards like "Living Room Ideas", "Tech Deals", or "Modern Home Decor" for best engagement!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}