# Hidden Heritage: Technology Stack Documentation

This document outlines the architecture, tech stack, libraries, and tools used to build the **Hidden Heritage** web application. The platform is designed with a modern dual-database backend and a highly interactive, animated frontend.

---

## 1. System Architecture

The application follows a standard **Client-Server Architecture**:

- **Client (Frontend):** A Single Page Application (SPA) responsible for the UI, routing, and cinematic user experience.
- **Server (Backend):** A RESTful API handling business logic, authentication, AI integration, and database orchestration.
- **Databases:** A hybrid dual-database architecture using both SQL (MySQL) and NoSQL (MongoDB) to handle different types of data efficiently.

---

## 2. Frontend Technologies

The frontend is focused on delivering a high-performance, visually striking "cinematic" experience.

- **Core Library**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/) (Chosen for extremely fast HMR and optimized production builds)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Ensures type safety across components and API responses)
- **Routing**: `react-router-dom` (v6)

### Visuals & Interactions

- **Animations**: `framer-motion` (Used extensively for scroll-linked animations, page transitions, and complex UI choreographies).
- **Icons**: `lucide-react` (Lightweight, clean SVG icons).
- **Maps/Geospatial**: `leaflet` & `react-leaflet` (Used for the interactive "Atlas" map and route planning).
- **3D Capabilities**: `@react-three/fiber`, `@react-three/drei`, `@react-three/xr` (Configured for future WebGL/3D model integrations and AR/VR support).

### Key Features

- **Local Storage Adapter**: The frontend has fallback mechanisms to store trips and feedback in `localStorage` if the backend is unreachable.
- **Custom Map Control**: Includes a custom nearest-neighbor algorithm (Greedy TSP) to calculate optimized travel routes between heritage sites.

---

## 3. Backend Technologies

The backend serves as a robust REST API layer, designed to eventually support mobile apps and heavily interact with AI models.

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (via `ts-node-dev` for hot-reloading in development).

### Security & Authentication

- **Authentication**: JSON Web Tokens (`jsonwebtoken`)
- **Encryption**: `bcryptjs` (Password hashing)
- **Middleware**: `cors` (Cross-Origin Resource Sharing)

### Environment & Integrations

- **Environment Variables**: `dotenv`
- **Payment Processing**: Architected to support integrations (e.g., Stripe) via `/payment/create-intent` endpoints.
- **AI Integrations**: Infrastructure in place for AI storytelling (`/api/ai/story`) using LLM models like Gemini or OpenAI.

---

## 4. Database Architecture (Dual Database)

Hidden Heritage uses a polyglot persistence strategy, deploying two different databases to match specific data requirements. Both databases are orchestrated locally via Docker.

### 4.1. MySQL (Relational DB)

- **Driver**: `mysql2`
- **Purpose**: Used for highly structured, relational data that requires ACID compliance.
- **Managed Entities**:
  - `Regions`
  - `Sites`
  - `Guides`
  - `Users` (Relational aspect)

### 4.2. MongoDB (NoSQL)

- **ODM**: `mongoose`
- **Purpose**: Used for unstructured, rapidly changing, or document-heavy data.
- **Managed Entities**:
  - `Feedback` and User Logs
  - `AI Stories` (Variable length text generation)
  - `Analytics / Raw Telemetry Data`

---

## 5. Development Setup & Tooling

### Docker Orchestration

A `docker-compose.yml` file is provided to streamline the local database setup. Running `docker-compose up` will simultaneously spin up:

1.  **MySQL 8.0** container (Port 3306)
2.  **MongoDB 6.0** container (Port 27017)
    _Note: Both databases use volumes and seed scripts mounted from the `/database/init_mysql` and `/database/init_mongo` directories to populate initial dummy data._

### Deployment Workflows

- **Frontend Deployment**: Configured via the `deploy.sh` script to build (`npm run build`) and push the distribution bundle to **Netlify** (`npx netlify deploy`).
- **CI/CD**: GitHub Actions workflows (`.github/workflows/ci.yml`) are set up for continuous integration, linting, and automated builds.

---

## Summary Statement

The _Hidden Heritage_ stack is modern and highly scalable. By leveraging React/Vite + Framer Motion on the Frontend, it achieves a buttery-smooth UI. By combining Node/Express with a hybrid MySQL + MongoDB approach, the backend bridges structured administration data with flexible AI and user-generated content.
