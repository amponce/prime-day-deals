# Cloudflare Pages Deployment Guide

## Quick Deploy Steps

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Cloudflare deployment"
   git push origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to Pages
   - Click "Create a project"
   - Connect GitHub account
   - Select your repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Click "Save and Deploy"

### Option 2: Direct Upload

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Upload to Cloudflare**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Click "Create a project"
   - Choose "Direct Upload"
   - Drag and drop the `dist` folder
   - Deploy

### Option 3: Wrangler CLI

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Deploy**
   ```bash
   wrangler pages deploy dist --project-name=prime-day-deals
   ```

## Common Issues & Solutions

### Issue: Build fails
- **Solution**: Ensure `npm run build` works locally first
- The build script copies `index.html` to the `dist` folder

### Issue: 404 errors
- **Solution**: Check that `dist/index.html` exists
- Verify build output directory is set to `dist`

### Issue: Missing assets
- **Solution**: If you have images or other assets, copy them to dist:
  ```bash
  cp -r images dist/ # if you have an images folder
  ```

## Custom Domain Setup

1. After deployment, go to your project settings
2. Click "Custom domains"
3. Add your domain
4. Follow DNS configuration instructions

## Environment Variables

This is a static site, so no environment variables are needed.

## Deployment URL

Your site will be available at:
- `https://prime-day-deals.pages.dev`
- Or your custom domain if configured