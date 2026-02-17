#!/bin/bash
set -e

echo "🚀 Starting Production Build..."

# 1. Install Dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# 2. Build Project
echo "🏗️ Building for production..."
npm run build

# 3. Deploy
echo "🌐 Initiating Netlify Deployment (Preview)..."
echo "⚠️  NOTE: If this is your first time, you may be prompted to log in/authorize in your browser."
npx netlify deploy --dir=dist

echo "✅ Deployment Process Complete (check output for URL)"
