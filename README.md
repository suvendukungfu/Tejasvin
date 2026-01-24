# 🚑 Rescue Network: Real-Time Emergency Coordination

Rescue Network is a full-stack, mission-critical platform designed to bridge the gap between emergency incidents and life-saving help. By combining real-time GPS tracking, AI-driven triage, and verified responder networks, we ensure help reaches those in need faster and with more intelligence.

## 🚀 Core Features
- **🚨 Real-Time SOS**: One-touch emergency broadcast with live GPS telemetry.
- **🤖 AI Triage**: Automated first-aid advice and incident classification using an intelligent decision engine.
- **🛡️ Verified Responders**: Secure identity verification and accountability through a rating/feedback system.
- **🩺 Vitals Tracking**: Real-time patient stabilization feed for paramedics and hospitals.
- **📱 PWA & Push**: Native-feel experience with offline support and critical push notifications.
- **🔒 Security**: Hardened with Helmet.js, Rate Limiting, and JWT authentication.

## 🛠️ Stack
- **Frontend**: React, Vite, TailwindCSS, Zustand, Leaflet, Lucide.
- **Backend**: Node.js, Express, Socket.io, Mongoose.
- **Architecture**: Service Worker (PWA), Web Push (VAPID), Haptic Feedback API.

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas or local instance

### Installation
1. Clone the repository.
2. Setup environment variables in `backend/.env`.
3. Install dependencies:
   ```bash
   # Root
   npm install
   # Backend
   cd backend && npm install
   # Frontend
   cd frontend && npm install
   ```

### Running the App
```bash
# Start Backend
cd backend && npm run start
# Start Frontend
cd frontend && npm run dev
```

## 📜 API Documentation
Detailed endpoint references can be found in [docs/API.md](docs/API.md).

---
Built with ❤️ for a safer community.
