import { roomDesigns } from '@/lib/data';
import RoomCard from './RoomCard';
import Link from 'next/link';

export default function RoomInspiration() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">🏠 Shoppable Room Designs</h2>
          <p className="text-xl text-gray-600">Complete room setups you can buy today</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomDesigns.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/rooms" className="btn-secondary">
            Explore All Room Designs →
          </Link>
        </div>
      </div>
    </section>
  );
}