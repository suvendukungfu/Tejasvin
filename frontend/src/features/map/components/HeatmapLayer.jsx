import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

export default function HeatmapLayer({ points, intensity = 25, radius = 25 }) {
    const map = useMap();

    useEffect(() => {
        if (!points || points.length === 0) return;

        // Points format: [lat, lng, intensity]
        // Our API returns { lat, lng, intensity: 0-1 }
        // leaflet.heat expects [lat, lng, intensity]
        const heatPoints = points.map(p => [p.lat, p.lng, p.intensity * 100]); // Scale intensity?

        const heat = L.heatLayer(heatPoints, {
            radius: radius,
            blur: 15,
            maxZoom: 17,
            gradient: {
                0.4: 'blue',
                0.6: 'cyan',
                0.7: 'lime',
                0.8: 'yellow',
                1.0: 'red'
            }
        }).addTo(map);

        return () => {
            map.removeLayer(heat);
        };
    }, [map, points, intensity, radius]);

    return null;
}
