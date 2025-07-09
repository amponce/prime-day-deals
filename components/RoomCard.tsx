'use client';

import { Room } from '@/types';
import { useState } from 'react';

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  const [showProducts, setShowProducts] = useState(false);

  const getStyleColor = (style: string) => {
    const colors: Record<string, string> = {
      'modern': 'text-blue-600',
      'cozy': 'text-orange-600',
      'minimal': 'text-gray-600',
      'luxury': 'text-purple-600',
      'industrial': 'text-gray-800',
      'boho': 'text-red-600',
    };
    return colors[style] || 'text-gray-600';
  };

  const getPinterestDescription = () => {
    const styleDescriptions: Record<string, string> = {
      'modern': 'Modern Living Room Ideas',
      'cozy': 'Cozy Living Room Design', 
      'minimal': 'Minimalist Living Room',
      'luxury': 'Luxury Home Theater',
      'industrial': 'Industrial Living Room',
      'boho': 'Boho Living Room Decor',
    };
    
    const baseDesc = styleDescriptions[room.style] || 'Living Room Design';
    return `${baseDesc} | ${room.name} featuring ${room.featuredTV.size}" ${room.featuredTV.technology} TV • Get the look for ~$${room.totalBudget.toLocaleString()} • Click for shoppable furniture list`;
  };

  const handlePin = () => {
    const url = encodeURIComponent(window.location.href);
    const desc = encodeURIComponent(getPinterestDescription());
    window.open(`https://pinterest.com/pin/create/button/?url=${url}&description=${desc}`, '_blank');
  };

  return (
    <div className="pin-card group">
      {/* Pin Button */}
      <button
        onClick={handlePin}
        className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full font-semibold text-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        📌 Save Room
      </button>
      
      {/* Style Badge */}
      <div className={`absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-semibold text-sm ${getStyleColor(room.style)}`}>
        {room.style.charAt(0).toUpperCase() + room.style.slice(1)}
      </div>
      
      {/* Room Image Placeholder */}
      <div className="relative h-80 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">🏠</div>
            <div className="text-xl font-bold text-gray-700">{room.name}</div>
          </div>
        </div>
        
        {/* Shoppable Dots */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <button className="absolute w-10 h-10 bg-red-600 text-white rounded-full font-bold shadow-lg hover:scale-110 transition-transform">
              TV
            </button>
            <button className="absolute -left-20 top-10 w-8 h-8 bg-white rounded-full font-bold shadow-lg hover:scale-110 transition-transform">
              1
            </button>
            <button className="absolute left-20 top-10 w-8 h-8 bg-white rounded-full font-bold shadow-lg hover:scale-110 transition-transform">
              2
            </button>
            <button className="absolute top-20 w-8 h-8 bg-white rounded-full font-bold shadow-lg hover:scale-110 transition-transform">
              3
            </button>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{room.name}</h3>
        <p className="text-gray-600 mb-4">{room.description}</p>
        
        {/* Featured TV */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">📺 {room.featuredTV.name}</span>
            <span className="text-2xl font-bold text-primary">${room.featuredTV.currentPrice}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>💕 {room.saves.toLocaleString()} saves</span>
            <span className="font-semibold">Total Room: ~${room.totalBudget.toLocaleString()}</span>
          </div>
        </div>
        
        {/* Product List Toggle */}
        <button
          onClick={() => setShowProducts(!showProducts)}
          className="w-full text-left font-semibold mb-3 flex items-center justify-between"
        >
          <span>🛍️ Shop This Room ({room.furniture.length + 1} items)</span>
          <span>{showProducts ? '−' : '+'}</span>
        </button>
        
        {showProducts && (
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>• {room.featuredTV.name}</span>
              <span className="font-semibold">${room.featuredTV.currentPrice}</span>
            </div>
            {room.furniture.map((item, index) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>• {item.name}</span>
                <span className="font-semibold">${item.price}</span>
              </div>
            ))}
          </div>
        )}
        
        {/* CTA Button */}
        <a 
          href={room.featuredTV.affiliateUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full btn-primary block text-center"
        >
          Shop This Room →
        </a>
      </div>
    </div>
  );
}