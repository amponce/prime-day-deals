#!/bin/bash
# Quick deploy script for amponce/prime-day-deals

echo "🚀 Deploying prime-day-deals..."

# Update deals from any JSON file found
echo "📊 Updating deals..."
npm run quick-update

# Build the site
echo "🔨 Building..."
npm run build

# Deploy to Cloudflare
echo "☁️  Deploying to Cloudflare..."
npx wrangler pages deploy dist

# Commit and push changes
echo "📤 Pushing to GitHub..."
git add .
git commit -m "Update TV deals - $(date +%Y-%m-%d)" || true
git push origin main

echo "✅ Deployment complete!"
echo "🌐 Site: https://prime-day-deals.pages.dev"