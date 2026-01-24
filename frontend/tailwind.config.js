/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        utility: {
          500: '#1b1b1f',
          400: '#27272a',
        },
        emergency: {
          base: '#ef4444',
          critical: '#dc2626',
          pulse: '#fee2e2',
        },
        warning: {
          base: '#f59e0b',
        },
        action: {
          base: '#3b82f6',
          active: '#2563eb',
        },
        success: {
          base: '#22c55e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

