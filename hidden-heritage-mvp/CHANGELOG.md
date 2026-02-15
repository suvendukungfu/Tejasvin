# Changelog

All notable changes to the "Hidden Heritage" project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-15

### The "Neural Heritage" Release

This release marks the complete transformation of the platform into a cognitive, spatial computing interface.

### 🚀 Major Features

- **Neural Heritage Interface**: A complete UI/UX overhaul focusing on "Cognitive Motion" and "Spatial Depth".
- **Antigravity Engine v5.0**: A lazy-loaded, WebXR-ready 3D viewer for artifact simulation.
- **Holographic Atlas**: `Explore.tsx` now features 3D-tilt physics cards for region selection.
- **Data Crystal HUD**: `SiteDetail.tsx` presents historical data as floating, glassmorphic modules.
- **Mission Control**: `TripBuilder.tsx` re-skinned as a tactical mission planning interface.

### 🎨 Design System

- **New Palette**: "Future Sandstone" (`#F9F7F2`), "Deep Charcoal" (`#1A1A1A`), "Artifact Gold" (`#C8A359`).
- **Typography**: Standardized on `Playfair Display` (Display) and `Inter` (UI).
- **Motion**: Implemented custom `cubic-bezier` easing for "neural" feel.

### ⚡ Performance

- **Lazy Loading**: `AntigravityScene` (Three.js/Fiber) is now lazy-loaded, reducing initial bundle size by ~1MB.
- **Manual Chunking**: Vendor libraries split into `xr`, `ui`, `maps`, and `react-vendor` chunks.
- **SEO**: Added rich Open Graph and Twitter Card metadata.

### 🛠 Technical Refactors

- **Contextual Navigation**: `NavBar` logic rewritten to react to scroll position and user focus.
- **Route Transitions**: Added `<AnimatePresence>` for "Zoom" page transitions.
- **Strict Linting**: Resolved 50+ ESLint and TypeScript errors for a clean production build.
