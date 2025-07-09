'use client';

import { useState } from 'react';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <section className="py-16 bg-secondary text-white">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Never Miss a Deal
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get exclusive Prime Day alerts and weekly deal roundups
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-3 rounded-md text-gray-900 font-medium"
              disabled={status === 'loading' || status === 'success'}
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-md transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing...' : 
               status === 'success' ? '✓ Subscribed!' : 
               'Subscribe'}
            </button>
          </form>
          
          <p className="mt-4 text-sm opacity-70">
            Join 50,000+ smart shoppers • Unsubscribe anytime
          </p>
        </div>
      </div>
    </section>
  );
}