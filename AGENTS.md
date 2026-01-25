## Project Summary
Hidden Heritage is a tourism-tech platform revealing India's forgotten heritage sites, starting with the Chambal region. It provides a premium, research-driven experience with interactive maps, safety scoring, and AI-driven storytelling.

## Tech Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS 4, React Leaflet (Mapping)
- **Backend**: Node.js, Express, MySQL (Structured Data), MongoDB (Unstructured Stories/Safety)
- **Design**: Playfair Display (Headings), Inter (Body), Heritage Palette (Deep Brown, Sandstone, Terracotta)

## Architecture
- **App Router**: Dynamic routes for regions and sites.
- **Dual DB**: MySQL for relations (Guides, Trips, Sites); MongoDB for flexible content (Safety breakdowns, AI Tones).
- **Client/Server**: Leaflet maps and interactive UI use client components; data fetching handled via server actions/API routes.

## User Preferences
- **Premium Aesthetic**: Clean, editorial, museum-like UI.
- **Safety First**: Transparent safety scoring for off-beat locations.
- **Interactive**: Drag-and-drop trip building and heatmap map overlays.

## Project Guidelines
- **No UI Frameworks**: Custom CSS for distinct character.
- **Responsive**: Mobile-first design.
- **Security**: Environment variables for DB connections.

## Common Patterns
- **Safety Breakdown**: Component-based logic for infrastructure assessment.
- **AI Tone Switching**: Context-aware narration (Tourist vs Researcher).
