# 🚑 Tejasvin User Guide

Welcome to the **Tejasvin Rescue Network**. This guide will help you understand how to use the application from the perspective of a **Victim**, a **Responder**, and an **Administrator**.

---

## 🚀 1. Getting Started

### Installation & Setup
1.  **Clone the repository**: `git clone <repo-url>`
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Setup**:
    - Copy `.env.example` to `.env`.
    - Ensure MongoDB and Redis are running (or URIs are set).
4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    - Frontend: `http://localhost:5174`
    - Backend: `http://localhost:4000`

### Authentication
- **Sign Up**: Navigate to `/signup`.
    - **Victim Mode**: Select role "Standard".
    - **Responder Mode**: Select role "Responder" (requires verification for some features).
- **Login**: Use your credentials at `/login`.

---

## 🆘 2. Victim Mode (Emergency)

As a standard user, your primary interface is the **Dashboard** and the **SOS Button**.

### Triggering an Emergency
1.  **Hold to SOS**:
    - Locate the big red **SOS Button** at the bottom of the screen.
    - **Press and Hold** for 3 seconds. The ring will fill up.
    - **Countdown**: A 5-second countdown will begin to prevent accidental triggers. You can cancel here.
2.  **Connecting State**:
    - Once confirmed, the **Radar Animation** will scan for nearby responders.
    - The AI Triage system will analyze your telemetry (simulated) to classify severity.
3.  **Active Emergency Mode**:
    - You will see the **Emergency Overlay**.
    - **AI Advice**: Immediate first-aid instructions will appear (e.g., "Apply pressure to wound").
    - **Live Tracker**: See your Incident ID and status.
    - **Quick Dial**: Access Police, Ambulance, and Fire buttons.

### Resolution
- When you are safe, click **"I AM SAFE NOW"** on the overlay to resolve the incident.

---

## 🏃 3. Responder Mode

Responders play a critical role in saving lives.

### Verification
- Go to **Profile** (`/profile`).
- If you are unverified, you will see a **"Pending"** badge.
- Click **"Apply for Verification"** (Simulated approval for now).
- *Verified responders get priority alerts.*

### Receiving a Mission
1.  **Stay Online**: Keep the app open (or backgrounded if PWAs are enabled).
2.  **Mission Offer**:
    - When an incident occurs nearby, you will see a **"Mission Offer"** modal.
    - It shows: **Distance**, **Severity**, and **ETA**.
3.  **Accepting**:
    - Swipe or Click **"ACCEPT MISSION"**.
    - You are now assigned to the incident.

### Mission Navigation
- **Navigation Overlay**:
    - You will see a map routing you to the victim.
    - **Real-time Vitals**: You can see the victim's heart rate/status if sensors are active.
- **On Arrival**:
    - Click **"I HAVE ARRIVED"**.
    - Administer aid using the provided AI instructions.
- **Completion**:
    - Once the situation is handed over to authorities, click **"COMPLETE MISSION"**.
    - You will earn **Badges** and **Trust Score**.

---

## 🕹️ 4. Simulation Tools

To test the system without actual accidents, use the simulation scripts.

### Vehicle Simulator
This script simulates a driving vehicle that detects a crash.

```bash
# Open a new terminal
npx tsx backend/src/simulation/vehicle_sim.ts
```

- **Commands**:
    - `normal`: Simulates normal driving telemetry.
    - `crash`: *Triggers a high-severity accident.*
    - `brakes`: Simulates sudden braking (maybe false positive).

**Workflow**:
1.  Open the App as a **Responder** in one window.
2.  Open the App as a **Victim** (or just use the Sim) in another.
3.  Run `crash` in the terminal.
4.  Watch the Victim app trigger SOS and the Responder app receive the mission!

---

## 🛠️ 5. Admin Dashboard

Navigate to `/admin` (requires `role: 'admin'` in database).

- **Live Map**: View all active incidents and responder positions globally.
- **Incident Feed**: Real-time list of incoming alerts.
- **Analytics**: Heatmaps of accident-prone areas.

---

### 🎨 UI Customization
- **Dark Mode**: Toggle via system settings or the `dark` class in HTML.
- **Profile**: Customize your bio and view your earned badges.

---

*Built for the 2026 Safety Hackathon.*
