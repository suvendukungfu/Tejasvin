# Blueprint: v2 Startup-Ready Rescue Architecture

This document outlines the architectural evolution of the Rescue Network from a functional MVP to a high-reliability, safety-critical production system.

## 1. Backend Architecture (Clean / Layered)
We move from a flat structure to a **Domain-Driven / Clean Architecture** to ensure testability and service boundaries.

```text
src/
├── app.ts                 # Entry point
├── config/                # Redis, PG, App constants
├── modules/               # Domain-based modules
│   ├── auth/              # JWT, OTP logic
│   ├── incident/          # Triage, CRUD, Vitals
│   ├── notification/      # WebSocket, Push, SMS
│   ├── matching/          # AI Helper Selection logic
│   └── economy/           # Credits, Rewards
├── shared/                # Middlewares, Utils, Types
│   ├── middlewares/       # Auth, RateLimiter, Helmet
│   └── core/              # Base Repository, Base Service
├── services/               
│   ├── ai/                # Inference Clients (TorchServe/Triton)
│   └── external/          # Twilio, Google Maps
└── infra/                 # Docker, K8s, migrations
```

## 2. API Design (Standardized)
*   **Auth**: `POST /v2/auth/otp/send`, `POST /v2/auth/otp/verify`
*   **Incidents**: `POST /v2/incidents/sos`, `GET /v2/incidents/:id/telemetry`
*   **Helpers**: `GET /v2/helpers/nearby`, `POST /v2/helpers/:id/rank` (AI-based)
*   **Credits**: `GET /v2/economy/balance`, `POST /v2/economy/reward/:missionId`

## 3. Database Schema (PostgreSQL + PostGIS)
| Table | Key Features |
| --- | --- |
| `Users` | `id, role, trust_score, lat_long (PostGIS), is_verified` |
| `Incidents` | `id, severity_ai, ai_advice, vitals_json, sensor_stream_id` |
| `SensorData` | `incident_id, timestamp, force_n, speed, accel_x/y/z` |
| `Helpers` | `user_id, status (idle/active), rating, response_count` |
| `Notifications` | `id, type, delivery_status, recipient_id` |

## 4. Real-time Reliability (Redis + Sockets)
- **State management**: Use Redis to track "Active Responders" and "Live Incidents" for sub-millisecond lookups.
- **Idempotency**: Every SOS event must include a `nonce` or `client_id` to prevent double-alerts from shaky hardware connections.
- **Heartbeats**: Bi-directional 30s heartbeats to ensure responders are truly "Online."

## 5. AI/ML Strategy
| Model | Algorithm | Input | Goal |
| --- | --- | --- | --- |
| **Severity** | Random Forest / XGBoost | Speed, Delta Force, Location Type | Classify (Minor/Moderate/Fatal) |
| **Fake Alert** | 1D-CNN or Autoencoder | Sensor Time-series (Force vs Accel) | Detect non-human impact patterns |
| **Smart Match** | RankNet / XGBoost Rank | Distance, Rating, Certifications | Prioritize the "Best" helper |
| **ETA** | Graph Neural Nets / Hist. Avg | Traffic, Responder History | Real-time arrival prediction |

## 6. Deployment: Edge vs Backend
- **Edge (ESP32)**: Threshold-based filtering (e.g., Force > 50N).
- **Backend**: Full Deep Learning inference (CNNs) and Geospatial context analysis.
- **Hybrid**: ESP32 detects "Potential Impact", Backend confirms "Actual Accident" via behavioral modeling.

## 7. Scalability & Safety
- **High Availability**: Multi-region Geo-DNS to route traffic to the nearest instance.
- **Load Balancing**: Nginx / HAProxy with sticky sessions for WebSocket nodes.
- **Circuit Breakers**: If the AI triage service is slow, fallback to standard rule-based triage.
- **Safety**: 24/7 Human-in-the-loop (HITL) for "Critical" incidents that AI cannot resolve with 95%+ confidence.

## 8. Metrics
- **ML**: Precision (Minimize False Positives/Responders dispatched for nothing), Recall (Never miss a real accident).
- **System**: P99 Latency < 100ms for SOS trigger, 99.99% Uptime.
