# Rescue Network API Reference

## 🔐 Authentication
**Base URL**: `/api/auth`

| Endpoint | Method | Desc |
| --- | --- | --- |
| `/register` | POST | Create new account (Victim/Responder) |
| `/login` | POST | Get JWT token |
| `/me` | GET | [Auth Required] Get profile info |
| `/subscribe` | POST | [Auth Required] Save PWA Push Token |

## 🚑 Incidents
**Base URL**: `/api/incidents`

| Endpoint | Method | Desc |
| --- | --- | --- |
| `/` | GET | List all active emergencies |
| `/stats` | GET | Real-time platform KPI (Saves, Active Alerts) |
| `/:id` | GET | Detailed SOS telemetry |

## 📡 WebSockets (Socket.io)
The app uses real-time bi-directional events for rescue coordination.

### Outgoing (Client to Server)
- `emergency:sos`: Trigger a new accident alert with GPS.
- `responder:location`: Responder broadcasts live GPS while on route.

### Incoming (Server to Client)
- `mission:offered`: Nearby responders receive alert for new incident.
- `incident:responder_update`: Victims track responder movement live.

## 👤 Contacts & Feedback
- `/api/contacts`: CRUD for family/emergency contacts.
- `/api/feedback`: Post-rescue 1-5 star rating system.

## 🛡️ Security & Performance
- **Rate Limit**: 100 req / 15 min.
- **Push**: VAPID protected notifications.
- **Haptics**: Pulse confirmed SOS triggers.
