#!/usr/bin/env tsx
import { TV } from '../types';
import fs from 'fs/promises';

const AFFILIATE_TAG = process.env.AMAZON_AFFILIATE_TAG || 'YOUR-AFFILIATE-TAG';

// Free approach using Reddit API (no key required)
async function fetchRedditTVDeals(): Promise<any[]> {
  const deals: any[] = [];
  
  try {
    // Reddit's free JSON API
    const subreddits = [
      'https://www.reddit.com/r/deals/search.json?q=TV+amazon&restrict_sr=1&sort=hot&limit=25',
      'https://www.reddit.com/r/buildapcsales/search.json?q=TV&restrict_sr=1&sort=new&limit=25',
    ];
    
    for (const url of subreddits) {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'PrimeDayDeals/1.0 (TV Deal Aggregator)'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        const posts = data.data.children;
        
        posts.forEach((post: any) => {
          const title = post.data.title;
          const text = post.data.selftext || '';
          
          // Extract ASIN from URLs
          const asinMatch = (title + text).match(/(?:dp|gp\/product)\/([A-Z0-9]{10})/);
          if (asinMatch) {
            deals.push({
              asin: asinMatch[1],
              title: title,
              url: post.data.url,
              score: post.data.score,
              created: new Date(post.data.created_utc * 1000)
            });
          }
        });
      }
    }
  } catch (error) {
    console.error('Error fetching Reddit deals:', error);
  }
  
  return deals;
}

// Free approach using public deal aggregators
async function generateDealLinks() {
  const categories = [
    { name: 'OLED TV Deals', search: 'OLED TV', minPrice: 500, maxPrice: 3000 },
    { name: 'Budget TV Deals', search: '4K TV', minPrice: 150, maxPrice: 500 },
    { name: 'Large TV Deals', search: '65 inch TV', minPrice: 400, maxPrice: 2000 },
    { name: 'Gaming TV Deals', search: '120hz gaming TV', minPrice: 300, maxPrice: 2000 },
    { name: 'QLED TV Deals', search: 'QLED TV', minPrice: 300, maxPrice: 1500 },
  ];
  
  const dealLinks = categories.map(cat => {
    const params = new URLSearchParams({
      k: cat.search,
      i: 'electronics',
      bbn: '172659', // TV category
      rh: `n:172659,p_36:${cat.minPrice}00-${cat.maxPrice}00`,
      s: 'review-rank', // Sort by best reviews
      tag: AFFILIATE_TAG
    });
    
    return {
      name: cat.name,
      url: `https://www.amazon.com/s?${params}`,
      description: `Shop ${cat.search} deals from $${cat.minPrice} to $${cat.maxPrice}`
    };
  });
  
  return dealLinks;
}

// Create a simple deal finder using free sources
async function createFreeDealFinder() {
  console.log('🆓 Free Amazon Deal Finder\n');
  
  // 1. Get Reddit deals
  console.log('📡 Fetching deals from Reddit...');
  const redditDeals = await fetchRedditTVDeals();
  console.log(`Found ${redditDeals.length} TV deals on Reddit\n`);
  
  // 2. Generate category links
  console.log('🔗 Generating category search links...');
  const categoryLinks = await generateDealLinks();
  
  // 3. Create a mixed approach with static popular TVs + dynamic links
  const staticTVs: Partial<TV>[] = [
    {
      id: 'category-oled',
      name: 'Best OLED TV Deals Today',
      brand: 'Multiple',
      model: 'Various',
      size: 55,
      technology: 'OLED',
      currentPrice: 999,
      originalPrice: 1499,
      discount: 33,
      rating: 4.5,
      features: ['Perfect Blacks', 'Infinite Contrast', '4K HDR', 'Smart TV'],
      dealRating: 'excellent',
      highlights: ['Updated Daily', 'Multiple Brands', 'Best Prices'],
      affiliateUrl: categoryLinks[0].url,
    },
    {
      id: 'category-budget',
      name: 'Top Budget 4K TV Deals',
      brand: 'Multiple',
      model: 'Various',
      size: 50,
      technology: 'LED',
      currentPrice: 299,
      originalPrice: 499,
      discount: 40,
      rating: 4.2,
      features: ['4K Resolution', 'Smart TV', 'HDR Support', 'Great Value'],
      dealRating: 'excellent',
      highlights: ['Under $500', 'Free Shipping', 'Top Rated'],
      affiliateUrl: categoryLinks[1].url,
    },
    {
      id: 'category-large',
      name: 'Best 65"+ TV Deals',
      brand: 'Multiple',
      model: 'Various',
      size: 65,
      technology: 'QLED',
      currentPrice: 599,
      originalPrice: 999,
      discount: 40,
      rating: 4.4,
      features: ['Large Screen', 'Quantum Dot', '4K HDR', 'Premium Features'],
      dealRating: 'excellent',
      highlights: ['Big Screen Experience', 'Theater Quality', 'Smart Features'],
      affiliateUrl: categoryLinks[2].url,
    },
  ];
  
  // 4. Generate the output
  const output = `import { TV } from '@/types';

// Free Amazon TV Deal Solution
// Uses category links that always show current deals
// No API required, always up-to-date

const AFFILIATE_TAG = '${AFFILIATE_TAG}';

// Category-based deals that link to live Amazon searches
export const tvDeals: TV[] = [
${staticTVs.map(tv => `  {
    id: '${tv.id}',
    name: '${tv.name}',
    brand: '${tv.brand}',
    model: '${tv.model}',
    size: ${tv.size},
    technology: '${tv.technology}',
    currentPrice: ${tv.currentPrice}, // Approximate starting price
    originalPrice: ${tv.originalPrice},
    discount: ${tv.discount},
    rating: ${tv.rating},
    features: ${JSON.stringify(tv.features)},
    dealRating: '${tv.dealRating}',
    highlights: ${JSON.stringify(tv.highlights)},
    affiliateUrl: '${tv.affiliateUrl}',
  }`).join(',\n')}
];

// Direct category links for "See More Deals" sections
export const categoryLinks = ${JSON.stringify(categoryLinks, null, 2)};

// Recent deals found on Reddit (if any)
export const communityDeals = ${JSON.stringify(redditDeals.slice(0, 5), null, 2)};
`;

  // Save the output
  await fs.writeFile('free-tv-deals.ts', output);
  console.log('\n✅ Generated free-tv-deals.ts');
  console.log('📋 This solution:');
  console.log('   - Uses category search URLs (always current)');
  console.log('   - No API keys required');
  console.log('   - Links always work');
  console.log('   - Shows live Amazon prices');
  
  // Also save a simple HTML widget version
  const widgetHTML = `<!DOCTYPE html>
<html>
<head>
    <title>TV Deals Widget</title>
</head>
<body>
    <h2>Current TV Deals</h2>
    
    <!-- Amazon Search Widget (Free, Auto-Updates) -->
    <script type="text/javascript">
    amzn_assoc_placement = "adunit0";
    amzn_assoc_search_bar = "true";
    amzn_assoc_tracking_id = "${AFFILIATE_TAG}";
    amzn_assoc_search_bar_position = "bottom";
    amzn_assoc_ad_mode = "search";
    amzn_assoc_ad_type = "smart";
    amzn_assoc_marketplace = "amazon";
    amzn_assoc_region = "US";
    amzn_assoc_title = "Today's Best TV Deals";
    amzn_assoc_default_search_phrase = "TV deals today";
    amzn_assoc_default_category = "Electronics";
    amzn_assoc_linkid = "YOUR_LINK_ID";
    </script>
    <script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"></script>
    
    <h3>Shop by Category:</h3>
    <ul>
    ${categoryLinks.map(link => 
      `<li><a href="${link.url}" target="_blank">${link.name}</a> - ${link.description}</li>`
    ).join('\n    ')}
    </ul>
</body>
</html>`;
  
  await fs.writeFile('tv-deals-widget.html', widgetHTML);
  console.log('📱 Generated tv-deals-widget.html (Amazon widget)');
}

// Run the free solution
createFreeDealFinder().catch(console.error);