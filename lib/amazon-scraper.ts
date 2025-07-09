import { TV } from '@/types';

// Configuration
const AFFILIATE_TAG = process.env.AMAZON_AFFILIATE_TAG || 'YOUR-AFFILIATE-TAG';

// Helper function to determine TV technology from title
function detectTechnology(title: string): 'OLED' | 'QLED' | 'Mini-LED' | 'LED' {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('oled')) return 'OLED';
  if (titleLower.includes('qled')) return 'QLED';
  if (titleLower.includes('mini-led') || titleLower.includes('mini led')) return 'Mini-LED';
  return 'LED';
}

// Helper function to extract TV size from title
function extractSize(title: string): number {
  const sizeMatch = title.match(/(\d{2,3})["\s-]*(inch|in\b)/i);
  return sizeMatch ? parseInt(sizeMatch[1]) : 55; // Default to 55"
}

// Helper function to generate deal rating based on discount
function getDealRating(discount: number): 'excellent' | 'good' | 'fair' {
  if (discount >= 30) return 'excellent';
  if (discount >= 20) return 'good';
  return 'fair';
}

// Main function to fetch and format Amazon TV deals using Rainforest API
export async function fetchAmazonTVDeals(): Promise<TV[]> {
  const apiKey = process.env.RAINFOREST_API_KEY;
  
  if (!apiKey) {
    throw new Error('RAINFOREST_API_KEY not found in environment variables');
  }

  try {
    // Fetch TV deals from Amazon using Rainforest API
    const params = new URLSearchParams({
      api_key: apiKey,
      type: 'deals',
      amazon_domain: 'amazon.com',
      category_id: '172659', // TVs category
      min_discount: '15', // Get deals with at least 15% off
      sort_by: 'discount_descending',
      page: '1',
      output: 'json'
    });

    const response = await fetch(`https://api.rainforestapi.com/request?${params}`);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.deals || !Array.isArray(data.deals)) {
      throw new Error('Invalid API response format');
    }

    // Transform Rainforest API data to our TV interface
    const tvDeals: TV[] = data.deals
      .filter((deal: any) => {
        // Filter out non-TV items and ensure we have required data
        return deal.title && 
               deal.price && 
               deal.list_price && 
               (deal.title.toLowerCase().includes('tv') || 
                deal.title.toLowerCase().includes('television'));
      })
      .slice(0, 15) // Get top 15 deals
      .map((deal: any, index: number) => {
        const technology = detectTechnology(deal.title);
        const size = extractSize(deal.title);
        const discount = Math.round(((deal.list_price.value - deal.price.value) / deal.list_price.value) * 100);
        
        // Extract brand from title
        const brandMatch = deal.title.match(/^(LG|Samsung|Sony|TCL|Hisense|VIZIO|Toshiba|Insignia|Amazon|Roku)/i);
        const brand = brandMatch ? brandMatch[1] : 'Unknown';
        
        // Generate features based on technology and title
        const features: string[] = [];
        if (deal.title.includes('4K')) features.push('4K Resolution');
        if (deal.title.includes('120Hz')) features.push('120Hz Refresh Rate');
        else if (deal.title.includes('60Hz')) features.push('60Hz Refresh Rate');
        if (deal.title.includes('Smart')) features.push('Smart TV');
        if (deal.title.includes('HDR')) features.push('HDR Support');
        if (deal.title.includes('Dolby')) features.push('Dolby Vision/Atmos');
        if (technology === 'OLED' || technology === 'QLED') features.push('Premium Display');
        
        // Create highlights based on deal quality
        const highlights: string[] = [];
        if (discount >= 30) highlights.push(`Save ${discount}% - Limited Time`);
        if (deal.is_prime_exclusive) highlights.push('Prime Exclusive Deal');
        if (technology === 'OLED') highlights.push('Perfect Black Levels');
        if (technology === 'QLED' || technology === 'Mini-LED') highlights.push('Bright & Vibrant Colors');
        if (size >= 65) highlights.push('Large Screen Experience');
        
        const tv: TV = {
          id: `${brand.toLowerCase()}-${deal.asin}-${index}`,
          name: deal.title.substring(0, 50) + (deal.title.length > 50 ? '...' : ''),
          brand: brand,
          model: deal.asin, // Use ASIN as model if not available
          size: size,
          technology: technology,
          currentPrice: deal.price.value,
          originalPrice: deal.list_price.value,
          discount: discount,
          rating: deal.rating || 4.0,
          reviewCount: deal.ratings_total || undefined,
          features: features.length > 0 ? features : ['Smart TV', '4K Resolution', 'HDR Support'],
          dealRating: getDealRating(discount),
          highlights: highlights.length > 0 ? highlights : ['Great Value', 'Popular Choice'],
          affiliateUrl: `https://www.amazon.com/dp/${deal.asin}?tag=${AFFILIATE_TAG}`,
          imageUrl: deal.image
        };
        
        return tv;
      });

    return tvDeals;
  } catch (error) {
    console.error('Error fetching Amazon deals:', error);
    throw error;
  }
}

// Function to update existing deals with fresh data
export async function updateTVDeals(existingDeals: TV[]): Promise<TV[]> {
  try {
    const freshDeals = await fetchAmazonTVDeals();
    
    // Merge fresh data with existing deals, preserving any custom fields
    const updatedDeals = existingDeals.map(existing => {
      const fresh = freshDeals.find(f => 
        f.brand === existing.brand && 
        Math.abs(f.size - existing.size) <= 5 // Allow small size differences
      );
      
      if (fresh) {
        return {
          ...existing,
          currentPrice: fresh.currentPrice,
          originalPrice: fresh.originalPrice,
          discount: fresh.discount,
          rating: fresh.rating,
          reviewCount: fresh.reviewCount,
          affiliateUrl: fresh.affiliateUrl,
          imageUrl: fresh.imageUrl || existing.imageUrl
        };
      }
      
      return existing;
    });
    
    // Add any new deals not in existing list
    const newDeals = freshDeals.filter(fresh => 
      !existingDeals.some(e => 
        e.brand === fresh.brand && 
        Math.abs(e.size - fresh.size) <= 5
      )
    );
    
    return [...updatedDeals, ...newDeals];
  } catch (error) {
    console.error('Error updating deals:', error);
    return existingDeals; // Return existing deals if update fails
  }
}

// Simplified scraper using Amazon search URLs (no API needed)
export function getAmazonSearchUrl(category: string = 'tv deals'): string {
  const searchParams = new URLSearchParams({
    k: category,
    i: 'electronics',
    bbn: '172659', // TV category
    rh: 'n:172659,p_n_deal_type:23566063011', // Lightning deals
    sort: 'discount-desc',
    tag: AFFILIATE_TAG
  });
  
  return `https://www.amazon.com/s?${searchParams}`;
}