'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState('48H 00M');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const endTime = new Date(now.getTime() + 48 * 60 * 60 * 1000);
      const diff = endTime.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}H ${minutes}M`);
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gradient-to-br from-primary to-red-700 text-white py-20">
      <div className="container-custom text-center">
        <div className="inline-block bg-black/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
          <span className="font-semibold">⏰ DEALS END IN: {timeLeft}</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          🔥 Epic TV Deals & Dream Rooms
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          Save up to 60% on premium TVs. Plus, shop complete room designs curated by experts.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/deals" className="btn-primary bg-white text-primary hover:bg-gray-100">
            Browse TV Deals →
          </Link>
          <Link href="/rooms" className="btn-secondary bg-transparent border-2 border-white hover:bg-white hover:text-primary">
            Explore Room Designs →
          </Link>
        </div>
        
        <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div>
            <div className="text-3xl font-bold">500+</div>
            <div className="opacity-80">TV Deals</div>
          </div>
          <div>
            <div className="text-3xl font-bold">50+</div>
            <div className="opacity-80">Room Designs</div>
          </div>
          <div>
            <div className="text-3xl font-bold">60%</div>
            <div className="opacity-80">Max Savings</div>
          </div>
        </div>
      </div>
    </section>
  );
}