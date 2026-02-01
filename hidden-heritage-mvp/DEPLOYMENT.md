# Deployment Guide for Hidden Heritage

## 1. Frontend Deployment (The Website)

**Recommended Platform:** [Vercel](https://vercel.com)

### 🚨 Fixing "404 Not Found" (Critical Step)
If you see a 404 error, it's because Vercel is looking in the wrong folder.

1.  Go to your **Vercel Dashboard** > Select Project > **Settings**.
2.  In the **General** section, find **Root Directory**.
3.  Click **Edit** and change it to:
    `hidden-heritage-mvp/frontend`
4.  Click **Save**.
5.  Go to **Deployments**, select the latest one, and click **Redeploy**.

### New Deployment Instructions
1.  **Import Project**: Import your GitHub repository (`suvendukungfu/Tejasvin`).
2.  **Framework Preset**: Select **Vite**.
3.  **Root Directory**: ⚠️ **IMPORTANT**: Click Edit and select `hidden-heritage-mvp` > `frontend`.
4.  **Environment Variables**: None needed for the initial version (it uses mock data automatically).
5.  **Deploy**.

---

## 2. Backend Deployment (The Server)

**Recommended Platform:** [Render](https://render.com) or [Railway](https://railway.app)

*Note: The frontend currently runs with mock data, so deploying the backend is optional for the MVP demo but required for real data.*

### Render Instructions
1.  Create a new **Web Service**.
2.  Connect your GitHub repository.
3.  **Root Directory**: `hidden-heritage-mvp/backend`
4.  **Build Command**: `npm install && npm run build`
5.  **Start Command**: `npm start`
6.  **Environment Variables**:
    *   `PORT`: `5000`
    *   `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME` (MySQL connection details)
    *   `MONGO_URI` (MongoDB connection string)
    *   `JWT_SECRET` (A secure random string)

### Linking Backend to Frontend
Once the backend is live (e.g., `https://my-backend.onrender.com`):
1.  Go back to **Vercel** > **Settings** > **Environment Variables**.
2.  Add a new variable:
    *   **Name**: `VITE_API_URL`
    *   **Value**: `https://my-backend.onrender.com` (Your backend URL)
3.  **Redeploy** the frontend in Vercel.
