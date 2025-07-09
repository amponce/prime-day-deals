#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Blog post data
const blogPosts = [
  {
    slug: 'small-space-tv-solutions',
    title: '15 Small Space TV Solutions That Actually Work',
    url: 'https://prime-day-deals.pages.dev/blog/small-space-tv-solutions',
    keywords: ['small apartment', 'studio', 'tv placement', 'space saving'],
    hook: 'Your TV is taking up too much space',
  },
  {
    slug: 'hide-tv-cables',
    title: 'Hide TV Cables Like a Pro: Complete Guide',
    url: 'https://prime-day-deals.pages.dev/blog/hide-tv-cables',
    keywords: ['cable management', 'hide wires', 'clean setup', 'rental friendly'],
    hook: 'Messy TV cables ruining your vibe',
  },
  {
    slug: 'tv-room-lighting-guide',
    title: 'Perfect TV Room Lighting: Complete Setup Guide',
    url: 'https://prime-day-deals.pages.dev/blog/tv-room-lighting-guide',
    keywords: ['tv lighting', 'reduce glare', 'bias lighting', 'eye strain'],
    hook: 'Your TV looks terrible at night',
  },
];

const socialPosts = {};

blogPosts.forEach(post => {
  socialPosts[post.slug] = {
    // Pinterest Descriptions (multiple versions)
    pinterest: [
      {
        title: post.title,
        description: `${post.hook}? This guide shows you exactly how to fix it. Save for later! ${post.keywords.map(k => `#${k.replace(/\s+/g, '')}`).join(' ')}`,
      },
      {
        title: `${post.hook}? Here's How to Fix It`,
        description: `Step-by-step guide with photos and shopping list. Pin this for your next apartment update! ${post.url}`,
      },
      {
        title: `The Only ${post.keywords[0]} Guide You'll Need`,
        description: `Tested solutions that actually work. Save this before your next IKEA trip! ${post.keywords.slice(1).map(k => `#${k.replace(/\s+/g, '')}`).join(' ')}`,
      },
    ],
    
    // Reddit Posts
    reddit: {
      casual: {
        title: `${post.hook}? I figured out some solutions that actually work`,
        body: `Hey everyone! I've been helping friends with their TV setups and kept running into the same problems. Finally put together a guide with all the solutions that actually worked.\n\n[${post.title}](${post.url})\n\nHappy to answer any questions about specific setups!`,
      },
      helpful: {
        title: `Made a guide: ${post.title}`,
        body: `Saw a lot of people asking about this, so I put together a comprehensive guide with:\n\n• Specific product recommendations\n• Step-by-step instructions\n• Budget options for renters\n• Common mistakes to avoid\n\n[Check it out here](${post.url})\n\nLet me know if you have questions or other solutions to add!`,
      },
    },
    
    // Twitter/X Thread
    twitter: {
      thread: [
        `${post.hook}?\n\nHere's how to fix it 🧵`,
        `The biggest mistake people make:\n\n${post.slug.includes('small') ? 'Putting the TV in the corner' : post.slug.includes('cable') ? 'Running cables along the baseboard' : 'Using overhead lighting only'}`,
        `Instead, try this:\n\n${post.slug.includes('small') ? '✓ Wall mount at eye level\n✓ Use a console with storage\n✓ Corner mounting brackets' : post.slug.includes('cable') ? '✓ Raceway behind the TV\n✓ In-wall cable kit\n✓ Cable spine organizer' : '✓ Bias lighting behind TV\n✓ Dimmable lamps\n✓ Smart bulbs for scenes'}`,
        `I tested 15+ solutions and put the best ones in this guide:\n\n${post.url}\n\n${post.keywords.map(k => `#${k.replace(/\s+/g, '')}`).join(' ')}`,
      ],
      single: `${post.hook}?\n\nI made a guide with 15 solutions that actually work:\n${post.url}\n\n${post.keywords.slice(0, 3).map(k => `#${k.replace(/\s+/g, '')}`).join(' ')}`,
    },
    
    // Instagram/Facebook
    instagram: {
      caption: `${post.hook}? 🤔\n\nSwipe for solutions that actually work →\n\n${post.keywords.map(k => `#${k.replace(/\s+/g, '')}`).join(' ')} #homedesign #apartmenttherapy #interiordesign #homedecor #livingroom #tvsetup #homeimprovement #renterfriendly #diyhome #modernliving`,
      story: `${post.hook}?\n\n${post.title}\n\nSWIPE UP FOR GUIDE ⬆️`,
    },
    
    // TikTok/Reels Script
    tiktok: {
      hook: post.hook,
      points: [
        "Here's what nobody tells you...",
        "The solution is actually simple",
        "You only need 3 things",
        "Check my bio for the full guide",
      ],
    },
    
    // Email Outreach
    email: {
      subject: `Quick resource: ${post.title}`,
      body: `Hi [Name],\n\nI noticed you write about home design and thought your readers might appreciate this guide I put together.\n\n${post.title}\n${post.url}\n\nIt covers:\n• Renter-friendly solutions\n• Budget options under $50\n• Step-by-step instructions\n• Common mistakes to avoid\n\nFeel free to share if you think it would help your audience. Happy to provide images or write a custom intro if needed.\n\nBest,\n[Your name]`,
    },
    
    // Quora Answer
    quora: {
      question: `How do I ${post.keywords[0]}?`,
      answer: `I recently helped 10+ friends with this exact problem and put together a comprehensive guide based on what worked.\n\nHere are the top 3 solutions:\n\n1. **[Specific tip from guide]**\n   - Why it works\n   - What you need\n   - Cost: $XX\n\n2. **[Another tip]**\n   - Best for renters\n   - Takes 30 minutes\n   - No tools required\n\n3. **[Third tip]**\n   - Professional look\n   - One-time investment\n   - Lasts forever\n\nI go into much more detail with photos and step-by-step instructions in this guide: ${post.url}\n\nHope this helps!`,
    },
  };
});

// Create output directory
const outputDir = path.join(__dirname, '../marketing/blog-social-posts');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Save all posts
fs.writeFileSync(
  path.join(outputDir, 'all-blog-social-posts.json'),
  JSON.stringify(socialPosts, null, 2)
);

// Create a markdown summary
let summary = '# Blog Social Media Posts\n\n';

Object.entries(socialPosts).forEach(([slug, posts]) => {
  const post = blogPosts.find(p => p.slug === slug);
  summary += `## ${post.title}\n\n`;
  summary += `URL: ${post.url}\n\n`;
  
  summary += `### Pinterest Pins\n`;
  posts.pinterest.forEach((pin, i) => {
    summary += `**Pin ${i + 1}:**\n`;
    summary += `Title: ${pin.title}\n`;
    summary += `Description: ${pin.description}\n\n`;
  });
  
  summary += `### Reddit Posts\n`;
  summary += `**Casual:**\n${posts.reddit.casual.title}\n\n${posts.reddit.casual.body}\n\n`;
  summary += `**Helpful:**\n${posts.reddit.helpful.title}\n\n${posts.reddit.helpful.body}\n\n`;
  
  summary += `### Twitter Thread\n`;
  posts.twitter.thread.forEach((tweet, i) => {
    summary += `${i + 1}. ${tweet}\n`;
  });
  summary += `\n### Single Tweet\n${posts.twitter.single}\n\n`;
  
  summary += `### Instagram\n`;
  summary += `**Caption:**\n${posts.instagram.caption}\n\n`;
  
  summary += `---\n\n`;
});

fs.writeFileSync(path.join(outputDir, 'blog-posts-formatted.md'), summary);

// Create Pinterest image templates config
const pinterestTemplates = {
  templates: [
    {
      name: 'Problem/Solution',
      size: '1000x1500',
      elements: [
        { type: 'background', color: '#f8f8f8' },
        { type: 'text', content: '[PROBLEM]', position: 'top', style: 'bold', size: '48px' },
        { type: 'image', position: 'center', description: 'Room photo or illustration' },
        { type: 'text', content: '[SOLUTION]', position: 'bottom', style: 'regular', size: '36px' },
        { type: 'logo', position: 'bottom-right' },
      ],
    },
    {
      name: 'Before/After',
      size: '1000x1500',
      elements: [
        { type: 'split-image', description: 'Before on top, after on bottom' },
        { type: 'label', content: 'BEFORE', position: 'top-left' },
        { type: 'label', content: 'AFTER', position: 'center-left' },
        { type: 'text', content: '[TITLE]', position: 'bottom', style: 'overlay' },
      ],
    },
    {
      name: 'List Style',
      size: '1000x1500',
      elements: [
        { type: 'header', content: '[NUMBER] Ways to [SOLVE PROBLEM]' },
        { type: 'list', items: 5, style: 'numbered' },
        { type: 'cta', content: 'GET FULL GUIDE', position: 'bottom' },
      ],
    },
  ],
};

fs.writeFileSync(
  path.join(outputDir, 'pinterest-templates.json'),
  JSON.stringify(pinterestTemplates, null, 2)
);

console.log('✅ Blog social posts generated!');
console.log(`📁 Output directory: ${outputDir}`);
console.log('\n📊 Generated:');
console.log('- 3 Pinterest pins per blog post (9 total)');
console.log('- 2 Reddit post versions per blog');
console.log('- Twitter threads and single tweets');
console.log('- Instagram captions');
console.log('- Email templates');
console.log('- Quora answer templates');
console.log('\n💡 Next steps:');
console.log('1. Create pin images using the templates');
console.log('2. Schedule pins across different boards');
console.log('3. Join relevant subreddits before posting');
console.log('4. Customize emails for each blogger');