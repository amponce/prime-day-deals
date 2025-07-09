#!/bin/bash
# Quick deploy script for amponce/prime-day-deals

echo "🚀 Deploying prime-day-deals to Cloudflare Pages..."

# Update deals from any JSON file found
echo "📊 Updating deals..."
npm run quick-update

# Build the site
echo "🔨 Building Next.js app..."
npm run build:next

# Check if dist exists
if [ ! -d "dist" ]; then
  echo "❌ Error: dist folder not found. Moving out to dist..."
  mv out dist
fi

# Deploy to Cloudflare Pages (not Workers!)
echo "☁️  Deploying to Cloudflare Pages..."
echo "📌 Make sure you're using the correct project name"
npx wrangler pages deploy dist --project-name=prime-day-deals

# Alternative deployment methods:
echo ""
echo "If the above doesn't work, try:"
echo "1. npx wrangler pages deploy dist"
echo "2. Or use the Cloudflare dashboard to connect your GitHub repo"
echo ""

# Commit and push changes
echo "📤 Pushing to GitHub..."
git add .
git commit -m "Update TV deals - $(date +%Y-%m-%d)" || true
git push origin main

echo "✅ Deployment complete!"
echo "🌐 Your site should be at: https://prime-day-deals.pages.dev"
echo "❌ NOT at: movie-streams.workers.dev"