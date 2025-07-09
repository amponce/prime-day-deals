// Amazon TV Deals Extractor - Browser Console Script
// Instructions:
// 1. Go to: https://www.amazon.com/s?k=tv+deals&rh=p_n_deal_type%3A23566064011
// 2. Open Chrome DevTools (F12)
// 3. Go to Console tab
// 4. Paste this entire script and press Enter
// 5. Copy the output and use in your data.ts file

const extractTVDeals = () => {
  const deals = [];
  const products = document.querySelectorAll('[data-component-type="s-search-result"]');
  
  products.forEach((product, index) => {
    if (index >= 15) return; // Get first 15 deals
    
    const asin = product.getAttribute('data-asin');
    const titleEl = product.querySelector('h2 a span');
    const title = titleEl?.textContent.trim() || '';
    
    // Price extraction
    const priceWholeEl = product.querySelector('.a-price-whole');
    const priceFractionEl = product.querySelector('.a-price-fraction');
    const priceRangeEl = product.querySelector('.a-price-range');
    const originalPriceEl = product.querySelector('.a-price.a-text-price');
    
    let currentPrice = 'N/A';
    if (priceWholeEl) {
      const whole = priceWholeEl.textContent.replace(/[^0-9]/g, '');
      const fraction = priceFractionEl?.textContent.replace(/[^0-9]/g, '') || '00';
      currentPrice = parseFloat(`${whole}.${fraction}`);
    } else if (priceRangeEl) {
      currentPrice = priceRangeEl.textContent.trim();
    }
    
    // Extract original price
    let originalPrice = null;
    if (originalPriceEl) {
      const match = originalPriceEl.textContent.match(/\$?([\d,]+\.?\d*)/);
      if (match) {
        originalPrice = parseFloat(match[1].replace(/,/g, ''));
      }
    }
    
    // Calculate discount
    let discount = 0;
    if (originalPrice && typeof currentPrice === 'number') {
      discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    }
    
    // Extract other details
    const ratingEl = product.querySelector('.a-icon-star-small .a-icon-alt');
    const rating = ratingEl ? parseFloat(ratingEl.textContent.split(' ')[0]) : 4.0;
    
    const reviewCountEl = product.querySelector('[aria-label*="stars"] + span a span') || 
                         product.querySelector('.s-link-style .s-underline-text');
    const reviewCount = reviewCountEl ? 
      parseInt(reviewCountEl.textContent.replace(/[^0-9]/g, '')) : null;
    
    const imageEl = product.querySelector('.s-image');
    const imageUrl = imageEl?.src || '';
    
    const badgeEl = product.querySelector('.a-badge-text') || 
                   product.querySelector('[class*="badge"]');
    const dealBadge = badgeEl?.textContent.trim();
    
    // Extract brand from title
    const brands = ['LG', 'Samsung', 'Sony', 'TCL', 'Hisense', 'VIZIO', 'Toshiba', 'Insignia', 'Amazon', 'Roku', 'Philips'];
    let brand = 'Unknown';
    for (const b of brands) {
      if (title.toLowerCase().includes(b.toLowerCase())) {
        brand = b;
        break;
      }
    }
    
    // Extract size from title
    const sizeMatch = title.match(/(\d{2,3})["'\s-]*(inch|in\b)/i);
    const size = sizeMatch ? parseInt(sizeMatch[1]) : 55;
    
    // Determine technology
    let technology = 'LED';
    if (title.toLowerCase().includes('oled')) technology = 'OLED';
    else if (title.toLowerCase().includes('qled')) technology = 'QLED';
    else if (title.toLowerCase().includes('mini-led') || title.toLowerCase().includes('mini led')) technology = 'Mini-LED';
    else if (title.toLowerCase().includes('qd-oled')) technology = 'QD-OLED';
    
    // Extract features
    const features = [];
    if (title.includes('4K')) features.push('4K Resolution');
    if (title.includes('Smart')) features.push('Smart TV');
    if (title.includes('HDR')) features.push('HDR Support');
    if (title.includes('Dolby')) features.push('Dolby Vision/Atmos');
    if (title.includes('120Hz')) features.push('120Hz Refresh Rate');
    if (title.includes('Gaming')) features.push('Gaming Mode');
    if (title.includes('Alexa')) features.push('Alexa Built-in');
    if (title.includes('Roku')) features.push('Roku TV');
    if (title.includes('Google')) features.push('Google TV');
    if (title.includes('Fire TV')) features.push('Fire TV Built-in');
    
    // Ensure minimum features
    if (features.length === 0) {
      features.push('4K Resolution', 'Smart TV', 'HDR Support');
    }
    
    // Determine deal rating
    let dealRating = 'fair';
    if (discount >= 30) dealRating = 'excellent';
    else if (discount >= 20) dealRating = 'good';
    
    // Create highlights
    const highlights = [];
    if (dealBadge) highlights.push(dealBadge);
    if (discount >= 30) highlights.push(`Save ${discount}%`);
    if (size >= 65) highlights.push('Large Screen');
    if (technology === 'OLED' || technology === 'QD-OLED') highlights.push('Premium Display');
    if (features.includes('120Hz Refresh Rate')) highlights.push('Great for Gaming');
    
    const tvData = {
      id: `${brand.toLowerCase()}-${asin}-${index}`,
      asin,
      name: title.length > 60 ? title.substring(0, 60) + '...' : title,
      brand,
      model: asin, // Use ASIN as model if not available
      size,
      technology,
      currentPrice: typeof currentPrice === 'number' ? currentPrice : 999,
      originalPrice: originalPrice || (typeof currentPrice === 'number' ? currentPrice * 1.4 : 1399),
      discount: discount || 25,
      rating,
      reviewCount,
      features: features.slice(0, 4), // Limit to 4 features
      dealRating,
      highlights: highlights.slice(0, 4), // Limit to 4 highlights
      affiliateUrl: `https://www.amazon.com/dp/${asin}?tag=YOUR-AFFILIATE-TAG`,
      imageUrl
    };
    
    deals.push(tvData);
  });
  
  return deals;
};

// Run the extraction
console.log('🔍 Extracting TV deals from Amazon...\n');
const tvDeals = extractTVDeals();

console.log(`✅ Found ${tvDeals.length} TV deals!\n`);
console.log('📋 TypeScript code for your data.ts file:\n');

// Generate TypeScript code
const tsCode = `// Amazon TV Deals - Extracted on ${new Date().toISOString().split('T')[0]}
// Remember to replace YOUR-AFFILIATE-TAG with your actual tag

export const tvDeals: TV[] = [
${tvDeals.map(tv => `  {
    id: '${tv.id}',
    name: '${tv.name.replace(/'/g, "\\'")}',
    brand: '${tv.brand}',
    model: '${tv.model}',
    size: ${tv.size},
    technology: '${tv.technology}',
    currentPrice: ${tv.currentPrice},
    originalPrice: ${tv.originalPrice},
    discount: ${tv.discount},
    rating: ${tv.rating},${tv.reviewCount ? `
    reviewCount: ${tv.reviewCount},` : ''}
    features: [${tv.features.map(f => `'${f}'`).join(', ')}],
    dealRating: '${tv.dealRating}',
    highlights: [${tv.highlights.map(h => `'${h.replace(/'/g, "\\'")}'`).join(', ')}],
    affiliateUrl: '${tv.affiliateUrl}',${tv.imageUrl ? `
    imageUrl: '${tv.imageUrl}',` : ''}
  }`).join(',\n')}
];`;

console.log(tsCode);

console.log('\n\n📸 Image URLs extracted:');
tvDeals.forEach((tv, i) => {
  if (tv.imageUrl) {
    console.log(`${i + 1}. ${tv.name}`);
    console.log(`   ${tv.imageUrl}\n`);
  }
});

console.log('\n✨ Next steps:');
console.log('1. Copy the TypeScript code above');
console.log('2. Replace the tvDeals array in your /lib/data.ts file');
console.log('3. Update YOUR-AFFILIATE-TAG with your actual Amazon affiliate tag');
console.log('4. The images will load automatically from Amazon\'s CDN');

// Also output as JSON for other uses
console.log('\n📄 JSON format (for API/automation):');
console.log(JSON.stringify(tvDeals, null, 2));