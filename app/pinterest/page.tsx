import { tvDeals } from '@/lib/data';
import PinterestCard from '@/components/PinterestCard';

export const metadata = {
  title: 'Living Room Inspiration | Modern TV Setup Ideas',
  description: 'Beautiful living room designs featuring the latest TV technology. Get inspired for your home entertainment space.',
};

export default function PinterestPage() {
  // Room inspiration ideas with TV integration
  const roomInspirations = [
    {
      id: 'modern-minimalist',
      title: 'Minimalist Living Room with Wall-Mounted TV',
      subtitle: 'Clean lines • Hidden cables • Floating console',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
      type: 'room' as const,
      pinDescription: 'Minimalist living room design featuring a wall-mounted TV with floating console. Perfect for modern apartments.',
    },
    {
      id: 'cozy-fireplace',
      title: 'Cozy Movie Night Setup',
      subtitle: 'Warm lighting • Plush seating • Perfect viewing angle',
      image: 'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&q=80',
      type: 'room' as const,
      pinDescription: 'Create the perfect movie night atmosphere with warm lighting and comfortable seating arrangement.',
    },
    {
      id: 'industrial-loft',
      title: 'Industrial Loft Entertainment Wall',
      subtitle: 'Exposed brick • Metal accents • Gallery wall',
      image: 'https://images.unsplash.com/photo-1536437075651-01d675529a6b?w=800&q=80',
      type: 'room' as const,
      pinDescription: 'Industrial style living room with exposed brick and a sleek entertainment setup. Urban loft inspiration.',
    },
    {
      id: 'small-space',
      title: 'Small Space TV Solutions',
      subtitle: '15 ideas for apartments & tiny homes',
      type: 'guide' as const,
      image: 'small-space',
      pinDescription: 'Smart TV placement ideas for small apartments and tiny homes. Maximize your space!',
    },
    {
      id: 'scandinavian',
      title: 'Scandinavian TV Corner',
      subtitle: 'Light wood • White walls • Natural light',
      image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80',
      type: 'room' as const,
      pinDescription: 'Bright Scandinavian living room with natural wood TV stand and plenty of natural light.',
    },
    {
      id: 'cable-management',
      title: 'Hide Those Cables!',
      subtitle: 'DIY cable management hacks',
      type: 'guide' as const,
      image: 'cable-management',
      pinDescription: 'Easy DIY cable management solutions to keep your TV area clean and organized.',
    },
    {
      id: 'boho-chic',
      title: 'Boho Living Room with Art TV',
      subtitle: 'Plants • Textures • Art when off',
      image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&q=80',
      type: 'room' as const,
      pinDescription: 'Bohemian style living room featuring a TV that doubles as artwork when not in use.',
    },
    {
      id: 'modern-farmhouse',
      title: 'Modern Farmhouse TV Setup',
      subtitle: 'Shiplap • Barn doors • Rustic charm',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
      type: 'room' as const,
      pinDescription: 'Modern farmhouse living room with sliding barn doors to hide the TV. Cozy and functional!',
    },
    {
      id: 'lighting-guide',
      title: 'TV Room Lighting Guide',
      subtitle: 'Reduce glare • Set the mood',
      type: 'guide' as const,
      image: 'lighting-guide',
      pinDescription: 'Complete guide to lighting your TV room - reduce glare and create the perfect ambiance.',
    },
  ];

  // Select diverse TV deals - avoid showing multiple similar models
  const selectedTVDeals = [
    tvDeals.find(tv => tv.technology === 'OLED' && tv.size >= 65),
    tvDeals.find(tv => tv.technology === 'QLED' && tv.currentPrice < 500),
    tvDeals.find(tv => tv.brand === 'Samsung' && tv.name.includes('Frame')),
    tvDeals.find(tv => tv.size >= 75),
    tvDeals.find(tv => tv.currentPrice < 300),
    tvDeals.find(tv => tv.technology === 'Mini-LED'),
  ].filter(Boolean).slice(0, 6);

  // Create Pinterest-style content mix
  const pinterestContent: Array<{
    id: string;
    title: string;
    subtitle: string;
    type: 'deal' | 'room' | 'guide' | 'featured';
    image: string;
    pinDescription: string;
    price?: number;
    originalPrice?: number;
  }> = [];
  
  // Interweave room inspirations, guides, and TV deals for natural flow
  roomInspirations.forEach((item, index) => {
    pinterestContent.push(item);
    
    // Add a TV deal after every 2-3 room items
    if (index % 3 === 1 && selectedTVDeals[Math.floor(index / 3)]) {
      const tv = selectedTVDeals[Math.floor(index / 3)];
      if (tv) {
        pinterestContent.push({
          id: tv.id,
          title: `${getRoomStyle(index)} with ${tv.size}" ${tv.technology}`,
          subtitle: `Shop the look • ${tv.discount}% off today`,
          price: tv.currentPrice,
          originalPrice: tv.originalPrice,
          image: tv.imageUrl || '',
          type: 'featured' as const,
          pinDescription: `${getRoomStyle(index)} design featuring ${tv.name}. Create this entertainment setup for less!`,
        });
      }
    }
  });

  return (
    <div className="py-8 bg-gray-50 dark:bg-dark-bg min-h-screen">
      <div className="container-custom">
        {/* Subtle header - Pinterest style */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium mb-2 text-gray-900 dark:text-white">TV Room Ideas & Inspiration</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Living room designs, setup guides, and current deals
          </p>
        </div>
        
        {/* Pinterest Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {pinterestContent.map((item) => (
            <PinterestCard
              key={item.id}
              type={item.type}
              title={item.title}
              subtitle={item.subtitle}
              price={item.price}
              originalPrice={item.originalPrice}
              image={item.image}
              pinDescription={item.pinDescription}
            />
          ))}
        </div>
        
        {/* Bottom CTA - Very subtle */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Pin your favorites • More ideas added weekly
          </p>
        </div>
      </div>
    </div>
  );
}

function getRoomStyle(index: number): string {
  const styles = [
    'Modern entertainment center',
    'Cozy family room setup',
    'Minimalist TV wall',
    'Small space solution',
    'Home theater design',
    'Open concept living',
  ];
  return styles[index % styles.length];
}