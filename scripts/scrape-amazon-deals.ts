#!/usr/bin/env tsx
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';

const AFFILIATE_TAG = process.env.AMAZON_AFFILIATE_TAG || 'YOUR-AFFILIATE-TAG';

// Amazon deal page URL
const AMAZON_DEALS_URL = 'https://www.amazon.com/s?k=tv+deals&rh=p_n_deal_type%3A23566064011&dc&crid=1CO3D2WHJUD0B&qid=1752085149&rnid=23566063011&sprefix=tv+deal%2Caps%2C194&ref=sr_nr_p_n_deal_type_1&ds=v1%3AGw8SOVsw6co0E4vE9pKPnoVsWmAy7GzRc%2BvYC3eTaMk';

interface ScrapedTV {
  asin: string;
  title: string;
  brand: string;
  currentPrice: string;
  originalPrice?: string;
  discount?: string;
  rating?: number;
  reviewCount?: number;
  imageUrl: string;
  features: string[];
  dealBadge?: string;
}

// Option 1: Using Puppeteer (handles JavaScript-rendered content)
async function scrapeWithPuppeteer() {
  console.log('🎭 Scraping with Puppeteer...\n');
  console.log('To use Puppeteer:');
  console.log('1. Install: npm install puppeteer');
  console.log('2. Run the scraper\n');

  const puppeteerCode = `
import puppeteer from 'puppeteer';

async function scrapeAmazonDeals() {
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
  
  await page.goto(AMAZON_DEALS_URL, { waitUntil: 'networkidle2' });
  
  // Wait for products to load
  await page.waitForSelector('[data-component-type="s-search-result"]', { timeout: 10000 });
  
  const products = await page.evaluate(() => {
    const items = [];
    const productElements = document.querySelectorAll('[data-component-type="s-search-result"]');
    
    productElements.forEach(el => {
      const asin = el.getAttribute('data-asin');
      const titleEl = el.querySelector('h2 a span');
      const priceWholeEl = el.querySelector('.a-price-whole');
      const priceEl = el.querySelector('.a-price-range') || el.querySelector('.a-price');
      const originalPriceEl = el.querySelector('.a-price.a-text-price');
      const ratingEl = el.querySelector('.a-icon-star-small .a-icon-alt');
      const reviewCountEl = el.querySelector('.s-link-style .s-underline-text');
      const imageEl = el.querySelector('.s-image');
      const badgeEl = el.querySelector('.s-badge-text') || el.querySelector('.a-badge-text');
      
      if (asin && titleEl) {
        items.push({
          asin,
          title: titleEl.textContent.trim(),
          currentPrice: priceWholeEl?.textContent.trim() || priceEl?.textContent.trim() || 'N/A',
          originalPrice: originalPriceEl?.textContent.trim(),
          rating: ratingEl ? parseFloat(ratingEl.textContent.split(' ')[0]) : null,
          reviewCount: reviewCountEl ? parseInt(reviewCountEl.textContent.replace(/[^0-9]/g, '')) : null,
          imageUrl: imageEl?.getAttribute('src') || '',
          dealBadge: badgeEl?.textContent.trim()
        });
      }
    });
    
    return items;
  });
  
  await browser.close();
  return products;
}
`;

  console.log('Puppeteer code example:');
  console.log(puppeteerCode);
}

// Option 2: Using Playwright (similar to Puppeteer but cross-browser)
async function scrapeWithPlaywright() {
  console.log('\n🎭 Scraping with Playwright...\n');
  console.log('To use Playwright:');
  console.log('1. Install: npm install playwright');
  console.log('2. Run: npx playwright install chromium\n');

  const playwrightCode = `
import { chromium } from 'playwright';

async function scrapeAmazonDeals() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  
  const page = await context.newPage();
  await page.goto(AMAZON_DEALS_URL, { waitUntil: 'networkidle' });
  
  // Extract product data
  const products = await page.evaluate(() => {
    // Similar extraction logic as Puppeteer
  });
  
  await browser.close();
  return products;
}
`;

  console.log('Playwright code example:');
  console.log(playwrightCode);
}

// Option 3: Using a scraping service (most reliable)
async function scrapeWithAPI() {
  console.log('\n🌐 Using Scraping Services...\n');
  
  console.log('Recommended services for Amazon scraping:');
  console.log('\n1. **ScraperAPI** (Most Popular)');
  console.log('   - URL: https://www.scraperapi.com/');
  console.log('   - Free tier: 1000 requests/month');
  console.log('   - Handles captchas and rotation');
  
  const scraperAPIExample = `
// Using ScraperAPI
const apiKey = process.env.SCRAPER_API_KEY;
const targetUrl = encodeURIComponent(AMAZON_DEALS_URL);

const response = await fetch(\`http://api.scraperapi.com?api_key=\${apiKey}&url=\${targetUrl}&render=true\`);
const html = await response.text();

// Parse with Cheerio
const $ = cheerio.load(html);
const products = [];

$('[data-component-type="s-search-result"]').each((i, el) => {
  const $el = $(el);
  const asin = $el.attr('data-asin');
  const title = $el.find('h2 a span').text().trim();
  const price = $el.find('.a-price-whole').text().trim();
  const image = $el.find('.s-image').attr('src');
  
  if (asin && title) {
    products.push({
      asin,
      title,
      price,
      imageUrl: image,
      affiliateUrl: \`https://www.amazon.com/dp/\${asin}?tag=\${AFFILIATE_TAG}\`
    });
  }
});
`;

  console.log(scraperAPIExample);
  
  console.log('\n2. **Bright Data** (Enterprise)');
  console.log('   - URL: https://brightdata.com/');
  console.log('   - Best for large scale');
  console.log('   - Residential proxies');
  
  console.log('\n3. **Oxylabs** (Premium)');
  console.log('   - URL: https://oxylabs.io/');
  console.log('   - Amazon-specific API');
  console.log('   - High success rate');
}

// Option 4: Manual extraction helper
async function generateManualExtractor() {
  console.log('\n📋 Manual Extraction Helper...\n');
  
  const extractorScript = `
// Paste this in browser console on Amazon deals page:

const extractDeals = () => {
  const deals = [];
  const products = document.querySelectorAll('[data-component-type="s-search-result"]');
  
  products.forEach((product, index) => {
    if (index >= 10) return; // Get first 10 deals
    
    const asin = product.getAttribute('data-asin');
    const title = product.querySelector('h2 a span')?.textContent.trim();
    const priceWhole = product.querySelector('.a-price-whole')?.textContent.trim();
    const priceRange = product.querySelector('.a-price-range')?.textContent.trim();
    const originalPrice = product.querySelector('.a-price.a-text-price')?.textContent.trim();
    const rating = product.querySelector('.a-icon-star-small .a-icon-alt')?.textContent.split(' ')[0];
    const reviewCount = product.querySelector('[aria-label*="stars"] + span')?.textContent.trim();
    const image = product.querySelector('.s-image')?.src;
    const badge = product.querySelector('.a-badge-text')?.textContent.trim();
    
    // Extract features from title
    const features = [];
    if (title.includes('4K')) features.push('4K');
    if (title.includes('Smart')) features.push('Smart TV');
    if (title.includes('OLED')) features.push('OLED Display');
    if (title.includes('QLED')) features.push('QLED Display');
    if (title.includes('HDR')) features.push('HDR');
    if (title.match(/\d{2,3}["\\s-]*(inch|in)/i)) {
      const size = title.match(/(\\d{2,3})["\\s-]*(inch|in)/i)[1];
      features.push(size + '" Screen');
    }
    
    deals.push({
      asin,
      title: title?.substring(0, 60) + '...',
      currentPrice: priceWhole || priceRange || 'Check price',
      originalPrice,
      rating,
      reviewCount,
      imageUrl: image,
      features,
      badge,
      affiliateUrl: \`https://www.amazon.com/dp/\${asin}?tag=YOUR-TAG\`
    });
  });
  
  console.log(JSON.stringify(deals, null, 2));
  return deals;
};

// Run extraction
const tvDeals = extractDeals();
console.log('Found', tvDeals.length, 'TV deals');
console.log('Copy the output above and paste into your data file');
`;

  console.log('Browser Console Script:');
  console.log('1. Open the Amazon deals page in your browser');
  console.log('2. Open Developer Tools (F12)');
  console.log('3. Go to Console tab');
  console.log('4. Paste this script:\n');
  console.log(extractorScript);
  
  // Save to file for easy access
  await fs.writeFile('browser-extractor.js', extractorScript);
  console.log('\n✅ Saved browser script to: browser-extractor.js');
}

// Option 5: Using Amazon's official API (if approved)
async function useAmazonAPI() {
  console.log('\n🔐 Amazon Product Advertising API...\n');
  
  console.log('Official Amazon API:');
  console.log('1. Apply at: https://affiliate-program.amazon.com/assoc_credentials/home');
  console.log('2. Requires approval and active sales');
  console.log('3. Most reliable but restricted\n');
  
  const apiExample = `
// Using @amazoncom/paapi5-nodejs-sdk
import { ProductAdvertisingAPIv5 } from '@amazoncom/paapi5-nodejs-sdk';

const api = new ProductAdvertisingAPIv5({
  accessKey: process.env.AMAZON_ACCESS_KEY,
  secretKey: process.env.AMAZON_SECRET_KEY,
  partnerTag: process.env.AMAZON_PARTNER_TAG,
  host: 'webservices.amazon.com',
  region: 'us-east-1'
});

// Search for TV deals
const searchRequest = {
  Keywords: 'tv deals',
  SearchIndex: 'Electronics',
  ItemCount: 10,
  Resources: [
    'Images.Primary.Large',
    'ItemInfo.Title',
    'Offers.Listings.Price',
    'Offers.Listings.SavingBasis',
    'CustomerReviews.Count',
    'CustomerReviews.StarRating'
  ],
  Filters: {
    MinSavingPercent: 20
  }
};

const response = await api.searchItems(searchRequest);
`;

  console.log(apiExample);
}

// Main execution
async function main() {
  console.log('🛒 Amazon TV Deals Scraper Options\n');
  console.log('Target URL:', AMAZON_DEALS_URL);
  console.log('\n' + '='.repeat(60) + '\n');
  
  // Show all options
  await scrapeWithPuppeteer();
  await scrapeWithPlaywright();
  await scrapeWithAPI();
  await generateManualExtractor();
  await useAmazonAPI();
  
  console.log('\n' + '='.repeat(60));
  console.log('\n✨ Quick Recommendations:\n');
  console.log('1. **Fastest**: Use the browser console script (manual but works immediately)');
  console.log('2. **Most Reliable**: ScraperAPI with render=true parameter');
  console.log('3. **Free Option**: Puppeteer/Playwright with proper headers and delays');
  console.log('4. **Best Long-term**: Amazon Product Advertising API (if approved)');
  
  console.log('\n⚠️  Important Notes:');
  console.log('- Amazon has anti-scraping measures (captchas, rate limits)');
  console.log('- Use proxies and rotate user agents for better success');
  console.log('- Add delays between requests to avoid detection');
  console.log('- Consider Amazon\'s ToS and use official APIs when possible');
}

main().catch(console.error);