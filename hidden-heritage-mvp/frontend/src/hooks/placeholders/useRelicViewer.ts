/**
 * useRelicViewer – Future-Ready Placeholder
 * 
 * Hook for Three.js / React Three Fiber AR relic model viewer.
 * Will support loading & displaying 3D heritage artifact models
 * with AR overlay capability.
 * 
 * Dependencies already installed: @react-three/fiber, @react-three/drei, @react-three/xr
 * 
 * TODO: Implement 3D model loader
 * - GLTF/GLB model loading
 * - AR session management
 * - Touch/gesture controls
 * - Model annotation overlays
 */

import type { RelicModel } from '../../types/admin';

export const useRelicViewer = () => {
  const loadModel = async (_model: RelicModel) => {
    console.warn('[Hidden Heritage] AR Relic Viewer module not yet implemented');
    return null;
  };

  return { loadModel, isLoading: false, currentModel: null, error: null };
};
