'use client';

import { useState, useEffect } from 'react';
import { TV } from '@/types';
import { tvDeals } from '@/lib/data';

export default function AdminPage() {
  const [jsonInput, setJsonInput] = useState('');
  const [newDeals, setNewDeals] = useState<TV[]>([]);
  const [duplicates, setDuplicates] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentDeals, setCurrentDeals] = useState<TV[]>(tvDeals);
  const [showRemoveMode, setShowRemoveMode] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const processDeals = () => {
    setError('');
    setSuccess('');
    setNewDeals([]);
    setDuplicates([]);

    try {
      // Parse JSON input
      const inputDeals = JSON.parse(jsonInput);
      const deals = Array.isArray(inputDeals) ? inputDeals : [inputDeals];

      // Get existing ASINs/IDs
      const existingIds = new Set(currentDeals.map(tv => tv.id));
      const duplicateList: string[] = [];
      const newDealsList: TV[] = [];

      // Process each deal
      deals.forEach((deal: any) => {
        const asin = deal.asin || deal.id;
        const id = asin;

        if (existingIds.has(id)) {
          duplicateList.push(`${deal.title || deal.name} (${asin})`);
        } else {
          // Convert to our TV format
          const newTv: TV = {
            id,
            name: deal.title || deal.name,
            brand: deal.brand || 'Unknown',
            model: asin,
            size: parseInt(deal.size) || 55,
            technology: detectTechnology(deal.title || deal.name),
            currentPrice: parseFloat(deal.current_price || deal.currentPrice),
            originalPrice: parseFloat(deal.original_price || deal.originalPrice),
            discount: parseInt(deal.discount_percentage || deal.discount) || 
              Math.round((1 - (parseFloat(deal.current_price || deal.currentPrice) / parseFloat(deal.original_price || deal.originalPrice))) * 100),
            rating: parseFloat(deal.rating) || 4.3,
            reviewCount: parseInt(deal.review_count || deal.reviewCount) || 0,
            features: deal.features || ['4K UHD', 'Smart TV', 'HDR'],
            dealRating: deal.deal_rating || 'good',
            highlights: deal.highlights || [`Save $${(parseFloat(deal.original_price || deal.originalPrice) - parseFloat(deal.current_price || deal.currentPrice)).toFixed(2)}`],
            affiliateUrl: `https://www.amazon.com/dp/${asin}?tag=${process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG || 'codebyte-20'}`,
            imageUrl: deal.image_url || deal.imageUrl || `https://m.media-amazon.com/images/I/placeholder.jpg`,
          };
          newDealsList.push(newTv);
        }
      });

      setNewDeals(newDealsList);
      setDuplicates(duplicateList);

      if (newDealsList.length > 0) {
        setSuccess(`Found ${newDealsList.length} new deals! Click "Add to Database" to automatically update your data.ts file.`);
      } else {
        setSuccess('No new deals found. All deals are duplicates.');
      }
    } catch (err) {
      setError(`Error parsing JSON: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const detectTechnology = (title: string): 'OLED' | 'QLED' | 'Mini-LED' | 'LED' => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('oled')) return 'OLED';
    if (titleLower.includes('qled')) return 'QLED';
    if (titleLower.includes('mini-led') || titleLower.includes('mini led')) return 'Mini-LED';
    return 'LED';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-12">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-text-dark dark:text-white">
          TV Deals Admin
        </h1>

        <div className="bg-white dark:bg-dark-surface rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-text-dark dark:text-white">
            Paste TV Deals JSON
          </h2>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full h-64 p-4 border border-border-light dark:border-dark-border rounded-lg font-mono text-sm bg-gray-50 dark:bg-dark-surface-2 text-text-dark dark:text-white"
            placeholder={`Paste your TV deals JSON here. Format:
[
  {
    "asin": "B0DYWNQMQJ",
    "title": "Hisense 75\" TV...",
    "current_price": "799.00",
    "original_price": "1299.99",
    "discount_percentage": "39",
    "image_url": "https://...",
    "brand": "Hisense",
    "size": "75",
    "rating": "4.4",
    "review_count": "87"
  }
]`}
          />
          <button
            onClick={processDeals}
            className="mt-4 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-md"
          >
            Process Deals
          </button>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {duplicates.length > 0 && (
          <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-400 dark:border-yellow-600 text-yellow-700 dark:text-yellow-400 px-4 py-3 rounded mb-6">
            <h3 className="font-semibold mb-2">Duplicate Deals Found ({duplicates.length}):</h3>
            <ul className="list-disc list-inside">
              {duplicates.map((dup, i) => (
                <li key={i}>{dup}</li>
              ))}
            </ul>
          </div>
        )}

        {newDeals.length > 0 && (
          <div className="bg-white dark:bg-dark-surface rounded-xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-text-dark dark:text-white">
                New Deals Found ({newDeals.length})
              </h3>
              <button
                onClick={async () => {
                  setIsAdding(true);
                  try {
                    const response = await fetch('/api/add-deals', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ deals: newDeals }),
                    });
                    const result = await response.json();
                    if (result.success) {
                      setSuccess(`✅ Successfully added ${newDeals.length} deals to database! Refresh the page to see them.`);
                      setNewDeals([]);
                      setJsonInput('');
                      // Refresh current deals
                      setTimeout(() => window.location.reload(), 2000);
                    } else {
                      setError(`Failed to add deals: ${result.error}`);
                    }
                  } catch (err) {
                    setError('Failed to add deals to database');
                  }
                  setIsAdding(false);
                }}
                disabled={isAdding}
                className="bg-success hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md disabled:opacity-50"
              >
                {isAdding ? 'Adding...' : 'Add to Database'}
              </button>
            </div>
            <div className="space-y-4">
              {newDeals.map((tv) => (
                <div key={tv.id} className="border border-border-light dark:border-dark-border rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    {tv.imageUrl && (
                      <img src={tv.imageUrl} alt={tv.name} className="w-24 h-24 object-contain" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-text-dark dark:text-white">{tv.name}</h4>
                      <p className="text-sm text-text-gray dark:text-dark-text-secondary">
                        {tv.brand} • {tv.size}" • {tv.technology}
                      </p>
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-primary">${tv.currentPrice}</span>
                        <span className="text-sm text-text-gray dark:text-dark-text-secondary line-through ml-2">
                          ${tv.originalPrice}
                        </span>
                        <span className="ml-2 bg-success text-white px-2 py-1 rounded text-sm">
                          {tv.discount}% OFF
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-100 dark:bg-green-900/20 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-400 px-4 py-3 rounded">
            <pre className="whitespace-pre-wrap font-mono text-xs overflow-auto">{success}</pre>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-text-gray dark:text-dark-text-secondary">
            Current deals in database: {currentDeals.length}
          </p>
          <button
            onClick={() => setShowRemoveMode(!showRemoveMode)}
            className="mt-2 text-primary hover:underline text-sm"
          >
            {showRemoveMode ? 'Hide' : 'Manage'} Current Deals
          </button>
        </div>

        {/* Current Deals Management */}
        {showRemoveMode && (
          <div className="mt-8 bg-white dark:bg-dark-surface rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-text-dark dark:text-white">
              Manage Current Deals
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {currentDeals.map((tv) => (
                <div key={tv.id} className="flex items-center justify-between border-b border-border-light dark:border-dark-border pb-4">
                  <div className="flex items-center gap-4">
                    {tv.imageUrl && (
                      <img src={tv.imageUrl} alt={tv.name} className="w-16 h-16 object-contain" />
                    )}
                    <div>
                      <h4 className="font-medium text-text-dark dark:text-white">{tv.name}</h4>
                      <p className="text-sm text-text-gray dark:text-dark-text-secondary">
                        ${tv.currentPrice} • {tv.discount}% OFF • {tv.id}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`Remove ${tv.name}?`)) {
                        const filtered = currentDeals.filter(d => d.id !== tv.id);
                        setCurrentDeals(filtered);
                        const removedIds = tvDeals.filter(d => !filtered.find(f => f.id === d.id)).map(d => d.id);
                        setSuccess(`Removed ${tv.name}. To apply changes, remove these IDs from lib/data.ts: ${removedIds.join(', ')}`);
                      }
                    }}
                    className="text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            {currentDeals.length < tvDeals.length && (
              <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  You've removed {tvDeals.length - currentDeals.length} deal(s). These changes are temporary.
                  To permanently remove them, delete the corresponding entries from lib/data.ts.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}