# System Architecture | Hidden Heritage

## 1. Modular Hierarchy

The system is designed as a decoupled full-stack application with a heavy emphasis on frontend interactivity and dual-database persistence.

### High-Level Flow

1. **Frontend (React)**: Handles the "Neural Interface" layer, spatial rendering (WebXR), and client-side logic (Trip Building).
2. **Backend (Express)**: Orchestrates business logic, authentication (JWT), and multi-service integration (Safety ML, Trip Estimation).
3. **Storage**:
   - **MySQL**: Relational data (users, sites, relational mapping).
   - **MongoDB**: High-velocity or unstructured data (user feedback, AI-generated site stories).

---

## 2. Core Service Modules

### **Safety ML Service**

_Location: `backend/src/services/safetyML.ts`_
A simulated Machine Learning engine that processes:

- Weather conditions
- Recent safety reports
- Local infrastructure ratings
  Returns a dynamic Safety Score (1-10) with situational advisories.

### **Trip Logistics Engine**

_Location: `backend/src/services/tripService.ts`_
Calculates exponential trip parameters:

- Weighted cost estimates (Entry fees + transport + lodging)
- visit-time density mapping
- Budget-to-site feasibility analysis

---

## 3. Frontend Architecture

### **Offline-First Resilience**

The `api.ts` service uses a specialized Proxy wrapper called `fetchWithFallback`. If the primary API endpoint times out or returns a connection error, the system automatically redirects to:

- A local mock data factory.
- Persistent `localStorage` state (browser-side database).

### **Design System System (DSS)**

Implemented in `index.css`, using a strict CSS Variable architecture:

- **Spatial Palette**: Warm neutrals reflecting the "Stone & Dust" aesthetic.
- **Micro-Animations**: Uses `framer-motion` for physics-based UI transitions that feel biological rather than mechanical.

---

## 4. Security & Authentication

- **JWT (JSON Web Tokens)**: Secure stateless communication.
- **Bcrypt**: Adaptive hashing for user credentials.
- **Middleware**: Mandatory token verification for sensitive routes (Payments, Profile, Admin).

---

## 5. Deployment Matrix

- **State Persistence**: MySQL & MongoDB volumes are containerized via Docker.
- **Frontend Build**: Single Page Application (SPA) optimized for edge deployment.
- **Backend Build**: Statured Node.js instance with connection pooling.
