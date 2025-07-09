#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read TV deals data
const dataPath = path.join(__dirname, '../lib/data.ts');
const dataContent = fs.readFileSync(dataPath, 'utf8');

// Extract deals (simple regex parsing)
const deals = [];
const dealMatches = dataContent.matchAll(/{\s*id:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'[\s\S]*?currentPrice:\s*(\d+)[\s\S]*?originalPrice:\s*(\d+(?:\.\d+)?)[\s\S]*?discount:\s*(\d+)[\s\S]*?}/g);

for (const match of dealMatches) {
  if (match[5] > 0) { // Only include deals with actual discounts
    deals.push({
      id: match[1],
      name: match[2],
      currentPrice: parseFloat(match[3]),
      originalPrice: parseFloat(match[4]),
      discount: parseInt(match[5])
    });
  }
}

// Sort by discount percentage
deals.sort((a, b) => b.discount - a.discount);

// Generate different post formats
const posts = {
  reddit: {
    title: `[DEALS] Curated TV Deals - Up to ${deals[0].discount}% Off (Updated ${new Date().toLocaleDateString()})`,
    body: `Hey everyone! I've been tracking TV prices and found some solid deals:\n\n${deals.slice(0, 5).map(tv => 
      `• **${tv.name.substring(0, 50)}...** - $${tv.currentPrice} ~~$${tv.originalPrice}~~ (${tv.discount}% off)`
    ).join('\n')}\n\n[View all deals with price history](https://prime-day-deals.pages.dev)\n\nAll prices verified as of ${new Date().toLocaleTimeString()}. Let me know if you spot better deals!`
  },
  
  twitter: deals.slice(0, 3).map(tv => ({
    text: `🔥 TV Deal Alert!\n\n${tv.name.substring(0, 60)}...\n💰 Now: $${tv.currentPrice} (was $${tv.originalPrice})\n📉 Save ${tv.discount}%\n\n${tv.discount >= 30 ? '🚨 Lowest price in months!' : '✅ Solid deal'}\n\n👉 https://prime-day-deals.pages.dev\n\n#TVDeals #TechDeals #HomeTheater`
  })),
  
  facebook: {
    text: `🏠 Transform Your Living Room for Less! 📺\n\nJust found these incredible TV deals:\n\n${deals.slice(0, 5).map(tv => 
      `${tv.discount >= 30 ? '🔥' : '✨'} ${tv.name.substring(0, 60)}...\n   Was: $${tv.originalPrice} → Now: $${tv.currentPrice} (Save $${(tv.originalPrice - tv.currentPrice).toFixed(2)}!)`
    ).join('\n\n')}\n\nPerfect for:\n✓ Super Bowl parties\n✓ Gaming setups\n✓ Home theater upgrades\n✓ Bedroom TVs\n\n🔗 See all deals: https://prime-day-deals.pages.dev\n\n⏰ These prices won't last! Which one are you eyeing? 👀`
  },
  
  pinterest: deals.slice(0, 5).map(tv => ({
    title: `${tv.name.split(' ').slice(0, 5).join(' ')} - Save $${(tv.originalPrice - tv.currentPrice).toFixed(0)}`,
    description: `Transform your space with this incredible deal! 🏠\n\n📺 ${tv.name}\n💰 Only $${tv.currentPrice} (${tv.discount}% OFF)\n🎬 Perfect for movie nights\n🎮 Great for gaming\n\nCreate the entertainment space of your dreams without breaking the bank. This deal won't last long!\n\n👉 Get this deal: https://prime-day-deals.pages.dev\n\n#hometheater #livingroomideas #tvdeals #modernliving #movienight #homeinspiration #entertainmentcenter #budgetfriendly`
  })),
  
  instagram: {
    caption: `Which setup would you choose? 🤔\n\n${deals.slice(0, 3).map((tv, i) => 
      `${i + 1}️⃣ ${tv.name.substring(0, 40)}...\n   💵 $${tv.currentPrice} (save ${tv.discount}%)`
    ).join('\n\n')}\n\nSwipe up for all the deals! 👆\n\n#hometheater #techdeals #tvdeals #livingroomgoals #homeinspiration #movienight #netflixandchill #gameroom #interiordesign #smarthome #modernliving #cozyhome #entertainmentsetup #homeupgrade #dealsoftheday`,
    story: `🔥 TV DEALS ALERT 🔥\n\nUp to ${deals[0].discount}% OFF\n\n${deals[0].name.substring(0, 50)}...\n\nWAS: $${deals[0].originalPrice}\nNOW: $${deals[0].currentPrice}\n\nSWIPE UP FOR MORE ⬆️`
  }
};

// Create output directory
const outputDir = path.join(__dirname, '../marketing/social-posts');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Save posts to files
fs.writeFileSync(path.join(outputDir, 'reddit-posts.json'), JSON.stringify(posts.reddit, null, 2));
fs.writeFileSync(path.join(outputDir, 'twitter-posts.json'), JSON.stringify(posts.twitter, null, 2));
fs.writeFileSync(path.join(outputDir, 'facebook-post.json'), JSON.stringify(posts.facebook, null, 2));
fs.writeFileSync(path.join(outputDir, 'pinterest-pins.json'), JSON.stringify(posts.pinterest, null, 2));
fs.writeFileSync(path.join(outputDir, 'instagram-post.json'), JSON.stringify(posts.instagram, null, 2));

// Create a summary file with all posts
const summary = `# Social Media Posts Generated on ${new Date().toLocaleDateString()}

## Reddit Post
**Title:** ${posts.reddit.title}

**Body:**
${posts.reddit.body}

---

## Twitter Threads
${posts.twitter.map((tweet, i) => `### Tweet ${i + 1}\n${tweet.text}`).join('\n\n')}

---

## Facebook Post
${posts.facebook.text}

---

## Pinterest Pins
${posts.pinterest.map((pin, i) => `### Pin ${i + 1}\n**Title:** ${pin.title}\n\n**Description:**\n${pin.description}`).join('\n\n')}

---

## Instagram
**Caption:**
${posts.instagram.caption}

**Story Text:**
${posts.instagram.story}
`;

fs.writeFileSync(path.join(outputDir, 'all-posts.md'), summary);

console.log(`✅ Social media posts generated in ${outputDir}`);
console.log(`\n📊 Stats:`);
console.log(`- ${deals.length} deals found`);
console.log(`- Highest discount: ${deals[0].discount}%`);
console.log(`- Best savings: $${(deals[0].originalPrice - deals[0].currentPrice).toFixed(2)}`);
console.log(`\n📱 Posts created for: Reddit, Twitter, Facebook, Pinterest, Instagram`);
console.log(`\n💡 Tip: Customize these posts before sharing and track which platforms drive the most traffic!`);