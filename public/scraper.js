// Simplified Amazon TV Deals to JSON Extractor
// This version has better error handling and simpler selectors
// Instructions:
// 1. Go to: https://www.amazon.com/s?k=tv+deals&rh=p_n_deal_type%3A23566064011
// 2. Open Chrome DevTools (F12) > Console
// 3. Paste this entire script and press Enter

const extractTVDealsSimple = () => {
  const deals = [];
  const products = document.querySelectorAll('[data-component-type="s-search-result"]');
  
  console.log(`Found ${products.length} products. Extracting data...`);
  
  products.forEach((product, index) => {
    // Skip after 20 products
    if (index >= 20) return;
    
    try {
      const asin = product.getAttribute('data-asin');
      if (!asin) return;
      
      // Safe selector helper
      const getText = (selector) => {
        const el = product.querySelector(selector);
        return el ? el.textContent.trim() : '';
      };
      
      const getAttribute = (selector, attr) => {
        const el = product.querySelector(selector);
        return el ? el.getAttribute(attr) : '';
      };
      
      // Title
      const title = getText('h2 a span') || getText('h2 span');
      if (!title) return; // Skip if no title
      
      // Price - try multiple selectors
      let currentPrice = null;
      let priceText = getText('.a-price-whole');
      if (priceText) {
        currentPrice = parseFloat(priceText.replace(/[^0-9.]/g, ''));
      } else {
        priceText = getText('.a-price:not(.a-text-price)');
        if (priceText) {
          const match = priceText.match(/[\d,]+\.?\d*/);
          if (match) {
            currentPrice = parseFloat(match[0].replace(/,/g, ''));
          }
        }
      }
      
      // Original price
      let originalPrice = null;
      const originalPriceText = getText('.a-price.a-text-price');
      if (originalPriceText) {
        const match = originalPriceText.match(/[\d,]+\.?\d*/);
        if (match) {
          originalPrice = parseFloat(match[0].replace(/,/g, ''));
        }
      }
      
      // Calculate discount
      let discount = 0;
      if (originalPrice && currentPrice) {
        discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
      }
      
      // Rating
      const ratingText = getText('[class*="a-icon-star"] .a-icon-alt');
      const rating = ratingText ? parseFloat(ratingText.split(' ')[0]) : null;
      
      // Review count - try multiple selectors
      let reviewCount = null;
      const reviewText = getText('[aria-label*="stars"] + span a span') || 
                        getText('.s-link-style .s-underline-text') ||
                        getText('[class*="review"] span');
      if (reviewText) {
        const match = reviewText.match(/[\d,]+/);
        if (match) {
          reviewCount = parseInt(match[0].replace(/,/g, ''));
        }
      }
      
      // Image
      const imageUrl = getAttribute('.s-image', 'src') || 
                      getAttribute('.s-image', 'data-src') || 
                      '';
      
      // Deal badge
      const dealBadge = getText('.a-badge-text') || 
                       getText('.s-badge-text') || 
                       null;
      
      // Extract size from title
      const sizeMatch = title.match(/(\d{2,3})[\s"'-]*(inch|")/i);
      const size = sizeMatch ? parseInt(sizeMatch[1]) : null;
      
      // Simple brand detection
      const titleLower = title.toLowerCase();
      let brand = 'Unknown';
      const brands = ['lg', 'samsung', 'sony', 'tcl', 'hisense', 'vizio', 'toshiba', 'insignia', 'amazon', 'roku'];
      for (const b of brands) {
        if (titleLower.includes(b)) {
          brand = b.charAt(0).toUpperCase() + b.slice(1);
          break;
        }
      }
      
      // Technology detection
      let technology = 'LED';
      if (titleLower.includes('oled')) technology = 'OLED';
      else if (titleLower.includes('qled')) technology = 'QLED';
      else if (titleLower.includes('mini-led') || titleLower.includes('mini led')) technology = 'Mini-LED';
      
      // Simple features extraction
      const features = [];
      if (title.includes('4K') || title.includes('UHD')) features.push('4K UHD');
      if (title.includes('Smart')) features.push('Smart TV');
      if (title.includes('HDR')) features.push('HDR');
      if (title.includes('120Hz')) features.push('120Hz');
      if (title.includes('Dolby')) features.push('Dolby Vision/Atmos');
      
      // Build simple description
      const description = `${brand} ${size || '??'}" ${technology} TV${currentPrice ? ` - $${currentPrice}` : ''}${discount ? ` (${discount}% off)` : ''}`;
      
      const dealData = {
        asin,
        title: title.substring(0, 100),
        brand,
        size,
        technology,
        description,
        currentPrice,
        originalPrice,
        discount,
        rating,
        reviewCount,
        imageUrl,
        features,
        dealBadge,
        productUrl: `https://www.amazon.com/dp/${asin}`,
        affiliateUrl: `https://www.amazon.com/dp/${asin}?tag=YOUR-AFFILIATE-TAG`,
        scrapedAt: new Date().toISOString()
      };
      
      deals.push(dealData);
      console.log(`✓ ${index + 1}. ${title.substring(0, 50)}...`);
      
    } catch (error) {
      console.warn(`⚠️ Error processing product ${index + 1}:`, error.message);
    }
  });
  
  return deals;
};

// Function to download JSON
const downloadJSON = (data, filename) => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// Run extraction
console.clear();
console.log('🔍 Amazon TV Deals Extractor (Simple Version)\n');

const deals = extractTVDealsSimple();

if (deals.length === 0) {
  console.error('❌ No deals found. Make sure you are on the Amazon TV deals page.');
} else {
  // Create JSON structure
  const jsonData = {
    metadata: {
      url: window.location.href,
      scrapedAt: new Date().toISOString(),
      totalDeals: deals.length
    },
    deals: deals
  };
  
  // Download file
  const filename = `amazon-tv-deals-${new Date().toISOString().split('T')[0]}.json`;
  downloadJSON(jsonData, filename);
  
  console.log(`\n✅ Success! Extracted ${deals.length} TV deals`);
  console.log(`📁 Downloaded: ${filename}`);
  console.log('\n📊 Summary:');
  console.log(`- Total deals: ${deals.length}`);
  console.log(`- With prices: ${deals.filter(d => d.currentPrice).length}`);
  console.log(`- With images: ${deals.filter(d => d.imageUrl).length}`);
  console.log(`- With ratings: ${deals.filter(d => d.rating).length}`);
  
  // Show sample
  console.log('\n📄 Sample deal:');
  console.log(deals[0]);
  
  console.log('\n💡 Next steps for amponce/prime-day-deals:');
  console.log('1. cd ~/code/prime-day');
  console.log('2. npm run quick-update');
  console.log('3. npm run build');
  console.log('4. git add . && git commit -m "Update deals" && git push');
}

// Return data for console access
deals;