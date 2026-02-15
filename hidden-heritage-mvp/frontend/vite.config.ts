import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom'],
                    'router': ['react-router-dom'],
                    'ui': ['framer-motion', 'lucide-react'],
                    'maps': ['leaflet'],
                    'xr': ['three', '@react-three/fiber', '@react-three/drei', '@react-three/xr']
                }
            }
        },
        chunkSizeWarningLimit: 1000
    }
})
