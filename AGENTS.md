## Project Summary
Hidden Heritage is a tourism-tech platform revealing India's forgotten heritage sites, starting with the Chambal region. It features interactive maps, a dynamic trip builder, and high-fidelity storytelling for unvisited landscapes.

## Tech Stack
- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, Leaflet (Maps), Framer Motion (implied by requirements).
- **Backend**: Node.js, Express, TypeScript.
- **Databases**: 
  - MySQL (Structured: Regions, Sites, Guides, Trips).
  - MongoDB (Unstructured: Feedback, Stories).

## Architecture
- `hidden-heritage-frontend/`: Next.js frontend with App Router.
- `backend/`: Express server with MVC-like structure.
- `backend/src/db/`: Database schemas and connection logic.
- `backend/src/controllers/`: API route handlers.
- `backend/src/models/`: Database models (Mongoose for MongoDB).

## User Preferences
- **Styling**: Premium, ancient-inspired aesthetic (Deep Brown, Sandstone, Terracotta).
- **Typography**: Serif titles (Playfair Display), Sans-serif body (Inter/Roboto).
- **Interactions**: Interactive maps with route drawing, drag-and-drop trip building.

## Project Guidelines
- No UI frameworks like MUI or Shadcn (Raw CSS/Tailwind preferred).
- Responsive, mobile-first design.
- Smooth animations and transitions (parallax, fade-ins).
- Production-ready codebase with clear separation of concerns.

## Common Patterns
- **Map Integration**: Dynamic imports for Leaflet components to avoid SSR issues.
- **API Handling**: Centralized controllers and typed routes in the backend.
- **Data Modeling**: Relational data in MySQL, document data in MongoDB.
