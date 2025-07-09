// Amazon TV Deals to JSON Extractor
// Instructions:
// 1. Go to: https://www.amazon.com/s?k=tv+deals&rh=p_n_deal_type%3A23566064011
// 2. Open Chrome DevTools (F12) > Console
// 3. Paste this entire script and press Enter
// 4. It will automatically download a JSON file with all the data

const extractTVDealsToJSON = () => {
  const deals = [];
  const products = document.querySelectorAll('[data-component-type="s-search-result"]');
  
  console.log(`Found ${products.length} products. Extracting data...`);
  
  products.forEach((product, index) => {
    // Skip after 20 products to keep it manageable
    if (index >= 20) return;
    
    const asin = product.getAttribute('data-asin');
    if (!asin) return;
    
    // Title
    const titleEl = product.querySelector('h2 a span');
    const title = titleEl?.textContent.trim() || '';
    
    // Price extraction
    const priceWholeEl = product.querySelector('.a-price-whole');
    const priceFractionEl = product.querySelector('.a-price-fraction');
    const priceRangeEl = product.querySelector('.a-price-range');
    const originalPriceEl = product.querySelector('.a-price.a-text-price');
    
    let currentPrice = null;
    if (priceWholeEl) {
      const whole = priceWholeEl.textContent.replace(/[^0-9]/g, '');
      const fraction = priceFractionEl?.textContent.replace(/[^0-9]/g, '') || '00';
      currentPrice = parseFloat(`${whole}.${fraction}`);
    } else if (priceRangeEl) {
      // Handle price ranges
      const match = priceRangeEl.textContent.match(/\$?([\d,]+\.?\d*)/);
      if (match) {
        currentPrice = parseFloat(match[1].replace(/,/g, ''));
      }
    }
    
    // Original price
    let originalPrice = null;
    if (originalPriceEl) {
      const match = originalPriceEl.textContent.match(/\$?([\d,]+\.?\d*)/);
      if (match) {
        originalPrice = parseFloat(match[1].replace(/,/g, ''));
      }
    }
    
    // Calculate discount
    let discount = 0;
    let discountAmount = 0;
    if (originalPrice && currentPrice) {
      discountAmount = originalPrice - currentPrice;
      discount = Math.round((discountAmount / originalPrice) * 100);
    }
    
    // Rating and reviews
    const ratingEl = product.querySelector('.a-icon-star-small .a-icon-alt');
    const rating = ratingEl ? parseFloat(ratingEl.textContent.split(' ')[0]) : null;
    
    const reviewCountEl = product.querySelector('[aria-label*="stars"] + span a span') || 
                         product.querySelector('.s-link-style .s-underline-text') ||
                         product.querySelector('[data-cy="review-count"]');
    let reviewCount = null;
    if (reviewCountEl) {
      const match = reviewCountEl.textContent.match(/[\d,]+/);
      if (match) {
        reviewCount = parseInt(match[0].replace(/,/g, ''));
      }
    }
    
    // Image
    const imageEl = product.querySelector('.s-image');
    const imageUrl = imageEl?.src || imageEl?.getAttribute('data-src') || '';
    
    // Deal badge
    const badgeEl = product.querySelector('.a-badge-text') || 
                   product.querySelector('.s-badge-text') ||
                   product.querySelector('[class*="badge"]');
    const dealBadge = badgeEl?.textContent.trim() || null;
    
    // Coupon
    const couponEl = product.querySelector('.s-coupon-unclipped') ||
                    product.querySelector('[data-a-badge-type="coupon"]');
    const coupon = couponEl?.textContent.trim() || null;
    
    // Prime
    const primeEl = product.querySelector('[aria-label*="Prime"]') ||
                   product.querySelector('.s-prime');
    const isPrime = !!primeEl;
    
    // Best Seller
    const bestSellerEl = product.querySelector('[data-a-badge-type="best-seller"]') ||
                        product.querySelector('.a-badge-label-inner .a-text-bold') ||
                        Array.from(product.querySelectorAll('.a-badge-label')).find(el => 
                          el.textContent && el.textContent.includes('Best Seller')
                        );
    const isBestSeller = !!bestSellerEl;
    
    // Extract brand
    const brands = ['LG', 'Samsung', 'Sony', 'TCL', 'Hisense', 'VIZIO', 'Toshiba', 'Insignia', 'Amazon', 'Roku', 'Philips', 'Sceptre', 'Element', 'Westinghouse'];
    let brand = null;
    for (const b of brands) {
      if (title.toLowerCase().includes(b.toLowerCase())) {
        brand = b;
        break;
      }
    }
    
    // Extract size
    const sizeMatch = title.match(/(\d{2,3})[\s"'-]*(inch|in\b|")/i);
    const size = sizeMatch ? parseInt(sizeMatch[1]) : null;
    
    // Extract model number (often in parentheses or after brand)
    const modelMatch = title.match(/\(([A-Z0-9\-]+)\)/) || 
                      title.match(/(?:Model|SKU)[:\s]+([A-Z0-9\-]+)/i);
    const model = modelMatch ? modelMatch[1] : null;
    
    // Determine technology
    let technology = 'LED';
    const techTitle = title.toLowerCase();
    if (techTitle.includes('qd-oled') || techTitle.includes('qd oled')) technology = 'QD-OLED';
    else if (techTitle.includes('oled')) technology = 'OLED';
    else if (techTitle.includes('neo qled')) technology = 'Neo QLED';
    else if (techTitle.includes('qled')) technology = 'QLED';
    else if (techTitle.includes('mini-led') || techTitle.includes('mini led')) technology = 'Mini-LED';
    else if (techTitle.includes('nanocell')) technology = 'NanoCell';
    else if (techTitle.includes('uled')) technology = 'ULED';
    
    // Extract features from title
    const features = [];
    if (title.includes('4K') || title.includes('UHD')) features.push('4K UHD');
    if (title.includes('8K')) features.push('8K Resolution');
    if (title.includes('Smart')) features.push('Smart TV');
    if (title.includes('HDR10+')) features.push('HDR10+');
    else if (title.includes('HDR')) features.push('HDR');
    if (title.includes('Dolby Vision')) features.push('Dolby Vision');
    if (title.includes('Dolby Atmos')) features.push('Dolby Atmos');
    if (title.includes('120Hz')) features.push('120Hz Refresh Rate');
    if (title.includes('144Hz')) features.push('144Hz Refresh Rate');
    if (title.includes('VRR')) features.push('Variable Refresh Rate');
    if (title.includes('Gaming')) features.push('Gaming Mode');
    if (title.includes('Alexa')) features.push('Alexa Built-in');
    if (title.includes('Google')) features.push('Google TV');
    if (title.includes('Roku')) features.push('Roku TV');
    if (title.includes('Fire TV')) features.push('Fire TV');
    if (title.includes('Tizen')) features.push('Tizen OS');
    if (title.includes('webOS')) features.push('webOS');
    if (title.includes('Android')) features.push('Android TV');
    if (title.includes('AirPlay')) features.push('AirPlay 2');
    if (title.includes('Bluetooth')) features.push('Bluetooth');
    if (title.includes('WiFi 6')) features.push('WiFi 6');
    
    // Build description from features and specs
    let description = `${size ? size + '" ' : ''}${technology} ${features.includes('Smart TV') ? 'Smart ' : ''}TV`;
    if (brand) description = `${brand} ${description}`;
    if (features.length > 0) {
      description += ` with ${features.slice(0, 3).join(', ')}`;
    }
    if (discount > 0) {
      description += `. Save $${discountAmount.toFixed(2)} (${discount}% off)`;
    }
    if (dealBadge) {
      description += `. ${dealBadge}`;
    }
    
    // Shipping info
    const shippingEl = product.querySelector('.s-align-children-center span[aria-label*="delivery"]') ||
                      product.querySelector('.a-color-base.a-text-bold');
    const shipping = shippingEl?.textContent.trim() || null;
    
    // Stock status
    const stockEl = product.querySelector('.a-size-small.a-color-price');
    const stockStatus = stockEl?.textContent.includes('stock') ? stockEl.textContent.trim() : 'In Stock';
    
    const dealData = {
      asin,
      title,
      brand,
      model,
      size,
      technology,
      description,
      currentPrice,
      originalPrice,
      discount,
      discountAmount,
      currency: 'USD',
      rating,
      reviewCount,
      imageUrl,
      thumbnailUrl: imageUrl ? imageUrl.replace('_AC_UY218_', '_AC_SX679_') : null,
      largeImageUrl: imageUrl ? imageUrl.replace('_AC_UY218_', '_AC_SL1500_') : null,
      features,
      dealBadge,
      coupon,
      isPrime,
      isBestSeller,
      shipping,
      stockStatus,
      productUrl: `https://www.amazon.com/dp/${asin}`,
      affiliateUrl: `https://www.amazon.com/dp/${asin}?tag=YOUR-AFFILIATE-TAG`,
      scrapedAt: new Date().toISOString(),
      source: 'Amazon US'
    };
    
    deals.push(dealData);
    console.log(`✓ Extracted: ${title.substring(0, 60)}...`);
  });
  
  return deals;
};

// Function to download JSON file
const downloadJSON = (data, filename) => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Function to copy to clipboard
const copyToClipboard = (text) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
};

// Run the extraction
console.log('🔍 Starting Amazon TV deals extraction...\n');
const tvDeals = extractTVDealsToJSON();

// Generate filename with timestamp
const timestamp = new Date().toISOString().split('T')[0];
const filename = `amazon-tv-deals-${timestamp}.json`;

// Summary statistics
const stats = {
  totalDeals: tvDeals.length,
  dealsWithDiscount: tvDeals.filter(d => d.discount > 0).length,
  averageDiscount: Math.round(tvDeals.reduce((sum, d) => sum + (d.discount || 0), 0) / tvDeals.length),
  primeDeals: tvDeals.filter(d => d.isPrime).length,
  bestSellers: tvDeals.filter(d => d.isBestSeller).length,
  brands: [...new Set(tvDeals.map(d => d.brand).filter(Boolean))],
  technologies: [...new Set(tvDeals.map(d => d.technology))],
  priceRange: {
    min: Math.min(...tvDeals.map(d => d.currentPrice || Infinity)),
    max: Math.max(...tvDeals.map(d => d.currentPrice || 0))
  }
};

console.log('\n📊 Extraction Summary:');
console.log(`✅ Total deals extracted: ${stats.totalDeals}`);
console.log(`💰 Deals with discounts: ${stats.dealsWithDiscount}`);
console.log(`📉 Average discount: ${stats.averageDiscount}%`);
console.log(`🚀 Prime deals: ${stats.primeDeals}`);
console.log(`⭐ Best sellers: ${stats.bestSellers}`);
console.log(`🏷️ Brands found: ${stats.brands.join(', ')}`);
console.log(`📺 Technologies: ${stats.technologies.join(', ')}`);
console.log(`💵 Price range: $${stats.priceRange.min} - $${stats.priceRange.max}`);

// Create final JSON with metadata
const finalJSON = {
  metadata: {
    source: 'Amazon US',
    url: window.location.href,
    scrapedAt: new Date().toISOString(),
    totalProducts: stats.totalDeals,
    ...stats
  },
  deals: tvDeals
};

// Download the JSON file
downloadJSON(finalJSON, filename);
console.log(`\n✅ Downloaded: ${filename}`);

// Also copy to clipboard
copyToClipboard(JSON.stringify(finalJSON, null, 2));
console.log('📋 JSON data also copied to clipboard!');

// Show sample in console
console.log('\n📄 Sample deal:');
console.log(JSON.stringify(tvDeals[0], null, 2));

console.log('\n🎯 Next steps:');
console.log('1. Check your Downloads folder for:', filename);
console.log('2. Or paste from clipboard (Ctrl+V) into a new file');
console.log('3. Update YOUR-AFFILIATE-TAG with your actual Amazon affiliate tag');
console.log('4. Import the JSON data into your application');

// Return the data for further use
finalJSON;