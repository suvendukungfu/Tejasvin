# Hidden Heritage — Unveiling India's Unexplored History

> A production-ready tourism-tech platform helping users discover off-beat heritage sites. Built for scale, safety, and storytelling.

## 🚀 Overview
**Hidden Heritage** goes beyond standard travel booking. It is a comprehensive platform designed to bring attention to forgotten regions like **Chambal**.
The MVP features:
- **Interactive Maps**: Real-time exploration of sites.
- **Smart Trip Builder**: Dynamic cost estimation with "Smart Suggestions".
- **Safety Readiness System**: Transparent safety scores (0-10) and accessibility data.
- **AI History Narrator**: Automated storytelling based on user personas (Tourist/Student/Researcher).

## 🛠 Tech Stack
- **Frontend**: React (Vite), TypeScript, Framer Motion, Leaflet, dnd-kit.
- **Backend**: Node.js, Express, TypeScript (REST API).
- **Database**:
  - **MySQL**: Structured data (Sites, Regions, Guides, Itineraries).
  - **MongoDB**: Unstructured data (User feedback, Rich stories).
- **Infrastructure**: Docker & Docker Compose.

## 🏃‍♂️ Quick Start

### Option A: Production Mode (Requires Docker)
This runs the full stack with real databases.

1.  **Start Infrastructure**
    ```bash
    docker-compose up -d
    ```
2.  **Start Backend**
    ```bash
    cd backend
    npm install
    npm start
    ```
3.  **Start Frontend**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

### Option B: Demo Mode (No Docker)
If you cannot run Docker, the Frontend will automatically **fallback to a Mock API Layer**. 
1.  **Start Frontend**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
2.  Open `http://localhost:5173`. All features (Trip Builder, AI, Safety) will work with realistic seed data.

## 📚 Key Features & Usage

### 1. Explore Regions
Navigate to **Explore** -> **Chambal**. Detailed cards show site info. Hover over cards to see them highlight on the interactive map.

### 2. Plan a Trip
Select multiple sites and click **"Plan Trip"**. 
- Drag and drop to reorder.
- Set your budget and days.
- **Smart Suggestions** will pop up if you have few sites selected.
- See the **Estimated Cost** breakdown update in real-time.

### 3. Check Safety & History
Go to any Site Detail page (e.g., *Bateshwar Temples*).
- **Safety Badge**: Top right sidebar. Green = Safe/Family Friendly.
- **AI Narrator**: Scroll down to "AI History Narrator". Select "Researcher" for a deep dive.

## 📂 Project Structure
```
hidden-heritage-mvp/
├── backend/                 # Express API
│   ├── src/controllers/     # logic (AI, Trip, Sites)
│   ├── src/models/          # MongoDB Schemas
│   └── src/routes/          # API Endpoints
├── frontend/                # React App
│   ├── src/components/      # UI Components (Map, Navbar)
│   ├── src/pages/           # Views (TripBuilder, SiteDetail)
│   └── src/services/        # API Client (with Mock Fallback)
├── database/
│   ├── init_mysql/          # SQL Schemas & Seeds
│   └── init_mongo/          # Mongo Collections Seeds
└── docker-compose.yml       # DB Orchestration
```

## ⚠️ Notes
- **Placeholder Data**: The Map currently focuses on the Chambal region. Coordinates are real approximations.
- **AI Stub**: The AI endpoint currently uses a sophisticated template engine. Connect to OpenAI API in `backend/src/controllers/aiController.ts` for live generation.
