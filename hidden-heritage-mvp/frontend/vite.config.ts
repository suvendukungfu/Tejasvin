import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': ['react', 'react-dom', 'react-router-dom'],
                    'vendor-ui': ['framer-motion', 'lucide-react', '@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities'],
                    'vendor-3d': ['three', '@react-three/fiber', '@react-three/drei', '@react-three/xr'],
                    'vendor-leaflet': ['leaflet', 'react-leaflet']
                }
            }
        },
        chunkSizeWarningLimit: 1600
    }
})
