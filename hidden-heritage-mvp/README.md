# 🏛️ Hidden Heritage | Neural Heritage Interface

[![Status](https://img.shields.io/badge/Status-v3.0--Gold-B08D55?style=flat-square)](https://github.com)
[![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node%20%7C%20MySQL%20%7C%20Mongo-1C1917?style=flat-square)](https://github.com)

Hidden Heritage is a **Neural Heritage Interface**—a cognitive, spatial computing platform designed to treat history not as a static archive, but as a living signal. It leverages modern web tech to create an attention-guided narrative experience for discovering the forgotten architecture of the Indian subcontinent.

---

## ✨ System Highlights

### 🧠 Neural Navigation & UX

- **Contextual Heads-Up Display**: A glass-morphic `NavBar` that dissolves and reconstructs based on user focus.
- **Cognitive Flow**: Orchestrated by custom neural easing curves (`cubic-bezier(0.2, 0, 0, 1)`) for a cinematic, weightless feel.
- **Expedition Logistics**: A complex 3-column Trip Builder featuring interactive Leaflet maps and drag-and-drop itinerary sequencing.

### 💳 Liquid Checkout Experience

- **Live Card Simulation**: Real-time 3D credit card preview with holographic overlays and dynamic branding (Visa/Mastercard/Amex).
- **Graceful Failover**: `api.ts` implements a sync-fallback pattern allowing the app to function via `localStorage` if the backend is unreachable.

### 🌌 Spatial Computing (WebXR)

- **Antigravity Portal**: A dedicated 3D artifact viewer using **React Three Fiber** and **WebXR** for 1:1 artifact simulation in augmented reality.

---

## 🏗️ Technical Architecture

### **Frontend** (React + Vite)

- **Design System**: "VisionOS Heritage" — Warm sandstone palettes, hyper-glass materials, and editorial typography.
- **Animation**: Physics-based motion via `framer-motion`.
- **State**: Centralized `AuthContext` for JWT session persistence.

### **Backend** (Node.js + Express)

- **Dual-Database Layer**:
  - **MySQL**: Relational data for Users, Trips, Payments, and Sites.
  - **MongoDB**: Document-based storage for User Feedback and AI Stories.
- **Services**:
  - **Safety ML**: Logic-based scoring engine for real-time site safety assessments.
  - **Trip Estimator**: Algorithmic cost calculation for multi-day expeditions.

---

## 🚀 Deployment & Setup

### Infrastructure

- **Docker**: Containerized MySQL 8.0 and MongoDB 6.0 environments.
- **Frontend**: Optimized for Netlify/Vercel.
- \*_Backend_: Node.js runtime (Render/Heroku compatible).

### Quick Start

1. **Clone & Install**:
   ```bash
   git clone https://github.com/your-username/hidden-heritage.git
   cd hidden-heritage-mvp
   npm install # in both /frontend and /backend
   ```
2. **Launch Databases**:
   ```bash
   docker-compose up -d
   ```
3. **Environment**:
   Copy `backend/.env.example` to `backend/.env` and update credentials.
4. **Development**:
   ```bash
   # Terminal 1
   cd frontend && npm run dev
   # Terminal 2
   cd backend && npm run dev
   ```

---

## 🎨 Design Philosophy

_"History is a living signal, not a dead archive."_
Hidden Heritage rejects generic travel templates in favor of a cinematic, emotional GUI. Every interaction is designed to evoke the feeling of uncovering a lost treasure in a digital record room.

---

© 2026 Hidden Heritage Collective. Built for the preservation of memory.
