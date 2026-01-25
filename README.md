# 🚑 Rescue Network: Bridging the Accident Response Gap

[![V2 Architecture](https://img.shields.io/badge/Architecture-v2.0--TS-blueviolet?style=for-the-badge)](https://github.com/suvendukungfu/Tejasvin)
[![AI/ML Enabled](https://img.shields.io/badge/AI--Triage-Enabled-green?style=for-the-badge)](https://github.com/suvendukungfu/Tejasvin)
[![Real-time](https://img.shields.io/badge/Signal-Real--time-red?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](https://opensource.org/licenses/ISC)

Rescue Network is a mission-critical, real-time emergency coordination ecosystem. It bridges the fatal gap between an accident and professional medical arrival by mobilizing a verified community of responders and providing immediate, AI-driven first-aid intelligence.

---

## 🧠 Core Intelligence Layer

Our **v2 Intelligence Engine** (TypeScript/Applied ML) provides high-fidelity decision support when seconds count:

- **🚨 False Alert Guard (`PatternValidator`)**: Uses sensor telemetry (Force vs Speed) to distinguish between accidental device drops and legitimate vehicle-scale impacts.
- **🤖 AI Triage Engine (`SeverityClassifier`)**: Automatically classifies incident severity and provides immediate, context-aware first-aid instructions to victims.
- **🛡️ Smart Matching Algorithm**: Reranks nearby responders by calculating a weighted score of **Proximity**, **Trust Rating**, and **Successful Save Count**.
- **⏱️ ETA Prediction (`ETAService`)**: Real-time arrival estimation with dynamic safety windows for victims and hospitals.

---

## 🏗️ Production Architecture (v2)

The system is built on a **Domain-Driven Clean Architecture** to ensure industrial-grade reliability:

- **Backend**: Node.js + TypeScript (v2) featuring a strictly typed module system and unified infrastructure layers.
- **Real-time**: Socket.io with a **Redis-backed adapter** for horizontal scaling and service resilience.
- **Identity**: Secure JWT authentication with responder credential verification flows.
- **Persistence**: MongoDB with Geospatial indexing (PostGIS-ready) for sub-millisecond proximity queries.
- **Frontend**: React + TypeScript + Zustand, designed with a focus on high-fidelity animations and emergency-mode UX.

---

## 🏁 Getting Started

### 📦 Installation
```bash
# 1. Install project-wide dependencies
npm install

# 2. Configure Environment
cp .env.example .env

# 3. Start Database (Docker)
# This spins up MongoDB and Redis in the background
docker-compose up -d

# 4. Parallel Start (Development)
npm run dev
```

### 🛠️ Key Scripts
- `npm run build`: Production TypeScript compilation (tsc).
- `npm run dev`: Hot-reloading development environment for both systems.
- `npm run lint`: Enforce architectural and typing standards.

---

## 📜 Technical Documentation
- **[📘 USER GUIDE (How to Use)](docs/USER_GUIDE.md)**: Step-by-step instructions for Victims and Responders.
- **[Git Workflow & Guidelines](docs/git_guidelines.md)**: Conventional Commits and atomic flow standards.
- **[API Documentation](docs/API.md)**: Complete REST and WebSocket endpoint reference.
- **[v2 Architecture Blueprint](docs/v2_architecture_blueprint.md)**: Detailed scaling and AI pipeline specs.

---

## 🚀 Future Roadmap
- [ ] **IoT Hardware Integration**: Direct ESP32 telemetry via LoRa/GSM.
- [ ] **Accident Hotspot Analytics**: Historical heatmap visualization for city planners.
- [ ] **Global Scaling**: Multi-region Geo-DNS deployment.

---
Built by **Suvendukungfu** with ❤️ for a safer, more connected world.
