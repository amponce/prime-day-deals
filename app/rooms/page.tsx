import { roomDesigns } from '@/lib/data';
import RoomCard from '@/components/RoomCard';

export const metadata = {
  title: 'Shoppable Room Designs | Living Room Inspiration',
  description: 'Browse beautiful room designs featuring the latest TVs. Shop complete room setups with furniture and decor.',
};

export default function RoomsPage() {
  return (
    <div className="py-8">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Shoppable Room Designs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get inspired by these curated room designs. Every item is shoppable - from the TV to the furniture!
          </p>
        </div>
        
        {/* Room Style Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <button className="px-6 py-2 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors">
            All Styles
          </button>
          <button className="px-6 py-2 rounded-full border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary transition-colors">
            Modern
          </button>
          <button className="px-6 py-2 rounded-full border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary transition-colors">
            Cozy
          </button>
          <button className="px-6 py-2 rounded-full border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary transition-colors">
            Minimal
          </button>
          <button className="px-6 py-2 rounded-full border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary transition-colors">
            Luxury
          </button>
        </div>
        
        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomDesigns.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
        
        {/* AI Design Helper */}
        <div className="mt-16 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">🤖 Create Your Own Room Design</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 mb-6 text-center">
              Use AI to visualize your dream room with these prompts:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold mb-3">Modern Living Room</h3>
                <code className="text-sm bg-gray-100 p-3 rounded block">
                  "Photorealistic modern living room, 65-inch OLED TV on wall, minimalist furniture, natural lighting"
                </code>
              </div>
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold mb-3">Cozy Family Room</h3>
                <code className="text-sm bg-gray-100 p-3 rounded block">
                  "Warm cozy living room, 77-inch TV above fireplace, leather furniture, soft lighting"
                </code>
              </div>
            </div>
            
            <p className="text-center mt-6 text-gray-600">
              💡 Tip: Add your favorite furniture brands or specific colors to personalize!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}